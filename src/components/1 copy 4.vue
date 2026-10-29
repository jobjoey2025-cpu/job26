<template>
  <q-page class="q-pa-md voice-page">
    <div class="page-shell">
      <div class="row items-center justify-between q-col-gutter-md q-mb-lg">
        <div class="col">
          <div class="text-h5 text-weight-bold">語音指令管理</div>
          <div class="text-body2 text-grey-7 q-mt-xs">
            管理指令分類、語音別名與辨識測試
          </div>
        </div>
        <div class="col-auto row q-gutter-sm">
          <q-btn
            outline
            color="primary"
            icon="refresh"
            label="讀取 Firebase"
            :loading="firebaseLoading"
            @click="loadFirebaseData"
          />
          <q-btn
            color="positive"
            icon="cloud_upload"
            label="儲存 Firebase"
            :loading="firebaseSaving"
            @click="saveFirebaseData"
          />
          <q-btn
            outline
            color="primary"
            icon="upload_file"
            label="匯入 JSON"
            @click="triggerImport"
          />
          <q-btn
            color="primary"
            icon="download"
            label="匯出 JSON"
            @click="exportJson"
          />
          <input
            ref="fileInput"
            type="file"
            accept=".json,application/json"
            class="hidden"
            @change="importJson"
          />
        </div>
      </div>

      <q-banner
        v-if="firebaseMessage"
        rounded
        class="q-mb-md"
        :class="
          firebaseError ? 'bg-red-1 text-negative' : 'bg-blue-1 text-primary'
        "
      >
        <template #avatar>
          <q-icon :name="firebaseError ? 'error' : 'cloud_done'" />
        </template>
        {{ firebaseMessage }}
      </q-banner>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="stat-card">
            <q-card-section class="row items-center no-wrap">
              <q-avatar
                color="blue-1"
                text-color="primary"
                icon="record_voice_over"
                size="48px"
              />
              <div class="q-ml-md">
                <div class="text-caption text-grey-7">指令總數</div>
                <div class="text-h5 text-weight-bold">
                  {{ commands.length }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="stat-card">
            <q-card-section class="row items-center no-wrap">
              <q-avatar
                color="green-1"
                text-color="positive"
                icon="category"
                size="48px"
              />
              <div class="q-ml-md">
                <div class="text-caption text-grey-7">分類數</div>
                <div class="text-h5 text-weight-bold">
                  {{ categories.length }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-4">
          <q-card flat bordered class="stat-card">
            <q-card-section class="row items-center no-wrap">
              <q-avatar
                color="orange-1"
                text-color="orange-9"
                icon="verified"
                size="48px"
              />
              <div class="q-ml-md">
                <div class="text-caption text-grey-7">已驗證指令</div>
                <div class="text-h5 text-weight-bold">
                  {{ commands.filter((c) => c.verified).length }}
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-card flat bordered class="q-mb-lg">
        <q-card-section class="row items-center q-col-gutter-md">
          <div class="col-12 col-md-5">
            <q-input
              v-model="search"
              dense
              outlined
              clearable
              label="搜尋指令"
              placeholder="名稱、中文指令、英文指令、用途"
            >
              <template #prepend><q-icon name="search" /></template>
            </q-input>
          </div>
          <div class="col-12 col-md-4">
            <q-select
              v-model="categoryFilter"
              dense
              outlined
              emit-value
              map-options
              clearable
              label="依分類篩選"
              :options="categoryOptions"
            />
          </div>
          <div class="col-12 col-md-3">
            <q-btn
              class="full-width"
              color="primary"
              icon="add"
              label="新增指令"
              @click="openCreate"
            />
          </div>
        </q-card-section>
      </q-card>

      <div class="row q-col-gutter-lg">
        <div class="col-12 col-lg-7">
          <div class="text-subtitle1 text-weight-bold q-mb-sm">指令清單</div>
          <q-card v-if="filteredCommands.length === 0" flat bordered>
            <q-card-section class="text-grey-7 text-center q-pa-xl"
              >找不到符合條件的指令</q-card-section
            >
          </q-card>
          <q-card
            v-for="command in filteredCommands"
            :key="command.id"
            flat
            bordered
            class="command-card q-mb-sm"
          >
            <q-card-section>
              <div class="row items-start no-wrap">
                <q-avatar
                  :icon="
                    categoryById(command.categoryId)?.icon ||
                    'record_voice_over'
                  "
                  color="grey-2"
                  text-color="primary"
                  size="42px"
                />
                <div class="col q-ml-md">
                  <div class="row items-center q-gutter-sm">
                    <div class="text-subtitle1 text-weight-bold">
                      {{ command.name }}
                    </div>
                    <q-badge
                      :color="command.verified ? 'positive' : 'grey'"
                      :label="command.verified ? '已驗證' : '未驗證'"
                    />
                  </div>
                  <div class="text-caption text-grey-7">
                    {{ categoryById(command.categoryId)?.name || "未分類" }} ·
                    {{ command.id }}
                  </div>
                  <div class="q-mt-sm">
                    <span class="text-grey-7">中文：</span
                    >{{ command.commandZh || "—" }}
                  </div>
                  <div class="text-body2">
                    <span class="text-grey-7">English：</span
                    >{{ command.commandEn || "—" }}
                  </div>
                  <div class="text-body2 text-grey-8 q-mt-xs">
                    {{ command.purpose || "尚未填寫用途" }}
                  </div>
                </div>
                <q-btn flat round dense icon="more_vert" aria-label="指令操作">
                  <q-menu>
                    <q-list dense style="min-width: 150px">
                      <q-item
                        clickable
                        v-close-popup
                        @click="selectForAliases(command)"
                        ><q-item-section avatar
                          ><q-icon name="record_voice_over" /></q-item-section
                        ><q-item-section>管理語音別名</q-item-section></q-item
                      >
                      <q-item clickable v-close-popup @click="openEdit(command)"
                        ><q-item-section avatar
                          ><q-icon name="edit" /></q-item-section
                        ><q-item-section>編輯指令</q-item-section></q-item
                      >
                      <q-item
                        clickable
                        v-close-popup
                        @click="toggleVerified(command)"
                        ><q-item-section avatar
                          ><q-icon name="verified" /></q-item-section
                        ><q-item-section>{{
                          command.verified ? "標記未驗證" : "標記已驗證"
                        }}</q-item-section></q-item
                      >
                      <q-separator />
                      <q-item
                        clickable
                        v-close-popup
                        class="text-negative"
                        @click="confirmDelete(command)"
                        ><q-item-section avatar
                          ><q-icon name="delete" /></q-item-section
                        ><q-item-section>刪除指令</q-item-section></q-item
                      >
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-lg-5">
          <q-card flat bordered class="q-mb-md">
            <q-card-section>
              <div class="row items-center justify-between">
                <div class="text-subtitle1 text-weight-bold">語音別名管理</div>
                <q-chip
                  v-if="identifyTarget"
                  color="blue-1"
                  text-color="primary"
                  dense
                  >{{ identifyTarget.name }}</q-chip
                >
              </div>
              <div class="text-caption text-grey-7 q-mt-xs">
                每個指令可設定多種口語說法；匯出時寫入 voice.identify。
              </div>
              <q-select
                v-model="identifyId"
                class="q-mt-md"
                outlined
                dense
                label="選擇要辨識的指令"
                :options="commandOptions"
                emit-value
                map-options
                @update:model-value="loadAliases"
              />
              <div class="row q-gutter-sm q-mt-sm">
                <q-input
                  v-model="aliasInput"
                  class="col"
                  outlined
                  dense
                  label="新增別名"
                  placeholder="例如：打開聊天機器人"
                  @keyup.enter="addAlias"
                />
                <q-btn color="primary" icon="add" round @click="addAlias" />
              </div>
              <div class="q-mt-md">
                <q-chip
                  v-for="(alias, index) in aliases"
                  :key="`${alias}-${index}`"
                  removable
                  color="grey-2"
                  text-color="dark"
                  @remove="removeAlias(index)"
                  class="q-mr-xs q-mb-xs"
                  >{{ alias }}</q-chip
                >
                <div
                  v-if="aliases.length === 0"
                  class="text-caption text-grey-6"
                >
                  尚未設定別名
                </div>
              </div>
              <q-btn
                class="full-width q-mt-md"
                outline
                color="primary"
                icon="save"
                label="儲存別名設定"
                @click="saveAliases"
              />
            </q-card-section>
          </q-card>

          <q-card flat bordered>
            <q-card-section>
              <div class="text-subtitle1 text-weight-bold">語音辨識測試</div>
              <div class="text-caption text-grey-7 q-mt-xs">
                使用瀏覽器 Web Speech API。部分瀏覽器需要 HTTPS 或麥克風權限。
              </div>
              <div class="row items-center q-gutter-sm q-mt-md">
                <q-btn
                  :color="listening ? 'negative' : 'primary'"
                  :icon="listening ? 'stop' : 'mic'"
                  :label="listening ? '停止辨識' : '開始說話'"
                  :loading="recognitionStarting"
                  @click="toggleRecognition"
                />
                <q-btn
                  flat
                  color="grey-8"
                  icon="volume_up"
                  label="朗讀測試文字"
                  @click="speakTest"
                />
              </div>
              <q-input
                v-model="recognizedText"
                class="q-mt-md"
                outlined
                type="textarea"
                autogrow
                label="辨識結果"
                readonly
              />
              <q-banner
                v-if="matchResult"
                rounded
                class="bg-green-1 text-green-10 q-mt-sm"
              >
                <template #avatar><q-icon name="check_circle" /></template>
                可能符合：{{ matchResult.name }}（{{ matchResult.commandZh }}）
              </q-banner>
              <q-banner
                v-else-if="recognizedText"
                rounded
                class="bg-orange-1 text-orange-10 q-mt-sm"
              >
                尚未找到完全相符的指令或別名。可在右側新增別名。
              </q-banner>
              <div
                v-if="speechError"
                class="text-negative text-caption q-mt-sm"
              >
                {{ speechError }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <q-dialog v-model="editorOpen" persistent>
        <q-card style="width: 620px; max-width: 95vw">
          <q-card-section class="row items-center">
            <div class="text-h6">{{ editingId ? "編輯指令" : "新增指令" }}</div>
            <q-space /><q-btn flat round dense icon="close" v-close-popup />
          </q-card-section>
          <q-separator />
          <q-card-section class="q-gutter-md">
            <q-input v-model="form.name" outlined dense label="指令名稱 *" />
            <q-select
              v-model="form.categoryId"
              outlined
              dense
              label="分類 *"
              :options="categoryOptions"
              emit-value
              map-options
            />
            <q-input
              v-model="form.commandZh"
              outlined
              dense
              label="中文語音指令"
            />
            <q-input
              v-model="form.commandEn"
              outlined
              dense
              label="英文語音指令"
            />
            <q-input
              v-model="form.purpose"
              outlined
              type="textarea"
              autogrow
              label="用途說明"
            />
            <q-toggle v-model="form.verified" label="已驗證" color="positive" />
          </q-card-section>
          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="取消" v-close-popup />
            <q-btn color="primary" label="儲存" @click="saveCommand" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import { ref as dbRef, get, set } from "firebase/database";
import { db } from "boot/firebase_android";

// Firebase Realtime Database 路徑
const FIREBASE_PATH = "pc-software-config/voice";

const $q = useQuasar();
const fileInput = ref(null);
const firebaseLoading = ref(false);
const firebaseSaving = ref(false);
const firebaseMessage = ref("");
const firebaseError = ref(false);
const search = ref("");
const categoryFilter = ref(null);
const editorOpen = ref(false);
const editingId = ref(null);
const identifyId = ref(null);
const aliases = ref([]);
const aliasInput = ref("");
const recognizedText = ref("");
const listening = ref(false);
const recognitionStarting = ref(false);
const speechError = ref("");
const matchResult = ref(null);
let recognition = null;

// 保留與 1622.json 相同的資料結構；頁面載入後會從 Firebase 讀取。
const data = ref({
  voice: {
    category: [],
    commands: [],
    identify: null,
  },
  version: 2,
});

// joey ------
const categories = computed(() => data.value.voice.category || []);
// const categories = computed(() => data.value.category || []);
const commands = computed(() => data.value.voice.commands || []);
// const commands = computed(() => data.value.commands || []);

const categoryOptions = computed(() =>
  categories.value.map((c) => ({ label: c.name, value: c.id }))
);
const commandOptions = computed(() =>
  commands.value.map((c) => ({
    label: `${c.name}（${c.commandZh || "未設定中文指令"}）`,
    value: c.id,
  }))
);
const filteredCommands = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  return commands.value.filter((c) => {
    const categoryOK =
      !categoryFilter.value || c.categoryId === categoryFilter.value;
    const text = [c.name, c.commandZh, c.commandEn, c.purpose, c.id]
      .join(" ")
      .toLowerCase();
    return categoryOK && (!keyword || text.includes(keyword));
  });
});
const identifyTarget = computed(() =>
  commands.value.find((c) => c.id === identifyId.value)
);
const form = ref(emptyForm());

function emptyForm() {
  return {
    name: "",
    categoryId: categories.value[0]?.id || "",
    commandZh: "",
    commandEn: "",
    purpose: "",
    verified: false,
  };
}

function toArray(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => {
        const na = Number(a);
        const nb = Number(b);
        if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
        return a.localeCompare(b);
      })
      .map((key) => value[key]);
  }
  return [];
}

