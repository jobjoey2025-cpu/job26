<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">YouTube 連續播放管理</div>

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
