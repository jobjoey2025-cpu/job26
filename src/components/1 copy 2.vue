<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">YouTube 連續播放管理</div>

    <!-- JSON 播放清單匯入 / 匯出 -->
    <q-card flat bordered class="q-pa-md q-mb-md">
      <div class="text-subtitle1 q-mb-sm">播放清單匯入 / 匯出</div>

      <div class="row items-center q-col-gutter-sm">
        <div class="col-12 col-sm-auto">
          <q-btn
            color="primary"
            outline
            icon="download"
            label="匯出 JSON"
            :disable="videos.length === 0"
            @click="exportPlaylist"
          />
        </div>

        <div class="col-12 col-sm">
          <q-file
            v-model="jsonFile"
            outlined
            dense
            clearable
            accept=".json,application/json"
            label="選擇 JSON 播放清單"
          />
        </div>

        <div class="col-12 col-sm-auto">
          <q-select
            v-model="importMode"
            outlined
            dense
            emit-value
            map-options
            :options="[
              { label: '取代目前清單', value: 'replace' },
              { label: '合併播放清單', value: 'merge' },
            ]"
            label="匯入方式"
            style="min-width: 160px"
          />
        </div>

        <div class="col-12 col-sm-auto">
          <q-btn
            color="positive"
            icon="upload"
            label="匯入 JSON"
            :disable="!jsonFile"
            :loading="importing"
            @click="importPlaylist"
          />
        </div>
      </div>

      <div class="text-caption text-grey q-mt-sm">
        支援本程式匯出的 JSON 格式。合併時會自動略過重複影片。
      </div>
    </q-card>

    <!-- 新增影片 -->
    <div class="row q-col-gutter-sm">
      <div class="col">
        <q-input
          v-model="videoUrl"
          outlined
          dense
          clearable
          label="YouTube 影片網址或 ID"
          @keyup.enter="addVideo"
        />
      </div>

      <div class="col-auto">
        <q-btn
          color="primary"
          label="新增"
          :loading="adding"
          @click="addVideo"
        />
      </div>
    </div>

    <!-- 播放設定 -->
    <div class="row items-center q-gutter-sm q-my-md">
      <q-toggle v-model="loop" label="循環播放" @update:model-value="setLoop" />

      <q-btn
        color="positive"
        label="開始播放"
        :disable="videos.length === 0 || !apiReady"
        @click="playAll"
      />
    </div>

    <!-- YouTube 播放器 -->
    <q-card flat bordered class="q-mb-md player-card">
      <div class="player-container">
        <div id="youtube-player"></div>
      </div>
    </q-card>

    <div class="text-caption q-mb-md">
      {{ playerStatus }}
    </div>

    <!-- 播放控制 -->
    <div class="row q-gutter-sm q-mb-md">
      <q-btn
        outline
        label="上一部"
        :disable="!apiReady || videos.length === 0"
        @click="previousVideo"
      />

      <q-btn outline label="暫停" :disable="!apiReady" @click="pauseVideo" />

      <q-btn outline label="繼續" :disable="!apiReady" @click="resumeVideo" />

      <q-btn
        outline
        label="下一部"
        :disable="!apiReady || videos.length === 0"
        @click="nextVideo"
      />
    </div>

    <!-- 播放清單 -->
    <q-list bordered separator>
      <q-item
        v-for="(video, index) in videos"
        :key="video.id"
        clickable
        :active="index === currentIndex"
        active-class="bg-blue-1"
        @click="playVideoAt(index)"
      >
        <q-item-section avatar>
          {{ index + 1 }}
        </q-item-section>

        <q-item-section>
          <q-item-label>
            {{ video.title }}
          </q-item-label>

          <q-item-label caption>
            {{ video.id }}
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn
            flat
            round
            dense
            color="negative"
            icon="delete"
            aria-label="刪除影片"
            @click.stop="removeVideo(index)"
          />
        </q-item-section>
      </q-item>

      <q-item v-if="videos.length === 0">
        <q-item-section class="text-grey text-center">
          尚無影片，請先新增 YouTube 影片
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

import { useQuasar } from "quasar";

const jsonFile = ref(null);
const importMode = ref("replace");
const importing = ref(false);

const $q = useQuasar();

const STORAGE_KEY = "yt-playlist";
const YOUTUBE_API_URL = "https://www.youtube.com/iframe_api";

