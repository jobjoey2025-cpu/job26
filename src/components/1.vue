<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mx-auto" style="max-width: 1180px">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h5 text-weight-bold">
            <q-icon name="event_note" color="primary" class="q-mr-sm" />
            每日工作紀錄
          </div>
          <div class="text-caption text-grey-7 q-mt-xs">
            Firebase Realtime Database：{{ FIREBASE_PATH }}
          </div>
        </div>

        <div class="row items-center q-gutter-sm">
          <q-badge
            :color="connected ? 'positive' : loading ? 'warning' : 'negative'"
            class="q-pa-sm"
          >
            {{ loading ? "讀取中" : connected ? "Firebase 已連線" : "尚未連線" }}
          </q-badge>
          <q-icon name="work_history" size="34px" color="primary" />
        </div>
      </div>

      <!-- Summary -->
      <div class="row q-col-gutter-sm q-mb-md">
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">今日紀錄</div>
              <div class="text-h5 text-weight-bold text-primary">
                {{ todayCount }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">工作總數</div>
              <div class="text-h5 text-weight-bold">{{ items.length }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">進行中</div>
              <div class="text-h5 text-weight-bold text-orange">
                {{ countByStatus("進行中") }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">已完成</div>
              <div class="text-h5 text-weight-bold text-positive">
                {{ countByStatus("已完成") }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Search and actions -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section class="q-pa-sm">
          <div class="row items-center q-col-gutter-sm">
            <div class="col-12 col-md">
              <q-input
                v-model="keyword"
                dense
                outlined
                clearable
                placeholder="搜尋工作標題、內容或專案..."
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6 col-md-3">
              <q-input
                v-model="selectedDate"
                dense
                outlined
                clearable
                type="date"
                label="指定日期"
                stack-label
              />
            </div>

            <div class="col-12 col-md-auto">
              <div class="row items-center q-gutter-xs">
                <q-btn
                  label="今天"
                  icon="today"
                  color="primary"
                  outline
                  @click="selectedDate = today"
                />
                <q-btn
                  label="新增紀錄"
                  icon="add"
                  color="primary"
                  unelevated
                  :disable="loading || saving"
                  @click="openAddDialog"
                />
                <q-btn
                  label="匯出 JSON"
                  icon="download"
                  color="secondary"
                  outline
                  :disable="!items.length"
                  @click="exportJson"
                />
                <q-file
                  v-model="importFile"
                  accept=".json,application/json"
                  dense
                  outlined
                  clearable
                  label="匯入 JSON"
                  style="width: 145px"
                  :disable="loading || saving"
                  @update:model-value="handleImportFile"
                >
                  <template #prepend>
                    <q-icon name="upload_file" />
                  </template>
                </q-file>
                <q-btn
                  flat
                  round
                  icon="sync"
                  color="primary"
                  :loading="loading"
                  :disable="saving"
                  @click="loadItems"
                >
                  <q-tooltip>重新讀取 Firebase</q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator />

        <!-- Category filter -->
        <q-tabs
          v-model="selectedCategory"
          align="left"
          dense
          inline-label
          outside-arrows
          mobile-arrows
          active-color="primary"
          indicator-color="primary"
          class="text-grey-8"
        >
          <q-tab name="all" label="全部分類" />
          <q-tab
            v-for="category in categories"
            :key="category"
            :name="category"
            :label="category"
          />
        </q-tabs>
      </q-card>

      <!-- List heading -->
      <div class="row items-center justify-between q-mb-sm">
        <div class="text-subtitle2 text-weight-medium">
          {{ selectedDate ? `${selectedDate} 工作紀錄` : selectedCategory === "all" ? "所有工作紀錄" : selectedCategory }}
        </div>
        <div class="text-caption text-grey-7">
          顯示 {{ filteredItems.length }} / {{ items.length }} 筆
        </div>
      </div>

      <q-banner
        v-if="!loading && !items.length"
        rounded
        class="bg-blue-1 text-blue-10 q-mb-md"
      >
        Firebase 目前沒有工作紀錄，請按「新增紀錄」建立第一筆資料。
      </q-banner>

      <q-banner
        v-else-if="!loading && !filteredItems.length"
        rounded
        class="bg-grey-3 text-grey-8 q-mb-md"
      >
        找不到符合條件的工作紀錄，請調整搜尋文字、日期或分類。
      </q-banner>

      <!-- Daily work record cards -->
      <div class="row q-col-gutter-md">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="col-12 col-sm-6 col-lg-4"
        >
          <q-card flat bordered class="fit column">
            <q-card-section class="q-pb-sm">
              <div class="row items-start no-wrap">
                <div class="col">
                  <div class="text-caption text-grey-7">
                    <q-icon name="calendar_today" class="q-mr-xs" />
                    {{ item.date || "未設定日期" }}
                  </div>
                  <div class="text-subtitle1 text-weight-bold q-mt-xs">
                    {{ item.title }}
                  </div>
                  <div class="row q-gutter-xs q-mt-sm">
                    <q-badge :color="categoryColor(item.category)">
                      {{ item.category || "未分類" }}
                    </q-badge>
                    <q-badge :color="statusColor(item.status)">
                      {{ item.status || "未設定狀態" }}
                    </q-badge>
                  </div>
                </div>

                <div class="row no-wrap">
                  <q-btn
                    flat
                    round
                    dense
                    size="sm"
                    icon="edit"
                    color="primary"
                    :disable="saving"
                    @click="openEditDialog(item)"
                  >
                    <q-tooltip>編輯紀錄</q-tooltip>
                  </q-btn>
                  <q-btn
                    flat
                    round
                    dense
                    size="sm"
                    icon="delete"
                    color="negative"
                    :disable="saving"
                    @click="deleteItem(item)"
                  >
                    <q-tooltip>刪除紀錄</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none col">
              <div v-if="item.project" class="text-caption text-grey-7 q-mb-sm">
                <q-icon name="folder_open" class="q-mr-xs" />
                {{ item.project }}
              </div>

              <div
                v-if="item.content"
                class="text-body2 text-grey-9"
                style="white-space: pre-wrap; overflow-wrap: anywhere"
              >
                {{ item.content }}
              </div>
              <div v-else class="text-caption text-grey-5">尚無工作內容</div>

              <!-- 多張工作照片 -->
              <div v-if="item.photos?.length" class="q-mt-md">
                <div class="text-caption text-grey-7 q-mb-sm">
                  <q-icon name="photo_library" class="q-mr-xs" />
                  工作照片（{{ item.photos.length }}）
                </div>
                <div class="row q-col-gutter-sm">
                  <div
                    v-for="(photo, index) in item.photos"
                    :key="`${item.id}-photo-${index}`"
                    class="col-4 col-sm-4"
                  >
                    <a
                      :href="photo"
                      target="_blank"
                      rel="noopener noreferrer"
                      :aria-label="`開啟工作照片 ${index + 1}`"
                      class="block"
                    >
                      <q-img
                        :src="photo"
                        :ratio="1"
                        fit="cover"
                        class="rounded-borders cursor-pointer"
                      >
                        <template #error>
                          <div class="absolute-full flex flex-center bg-grey-3 text-grey-7">
                            <q-icon name="broken_image" size="28px" />
                          </div>
                        </template>
                      </q-img>
                    </a>
                  </div>
                </div>
              </div>

              <div v-if="item.note" class="bg-grey-2 rounded-borders q-pa-sm q-mt-md">
                <div class="text-caption text-grey-7 q-mb-xs">
                  <q-icon name="sticky_note_2" class="q-mr-xs" />
                  備註
                </div>
                <div class="text-body2" style="white-space: pre-wrap">
                  {{ item.note }}
                </div>
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions align="between" class="text-caption text-grey-7">
              <span>
                <q-icon name="schedule" class="q-mr-xs" />
                {{ formatHours(item.hours) }}
              </span>
              <span>{{ item.id }}</span>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- Add / Edit dialog -->
      <q-dialog v-model="recordDialog">
        <q-card style="width: 100%; max-width: 640px">
          <q-card-section>
            <div class="text-h6">
              {{ editingItem ? "編輯工作紀錄" : "新增工作紀錄" }}
            </div>
            <div class="text-caption text-grey-7 q-mt-xs">
              儲存後會立即同步至 Firebase。
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-gutter-md">
            <q-input
              v-model.trim="form.title"
              label="工作標題"
              outlined
              autofocus
              maxlength="120"
              counter
              :rules="[(value) => !!value || '請輸入工作標題']"
            />

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-input
                  v-model="form.date"
                  label="工作日期"
                  type="date"
                  outlined
                  stack-label
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-input
                  v-model.number="form.hours"
                  label="花費工時（小時）"
                  type="number"
                  min="0"
                  step="0.5"
                  outlined
                />
              </div>
            </div>

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.category"
                  label="工作分類"
                  outlined
                  emit-value
                  map-options
                  :options="categoryOptions"
                />
              </div>
              <div class="col-12 col-sm-6">
                <q-select
                  v-model="form.status"
                  label="工作狀態"
                  outlined
                  emit-value
                  map-options
                  :options="statusOptions"
                />
              </div>
            </div>

            <q-input
              v-model.trim="form.project"
              label="專案名稱（選填）"
              outlined
              maxlength="120"
              clearable
            >
              <template #prepend>
                <q-icon name="folder_open" />
              </template>
            </q-input>

            <q-input
              v-model="form.content"
              label="工作內容"
              type="textarea"
              autogrow
              outlined
              maxlength="3000"
              counter
              placeholder="記錄今天完成的事項、處理過程、技術細節或遇到的問題..."
            />

            <!-- 每張照片各自一個網址輸入框 -->
            <div>
              <div class="row items-center justify-between q-mb-sm">
                <div class="text-subtitle2">
                  <q-icon name="photo_library" class="q-mr-xs" />
                  工作照片網址
                </div>
                <q-btn
                  dense
                  outline
                  color="primary"
                  icon="add"
                  label="新增照片"
                  @click="addPhotoInput"
                />
              </div>

              <div
                v-for="(photo, index) in form.photos"
                :key="`photo-input-${index}`"
                class="row items-center q-col-gutter-sm q-mb-sm"
              >
                <div class="col">
                  <q-input
                    v-model.trim="form.photos[index]"
                    dense
                    outlined
                    clearable
                    :label="`照片 ${index + 1} 網址`"
                    placeholder="https://example.com/photo.jpg"
                    :hint="index === 0 ? '每張照片輸入一個 http / https 網址' : undefined"
                  />
                </div>
                <div class="col-auto">
                  <q-btn
                    flat
                    round
                    dense
                    color="negative"
                    icon="delete"
                    :disable="form.photos.length === 1"
                    @click="removePhotoInput(index)"
                  >
                    <q-tooltip>移除此照片欄位</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </div>

            <div v-if="photoLinksPreview.length" class="row q-col-gutter-sm">
              <div
                v-for="(photo, index) in photoLinksPreview"
                :key="`preview-${index}`"
                class="col-4"
              >
                <q-img :src="photo" :ratio="1" fit="cover" class="rounded-borders" />
              </div>
            </div>

            <q-input
              v-model="form.note"
              label="備註 / 待辦事項"
              type="textarea"
              autogrow
              outlined
              maxlength="1000"
              counter
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="取消" color="grey-7" v-close-popup />
            <q-btn
              unelevated
              label="儲存並同步"
              color="primary"
              :loading="saving"
              :disable="!form.title.trim() || saving"
              @click="saveItem"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { db } from "boot/firebase_job2026";
import {
  ref as dbRef,
  onValue,
  set,
  remove,
} from "firebase/database";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Firebase Realtime Database 路徑
// 請確認此路徑符合你的 Firebase 資料庫規劃。
const FIREBASE_PATH = "pc-software-config/daily_work_records";

const categories = ["開發", "會議", "維護", "研究", "其他"];
const statuses = ["待處理", "進行中", "已完成", "暫停"];

const categoryOptions = categories.map((value) => ({
  label: value,
  value,
}));

const statusOptions = statuses.map((value) => ({
  label: value,
  value,
}));

const items = ref([]);
const loading = ref(false);
const saving = ref(false);
const connected = ref(false);

const keyword = ref("");
const selectedCategory = ref("all");
const selectedDate = ref("");
const recordDialog = ref(false);
const editingItem = ref(null);
const importFile = ref(null);

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const today = getLocalDateString();

const emptyForm = () => ({
  title: "",
  date: getLocalDateString(),
  category: categories[0],
  status: "進行中",
  project: "",
  content: "",
  photos: [""],
  note: "",
  hours: 0,
});

const form = ref(emptyForm());

function parsePhotoLinks(value) {
  const lines = Array.isArray(value)
    ? value
    : String(value || "").split(/[\\n,;]+/);

  return [...new Set(
    lines.map((url) => String(url).trim()).filter((url) => {
      try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
      } catch {
        return false;
      }
    })
  )];
}

const photoLinksPreview = computed(() => parsePhotoLinks(form.value.photos));

function addPhotoInput() {
  form.value.photos.push("");
}

function removePhotoInput(index) {
  if (form.value.photos.length > 1) {
    form.value.photos.splice(index, 1);
  }
}

const todayCount = computed(() =>
  items.value.filter((item) => item.date === today).length
);

const filteredItems = computed(() => {
  const search = keyword.value.trim().toLocaleLowerCase();

  return items.value
    .filter((item) => {
      const categoryMatched =
        selectedCategory.value === "all" ||
        item.category === selectedCategory.value;

      const dateMatched =
        !selectedDate.value || item.date === selectedDate.value;

      const searchMatched =
        !search ||
        [
          item.title,
          item.project,
          item.category,
          item.status,
          item.content,
          item.note,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(search);

      return categoryMatched && dateMatched && searchMatched;
    })
    .sort((a, b) => {
      const dateCompare = String(b.date || "").localeCompare(String(a.date || ""));
      if (dateCompare !== 0) return dateCompare;
      return Number(b.updatedAt || b.createdAt || 0) -
        Number(a.updatedAt || a.createdAt || 0);
    });
});

let unsubscribeItems = null;

function normalizeItem(raw, key) {
  return {
    id: String(raw?.id || key || ""),
    title: String(raw?.title ?? ""),
    date: String(raw?.date ?? ""),
    category: String(raw?.category ?? ""),
    status: String(raw?.status ?? "待處理"),
    project: String(raw?.project ?? ""),
    content: String(raw?.content ?? ""),
    photos: parsePhotoLinks(raw?.photos ?? raw?.photoUrls ?? raw?.photoLinks ?? []),
    note: String(raw?.note ?? ""),
    hours: Math.max(0, Number(raw?.hours) || 0),
    createdAt: Number(raw?.createdAt) || 0,
    updatedAt: Number(raw?.updatedAt) || 0,
  };
}

function categoryColor(category) {
  const colors = {
    開發: "indigo",
    會議: "blue",
    維護: "teal",
    研究: "deep-purple",
    其他: "grey-7",
  };
  return colors[category] || "grey";
}

function statusColor(status) {
  const colors = {
    待處理: "grey-7",
    進行中: "orange",
    已完成: "positive",
    暫停: "deep-orange",
  };
  return colors[status] || "grey";
}

function countByStatus(status) {
  return items.value.filter((item) => item.status === status).length;
}

function formatHours(hours) {
  const value = Number(hours) || 0;
  return `${value} 小時`;
}

function loadItems() {
  loading.value = true;
  connected.value = false;

  if (unsubscribeItems) {
    unsubscribeItems();
    unsubscribeItems = null;
  }

  unsubscribeItems = onValue(
    dbRef(db, FIREBASE_PATH),
    (snapshot) => {
      try {
        const data = snapshot.val();

        if (!data) {
          items.value = [];
        } else {
          const entries = Array.isArray(data)
            ? data.map((value, index) => [String(index), value])
            : Object.entries(data);

          items.value = entries
            .map(([key, value]) => normalizeItem(value, key))
            .filter((item) => item.title)
            .sort((a, b) => String(b.date).localeCompare(String(a.date)));
        }

        connected.value = true;
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = false;
        connected.value = false;
        $q.notify({
          type: "negative",
          message: `讀取工作紀錄失敗：${error.message}`,
        });
      }
    },
    (error) => {
      console.error(error);
      loading.value = false;
      connected.value = false;
      $q.notify({
        type: "negative",
        message: `Firebase 連線失敗：${error.message}`,
      });
    }
  );
}

function openAddDialog() {
  editingItem.value = null;
  form.value = emptyForm();
  recordDialog.value = true;
}

function openEditDialog(item) {
  editingItem.value = item;
  form.value = {
    title: item.title,
    date: item.date || getLocalDateString(),
    category: item.category || categories[0],
    status: item.status || "待處理",
    project: item.project,
    content: item.content,
    photos: item.photos?.length ? [...item.photos] : [""],
    note: item.note,
    hours: item.hours,
  };
  recordDialog.value = true;
}

async function saveItem() {
  const title = form.value.title.trim();
  if (!title || saving.value) return;

  const isEditing = Boolean(editingItem.value);
  const id = isEditing
    ? editingItem.value.id
    : `work-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const now = Date.now();
  const itemData = {
    id,
    title,
    date: form.value.date || getLocalDateString(),
    category: form.value.category || "其他",
    status: form.value.status || "待處理",
    project: form.value.project.trim(),
    content: form.value.content.trim(),
    photos: parsePhotoLinks(form.value.photos),
    note: form.value.note.trim(),
    hours: Math.max(0, Number(form.value.hours) || 0),
    createdAt: isEditing
      ? Number(editingItem.value.createdAt) || now
      : now,
    updatedAt: now,
  };

  saving.value = true;
  try {
    await set(dbRef(db, `${FIREBASE_PATH}/${id}`), itemData);
    recordDialog.value = false;
    $q.notify({
      type: "positive",
      message: isEditing
        ? "工作紀錄已更新並同步 Firebase。"
        : "工作紀錄已新增並同步 Firebase。",
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: `儲存工作紀錄失敗：${error.message}`,
    });
  } finally {
    saving.value = false;
  }
}

function deleteItem(item) {
  $q.dialog({
    title: "確認刪除工作紀錄",
    message: `確定要刪除「${item.title}」嗎？此操作會同步刪除 Firebase 資料。`,
    cancel: {
      label: "取消",
      flat: true,
    },
    ok: {
      label: "刪除",
      color: "negative",
      unelevated: true,
    },
    persistent: true,
  }).onOk(async () => {
    if (saving.value) return;

    saving.value = true;
    try {
      await remove(dbRef(db, `${FIREBASE_PATH}/${item.id}`));
      $q.notify({
        type: "positive",
        message: `已刪除「${item.title}」並同步 Firebase。`,
      });
    } catch (error) {
      console.error(error);
      $q.notify({
        type: "negative",
        message: `刪除工作紀錄失敗：${error.message}`,
      });
    } finally {
      saving.value = false;
    }
  });
}

async function handleImportFile(file) {
  if (!file) return;

  try {
    const parsed = JSON.parse(await file.text());
    if (!Array.isArray(parsed)) {
      throw new Error("JSON 最外層格式必須是陣列。");
    }

    const payload = {};
    parsed.forEach((raw, index) => {
      const item = normalizeItem(raw, `work-import-${index + 1}`);
      if (!item.title) return;

      let id = item.id || `work-import-${index + 1}`;
      if (payload[id]) id = `${id}-${index + 1}`;

      payload[id] = {
        ...item,
        id,
        date: item.date || getLocalDateString(),
        category: item.category || "其他",
        status: item.status || "待處理",
        updatedAt: Date.now(),
      };
    });

    if (!Object.keys(payload).length) {
      throw new Error("JSON 中沒有可匯入的工作紀錄。");
    }

    $q.dialog({
      title: "確認匯入 JSON",
      message: `即將匯入 ${Object.keys(payload).length} 筆工作紀錄，並完整覆蓋 Firebase 路徑「${FIREBASE_PATH}」目前的內容。建議先匯出備份。`,
      cancel: {
        label: "取消",
        flat: true,
      },
      ok: {
        label: "確認覆蓋並同步",
        color: "negative",
        unelevated: true,
      },
      persistent: true,
    })
      .onOk(async () => {
        if (saving.value) return;

        saving.value = true;
        try {
          await set(dbRef(db, FIREBASE_PATH), payload);
          $q.notify({
            type: "positive",
            message: `已匯入 ${Object.keys(payload).length} 筆工作紀錄並同步 Firebase。`,
          });
        } catch (error) {
          console.error(error);
          $q.notify({
            type: "negative",
            message: `匯入 Firebase 失敗：${error.message}`,
          });
        } finally {
          saving.value = false;
          importFile.value = null;
        }
      })
      .onCancel(() => {
        importFile.value = null;
      });
  } catch (error) {
    console.error(error);
    importFile.value = null;
    $q.notify({
      type: "negative",
      message: `JSON 讀取失敗：${error.message}`,
    });
  }
}

function exportJson() {
  const exportData = items.value.map((item) => ({
    id: item.id,
    title: item.title,
    date: item.date,
    category: item.category,
    status: item.status,
    project: item.project,
    content: item.content,
    photos: item.photos || [],
    note: item.note,
    hours: item.hours,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  const blob = new Blob(
    [JSON.stringify(exportData, null, 2)],
    { type: "application/json;charset=utf-8" }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "daily-work-records.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  $q.notify({
    type: "positive",
    message: `已匯出 ${exportData.length} 筆工作紀錄。`,
  });
}

onMounted(loadItems);

onUnmounted(() => {
  if (unsubscribeItems) unsubscribeItems();
});
</script>