function normalizeFirebaseData(raw) {
  if (!raw || typeof raw !== "object" || !raw.voice) {
    throw new Error(
      `資料結構不正確，${FIREBASE_PATH} 應包含 voice.category 與 voice.commands`
    );
  }

  const normalized = JSON.parse(JSON.stringify(raw));
  normalized.voice.category = toArray(normalized.voice.category);
  normalized.voice.commands = toArray(normalized.voice.commands);
  normalized.voice.identify = normalized.voice.identify || null;

  // normalized.category = toArray(normalized.category);
  // normalized.commands = toArray(normalized.commands);
  // normalized.identify = normalized.voice.identify || null;

  normalized.version = normalized.version ?? 2;
  return normalized;
}

async function loadFirebaseData() {
  firebaseLoading.value = true;
  firebaseError.value = false;
  firebaseMessage.value = "";

  try {
    const snapshot = await get(dbRef(db, FIREBASE_PATH));
    if (!snapshot.exists()) {
      throw new Error(`找不到資料：${FIREBASE_PATH}`);
    }

    data.value = normalizeFirebaseData(snapshot.val());
    identifyId.value =
      data.value.voice.identify?.id || commands.value[0]?.id || null;
    loadAliases();
    firebaseMessage.value = `已從 Firebase 讀取：${FIREBASE_PATH}`;
  } catch (error) {
    firebaseError.value = true;
    firebaseMessage.value = `Firebase 讀取失敗：${error.message || error}`;
    $q.notify({
      type: "negative",
      message: firebaseMessage.value,
      timeout: 6000,
    });
  } finally {
    firebaseLoading.value = false;
  }
}