const videoUrl = ref("");
const loop = ref(true);
const videos = ref(loadSavedVideos());
const apiReady = ref(false);
const adding = ref(false);
const currentIndex = ref(-1);
const playerStatus = ref("正在初始化 YouTube 播放器...");

let player = null;
let disposed = false;
let apiLoadHandler = null;
let pendingIndex = null;

// 讀取儲存的播放清單
function loadSavedVideos() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

    if (!Array.isArray(saved)) {
      return [];
    }

    return saved
      .filter(
        (video) =>
          video && typeof video.id === "string" && /^[\w-]{11}$/.test(video.id)
      )
      .map((video, index) => ({
        id: video.id,
        title:
          typeof video.title === "string" && video.title
            ? video.title
            : `YouTube 影片 ${index + 1}`,
      }));
  } catch {
    return [];
  }
}

// 儲存播放清單
function saveVideos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(videos.value));
  } catch {
    $q.notify({
      type: "warning",
      message: "無法儲存播放清單，請檢查瀏覽器儲存空間",
    });
  }
}

function exportPlaylist() {
  if (videos.value.length === 0) {
    $q.notify({
      type: "warning",
      message: "播放清單是空的，無法匯出",
    });
    return;
  }

  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    videos: videos.value.map((video) => ({
      id: video.id,
      title: video.title,
    })),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const date = new Date().toISOString().slice(0, 10);

  link.href = url;
  link.download = `youtube-playlist-${date}.json`;

  document.body.appendChild(link);
  link.click();
  link.remove();

  // 延後釋放下載網址
  setTimeout(() => URL.revokeObjectURL(url), 1000);

  $q.notify({
    type: "positive",
    message: `已匯出 ${videos.value.length} 部影片`,
  });
}

// 解析 YouTube 影片 ID
function extractVideoId(input) {
  const value = String(input || "").trim();

  // 直接輸入 11 碼影片 ID
  if (/^[\w-]{11}$/.test(value)) {
    return value;
  }

  try {
    // 允許使用者輸入沒有 https:// 的網址
    const url = new URL(
      /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(value) ? value : `https://${value}`
    );

    const host = url.hostname.toLowerCase();

    const isYouTube =
      host === "youtube.com" ||
      host.endsWith(".youtube.com") ||
      host === "youtube-nocookie.com" ||
      host.endsWith(".youtube-nocookie.com");

    if (host === "youtu.be" || host.endsWith(".youtu.be")) {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return /^[\w-]{11}$/.test(id || "") ? id : "";
    }

    if (!isYouTube) {
      return "";
    }

    // 標準網址：youtube.com/watch?v=...
    const watchId = url.searchParams.get("v");

    if (watchId) {
      return /^[\w-]{11}$/.test(watchId) ? watchId : "";
    }

    // Shorts、Embed、Live 網址
    const parts = url.pathname.split("/").filter(Boolean);

    if (["embed", "shorts", "live", "v"].includes(parts[0])) {
      const id = parts[1] || "";
      return /^[\w-]{11}$/.test(id) ? id : "";
    }
  } catch {
    return "";
  }

  return "";
}

// 新增影片
function addVideo() {
  if (adding.value) return;

  const id = extractVideoId(videoUrl.value);

  if (!id) {
    $q.notify({
      type: "warning",
      message: "請輸入有效的 YouTube 影片網址或 11 碼 ID",
    });
    return;
  }

  if (videos.value.some((video) => video.id === id)) {
    $q.notify({
      type: "info",
      message: "這部影片已經在播放清單中",
    });
    return;
  }

  const wasEmpty = videos.value.length === 0;

  videos.value.push({
    id,
    title: `YouTube 影片 ${videos.value.length + 1}`,
  });

  saveVideos();
  videoUrl.value = "";

  $q.notify({
    type: "positive",
    message: "影片已新增至播放清單",
  });

  if (apiReady.value && player) {
    if (wasEmpty) {
      syncPlaylist(true);
    } else {
      syncPlaylist(false);
    }
  }
}

