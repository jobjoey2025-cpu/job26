<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mx-auto" style="max-width: 1180px">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h5 text-weight-bold">
            <q-icon name="headphones" color="primary" class="q-mr-sm" />
            耳機設備管理
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
          <q-icon name="settings_voice" size="34px" color="primary" />
        </div>
      </div>

      <!-- Summary -->
      <div class="row q-col-gutter-sm q-mb-md">
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">設備總數</div>
              <div class="text-h5 text-weight-bold text-primary">
                {{ items.length }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">內容軟體</div>
              <div class="text-h5 text-weight-bold">
                {{ countByCategory("1內容軟體") }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">主力手機</div>
              <div class="text-h5 text-weight-bold">
                {{ countByCategory("2主力手機") }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-6 col-sm-3">
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <div class="text-caption text-grey-7">未來急買</div>
              <div class="text-h5 text-weight-bold">
                {{ countByCategory("5未來急買") }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Actions -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section class="q-pa-sm">
          <div class="row items-center q-col-gutter-sm">
            <div class="col-12 col-sm">
              <q-input
                v-model="keyword"
                dense
                outlined
                clearable
                placeholder="搜尋設備名稱、描述或分類..."
              >
                <template #prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-auto">
              <div class="row items-center q-gutter-xs">
                <q-btn
                  label="新增設備"
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
                  style="width: 150px"
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

        <!-- Category Filter -->
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
          <q-tab name="all" label="全部設備" />
          <q-tab
            v-for="category in categories"
            :key="category"
            :name="category"
            :label="category"
          />
        </q-tabs>
      </q-card>

      <div class="row items-center justify-between q-mb-sm">
        <div class="text-subtitle2 text-weight-medium">
          {{ selectedCategory === "all" ? "所有設備" : selectedCategory }}
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
        Firebase 目前沒有設備資料。系統會在首次連線時自動初始化 voice.json 的 17 筆資料。
      </q-banner>

      <q-banner
        v-else-if="!loading && !filteredItems.length"
        rounded
        class="bg-grey-3 text-grey-8 q-mb-md"
      >
        找不到符合條件的設備，請更換搜尋文字或分類。
      </q-banner>

      <!-- Equipment Cards -->
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
                  <div class="text-subtitle1 text-weight-bold">
                    {{ item.name }}
                  </div>
                  <q-badge
                    :color="categoryColor(item.category)"
                    class="q-mt-xs"
                  >
                    {{ item.category || "未分類" }}
                  </q-badge>
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
                    <q-tooltip>編輯設備</q-tooltip>
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
                    <q-tooltip>刪除設備</q-tooltip>
                  </q-btn>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none col">
              <div
                v-if="item.description"
                class="text-body2 text-grey-8"
                style="white-space: pre-wrap"
              >
                {{ item.description }}
              </div>
              <div v-else class="text-caption text-grey-5">尚無描述</div>

              <div
                v-if="item.photoLink1 || item.photoLink2"
                class="row q-col-gutter-sm q-mt-sm"
              >
                <div v-if="item.photoLink1" class="col-6">
                  <q-img
                    :src="item.photoLink1"
                    :ratio="4 / 3"
                    fit="contain"
                    class="rounded-borders bg-grey-2 cursor-pointer"
                    @click="openPhoto(item.photoLink1)"
                  >
                    <div class="absolute-bottom text-caption text-center q-pa-xs">
                      圖片 1
                    </div>
                  </q-img>
                </div>
                <div v-if="item.photoLink2" class="col-6">
                  <q-img
                    :src="item.photoLink2"
                    :ratio="4 / 3"
                    fit="contain"
                    class="rounded-borders bg-grey-2 cursor-pointer"
                    @click="openPhoto(item.photoLink2)"
                  >
                    <div class="absolute-bottom text-caption text-center q-pa-xs">
                      圖片 2
                    </div>
                  </q-img>
                </div>
              </div>
            </q-card-section>

            <q-separator />
            <q-card-actions align="between" class="text-caption text-grey-6">
              <span>{{ item.id }}</span>
              <span v-if="item.photoLink1 || item.photoLink2">
                <q-icon name="image" class="q-mr-xs" />
                {{ Number(Boolean(item.photoLink1)) + Number(Boolean(item.photoLink2)) }} 張圖片
              </span>
              <span v-else>無圖片</span>
            </q-card-actions>
          </q-card>
        </div>
      </div>

      <!-- Add / Edit Dialog -->
      <q-dialog v-model="itemDialog">
        <q-card style="width: 100%; max-width: 620px">
          <q-card-section>
            <div class="text-h6">
              {{ editingItem ? "編輯設備" : "新增設備" }}
            </div>
            <div class="text-caption text-grey-7">
              儲存後會立即同步至 Firebase。
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-gutter-md">
            <q-input
              v-model.trim="form.name"
              label="設備名稱"
              outlined
              autofocus
              maxlength="120"
              counter
              :rules="[(value) => !!value || '請輸入設備名稱']"
            />

            <q-select
              v-model="form.category"
              label="設備分類"
              outlined
              emit-value
              map-options
              :options="categoryOptions"
            />

            <q-input
              v-model="form.description"
              label="描述 / 備註"
              type="textarea"
              autogrow
              outlined
              maxlength="1000"
              counter
            />

            <q-input
              v-model.trim="form.photoLink1"
              label="圖片連結 1"
              type="url"
              outlined
              clearable
            >
              <template #prepend><q-icon name="image" /></template>
            </q-input>

            <q-img
              v-if="isValidHttpUrl(form.photoLink1)"
              :src="form.photoLink1"
              :ratio="16 / 9"
              fit="contain"
              class="rounded-borders bg-grey-2"
              style="max-height: 150px"
            />

            <q-input
              v-model.trim="form.photoLink2"
              label="圖片連結 2"
              type="url"
              outlined
              clearable
            >
              <template #prepend><q-icon name="image" /></template>
            </q-input>

            <q-img
              v-if="isValidHttpUrl(form.photoLink2)"
              :src="form.photoLink2"
              :ratio="16 / 9"
              fit="contain"
              class="rounded-borders bg-grey-2"
              style="max-height: 150px"
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
              :disable="!form.name.trim() || saving"
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
import { db } from "boot/firebase_android";
import {
  ref as dbRef,
  onValue,
  set,
  update,
  remove,
} from "firebase/database";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Firebase Realtime Database 路徑
const FIREBASE_PATH = "pc-software-config/voice_equipment";

// voice.json 原始 17 筆資料。
// Firebase 使用以 id 為 key 的物件結構，避免直接使用陣列造成索引問題。
const defaultVoiceItems = [
  {
    id: "voice-001",
    name: "YT Continue，English Ad",
    category: "1內容軟體",
    description: "joey 英文童書看不下去，Ad Tiffany可以聽，",
    photoLink1: "https://lh3.googleusercontent.com/d/1-0yFCwYzAjtcQtGxfYMd7I84uBkENih6=w1200",
    photoLink2: "https://lh3.googleusercontent.com/d/19K9tZQnq0pf1U9n-1VLdPQLppkJzTsx9=w1200",
  },
  {
    id: "voice-002",
    name: "Podcast 猿，Spotify",
    category: "1內容軟體",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-003",
    name: "TV everyday + 強中音",
    category: "1內容軟體",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-004",
    name: "HTC 2 支 + 3.5 2 type C",
    category: "2主力手機",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-005",
    name: "@ 藍牙 adapter 耳機",
    category: "2主力手機",
    description: "NB 藍牙 Link - 靠 Table 逐筆想 才找到的",
    photoLink1: "https://lh3.googleusercontent.com/d/1l7KSOPzOJmdvM8szslA5I6IL0hd24W2N=w1200",
    photoLink2: "https://lh3.googleusercontent.com/d/1FkZpHrcEPEXw13oVl5AZD8byY36QKtEt=w1200",
  },
  {
    id: "voice-006",
    name: "Sony 藍牙全罩 好看",
    category: "2主力手機",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-007",
    name: "鐵三 抗噪 不見了",
    category: "2主力手機",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-008",
    name: "小愛同學 藍牙",
    category: "3眼痛大字體",
    description: "add iPad YT continue&",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-009",
    name: "iPad 也換大字體",
    category: "3眼痛大字體",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-010",
    name: "Google 喇叭 - 發音不好",
    category: "3眼痛大字體",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-011",
    name: "Brother 藍牙拉叭 - BK 幾乎不用",
    category: "4備用廢料",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-012",
    name: "擴大機 ×3 少用",
    category: "4備用廢料",
    description: "留著拆零件",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-013",
    name: "頸掛藍牙 $1k 抗噪",
    category: "5未來急買",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-014",
    name: "藍牙 錄音，音訊轉字的成功率",
    category: "5未來急買",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-015",
    name: "藍牙抗噪 $3k 小米",
    category: "5未來急買",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-016",
    name: "AR 眼鏡 $20k - 近遠視 issue",
    category: "5未來急買",
    description: "",
    photoLink1: "",
    photoLink2: "",
  },
  {
    id: "voice-017",
    name: "急買 小北 24hrs",
    category: "5未來急買",
    description: "nova \\ 蝦皮 小米 \\ 有些管道 臨時想不起來",
    photoLink1: "",
    photoLink2: "",
  },
];

const categories = [
  "1內容軟體",
  "2主力手機",
  "3眼痛大字體",
  "4備用廢料",
  "5未來急買",
];

const categoryOptions = categories.map((category) => ({
  label: category,
  value: category,
}));

const items = ref([]);
const loading = ref(false);
const saving = ref(false);
const connected = ref(false);

const keyword = ref("");
const selectedCategory = ref("all");
const itemDialog = ref(false);
const editingItem = ref(null);
const importFile = ref(null);

const emptyForm = () => ({
  name: "",
  category: categories[0],
  description: "",
  photoLink1: "",
  photoLink2: "",
});
const form = ref(emptyForm());

const filteredItems = computed(() => {
  const search = keyword.value.trim().toLocaleLowerCase();

  return items.value.filter((item) => {
    const categoryMatched =
      selectedCategory.value === "all" ||
      item.category === selectedCategory.value;

    const searchMatched =
      !search ||
      [item.name, item.category, item.description]
        .join(" ")
        .toLocaleLowerCase()
        .includes(search);

    return categoryMatched && searchMatched;
  });
});

let unsubscribeItems = null;

function voiceId(index) {
  return `voice-${String(index + 1).padStart(3, "0")}`;
}

function normalizeItem(raw, key, index = 0) {
  const fallbackId = /^\d+$/.test(String(key))
    ? voiceId(Number(key))
    : String(key || voiceId(index));

  return {
    id: String(raw?.id || fallbackId),
    name: String(raw?.name ?? ""),
    category: String(raw?.category ?? ""),
    description: String(raw?.description ?? ""),
    photoLink1: String(raw?.photoLink1 ?? ""),
    photoLink2: String(raw?.photoLink2 ?? ""),
  };
}

function categoryColor(category) {
  const colors = {
    "1內容軟體": "indigo",
    "2主力手機": "blue",
    "3眼痛大字體": "teal",
    "4備用廢料": "grey-7",
    "5未來急買": "deep-orange",
  };
  return colors[category] || "grey";
}

function countByCategory(category) {
  return items.value.filter((item) => item.category === category).length;
}

function isValidHttpUrl(value) {
  if (!value) return false;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function openPhoto(url) {
  if (isValidHttpUrl(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

async function initializeDefaultItems() {
  const payload = {};
  defaultVoiceItems.forEach((item) => {
    payload[item.id] = item;
  });
  await set(dbRef(db, FIREBASE_PATH), payload);
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
    async (snapshot) => {
      try {
        const data = snapshot.val();

        // Firebase 路徑第一次為空時，自動匯入 voice.json 的預設資料。
        if (!data) {
          await initializeDefaultItems();
          return;
        }

        const entries = Array.isArray(data)
          ? data.map((value, index) => [String(index), value])
          : Object.entries(data);

        items.value = entries
          .map(([key, value], index) => normalizeItem(value, key, index))
          .filter((item) => item.name)
          .sort((a, b) => a.id.localeCompare(b.id));

        connected.value = true;
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = false;
        connected.value = false;
        $q.notify({
          type: "negative",
          message: `初始化設備資料失敗：${error.message}`,
        });
      }
    },
    (error) => {
      console.error(error);
      loading.value = false;
      connected.value = false;
      $q.notify({
        type: "negative",
        message: `讀取 Firebase 失敗：${error.message}`,
      });
    }
  );
}

function openAddDialog() {
  editingItem.value = null;
  form.value = emptyForm();
  itemDialog.value = true;
}

function openEditDialog(item) {
  editingItem.value = item;
  form.value = {
    name: item.name,
    category: item.category || categories[0],
    description: item.description,
    photoLink1: item.photoLink1,
    photoLink2: item.photoLink2,
  };
  itemDialog.value = true;
}

async function saveItem() {
  const name = form.value.name.trim();
  if (!name || saving.value) return;

  const isEditing = Boolean(editingItem.value);
  const id = isEditing
    ? editingItem.value.id
    : `voice-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  const itemData = {
    id,
    name,
    category: form.value.category || "",
    description: form.value.description.trim(),
    photoLink1: form.value.photoLink1.trim(),
    photoLink2: form.value.photoLink2.trim(),
  };

  saving.value = true;
  try {
    await set(dbRef(db, `${FIREBASE_PATH}/${id}`), itemData);
    itemDialog.value = false;
    $q.notify({
      type: "positive",
      message: isEditing
        ? "設備已更新並同步 Firebase。"
        : "設備已新增並同步 Firebase。",
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: `儲存設備失敗：${error.message}`,
    });
  } finally {
    saving.value = false;
  }
}

function deleteItem(item) {
  $q.dialog({
    title: "確認刪除設備",
    message: `確定要刪除「${item.name}」嗎？此操作會同步刪除 Firebase 資料。`,
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
        message: `已刪除「${item.name}」並同步 Firebase。`,
      });
    } catch (error) {
      console.error(error);
      $q.notify({
        type: "negative",
        message: `刪除設備失敗：${error.message}`,
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
      const item = normalizeItem(raw, voiceId(index), index);
      if (!item.name) return;
      // 避免匯入檔中的重複 id 覆蓋彼此。
      let id = item.id;
      if (payload[id]) id = `${id}-${index + 1}`;
      payload[id] = { ...item, id };
    });

    if (!Object.keys(payload).length) {
      throw new Error("JSON 中沒有可匯入的設備資料。");
    }

    $q.dialog({
      title: "確認匯入 JSON",
      message: `即將匯入 ${Object.keys(payload).length} 筆設備資料，並完整覆蓋 Firebase 路徑「${FIREBASE_PATH}」目前的內容。建議先匯出備份。`,
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
    }).onOk(async () => {
      if (saving.value) return;

      saving.value = true;
      try {
        await set(dbRef(db, FIREBASE_PATH), payload);
        $q.notify({
          type: "positive",
          message: `已匯入 ${Object.keys(payload).length} 筆設備並同步 Firebase。`,
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
    }).onCancel(() => {
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
    name: item.name,
    category: item.category,
    description: item.description,
    photoLink1: item.photoLink1,
    photoLink2: item.photoLink2,
  }));

  const blob = new Blob(
    [JSON.stringify(exportData, null, 2)],
    { type: "application/json;charset=utf-8" }
  );
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "voice.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  $q.notify({
    type: "positive",
    message: `已匯出 ${exportData.length} 筆設備資料。`,
  });
}

onMounted(loadItems);

onUnmounted(() => {
  if (unsubscribeItems) unsubscribeItems();
});
</script>