function buildOutput() {
  const output = JSON.parse(JSON.stringify(data.value));
  const target = output.voice.commands.find((c) => c.id === identifyId.value);
  if (target) {
    output.voice.identify = {
      ...target,
      aliases: [...aliases.value],
    };
  }
  return output;
}

async function saveFirebaseData() {
  firebaseSaving.value = true;
  firebaseError.value = false;
  firebaseMessage.value = "";

  try {
    const output = buildOutput();
    await set(dbRef(db, FIREBASE_PATH), output);
    data.value = output;
    firebaseMessage.value = `已儲存至 Firebase：${FIREBASE_PATH}`;
    $q.notify({ type: "positive", message: "Firebase 儲存成功" });
  } catch (error) {
    firebaseError.value = true;
    firebaseMessage.value = `Firebase 儲存失敗：${error.message || error}`;
    $q.notify({
      type: "negative",
      message: firebaseMessage.value,
      timeout: 6000,
    });
  } finally {
    firebaseSaving.value = false;
  }
}

function categoryById(id) {
  return categories.value.find((c) => c.id === id);
}

function nextCommandId() {
  const max = commands.value.reduce((currentMax, command) => {
    const number = Number((command.id || "").match(/(\d+)$/)?.[1] || 0);
    return Math.max(currentMax, number);
  }, 0);
  return `cmd-${String(max + 1).padStart(4, "0")}`;
}