// 刪除影片
function removeVideo(index) {
  if (index < 0 || index >= videos.value.length) {
    return;
  }

  const removedCurrent = index === currentIndex.value;
  const oldIndex = currentIndex.value;

  videos.value.splice(index, 1);
  saveVideos();

  if (videos.value.length === 0) {
    currentIndex.value = -1;
    pendingIndex = null;

    if (apiReady.value && player) {
      player.stopVideo();
      player.clearVideo();
    }

    playerStatus.value = "播放清單是空的";
    return;
  }

  if (removedCurrent) {
    currentIndex.value = Math.min(oldIndex, videos.value.length - 1);

    pendingIndex = currentIndex.value;
    syncPlaylist(true);
  } else {
    if (index < oldIndex) {
      currentIndex.value = oldIndex - 1;
    }

    syncPlaylist(false);
  }
}

// 同步播放清單
function syncPlaylist(startPlayback = false) {
  if (!apiReady.value || !player) return;

  if (videos.value.length === 0) {
    player.stopVideo();
    player.clearVideo();
    currentIndex.value = -1;
    return;
  }

  const ids = videos.value.map((video) => video.id);

  const index = Math.max(0, Math.min(currentIndex.value, ids.length - 1));

  currentIndex.value = index;
  pendingIndex = index;

  if (startPlayback) {
    player.loadPlaylist(ids, index, 0);
  } else {
    player.cuePlaylist(ids, index, 0);
  }

  player.setLoop(loop.value);
}

// 開始播放整份清單
function playAll() {
  if (!apiReady.value || !player || !videos.value.length) {
    return;
  }

  currentIndex.value = 0;
  pendingIndex = 0;

  player.loadPlaylist(
    videos.value.map((video) => video.id),
    0,
    0
  );

  player.setLoop(loop.value);
}

// 播放指定影片
function playVideoAt(index) {
  if (!apiReady.value || !player || index < 0 || index >= videos.value.length) {
    return;
  }

  currentIndex.value = index;
  pendingIndex = index;

  player.playVideoAt(index);
}

// 下一部
function nextVideo() {
  if (!apiReady.value || !player || !videos.value.length) {
    return;
  }

  if (videos.value.length === 1) {
    player.playVideoAt(0);
    return;
  }

  player.nextVideo();
}

// 上一部
function previousVideo() {
  if (!apiReady.value || !player || !videos.value.length) {
    return;
  }

  if (videos.value.length === 1) {
    player.playVideoAt(0);
    return;
  }

  player.previousVideo();
}

// 暫停
function pauseVideo() {
  player?.pauseVideo();
}

// 繼續
function resumeVideo() {
  player?.playVideo();
}

// 設定循環播放
function setLoop(value) {
  loop.value = value;

  if (apiReady.value && player) {
    player.setLoop(value);
  }
}

// 取得 YouTube 播放器狀態
function updatePlayerState(event) {
  if (disposed) return;

  const YT = window.YT;

  if (!YT) return;

  switch (event.data) {
    case YT.PlayerState.PLAYING: {
      const index = player.getPlaylistIndex();

      if (typeof index === "number" && index >= 0) {
        currentIndex.value = index;
      }

      playerStatus.value = "正在播放";
      break;
    }

    case YT.PlayerState.PAUSED:
      playerStatus.value = "已暫停";
      break;

    case YT.PlayerState.BUFFERING:
      playerStatus.value = "影片載入中...";
      break;

    case YT.PlayerState.ENDED:
      playerStatus.value = "影片播放結束";
      break;

    case YT.PlayerState.CUED:
      playerStatus.value = "影片已準備就緒";
      break;

    default:
      break;
  }
}

// 初始化 YouTube 播放器
function initPlayer() {
  if (disposed || !window.YT?.Player || player) {
    return;
  }

  player = new window.YT.Player("youtube-player", {
    width: "100%",
    height: "100%",

    playerVars: {
      playsinline: 1,
      autoplay: 0,
      controls: 1,
      origin: window.location.origin,
    },

    events: {
      onReady(event) {
        if (disposed) {
          event.target.destroy();
          return;
        }

        apiReady.value = true;
        event.target.setLoop(loop.value);

        if (videos.value.length > 0) {
          event.target.cuePlaylist(
            videos.value.map((video) => video.id),
            0,
            0
          );

          currentIndex.value = 0;
          playerStatus.value = "播放清單已載入";
        } else {
          playerStatus.value = "請新增 YouTube 影片";
        }
      },

      onStateChange: updatePlayerState,

      onError(event) {
        const messages = {
          2: "影片 ID 無效",
          5: "影片無法以 HTML5 播放器播放",
          100: "影片不存在或已被移除",
          101: "影片擁有者不允許嵌入播放",
          150: "影片擁有者不允許嵌入播放",
          153: "缺少 HTTP Referer 或等效的用戶端識別資訊",
        };

        $q.notify({
          type: "warning",
          message:
            messages[event.data] || "影片無法播放，請檢查影片網址或嵌入權限",
        });
      },

      onAutoplayBlocked() {
        $q.notify({
          type: "info",
          message: "瀏覽器限制自動播放，請按下播放鍵",
        });
      },
    },
  });
}

