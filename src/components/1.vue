<template>
  <q-page class="bg-grey-2 q-pa-md">
    <div class="page-wrap">
      <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
        <div class="col">
          <div class="text-h4 text-weight-bold">PC 軟體配置中心</div>
          <div class="text-subtitle2 text-grey-7 q-mt-xs">
            管理多台 PC、工作職位與軟體安裝建議 · Firebase 即時同步
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
            :disable="!loaded"
            outline
            color="primary"
            icon="file_download"
            label="匯出 JSON"
            @click="exportJson"
          />
          <q-btn
            :disable="!canEdit"
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
          <q-tab name="settings" icon="settings" label="設定選項" />
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
              :loading="!loaded"
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
                    :disable="!canEdit"
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
                  :disable="!canEdit"
                  color="primary"
                  icon="add"
                  label="新增 PC"
                  @click="openPcDialog()"
                />
              </div>
            </div>
            <q-table
              :loading="!loaded"
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
                    :disable="!canEdit"
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openPcDialog(props.row)" /><q-btn
                    :disable="!canEdit"
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
                  :disable="!canEdit"
                  color="primary"
                  icon="add"
                  label="新增職位"
                  @click="openRoleDialog()"
                />
              </div>
            </div>
            <q-table
              :loading="!loaded"
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
                    :disable="!canEdit"
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openRoleDialog(props.row)" /><q-btn
                    :disable="!canEdit"
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
                  :disable="!canEdit"
                  outline
                  color="primary"
                  icon="restart_alt"
                  label="重設範本"
                  @click="resetSeed"
                /><q-btn
                  :disable="!canEdit"
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
              :loading="!loaded"
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
                    :disable="!canEdit"
                    flat
                    round
                    dense
                    color="primary"
                    icon="edit"
                    @click="openSoftwareDialog(props.row)" /><q-btn
                    :disable="!canEdit"
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    @click="confirmDelete('software', props.row)" /></q-td
              ></template>
            </q-table>
          </q-tab-panel>
          <q-tab-panel name="settings" class="q-pa-md">
            <div class="row items-center q-mb-md">
              <div class="col text-subtitle1 text-weight-bold">
                共用設定選項
              </div>
              <q-btn
                color="primary"
                icon="edit"
                label="編輯選項"
                :disable="!canEdit"
                @click="openOptionsDialog"
              />
            </div>
            <div class="text-body2 text-grey-7 q-mb-md">
              作業系統、軟體分類與建議狀態由 Firebase
              載入。修改後會同步到各表單。
            </div>
            <div
              v-for="editor in optionEditors"
              :key="editor.key"
              class="q-mb-lg"
            >
              <div class="text-subtitle2 q-mb-sm">{{ editor.label }}</div>
              <q-chip
                v-for="option in data.options[editor.key]"
                :key="option"
                color="blue-1"
                text-color="primary"
                >{{ option }}</q-chip
              >
              <span v-if="!data.options[editor.key].length" class="text-grey-7"
                >尚未設定</span
              >
            </div>
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
          <q-input
            :disable="saving"
            v-model="pcForm.name"
            outlined
            dense
            label="電腦名稱 *"
          />
          <q-input
            :disable="saving"
            v-model="pcForm.assetTag"
            outlined
            dense
            label="資產編號 *"
          />
          <q-select
            :disable="saving"
            v-model="pcForm.roleId"
            :options="roleOptions"
            emit-value
            map-options
            outlined
            dense
            label="工作職位 *"
          />
          <q-select
            :disable="saving"
            v-model="pcForm.os"
            :options="osOptions"
            outlined
            dense
            label="作業系統"
          />
          <q-input
            :disable="saving"
            v-model="pcForm.owner"
            outlined
            dense
            label="使用者 / 保管人"
          />
          <q-input
            :disable="saving"
            v-model="pcForm.location"
            outlined
            dense
            label="部門 / 位置"
          />
          <q-input
            :disable="saving"
            v-model="pcForm.notes"
            outlined
            dense
            label="備註"
          />
        </q-card-section>
        <q-card-actions align="right"
          ><q-btn :disable="saving" flat label="取消" v-close-popup /><q-btn
            :disable="!canEdit"
            :loading="saving"
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
          <q-input
            :disable="saving"
            v-model="roleForm.name"
            outlined
            dense
            label="職位名稱 *"
          />
          <q-input
            :disable="saving"
            v-model="roleForm.description"
            outlined
            dense
            label="職位說明"
          />
          <q-select
            :disable="saving"
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
          ><q-btn :disable="saving" flat label="取消" v-close-popup /><q-btn
            :disable="!canEdit"
            :loading="saving"
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
            :disable="saving"
            v-model="softwareForm.name"
            outlined
            dense
            label="軟體名稱 *"
          />
          <q-input
            :disable="saving"
            v-model="softwareForm.vendor"
            outlined
            dense
            label="供應商"
          />
          <q-select
            :disable="saving"
            v-model="softwareForm.category"
            :options="categoryChoices"
            use-input
            new-value-mode="add-unique"
            outlined
            dense
            label="分類"
          />
          <q-input
            :disable="saving"
            v-model="softwareForm.purpose"
            outlined
            dense
            label="用途 / 備註"
          />
          <q-select
            :disable="saving"
            v-model="softwareForm.priority"
            :options="priorityOptions"
            outlined
            dense
            label="建議狀態"
          />
          <q-select
            :disable="saving"
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
            :disable="saving"
            v-model="softwareForm.url"
            outlined
            dense
            label="下載 / 內部安裝網址"
          />
        </q-card-section>
        <q-card-actions align="right"
          ><q-btn :disable="saving" flat label="取消" v-close-popup /><q-btn
            :disable="!canEdit"
            :loading="saving"
            color="primary"
            label="儲存"
            @click="saveSoftware"
        /></q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="optionsDialog" persistent>
      <q-card class="dialog-card">
        <q-card-section class="text-h6">編輯設定選項</q-card-section>
        <q-card-section class="q-gutter-md">
          <div class="text-caption text-grey-7">
            輸入文字後按 Enter
            新增，點選籤上的叉號刪除。使用中的選項須先調整相關資料才能刪除。
          </div>
          <q-select
            v-for="editor in optionEditors"
            :key="editor.key"
            :disable="saving"
            v-model="optionsForm[editor.key]"
            :label="editor.label"
            multiple
            use-chips
            use-input
            hide-dropdown-icon
            new-value-mode="add-unique"
            outlined
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn :disable="saving" flat label="取消" v-close-popup />
          <q-btn
            color="primary"
            label="儲存"
            :loading="saving"
            :disable="!canEdit"
            @click="saveOptions"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="text-h6">確認刪除</q-card-section>
        <q-card-section
          >確定要刪除「{{
            deleteTarget?.name
          }}」嗎？此操作無法復原。</q-card-section
        >
        <q-card-actions align="right"
          ><q-btn :disable="saving" flat label="取消" v-close-popup /><q-btn
            :disable="!canEdit"
            :loading="saving"
            color="negative"
            label="刪除"
            @click="doDelete"
        /></q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useQuasar } from "quasar";