function openCreate() {
  editingId.value = null;
  form.value = emptyForm();
  editorOpen.value = true;
}

function openEdit(command) {
  editingId.value = command.id;
  form.value = {
    name: command.name || "",
    categoryId: command.categoryId || categories.value[0]?.id || "",
    commandZh: command.commandZh || "",
    commandEn: command.commandEn || "",
    purpose: command.purpose || "",
    verified: Boolean(command.verified),
  };
  editorOpen.value = true;
}

function saveCommand() {
  if (!form.value.name.trim()) {
    $q.notify({ type: "warning", message: "請輸入指令名稱" });
    return;
  }
  if (!form.value.categoryId) {
    $q.notify({
      type: "warning",
      message: "請先從 Firebase 載入分類，或建立分類資料",
    });
    return;
  }

  const payload = {
    ...form.value,
    name: form.value.name.trim(),
    commandZh: form.value.commandZh.trim(),
    commandEn: form.value.commandEn.trim(),
    purpose: form.value.purpose.trim(),
    models: [],
  };

  if (editingId.value) {
    const index = commands.value.findIndex((c) => c.id === editingId.value);
    if (index >= 0) Object.assign(commands.value[index], payload);
  } else {
    commands.value.push({ id: nextCommandId(), ...payload });
  }

  editorOpen.value = false;
  $q.notify({
    type: "positive",
    message: "指令已修改，請按「儲存 Firebase」寫入資料庫",
  });
}