// 載入 YouTube IFrame API
onMounted(() => {
  disposed = false;

  if (window.YT?.Player) {
    initPlayer();
    return;
  }

  // 保留原本的 API 就緒回呼
  const previousHandler = window.onYouTubeIframeAPIReady;

  apiLoadHandler = () => {
    if (typeof previousHandler === "function") {
      previousHandler();
    }

    initPlayer();
  };

  window.onYouTubeIframeAPIReady = apiLoadHandler;

  let script = document.querySelector(`script[src="${YOUTUBE_API_URL}"]`);

  if (!script) {
    script = document.createElement("script");
    script.src = YOUTUBE_API_URL;
    script.async = true;
    document.head.appendChild(script);
  }
});

// 清除播放器
onBeforeUnmount(() => {
  disposed = true;
  apiReady.value = false;

  if (apiLoadHandler && window.onYouTubeIframeAPIReady === apiLoadHandler) {
    window.onYouTubeIframeAPIReady = null;
  }

  if (player) {
    player.destroy();
    player = null;
  }
});

async function importPlaylist() {
  if (!jsonFile.value || importing.value) return;

  importing.value = true;

  try {
    const text = await jsonFile.value.text();
    const data = JSON.parse(text);

    // 支援 { version: 1, videos: [...] } 或直接使用 [...]
    const sourceVideos = Array.isArray(data) ? data : data?.videos;

    if (!Array.isArray(sourceVideos)) {
      throw new Error("JSON 格式錯誤，找不到 videos 陣列");
    }

    const importedVideos = [];
    const seen = new Set();

    for (const item of sourceVideos) {
      if (!item || typeof item !== "object") continue;

      const id = typeof item.id === "string" ? item.id.trim() : "";

      // 僅接受合法的 11 碼 YouTube 影片 ID
      if (!/^[\w-]{11}$/.test(id)) continue;

      if (seen.has(id)) continue;

      seen.add(id);

      importedVideos.push({
        id,
        title:
          typeof item.title === "string" && item.title.trim()
            ? item.title.trim()
            : `YouTube 影片 ${importedVideos.length + 1}`,
      });
    }

    if (importedVideos.length === 0) {
      throw new Error("找不到有效的 YouTube 影片");
    }

    let result;

    if (importMode.value === "replace") {
      // 取代目前播放清單
      result = importedVideos;
    } else {
      // 合併：保留原有影片並排除重複 ID
      const merged = [...videos.value];
      const existingIds = new Set(merged.map((video) => video.id));

      for (const video of importedVideos) {
        if (existingIds.has(video.id)) continue;

        existingIds.add(video.id);
        merged.push(video);
      }

      result = merged;
    }

    // 更新清單與 localStorage
    videos.value = result;
    currentIndex.value = videos.value.length > 0 ? 0 : -1;
    saveVideos();

    // 同步播放器，但不主動開始播放
    if (apiReady.value && player) {
      syncPlaylist(false);
    }

    $q.notify({
      type: "positive",
      message:
        `匯入完成：讀取 ${importedVideos.length} 部影片，` +
        `目前清單共 ${videos.value.length} 部`,
    });

    jsonFile.value = null;
  } catch (error) {
    $q.notify({
      type: "negative",
      message:
        error instanceof SyntaxError
          ? "JSON 格式錯誤，請檢查檔案內容"
          : error.message || "匯入失敗",
    });
  } finally {
    importing.value = false;
  }
}
</script>

<style scoped>
.player-card {
  overflow: hidden;
}

.player-container {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
}

#youtube-player {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

#youtube-player :deep(iframe) {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