import columns from "../data/pc-software.columns.json";
import { cloneJson, freshSeed, normalizeData } from "../models/pcSoftware.js";
import { usePcSoftware } from "../composables/usePcSoftware.js";

const $q = useQuasar();
const {
  data,
  ready: firebaseReady,
  status: firebaseStatus,
  saving,
  canEdit,
  loaded,
  execute,
  createId,
} = usePcSoftware();
const pcs = computed(() => data.value.pcs);
const roles = computed(() => data.value.roles);
const software = computed(() => data.value.software);
const installedByPc = computed(() => data.value.installedByPc);
const osOptions = computed(() => data.value.options.osOptions);
const categoryChoices = computed(() => data.value.options.categoryChoices);
const priorityOptions = computed(() => data.value.options.priorityOptions);
const { recommendColumns, pcColumns, roleColumns, softwareColumns } = columns;
const tab = ref("recommend");
const selectedPcId = ref(null);
const categoryFilter = ref(null);
const search = ref("");
const pcSearch = ref("");
const softwareSearch = ref("");
const jsonInput = ref(null);
const pcDialog = ref(false);
const roleDialog = ref(false);
const softwareDialog = ref(false);
const deleteDialog = ref(false);
const optionsDialog = ref(false);
const deleteTarget = ref(null);
const deleteType = ref("");
const optionEditors = [
  { key: "osOptions", label: "作業系統" },
  { key: "categoryChoices", label: "軟體分類" },
  { key: "priorityOptions", label: "建議狀態（排列順序即為建議排序）" },
];
const optionsForm = ref({
  osOptions: [],
  categoryChoices: [],
  priorityOptions: [],
});
const emptyPc = () => ({
  id: "",
  name: "",
  assetTag: "",
  roleId: roles.value[0]?.id || "",
  os: osOptions.value[0] || "",
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
  category: categoryChoices.value.includes("待確認")
    ? "待確認"
    : categoryChoices.value[0] || "",
  purpose: "",
  priority: priorityOptions.value.includes("選配")
    ? "選配"
    : priorityOptions.value[0] || "",
  vendor: "",
  url: "",
  roleIds: [],
  roleGroup: "",
  notes: "",
});
const pcForm = ref(emptyPc());
const roleForm = ref(emptyRole());
const softwareForm = ref(emptySoftware());