function toggleVerified(command) {
  command.verified = !command.verified;
  $q.notify({
    message: command.verified ? "已標記為已驗證" : "已標記為未驗證",
  });
}

function confirmDelete(command) {
  $q.dialog({
    title: "刪除指令",
    message: `確定刪除「${command.name}」？`,
    cancel: true,
    persistent: true,
  }).onOk(() => {
    data.value.voice.commands = commands.value.filter(
      (c) => c.id !== command.id
    );
    if (identifyId.value === command.id) {
      identifyId.value = commands.value[0]?.id || null;
      loadAliases();
    }
    $q.notify({
      type: "positive",
      message: "指令已移除，請按「儲存 Firebase」寫入資料庫",
    });
  });
}

function selectForAliases(command) {
  identifyId.value = command.id;
  loadAliases();
}

function loadAliases() {
  const identify = data.value.voice.identify;
  aliases.value =
    identify?.id === identifyId.value ? [...(identify.aliases || [])] : [];
  aliasInput.value = "";
}

function addAlias() {
  const value = aliasInput.value.trim();
  if (!value) return;
  if (
    aliases.value.some((alias) => alias.toLowerCase() === value.toLowerCase())
  ) {
    $q.notify({ type: "warning", message: "這個別名已存在" });
    return;
  }
  aliases.value.push(value);
  aliasInput.value = "";
}

function removeAlias(index) {
  aliases.value.splice(index, 1);
}

function saveAliases() {
  const command = identifyTarget.value;
  if (!command) {
    $q.notify({ type: "warning", message: "請先選擇指令" });
    return;
  }

  data.value.voice.identify = {
    ...command,
    aliases: [...aliases.value],
  };
  $q.notify({
    type: "positive",
    message: "別名已更新到畫面資料，請按「儲存 Firebase」寫入資料庫",
  });
}

function triggerImport() {
  fileInput.value?.click();
}

