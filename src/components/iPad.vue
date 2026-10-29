<template>
  <q-page class="q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm">
        <div class="text-h5 text-weight-bold">
          Google Play App 管理（Firebase）
        </div>
        <div class="text-caption text-grey-7">
          資料來源：Firebase Realtime Database / pc-software-config/software
        </div>
      </div>
      <div class="col-12 col-sm-auto row q-gutter-sm">
        <q-btn
          color="primary"
          icon="upload_file"
          label="匯入 JSON"
          @click="openImport"
        />
        <q-btn
          outline
          color="primary"
          icon="download"
          label="匯出 JSON"
          :disable="!apps.length"
          @click="exportJson"
        />
        <q-btn
          outline
          color="secondary"
          icon="refresh"
          label="重新讀取"
          @click="loadApps"
        />
        <input
          ref="fileInput"
          type="file"
          accept="application/json,.json"
          class="hidden"
          @change="importJson"
        />
      </div>
    </div>

    <div class="row q-col-gutter-sm q-mb-md">
      <div class="col-6 col-md-3">
        <q-card flat bordered
          ><q-card-section>
            <div class="text-caption text-grey-7">資料筆數</div>
            <div class="text-h5">{{ apps.length }}</div>
          </q-card-section></q-card
        >
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered
          ><q-card-section>
            <div class="text-caption text-grey-7">篩選結果</div>
            <div class="text-h5">{{ filteredApps.length }}</div>
          </q-card-section></q-card
        >
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered
          ><q-card-section>
            <div class="text-caption text-grey-7">分類數</div>
            <div class="text-h5">{{ categories.length }}</div>
          </q-card-section></q-card
        >
      </div>
      <div class="col-6 col-md-3">
        <q-card flat bordered
          ><q-card-section>
            <div class="text-caption text-grey-7">必裝項目</div>
            <div class="text-h5">
              {{ apps.filter((a) => a.priority === "必裝").length }}
            </div>
          </q-card-section></q-card
        >
      </div>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section class="row q-col-gutter-sm items-center">
        <div class="col-12 col-md-5">
          <q-input
            v-model="search"
            dense
            outlined
            clearable
            debounce="200"
            placeholder="搜尋 App、開發商、用途、備註..."
          >
            <template #prepend><q-icon name="search" /></template>
          </q-input>
        </div>
        <div class="col-6 col-md-3">
          <q-select
            v-model="categoryFilter"
            dense
            outlined
            clearable
            emit-value
            map-options
            :options="categoryOptions"
            label="分類"
          />
        </div>
        <div class="col-6 col-md-2">
          <q-select
            v-model="priorityFilter"
            dense
            outlined
            clearable
            :options="priorityOptions"
            label="安裝優先級"
          />
        </div>
        <div class="col-12 col-md-2">
          <q-btn
            class="full-width"
            outline
            icon="add"
            label="新增 App"
            @click="newApp"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-banner
      v-if="!apps.length"
      rounded
      class="bg-blue-1 text-blue-10 q-mb-md"
    >
      Firebase 尚無 App 資料。請按「匯入 JSON」將 google_play_apps.json 匯入
      Firebase。
    </q-banner>

    <q-table
      flat
      bordered
      :rows="filteredApps"
      :columns="columns"
      row-key="id"
      :loading="loading"
      :pagination="pagination"
      :rows-per-page-options="[10, 20, 50, 100]"
      no-data-label="沒有符合條件的 App"
      class="app-table"
    >
      <template #body-cell-name="props">
        <q-td :props="props">
          <div class="text-weight-medium">
            {{ props.row.name || "(未命名 App)" }}
          </div>
          <div class="text-caption text-grey-7">{{ props.row.id }}</div>
        </q-td>
      </template>
      <template #body-cell-priority="props">
        <q-td :props="props">
          <q-badge
            :color="priorityColor(props.row.priority)"
            :label="props.row.priority || '未設定'"
          />
        </q-td>
      </template>
      <template #body-cell-purpose="props">
        <q-td :props="props"
          ><div class="purpose-cell">{{ props.row.purpose || "—" }}</div></q-td
        >
      </template>
      <template #body-cell-actions="props">
        <q-td :props="props" class="text-right">
          <q-btn
            flat
            round
            dense
            icon="edit"
            color="primary"
            @click="editApp(props.row)"
          >
            <q-tooltip>編輯</q-tooltip>
          </q-btn>
          <q-btn
            flat
            round
            dense
            icon="delete"
            color="negative"
            @click="confirmDelete(props.row)"
          >
            <q-tooltip>刪除</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="editorOpen" persistent>
      <q-card style="width: 680px; max-width: 95vw">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ isEditing ? "編輯 App" : "新增 App" }}</div>
          <q-space /><q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-gutter-md">
          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-input v-model="form.name" outlined dense label="App 名稱 *" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input v-model="form.vendor" outlined dense label="開發商" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input v-model="form.category" outlined dense label="分類" />
            </div>
            <div class="col-12 col-sm-6">
              <q-select
                v-model="form.priority"
                outlined
                dense
                label="安裝優先級"
                :options="priorityOptions"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.purpose"
                outlined
                dense
                type="textarea"
                autogrow
                label="用途"
              />
            </div>
            <div class="col-12">
              <q-input
                v-model="form.notes"
                outlined
                dense
                type="textarea"
                autogrow
                label="備註"
              />
            </div>
            <div class="col-12">
              <q-input v-model="form.url" outlined dense label="網址" />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="form.roleGroup"
                outlined
                dense
                label="角色群組"
              />
            </div>
            <div class="col-12 col-sm-6">
              <q-input
                v-model="roleIdsText"
                outlined
                dense
                label="角色 ID（以逗號分隔）"
              />
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="取消" v-close-popup />
          <q-btn
            color="primary"
            label="儲存到 Firebase"
            :disable="!form.name.trim()"
            @click="saveApp"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { db } from "boot/firebase_android";