watch(pcs, (rows) => {
  if (!rows.some((row) => row.id === selectedPcId.value))
    selectedPcId.value = rows[0]?.id || null;
});
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
  [...new Set(software.value.map((s) => s.category))].sort()
);
const selectedPc = computed(() =>
  pcs.value.find((p) => p.id === selectedPcId.value)
);
const recommendedSoftware = computed(() => {
  if (!selectedPc.value) return [];
  const role = roles.value.find((r) => r.id === selectedPc.value.roleId);
  const ids = new Set(role?.softwareIds || []);
  const installed = new Set(installedByPc.value[selectedPc.value.id] || []);
  const query = (search.value || "").trim().toLowerCase();
  return software.value
    .filter((s) => ids.has(s.id))
    .filter((s) => !categoryFilter.value || s.category === categoryFilter.value)
    .filter(
      (s) =>
        !query ||
        [s.name, s.category, s.purpose, s.vendor].some((v) =>
          v.toLowerCase().includes(query)
        )
    )
    .map((s) => ({ ...s, installed: installed.has(s.id) }))
    .sort(
      (a, b) =>
        priorityOptions.value.indexOf(a.priority) -
        priorityOptions.value.indexOf(b.priority)
    );
});
function roleName(id) {
  return roles.value.find((r) => r.id === id)?.name || "未指定職位";
}
function priorityColor(priority) {
  return (
    { 必裝: "negative", 建議: "primary", 不建議: "grey-4", 待確認: "orange" }[
      priority
    ] || "grey-5"
  );
}
async function persist(command, message) {
  try {
    await execute(command);
    if (message) $q.notify({ type: "positive", message });
    return true;
  } catch (error) {
    $q.notify({ type: "negative", message: `儲存失敗：${error.message}` });
    return false;
  }
}
function openPcDialog(row) {
  pcForm.value = row ? cloneJson(row) : emptyPc();
  pcDialog.value = true;
}
function openRoleDialog(row) {
  roleForm.value = row ? cloneJson(row) : emptyRole();
  roleDialog.value = true;
}
function openSoftwareDialog(row) {
  softwareForm.value = row ? cloneJson(row) : emptySoftware();
  softwareDialog.value = true;
}
async function saveRecord(collection, form, dialog, label) {
  const row = cloneJson(form.value);
  const create = !row.id;
  if (create) row.id = createId();
  if (
    await persist(
      { type: "save", collection, row, create },
      `${label}已儲存至 Firebase`
    )
  ) {
    dialog.value = false;
    if (collection === "pcs" && create) selectedPcId.value = row.id;
  }
}
const savePc = () => saveRecord("pcs", pcForm, pcDialog, "PC ");
const saveRole = () => saveRecord("roles", roleForm, roleDialog, "職位");
const saveSoftware = () =>
  saveRecord("software", softwareForm, softwareDialog, "軟體");
function confirmDelete(type, row) {
  deleteType.value = type;
  deleteTarget.value = cloneJson(row);
  deleteDialog.value = true;
}
async function doDelete() {
  if (!deleteTarget.value) return;
  const collection = { pc: "pcs", role: "roles", software: "software" }[
    deleteType.value
  ];
  if (
    await persist(
      { type: "delete", collection, id: deleteTarget.value.id },
      "資料已從 Firebase 刪除"
    )
  )
    deleteDialog.value = false;
}
async function toggleInstalled(softwareId) {
  const pcId = selectedPc.value?.id;
  if (!pcId) return;
  await persist({
    type: "installed",
    pcId,
    softwareId,
    installed: !(installedByPc.value[pcId] || []).includes(softwareId),
  });
}
function openOptionsDialog() {
  optionsForm.value = cloneJson(data.value.options);
  optionsDialog.value = true;
}
async function saveOptions() {
  if (
    await persist(
      { type: "options", options: cloneJson(optionsForm.value) },
      "設定已儲存至 Firebase"
    )
  )
    optionsDialog.value = false;
}
function exportJson() {
  const blob = new Blob(
    [
      JSON.stringify(
        { ...cloneJson(data.value), exportedAt: new Date().toISOString() },
        null,
        2
      ),
    ],
    { type: "application/json;charset=utf-8" }
  );
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "pc-software-config.json";
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  $q.notify({ type: "positive", message: "JSON 已匯出（含設定選項）" });
}
async function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const imported = normalizeData(JSON.parse(await file.text()));
    $q.dialog({
      title: "匯入 JSON",
      message:
        "匯入會覆蓋 Firebase 的 PC、職位、軟體、安裝紀錄與設定選項。建議先匯出備份。確定繼續？",
      cancel: true,
      persistent: true,
    }).onOk(() =>
      persist({ type: "replace", data: imported }, "JSON 已匯入 Firebase")
    );
  } catch (error) {
    $q.notify({ type: "negative", message: `匯入失敗：${error.message}` });
  } finally {
    event.target.value = "";
  }
}
function resetSeed() {
  $q.dialog({
    title: "重設範本",
    message:
      "這會用 JSON 範本覆蓋 Firebase 的 PC、職位、軟體、安裝紀錄與設定選項。請先匯出備份。確定重設？",
    cancel: true,
    persistent: true,
  }).onOk(() =>
    persist({ type: "replace", data: freshSeed() }, "Firebase 範本已重設")
  );
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