function importJson(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      data.value = normalizeFirebaseData(parsed);
      identifyId.value =
        data.value.voice.identify?.id || commands.value[0]?.id || null;
      loadAliases();
      $q.notify({
        type: "positive",
        message: "JSON 匯入成功；按「儲存 Firebase」可寫入資料庫",
      });
    } catch (error) {
      $q.notify({
        type: "negative",
        message: `匯入失敗：${error.message || "JSON 格式錯誤"}`,
        timeout: 5000,
      });
    }
    event.target.value = "";
  };
  reader.readAsText(file, "UTF-8");
}

function exportJson() {
  const output = buildOutput();
  const blob = new Blob([JSON.stringify(output, null, 2)], {
    type: "application/json;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "voice-commands.json";
  link.click();
  URL.revokeObjectURL(url);
}

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();
}

function findMatch(text) {
  const target = normalize(text);
  if (!target) return null;

  const identify = data.value.voice.identify;
  const candidates = commands.value.map((command) => ({
    ...command,
    aliases: identify?.id === command.id ? identify.aliases || [] : [],
  }));

  return (
    candidates.find((command) =>
      [
        command.name,
        command.commandZh,
        command.commandEn,
        ...(command.aliases || []),
      ].some((candidate) => normalize(candidate) === target)
    ) || null
  );
}

function toggleRecognition() {
  if (listening.value) {
    recognition?.stop();
    listening.value = false;
    return;
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    speechError.value =
      "此瀏覽器不支援 Web Speech API。請使用支援語音辨識的瀏覽器，或手動輸入測試文字。";
    return;
  }

  speechError.value = "";
  recognizedText.value = "";
  matchResult.value = null;
  recognitionStarting.value = true;
  recognition = new SpeechRecognition();
  recognition.lang = "zh-TW";
  recognition.interimResults = true;
  recognition.continuous = false;

  recognition.onstart = () => {
    listening.value = true;
    recognitionStarting.value = false;
  };
  recognition.onresult = (event) => {
    let resultText = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      resultText += event.results[i][0].transcript;
    }
    recognizedText.value = resultText;
    matchResult.value = findMatch(resultText);
  };
  recognition.onerror = (event) => {
    speechError.value =
      event.error === "not-allowed"
        ? "麥克風權限被拒絕，請在瀏覽器設定中允許使用麥克風。"
        : `語音辨識錯誤：${event.error}`;
    listening.value = false;
    recognitionStarting.value = false;
  };
  recognition.onend = () => {
    listening.value = false;
    recognitionStarting.value = false;
  };

  try {
    recognition.start();
  } catch (error) {
    speechError.value = error.message || "無法啟動語音辨識";
    listening.value = false;
    recognitionStarting.value = false;
  }
}

function speakTest() {
  if (!("speechSynthesis" in window)) {
    $q.notify({ type: "warning", message: "此瀏覽器不支援語音合成" });
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(
    "語音指令管理測試，請確認語音播報功能正常。"
  );
  utterance.lang = "zh-TW";
  window.speechSynthesis.speak(utterance);
}

watch(identifyId, () => {
  loadAliases();
  matchResult.value = findMatch(recognizedText.value);
});

onMounted(() => {
  loadFirebaseData();
});

onBeforeUnmount(() => {
  recognition?.stop();
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
});
</script>

<style scoped>
.voice-page {
  background: #f7f8fa;
  min-height: 100%;
}
.page-shell {
  max-width: 1440px;
  margin: 0 auto;
}
.stat-card,
.command-card {
  border-radius: 12px;
}
.command-card {
  transition: box-shadow 0.15s ease;
}
.command-card:hover {
  box-shadow: 0 3px 14px rgba(0, 0, 0, 0.06);
}
@media (max-width: 599px) {
  .voice-page {
    padding: 12px;
  }
  .page-shell > .row:first-child {
    align-items: flex-start;
  }
  .page-shell > .row:first-child .col-auto {
    width: 100%;
  }
  .page-shell > .row:first-child .col-auto .q-btn {
    flex: 1 1 auto;
  }
}
</style>