import { ref as dbRef, onValue, get, set, remove } from "firebase/database";
import { useQuasar } from "quasar";

const $q = useQuasar();
// joey modify ----------
// Firebase Realtime Database 路徑：pc-software-config/software
const FIREBASE_PATH = "pc-software-config/iPad";

const apps = ref([]);
const loading = ref(false);
const search = ref("");
const categoryFilter = ref(null);
const priorityFilter = ref(null);
const fileInput = ref(null);
const editorOpen = ref(false);
const isEditing = ref(false);
const editingId = ref(null);
const roleIdsText = ref("role-general");
const pagination = ref({
  page: 1,
  rowsPerPage: 20,
  sortBy: "name",
  descending: false,
});

const blankApp = () => ({
  category: "一般工具",
  id: "",
  name: "",
  notes: "",
  priority: "選裝",
  purpose: "",
  roleGroup: "一般",
  roleIds: ["role-general"],
  url: "",
  vendor: "",
});
const form = ref(blankApp());
const priorityOptions = ["必裝", "選裝", "待確認", "淘汰／停用"];
const columns = [
  {
    name: "name",
    label: "App 名稱",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "category",
    label: "分類",
    field: "category",
    align: "left",
    sortable: true,
  },
  {
    name: "priority",
    label: "優先級",
    field: "priority",
    align: "left",
    sortable: true,
  },
  {
    name: "vendor",
    label: "開發商",
    field: "vendor",
    align: "left",
    sortable: true,
  },
  { name: "purpose", label: "用途", field: "purpose", align: "left" },
  { name: "actions", label: "操作", field: "actions", align: "right" },
];

function normalizeApp(raw, index = 0) {
  const item = raw && typeof raw === "object" ? raw : {};
  return {
    category: String(item.category || "一般工具"),
    id: String(item.id || `sw-local-${Date.now()}-${index}`),
    name: String(item.name || ""),
    notes: String(item.notes || ""),
    priority: String(item.priority || "待確認"),
    purpose: String(item.purpose || ""),
    roleGroup: String(item.roleGroup || "一般"),
    roleIds: Array.isArray(item.roleIds)
      ? item.roleIds.map(String)
      : ["role-general"],
    url: String(item.url || ""),
    vendor: String(item.vendor || ""),
  };
}

let unsubscribeApps = null;
function loadApps() {
  loading.value = true;
  if (unsubscribeApps) unsubscribeApps();
  unsubscribeApps = onValue(
    dbRef(db, FIREBASE_PATH),
    (snapshot) => {
      const data = snapshot.val() || {};
      apps.value = Object.entries(data)
        .map(([key, value]) =>
          normalizeApp({ ...(value || {}), id: value?.id || key })
        )
        .sort((a, b) => a.name.localeCompare(b.name, "zh-Hant"));
      loading.value = false;
    },
    (error) => {
      console.error(error);
      loading.value = false;
      $q.notify({
        type: "negative",
        message: `讀取 Firebase 失敗：${error.message}`,
      });
    }
  );
}

function openImport() {
  fileInput.value?.click();
}

