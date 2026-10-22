<template>
  <q-page class="bg-grey-2 q-pa-md">
    <div class="page-wrap">
      <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
        <div class="col">
          <div class="text-h4 text-weight-bold">PC 軟體配置中心</div>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">
            管理多台 PC、工作職位與軟體安裝建議 · 單一 Vue 檔案
          </div>
          <div
            class="text-caption q-mt-xs"
            :class="firebaseReady ? 'text-positive' : 'text-orange-9'"
          >
            <q-icon
              :name="firebaseReady ? 'cloud_done' : 'cloud_sync'"
              class="q-mr-xs"
            />
            {{ firebaseStatus }}
          </div>
        </div>
        <div class="col-auto row q-gutter-sm">
          <q-btn
            outline
            color="primary"
            icon="file_download"
            label="匯出 JSON"
            @click="exportJson"
          />
          <q-btn
            outline
            color="primary"
            icon="file_upload"
            label="匯入 JSON"
            @click="jsonInput?.click()"
          />
          <input
            ref="jsonInput"
            type="file"
            accept=".json,application/json"
            class="hidden"
            @change="importJson"
          />
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div v-for="stat in stats" :key="stat.label" class="col-12 col-sm-4">
          <q-card flat bordered class="stat-card">
            <q-card-section class="row items-center no-wrap">
              <q-avatar
                :color="stat.bg"
                :text-color="stat.color"
                :icon="stat.icon"
                size="48px"
              />
              <div class="q-ml-md">
                <div class="text-caption text-grey-7">{{ stat.label }}</div>
                <div class="text-h5 text-weight-bold">{{ stat.value }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card flat bordered>
        <q-tabs
          v-model="tab"
          dense
          align="left"
          active-color="primary"
          indicator-color="primary"
          class="text-grey-7"
          narrow-indicator
        >
          <q-tab name="recommend" icon="checklist" label="安裝建議" />
          <q-tab name="pcs" icon="computer" label="PC 管理" />
          <q-tab name="roles" icon="badge" label="職位管理" />
          <q-tab name="software" icon="apps" label="軟體清單" />
        </q-tabs>
        <q-separator />
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="recommend" class="q-pa-md">
            <div class="row q-col-gutter-md items-end q-mb-md">
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 q-mb-xs">選擇 PC</div>
                <q-select
                  v-model="selectedPcId"
                  :options="pcOptions"
                  emit-value
                  map-options
                  outlined
                  dense
                  clearable
                  label="選擇電腦"
                />
              </div>
              <div class="col-12 col-md-4">
                <div class="text-subtitle2 q-mb-xs">篩選分類</div>
                <q-select
                  v-model="categoryFilter"
                  :options="categoryOptions"
                  outlined
                  dense
                  clearable
                  label="全部分類"
                />
              </div>
              <div class="col-12 col-md-4">
                <q-input
                  v-model="search"
                  outlined
                  dense
                  clearable
                  label="搜尋軟體名稱 / 用途"
                  debounce="150"
                >
                  <template #prepend><q-icon name="search" /></template>
                </q-input>
              </div>
            </div>
            <div
              v-if="selectedPc"
              class="row items-center q-col-gutter-sm q-mb-md"
            >
              <div class="col-auto">
                <q-icon name="computer" size="30px" color="primary" />
              </div>
              <div class="col">
                <div class="text-subtitle1 text-weight-bold">
                  {{ selectedPc.name }}
                  <q-badge color="blue-1" text-color="primary">{{
                    selectedPc.assetTag
                  }}</q-badge>
                </div>
                <div class="text-caption text-grey-7">
                  {{ roleName(selectedPc.roleId) }} · {{ selectedPc.os }} ·
                  {{ selectedPc.owner || "未指派使用者" }}
                </div>
              </div>
              <div class="col-auto">
                <q-badge color="grey-3" text-color="grey-9"
                  >{{ recommendedSoftware.length }} 項建議</q-badge
                >
              </div>
            </div>
            <q-banner
              v-if="!selectedPc"
              rounded
              class="bg-orange-1 text-orange-10"
              >請先到「PC 管理」新增電腦，或選擇現有 PC。</q-banner
            >
            <q-table
              v-else
              flat
              bordered
              :rows="recommendedSoftware"
              :columns="recommendColumns"
              row-key="id"
              :pagination="{ rowsPerPage: 12 }"
              no-data-label="沒有符合條件的軟體"
            >
              <template #body-cell-name="props">
                <q-td :props="props">
                  <div class="text-weight-medium">{{ props.row.name }}</div>
                  <div class="text-caption text-grey-7">
                    {{ props.row.vendor || "未指定供應商" }}
                  </div>
                </q-td>
              </template>
              <template #body-cell-priority="props"
                ><q-td :props="props"
                  ><q-badge
                    :color="priorityColor(props.row.priority)"
                    :text-color="
                      props.row.priority === '選配' ||
                      props.row.priority === '不建議'
                        ? 'grey-9'
                        : 'white'
                    "
                    >{{ props.row.priority }}</q-badge
                  ></q-td
                ></template
              >
              <template #body-cell-status="props"
                ><q-td :props="props"
                  ><q-badge
                    :color="props.row.installed ? 'positive' : 'grey-5'"
                    >{{ props.row.installed ? "已安裝" : "待安裝" }}</q-badge
                  ></q-td
                ></template
              >
              <template #body-cell-actions="props">
                <q-td :props="props">
                  <q-btn
                    dense
                    flat
                    round
                    :color="props.row.installed ? 'positive' : 'primary'"
                    :icon="props.row.installed ? 'check_circle' : 'add_task'"
                    @click="toggleInstalled(props.row.id)"
                  >
                    <q-tooltip>{{
                      props.row.installed ? "標記為待安裝" : "標記為已安裝"
                    }}</q-tooltip>
                  </q-btn>
                  <q-btn
                    v-if="props.row.url"
                    dense
                    flat
                    round
                    icon="open_in_new"
                    color="grey-7"
                    @click="openUrl(props.row.url)"
                    ><q-tooltip>開啟連結</q-tooltip></q-btn
                  >
                </q-td>
              </template>
            </q-table>
            <div class="text-caption text-grey-7 q-mt-sm">
              安裝狀態依 PC 分開記錄。此頁管理建議，不會直接在電腦上安裝軟體。
            </div>
          </q-tab-panel>

          <q-tab-panel name="pcs" class="q-pa-md">
            <div class="row items-center q-mb-md">
              <div class="col text-subtitle1 text-weight-bold">PC 清單</div>
              <div class="col-auto">
                <q-btn
                  color="primary"
                  icon="add"
                  label="新增 PC"
                  @click="openPcDialog()"
                />
              </div>
            </div>
            <q-table
              flat
              bordered
              :rows="pcs"
              :columns="pcColumns"
              row-key="id"
              :filter="pcSearch"
              :pagination="{ rowsPerPage: 10 }"
            >
              <template #top-right
                ><q-input
                  v-model="pcSearch"
                  dense
                  outlined
                  debounce="200"
                  placeholder="搜尋 PC"
                  ><template #append
                    ><q-icon name="search" /></template></q-input
              ></template>
              <template #body-cell-roleId="props"
                ><q-td :props="props">{{
                  roleName(props.row.roleId)
                }}</q-td></template
              >
              <template #body-cell-actions="props"
                ><q-td :props="props" class="q-gutter-xs"
                  ><q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openPcDialog(props.row)" /><q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="confirmDelete('pc', props.row)" /></q-td
              ></template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="roles" class="q-pa-md">
            <div class="row items-center q-mb-md">
              <div class="col text-subtitle1 text-weight-bold">
                職位與預設軟體
              </div>
              <div class="col-auto">
                <q-btn
                  color="primary"
                  icon="add"
                  label="新增職位"
                  @click="openRoleDialog()"
                />
              </div>
            </div>
            <q-table
              flat
              bordered
              :rows="roles"
              :columns="roleColumns"
              row-key="id"
            >
              <template #body-cell-softwareIds="props"
                ><q-td :props="props"
                  >{{ props.row.softwareIds.length }} 項軟體</q-td
                ></template
              >
              <template #body-cell-actions="props"
                ><q-td :props="props" class="q-gutter-xs"
                  ><q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openRoleDialog(props.row)" /><q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="confirmDelete('role', props.row)" /></q-td
              ></template>
            </q-table>
          </q-tab-panel>

          <q-tab-panel name="software" class="q-pa-md">
            <div class="row items-center q-mb-md">
              <div class="col text-subtitle1 text-weight-bold">
                軟體目錄（依提供的清單建立範本）
              </div>
              <div class="col-auto row q-gutter-sm">
                <q-btn
                  outline
                  color="primary"
                  icon="restart_alt"
                  label="重設範本"
                  @click="resetSeed"
                /><q-btn
                  color="primary"
                  icon="add"
                  label="新增軟體"
                  @click="openSoftwareDialog()"
                />
              </div>
            </div>
            <q-banner rounded class="bg-blue-1 text-blue-10 q-mb-md">
              清單中「必不要」、「放棄 after
              ai」及問號項目已保留為備註或不建議狀態，請 IT
              確認後再套用到正式電腦。
            </q-banner>
            <q-table
              flat
              bordered
              :rows="software"
              :columns="softwareColumns"
              row-key="id"
              :filter="softwareSearch"
              :pagination="{ rowsPerPage: 12 }"
            >
              <template #top-right
                ><q-input
                  v-model="softwareSearch"
                  dense
                  outlined
                  debounce="200"
                  placeholder="搜尋軟體"
                  ><template #append
                    ><q-icon name="search" /></template></q-input
              ></template>
              <template #body-cell-priority="props"
                ><q-td :props="props"
                  ><q-badge
                    :color="priorityColor(props.row.priority)"
                    :text-color="
                      ['選配', '不建議'].includes(props.row.priority)
                        ? 'grey-9'
                        : 'white'
                    "
                    >{{ props.row.priority }}</q-badge
                  ></q-td
                ></template
              >
              <template #body-cell-actions="props"
                ><q-td :props="props" class="q-gutter-xs"
                  ><q-btn
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openSoftwareDialog(props.row)" /><q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="confirmDelete('software', props.row)" /></q-td
              ></template>
            </q-table>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <q-dialog v-model="pcDialog" persistent>
      <q-card class="dialog-card">
        <q-card-section class="text-h6">{{
          pcForm.id ? "編輯 PC" : "新增 PC"
        }}</q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input v-model="pcForm.name" outlined dense label="電腦名稱 *" />
          <q-input
            v-model="pcForm.assetTag"
            outlined
            dense
            label="資產編號 *"
          />
          <q-select
            v-model="pcForm.roleId"
            :options="roleOptions"
            emit-value
            map-options
            outlined
            dense
            label="工作職位 *"
          />
          <q-select
            v-model="pcForm.os"
            :options="osOptions"
            outlined
            dense
            label="作業系統"
          />
          <q-input
            v-model="pcForm.owner"
            outlined
            dense
            label="使用者 / 保管人"
          />
          <q-input
            v-model="pcForm.location"
            outlined
            dense
            label="部門 / 位置"
          />
          <q-input v-model="pcForm.notes" outlined dense label="備註" />
        </q-card-section>
        <q-card-actions align="right"
          ><q-btn flat label="取消" v-close-popup /><q-btn
            color="primary"
            label="儲存"
            @click="savePc"
        /></q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="roleDialog" persistent>
      <q-card class="dialog-card">
        <q-card-section class="text-h6">{{
          roleForm.id ? "編輯職位" : "新增職位"
        }}</q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input v-model="roleForm.name" outlined dense label="職位名稱 *" />
          <q-input
            v-model="roleForm.description"
            outlined
            dense
            label="職位說明"
          />
          <q-select
            v-model="roleForm.softwareIds"
            :options="softwareOptions"
            emit-value
            map-options
            multiple
            use-chips
            outlined
            label="預設建議軟體"
          />
        </q-card-section>
        <q-card-actions align="right"
          ><q-btn flat label="取消" v-close-popup /><q-btn
            color="primary"
            label="儲存"
            @click="saveRole"
        /></q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="softwareDialog" persistent>
      <q-card class="dialog-card">
        <q-card-section class="text-h6">{{
          softwareForm.id ? "編輯軟體" : "新增軟體"
        }}</q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="softwareForm.name"
            outlined
            dense
            label="軟體名稱 *"
          />
          <q-input
            v-model="softwareForm.vendor"
            outlined
            dense
            label="供應商"
          />
          <q-select
            v-model="softwareForm.category"
            :options="categoryChoices"
            use-input
            new-value-mode="add-unique"
            outlined
            dense
            label="分類"
          />
          <q-input
            v-model="softwareForm.purpose"
            outlined
            dense
            label="用途 / 備註"
          />
          <q-select
            v-model="softwareForm.priority"
            :options="priorityOptions"
            outlined
            dense
            label="建議狀態"
          />
          <q-select
            v-model="softwareForm.roleIds"
            :options="roleOptions"
            emit-value
            map-options
            multiple
            use-chips
            outlined
            label="適用職位（可複選）"
          />
          <q-input
            v-model="softwareForm.url"
            outlined
            dense
            label="下載 / 內部安裝網址"
          />
        </q-card-section>
        <q-card-actions align="right"
          ><q-btn flat label="取消" v-close-popup /><q-btn
            color="primary"
            label="儲存"
            @click="saveSoftware"
        /></q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog">
      <q-card>
        <q-card-section class="text-h6">確認刪除</q-card-section>
        <q-card-section
          >確定要刪除「{{
            deleteTarget?.name
          }}」嗎？此操作無法復原。</q-card-section
        >
        <q-card-actions align="right"
          ><q-btn flat label="取消" v-close-popup /><q-btn
            color="negative"
            label="刪除"
            @click="doDelete"
        /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import {
  computed,
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
} from "vue";
import { useQuasar } from "quasar";
import { initializeApp } from "firebase/app";
import { getDatabase, ref as dbRef, onValue, set } from "firebase/database";

const $q = useQuasar();

const firebaseConfig = {
  apiKey: "AIzaSyDR_3lgRnfmSIPxX427zqwV0zM6wvlZpTk",
  authDomain: "software-ffea6.firebaseapp.com",
  databaseURL: "https://software-ffea6-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "software-ffea6",
  storageBucket: "software-ffea6.firebasestorage.app",
  messagingSenderId: "265085325193",
  appId: "1:265085325193:web:bfb6ba230034de0e8e5b58",
};

const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const DATA_PATH = "pc-software-config";
const dataRef = dbRef(database, DATA_PATH);
const firebaseReady = ref(false);
const firebaseStatus = ref("正在連線 Firebase...");
let unsubscribeRealtime = null;
let applyingRemoteData = false;
let saveTimer = null;
const uid = (prefix) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

const seedSoftware = [
  [
    "chrome G1 / job2021 / 2025",
    "瀏覽器",
    "Chrome 不同版本或設定群組；請確認公司標準版本",
    "必裝",
    "一般",
  ],
  ["VSC (Visual Studio Code)", "開發", "程式碼編輯器", "必裝", "工程師"],
  ["GitHub Desktop", "開發", "Git 圖形化版本控制工具", "建議", "工程師"],
  [
    "Synology Assistant",
    "網路 / NAS",
    "尋找及管理 Synology NAS",
    "選配",
    "一般",
  ],
  ["Eagle", "美術 / 素材", "圖片與設計素材管理", "建議", "設計"],
  ["Discord", "通訊", "團隊通訊；依公司政策決定", "選配", "一般"],
  ["PicPick", "美術 / 照片工具", "截圖、取色與影像註記", "建議", "設計"],
  ["LibreOffice 7.5", "文書", "文書、試算表、簡報", "建議", "一般"],
  ["Notion", "協作 / 筆記", "文件、知識庫與專案管理", "選配", "一般"],
  ["LINE", "通訊", "即時通訊；依公司政策決定", "選配", "一般"],
  ["PotPlayer 64 bit", "影音", "影音播放", "選配", "一般"],
  ["Codex", "開發 / AI", "AI 輔助程式開發工具", "選配", "工程師"],
  [
    "美術照片工具",
    "美術 / 照片工具",
    "請填入實際使用的軟體名稱",
    "選配",
    "設計",
  ],
  ["Video soft", "影音 / 剪輯", "請確認實際剪輯軟體與授權", "選配", "影音"],
  ["green", "待確認", "原始清單名稱為 green，待確認用途", "待確認", "一般"],
  ["2 3D CAD 工具", "3D / CAD", "請填入實際 3D CAD 工具名稱", "建議", "CAD"],
  [
    "3 大主題 (LINK)",
    "內部連結",
    "請補上三大主題的內部文件或網址",
    "選配",
    "一般",
  ],
  ["Coding", "開發", "泛指開發工具，請確認具體軟體", "待確認", "工程師"],
  [
    "DB Browser (SQLite)",
    "資料庫",
    "SQLite 資料庫檢視與編輯",
    "建議",
    "工程師",
  ],
  [
    "Anaconda Navigator (anaconda3)",
    "資料分析",
    "Python / Conda 環境管理",
    "選配",
    "工程師",
  ],
  [
    "GitKraken (2)",
    "開發",
    "Git 圖形化工具；「2」保留原始備註",
    "選配",
    "工程師",
  ],
  ["Dropbox", "雲端儲存", "雲端檔案同步；確認公司政策", "選配", "一般"],
  ["MS OneDrive", "雲端儲存", "Microsoft 雲端檔案同步", "選配", "一般"],
  ["Bloons TD 6", "遊戲", "非工作必要軟體", "不建議", "一般"],
  ["Steam", "遊戲平台", "非工作必要軟體", "不建議", "一般"],
  [
    "Godot v4.3 stable (捷徑)",
    "遊戲開發",
    "Godot 遊戲引擎；原清單為 exe 捷徑",
    "選配",
    "工程師",
  ],
  ["Ansys 15", "工程 / 模擬", "工程分析與模擬；確認版本與授權", "選配", "CAD"],
  ["Autodesk 360", "雲端 / CAD", "原始備註：必不要", "不建議", "CAD"],
  [
    "AutoCAD 2014",
    "CAD",
    "2D / 3D CAD；舊版本需確認相容性與授權",
    "選配",
    "CAD",
  ],
  ["Blender", "3D / 美術", "3D 建模、動畫與渲染", "建議", "設計"],
  [
    "Figma",
    "設計 / 協作",
    "原始備註：放棄 after ai；待確認是否停用",
    "不建議",
    "設計",
  ],
  ["FreeCAD", "CAD", "開源 3D CAD 建模工具", "選配", "CAD"],
  [
    "HP 印表機工具",
    "硬體 / 驅動",
    "依實際 HP 印表機型號安裝驅動或管理工具",
    "選配",
    "一般",
  ],
  [
    "Office 365 / Microsoft 365",
    "文書",
    "原始清單帶問號；請確認公司授權",
    "待確認",
    "一般",
  ],
  [
    "Office 2003 / 2010",
    "文書",
    "原始清單帶問號；舊版本有安全與相容性風險",
    "不建議",
    "一般",
  ],
  ["Creo 6", "CAD", "3D CAD / PLM；確認授權與版本", "選配", "CAD"],
  ["SolidWorks 2019", "CAD", "3D CAD；確認授權與版本", "選配", "CAD"],
  [
    "剪映專業版",
    "影音 / 剪輯",
    "影片剪輯；確認公司使用政策與授權",
    "選配",
    "影音",
  ],
].map(([name, category, purpose, priority, roleGroup]) => ({
  id: uid("sw"),
  name,
  category,
  purpose,
  priority,
  vendor: "",
  url: "",
  roleGroup,
  roleIds: [],
  notes: "",
}));

const defaultRoles = [
  {
    id: "role-general",
    name: "一般行政 / 文書",
    description: "日常辦公、郵件、文件與雲端檔案",
    softwareIds: [],
  },
  {
    id: "role-design",
    name: "美術 / 設計",
    description: "素材管理、影像處理、設計與 3D",
    softwareIds: [],
  },
  {
    id: "role-dev",
    name: "工程師 / Coding",
    description: "程式開發、版本控制與資料庫",
    softwareIds: [],
  },
  {
    id: "role-cad",
    name: "3D CAD / 工程",
    description: "CAD、建模與工程模擬",
    softwareIds: [],
  },
  {
    id: "role-video",
    name: "影音剪輯",
    description: "影片剪輯、播放與影音製作",
    softwareIds: [],
  },
];
const defaultPcs = [
  {
    id: "pc-001",
    name: "OFFICE-PC-01",
    assetTag: "PC-001",
    roleId: "role-general",
    os: "Windows 11",
    owner: "",
    location: "行政部",
    notes: "",
  },
  {
    id: "pc-002",
    name: "DESIGN-PC-01",
    assetTag: "PC-002",
    roleId: "role-design",
    os: "Windows 11",
    owner: "",
    location: "設計部",
    notes: "",
  },
  {
    id: "pc-003",
    name: "DEV-PC-01",
    assetTag: "PC-003",
    roleId: "role-dev",
    os: "Windows 11",
    owner: "",
    location: "資訊部",
    notes: "",
  },
  {
    id: "pc-004",
    name: "CAD-PC-01",
    assetTag: "PC-004",
    roleId: "role-cad",
    os: "Windows 10",
    owner: "",
    location: "工程部",
    notes: "",
  },
];
const categoryChoices = [
  "瀏覽器",
  "開發",
  "網路 / NAS",
  "美術 / 素材",
  "美術 / 照片工具",
  "通訊",
  "文書",
  "影音",
  "影音 / 剪輯",
  "開發 / AI",
  "3D / CAD",
  "內部連結",
  "資料庫",
  "資料分析",
  "雲端儲存",
  "遊戲",
  "遊戲開發",
  "工程 / 模擬",
  "雲端 / CAD",
  "設計 / 協作",
  "CAD",
  "硬體 / 驅動",
  "待確認",
];
const priorityOptions = ["必裝", "建議", "選配", "待確認", "不建議"];
const osOptions = [
  "Windows 11",
  "Windows 10",
  "Windows Server",
  "macOS",
  "Linux",
];
function freshSeed() {
  const roles = structuredClone(defaultRoles);
  const software = structuredClone(seedSoftware);
  const roleLookup = {
    一般: "role-general",
    設計: "role-design",
    工程師: "role-dev",
    CAD: "role-cad",
    影音: "role-video",
  };
  software.forEach((s) => {
    const rid = roleLookup[s.roleGroup] || "role-general";
    s.roleIds = [rid];
    const role = roles.find((r) => r.id === rid);
    if (role && s.priority !== "不建議" && s.priority !== "待確認")
      role.softwareIds.push(s.id);
  });
  return {
    pcs: structuredClone(defaultPcs),
    roles,
    software,
    installedByPc: {},
  };
}
// 先載入範本；Firebase 連線後會以雲端資料覆蓋。
const initial = freshSeed();
const pcs = ref(initial.pcs || []);
const roles = ref(initial.roles || []);
const software = ref(initial.software || []);
const installedByPc = ref(initial.installedByPc || {});
const tab = ref("recommend");
const selectedPcId = ref(pcs.value[0]?.id || null);
const categoryFilter = ref(null);
const search = ref("");
const pcSearch = ref("");
const softwareSearch = ref("");
const jsonInput = ref(null);
const pcDialog = ref(false),
  roleDialog = ref(false),
  softwareDialog = ref(false),
  deleteDialog = ref(false);
const deleteTarget = ref(null),
  deleteType = ref("");
const emptyPc = () => ({
  id: "",
  name: "",
  assetTag: "",
  roleId: roles.value[0]?.id || "",
  os: "Windows 11",
  owner: "",
  location: "",
  notes: "",
});
const emptyRole = () => ({
  id: "",
  name: "",
  description: "",
  softwareIds: [],
});
const emptySoftware = () => ({
  id: "",
  name: "",
  category: "待確認",
  purpose: "",
  priority: "選配",
  vendor: "",
  url: "",
  roleIds: [],
  roleGroup: "",
  notes: "",
});
const pcForm = ref(emptyPc()),
  roleForm = ref(emptyRole()),
  softwareForm = ref(emptySoftware());

const stats = computed(() => [
  {
    label: "管理中的 PC",
    value: pcs.value.length,
    icon: "computer",
    bg: "blue-1",
    color: "primary",
  },
  {
    label: "工作職位",
    value: roles.value.length,
    icon: "work",
    bg: "purple-1",
    color: "purple",
  },
  {
    label: "軟體項目",
    value: software.value.length,
    icon: "apps",
    bg: "green-1",
    color: "positive",
  },
]);
const pcOptions = computed(() =>
  pcs.value.map((p) => ({ label: `${p.name} (${p.assetTag})`, value: p.id }))
);
const roleOptions = computed(() =>
  roles.value.map((r) => ({ label: r.name, value: r.id }))
);
const softwareOptions = computed(() =>
  software.value.map((s) => ({ label: s.name, value: s.id }))
);
const categoryOptions = computed(() =>
  [...new Set(software.value.map((s) => s.category).filter(Boolean))].sort()
);
const selectedPc = computed(() =>
  pcs.value.find((p) => p.id === selectedPcId.value)
);
const recommendColumns = [
  { name: "name", label: "軟體", field: "name", align: "left", sortable: true },
  {
    name: "category",
    label: "分類",
    field: "category",
    align: "left",
    sortable: true,
  },
  { name: "purpose", label: "用途 / 備註", field: "purpose", align: "left" },
  { name: "priority", label: "建議狀態", field: "priority", align: "center" },
  { name: "status", label: "安裝狀態", field: "installed", align: "center" },
  { name: "actions", label: "操作", field: "id", align: "center" },
];
const pcColumns = [
  {
    name: "name",
    label: "電腦名稱",
    field: "name",
    align: "left",
    sortable: true,
  },
  { name: "assetTag", label: "資產編號", field: "assetTag", align: "left" },
  { name: "roleId", label: "工作職位", field: "roleId", align: "left" },
  { name: "os", label: "作業系統", field: "os", align: "left" },
  { name: "owner", label: "使用者", field: "owner", align: "left" },
  { name: "location", label: "部門 / 位置", field: "location", align: "left" },
  { name: "actions", label: "操作", field: "id", align: "center" },
];
const roleColumns = [
  {
    name: "name",
    label: "職位名稱",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "description",
    label: "職位說明",
    field: "description",
    align: "left",
  },
  {
    name: "softwareIds",
    label: "預設軟體",
    field: "softwareIds",
    align: "center",
  },
  { name: "actions", label: "操作", field: "id", align: "center" },
];
const softwareColumns = [
  {
    name: "name",
    label: "軟體名稱",
    field: "name",
    align: "left",
    sortable: true,
  },
  { name: "category", label: "分類", field: "category", align: "left" },
  { name: "purpose", label: "用途 / 備註", field: "purpose", align: "left" },
  { name: "priority", label: "建議狀態", field: "priority", align: "center" },
  { name: "actions", label: "操作", field: "id", align: "center" },
];
const recommendedSoftware = computed(() => {
  if (!selectedPc.value) return [];
  const role = roles.value.find((r) => r.id === selectedPc.value.roleId);
  const ids = new Set([
    ...(role?.softwareIds || []),
    ...software.value
      .filter((s) => (s.roleIds || []).includes(selectedPc.value.roleId))
      .map((s) => s.id),
  ]);
  const installed = new Set(installedByPc.value[selectedPc.value.id] || []);
  const q = search.value.trim().toLowerCase();
  return software.value
    .filter((s) => ids.has(s.id))
    .filter((s) => !categoryFilter.value || s.category === categoryFilter.value)
    .filter(
      (s) =>
        !q ||
        [s.name, s.category, s.purpose, s.vendor].some((v) =>
          String(v || "")
            .toLowerCase()
            .includes(q)
        )
    )
    .map((s) => ({ ...s, installed: installed.has(s.id) }))
    .sort(
      (a, b) =>
        priorityOptions.indexOf(a.priority) -
        priorityOptions.indexOf(b.priority)
    );
});
function roleName(id) {
  return roles.value.find((r) => r.id === id)?.name || "未指定職位";
}
function priorityColor(p) {
  return p === "必裝"
    ? "negative"
    : p === "建議"
    ? "primary"
    : p === "不建議"
    ? "grey-4"
    : p === "待確認"
    ? "orange"
    : "grey-5";
}
function currentData() {
  return {
    version: 1,
    pcs: pcs.value,
    roles: roles.value,
    software: software.value,
    installedByPc: installedByPc.value,
  };
}

function applyRemoteData(data) {
  applyingRemoteData = true;
  pcs.value = Array.isArray(data?.pcs) ? data.pcs : [];
  roles.value = Array.isArray(data?.roles) ? data.roles : [];
  software.value = Array.isArray(data?.software) ? data.software : [];
  installedByPc.value =
    data?.installedByPc && typeof data.installedByPc === "object"
      ? data.installedByPc
      : {};
  if (!pcs.value.some((p) => p.id === selectedPcId.value)) {
    selectedPcId.value = pcs.value[0]?.id || null;
  }
  nextTick(() => {
    applyingRemoteData = false;
  });
}

async function saveToFirebase() {
  if (!firebaseReady.value || applyingRemoteData) return;
  try {
    await set(dataRef, currentData());
    firebaseStatus.value = "Firebase 已同步";
  } catch (error) {
    console.error("Firebase 寫入失敗：", error);
    firebaseStatus.value = "Firebase 儲存失敗";
    $q.notify({
      type: "negative",
      message: "Firebase 儲存失敗，請檢查網路、資料庫規則與設定",
    });
  }
}

onMounted(() => {
  unsubscribeRealtime = onValue(
    dataRef,
    async (snapshot) => {
      const data = snapshot.val();
      if (
        data &&
        Array.isArray(data.pcs) &&
        Array.isArray(data.roles) &&
        Array.isArray(data.software)
      ) {
        applyRemoteData(data);
        firebaseReady.value = true;
        firebaseStatus.value = "Firebase 已連線";
      } else if (!snapshot.exists()) {
        try {
          await set(dataRef, currentData());
          firebaseReady.value = true;
          firebaseStatus.value = "已建立 Firebase 初始資料";
        } catch (error) {
          console.error("Firebase 初始化寫入失敗：", error);
          firebaseStatus.value = "Firebase 初始化失敗";
          $q.notify({
            type: "negative",
            message: "無法初始化 Firebase，請檢查設定與資料庫規則",
          });
        }
      } else {
        firebaseStatus.value = "Firebase 資料格式不正確";
      }
    },
    (error) => {
      console.error("Firebase 讀取失敗：", error);
      firebaseStatus.value = "Firebase 讀取失敗";
      $q.notify({
        type: "negative",
        message: "Firebase 讀取失敗，請檢查設定與資料庫規則",
      });
    }
  );
});

onBeforeUnmount(() => {
  if (typeof unsubscribeRealtime === "function") unsubscribeRealtime();
  if (saveTimer) clearTimeout(saveTimer);
});

watch(
  [pcs, roles, software, installedByPc],
  () => {
    if (!firebaseReady.value || applyingRemoteData) return;
    if (saveTimer) clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveToFirebase();
    }, 350);
  },
  { deep: true }
);
function openPcDialog(row) {
  pcForm.value = row ? structuredClone(row) : emptyPc();
  pcDialog.value = true;
}
function savePc() {
  if (
    !pcForm.value.name.trim() ||
    !pcForm.value.assetTag.trim() ||
    !pcForm.value.roleId
  )
    return $q.notify({
      type: "warning",
      message: "請填寫電腦名稱、資產編號與工作職位",
    });
  if (
    pcs.value.some(
      (p) => p.assetTag === pcForm.value.assetTag && p.id !== pcForm.value.id
    )
  )
    return $q.notify({ type: "warning", message: "資產編號不可重複" });
  const row = structuredClone(pcForm.value);
  if (row.id) pcs.value = pcs.value.map((p) => (p.id === row.id ? row : p));
  else {
    row.id = uid("pc");
    pcs.value.push(row);
    selectedPcId.value = row.id;
  }
  pcDialog.value = false;
  $q.notify({ type: "positive", message: "PC 已儲存" });
}
function openRoleDialog(row) {
  roleForm.value = row ? structuredClone(row) : emptyRole();
  roleDialog.value = true;
}
function saveRole() {
  if (!roleForm.value.name.trim())
    return $q.notify({ type: "warning", message: "請填寫職位名稱" });
  const row = structuredClone(roleForm.value);
  if (row.id) roles.value = roles.value.map((r) => (r.id === row.id ? row : r));
  else {
    row.id = uid("role");
    roles.value.push(row);
  }
  roleDialog.value = false;
  $q.notify({ type: "positive", message: "職位已儲存" });
}
function openSoftwareDialog(row) {
  softwareForm.value = row ? structuredClone(row) : emptySoftware();
  softwareDialog.value = true;
}
function saveSoftware() {
  if (!softwareForm.value.name.trim())
    return $q.notify({ type: "warning", message: "請填寫軟體名稱" });
  const row = structuredClone(softwareForm.value);
  if (row.id)
    software.value = software.value.map((s) => (s.id === row.id ? row : s));
  else {
    row.id = uid("sw");
    software.value.push(row);
  }
  softwareDialog.value = false;
  $q.notify({ type: "positive", message: "軟體已儲存" });
}
function confirmDelete(type, row) {
  deleteType.value = type;
  deleteTarget.value = structuredClone(row);
  deleteDialog.value = true;
}
function doDelete() {
  const row = deleteTarget.value;
  if (!row) return;
  if (deleteType.value === "pc") {
    pcs.value = pcs.value.filter((p) => p.id !== row.id);
    delete installedByPc.value[row.id];
    if (selectedPcId.value === row.id)
      selectedPcId.value = pcs.value[0]?.id || null;
  } else if (deleteType.value === "role") {
    if (pcs.value.some((p) => p.roleId === row.id))
      return $q.notify({
        type: "warning",
        message: "仍有 PC 使用此職位，請先調整 PC 職位",
      });
    roles.value = roles.value.filter((r) => r.id !== row.id);
    software.value = software.value.map((s) => ({
      ...s,
      roleIds: (s.roleIds || []).filter((id) => id !== row.id),
    }));
  } else {
    software.value = software.value.filter((s) => s.id !== row.id);
    roles.value = roles.value.map((r) => ({
      ...r,
      softwareIds: (r.softwareIds || []).filter((id) => id !== row.id),
    }));
    Object.keys(installedByPc.value).forEach((id) => {
      installedByPc.value[id] = (installedByPc.value[id] || []).filter(
        (swId) => swId !== row.id
      );
    });
  }
  deleteDialog.value = false;
  $q.notify({ type: "positive", message: "資料已刪除" });
}
function toggleInstalled(swId) {
  const pcId = selectedPc.value?.id;
  if (!pcId) return;
  const ids = new Set(installedByPc.value[pcId] || []);
  ids.has(swId) ? ids.delete(swId) : ids.add(swId);
  installedByPc.value[pcId] = [...ids];
}
function exportJson() {
  const blob = new Blob(
    [
      JSON.stringify(
        {
          version: 1,
          exportedAt: new Date().toISOString(),
          pcs: pcs.value,
          roles: roles.value,
          software: software.value,
          installedByPc: installedByPc.value,
        },
        null,
        2
      ),
    ],
    { type: "application/json;charset=utf-8" }
  );
  const url = URL.createObjectURL(blob),
    a = document.createElement("a");
  a.href = url;
  a.download = "pc-software-config.json";
  a.click();
  URL.revokeObjectURL(url);
  $q.notify({ type: "positive", message: "JSON 已匯出" });
}
function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(String(reader.result));
      if (
        !Array.isArray(data.pcs) ||
        !Array.isArray(data.roles) ||
        !Array.isArray(data.software)
      )
        throw new Error("JSON 必須包含 pcs、roles、software 陣列");
      $q.dialog({
        title: "匯入 JSON",
        message: "匯入會覆蓋目前資料，建議先匯出備份。確定繼續？",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        pcs.value = data.pcs;
        roles.value = data.roles;
        software.value = data.software;
        installedByPc.value = data.installedByPc || {};
        selectedPcId.value = pcs.value[0]?.id || null;
        $q.notify({ type: "positive", message: "JSON 匯入成功" });
      });
    } catch (e) {
      $q.notify({ type: "negative", message: `匯入失敗：${e.message}` });
    }
    event.target.value = "";
  };
  reader.readAsText(file);
}
function resetSeed() {
  $q.dialog({
    title: "重設軟體範本",
    message:
      "這會用預設範例覆蓋目前 PC、職位、軟體與安裝狀態。請先匯出備份。確定重設？",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    const data = freshSeed();
    pcs.value = data.pcs;
    roles.value = data.roles;
    software.value = data.software;
    installedByPc.value = data.installedByPc;
    selectedPcId.value = pcs.value[0]?.id || null;
    $q.notify({ type: "positive", message: "範本已重設" });
  });
}
function openUrl(url) {
  try {
    const parsed = new URL(url);
    if (["http:", "https:"].includes(parsed.protocol))
      window.open(parsed.href, "_blank", "noopener,noreferrer");
    else $q.notify({ type: "warning", message: "只允許 http 或 https 網址" });
  } catch {
    $q.notify({ type: "warning", message: "請先填入有效網址" });
  }
}
</script>

<style scoped>
.page-wrap {
  max-width: 1440px;
  margin: 0 auto;
}
.stat-card {
  border-radius: 12px;
}
.dialog-card {
  width: 560px;
  max-width: 95vw;
}
</style>