// joey ------
async function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const records = Array.isArray(parsed)
      ? parsed
      : Array.isArray(parsed.apps)
      ? parsed.apps
      : null;
    if (!records) throw new Error("JSON 最外層必須是陣列，或包含 apps 陣列。");
    const clean = records.map((item, index) => normalizeApp(item, index));
    const ids = new Set();
    for (const item of clean) {
      if (ids.has(item.id)) throw new Error(`發現重複 ID：${item.id}`);
      ids.add(item.id);
    }
    $q.dialog({
      title: "匯入 Firebase",
      message: `檔案有 ${clean.length} 筆資料。合併會保留既有資料並以相同 ID 更新；取代會覆蓋 ${FIREBASE_PATH} 底下全部資料。`,
      cancel: true,
      persistent: true,
      options: {
        type: "radio",
        model: "merge",
        items: [
          { label: "合併／更新（建議）", value: "merge" },
          { label: "取代全部資料", value: "replace" },
        ],
      },
      ok: { label: "確認匯入", color: "primary" },
    }).onOk(async (value) => {
      try {
        const baseRef = dbRef(db, FIREBASE_PATH);
        let payload = {};
        if (value !== "replace") {
          const snapshot = await get(baseRef);
          payload = snapshot.val() || {};
        }
        for (const item of clean) payload[item.id] = item;
        await set(baseRef, payload);
        $q.notify({
          type: "positive",
          message: `已匯入 Firebase：${clean.length} 筆 App。`,
        });
      } catch (error) {
        console.error(error);
        $q.notify({
          type: "negative",
          message: `匯入 Firebase 失敗：${error.message}`,
        });
      }
    });
  } catch (error) {
    $q.notify({ type: "negative", message: "JSON 讀取失敗：" + error.message });
  } finally {
    event.target.value = "";
  }
}

const categories = computed(() =>
  [...new Set(apps.value.map((a) => a.category).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, "zh-Hant")
  )
);
const categoryOptions = computed(() =>
  categories.value.map((value) => ({ label: value, value }))
);
const filteredApps = computed(() => {
  const term = search.value.trim().toLocaleLowerCase();
  return apps.value.filter((app) => {
    const matchesSearch =
      !term ||
      [app.name, app.vendor, app.category, app.purpose, app.notes, app.id].some(
        (value) =>
          String(value || "")
            .toLocaleLowerCase()
            .includes(term)
      );
    return (
      matchesSearch &&
      (!categoryFilter.value || app.category === categoryFilter.value) &&
      (!priorityFilter.value || app.priority === priorityFilter.value)
    );
  });
});

function priorityColor(priority) {
  if (priority === "必裝") return "positive";
  if (priority === "淘汰／停用") return "negative";
  if (priority === "待確認") return "warning";
  return "grey-7";
}
function newApp() {
  isEditing.value = false;
  editingId.value = null;
  form.value = blankApp();
  roleIdsText.value = "role-general";
  editorOpen.value = true;
}
function editApp(app) {
  isEditing.value = true;
  editingId.value = app.id;
  form.value = { ...normalizeApp(app), roleIds: [...(app.roleIds || [])] };
  roleIdsText.value = form.value.roleIds.join(", ");
  editorOpen.value = true;
}
async function saveApp() {
  const item = normalizeApp({
    ...form.value,
    id: editingId.value || `sw-local-${Date.now()}`,
    roleIds: roleIdsText.value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
  });
  try {
    await set(dbRef(db, `${FIREBASE_PATH}/${item.id}`), item);
    editorOpen.value = false;
    $q.notify({ type: "positive", message: "已儲存到 Firebase。" });
  } catch (error) {
    $q.notify({ type: "negative", message: "儲存失敗：" + error.message });
  }
}
function confirmDelete(app) {
  $q.dialog({
    title: "刪除 App",
    message: `確定刪除「${app.name}」？此操作會刪除 Firebase 資料。`,
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await remove(dbRef(db, `${FIREBASE_PATH}/${app.id}`));
      $q.notify({ type: "positive", message: "已從 Firebase 刪除。" });
    } catch (error) {
      $q.notify({ type: "negative", message: "刪除失敗：" + error.message });
    }
  });
}
function exportJson() {
  const blob = new Blob([JSON.stringify(apps.value, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "google_play_apps_firebase.json";
  link.click();
  URL.revokeObjectURL(url);
}

onMounted(loadApps);
onUnmounted(() => {
  if (unsubscribeApps) unsubscribeApps();
});
</script>

<style scoped>
.app-table {
  width: 100%;
}
.purpose-cell {
  min-width: 180px;
  max-width: 360px;
  white-space: normal;
  overflow-wrap: anywhere;
}
@media (max-width: 600px) {
  .app-table :deep(th),
  .app-table :deep(td) {
    padding: 6px 8px;
  }
  .purpose-cell {
    min-width: 140px;
  }
}
</style>
