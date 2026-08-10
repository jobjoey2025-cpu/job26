<template>
  <!-- 目前 資料會讀取到 areas \ 希望改成 讀取 area_joey1:
  function listenAreas() {
    const areasRef = dbRef(db, "area_joey1"); -->
  <q-page class="q-pa-md">
    <h6 style="text-align: center">車架設計 與 驗證開模</h6>

    <!-- 輪播 -->
    <div class="drift-gallery">
      <q-carousel
        v-model="slide"
        swipeable
        animated
        infinite
        autoplay="5000"
        transition-prev="fade"
        transition-next="fade"
        thumbnails
        height="520px"
        class="drift-carousel"
      >
        <!-- 01 -->
        <q-carousel-slide
          :name="1"
          img-src="/img/Team-Associated-DC10-RWD-Drift-Car-11.jpg"
          class="drift-slide"
        >
          <div class="slide-info">
            <div class="slide-number">01 / 04</div>
            <div class="slide-title">TEAM ASSOCIATED DC10</div>
            <div class="slide-subtitle">RWD DRIFT CAR</div>
          </div>
        </q-carousel-slide>
        <!-- 02 -->
        <q-carousel-slide :name="2" img-src="/img/mst.jpg" class="drift-slide">
          <div class="slide-info">
            <div class="slide-number">02 / 04</div>
            <div class="slide-title">MST DRIFT PLATFORM</div>
            <div class="slide-subtitle">RC DRIFT CHASSIS</div>
          </div>
        </q-carousel-slide>
        <!-- 03 -->
        <q-carousel-slide :name="3" img-src="/img/懸吊.jpg" class="drift-slide">
          <div class="slide-info">
            <div class="slide-number">03 / 04</div>
            <div class="slide-title">SUSPENSION SYSTEM</div>
            <div class="slide-subtitle">DRIFT CHASSIS SETUP</div>
          </div>
        </q-carousel-slide>
        <!-- 04 -->
        <q-carousel-slide
          :name="4"
          img-src="/img/DC10 Drift Car Ready-To-Run.jpg"
          class="drift-slide"
        >
          <div class="slide-info">
            <div class="slide-number">04 / 04</div>
            <div class="slide-title">DC10 READY-TO-RUN</div>
            <div class="slide-subtitle">RWD DRIFT EXPERIENCE</div>
          </div>
        </q-carousel-slide>
        <!-- autoplay progress -->
        <template #control>
          <div class="carousel-progress">
            <div :key="slide" class="carousel-progress-bar"></div>
          </div>
        </template>
      </q-carousel>
    </div>
    <!-- 輪播 -->

    <br />

    <div class="photo-map">
      <!-- 圖片 -->
      <div class="map-wrapper">
        <div class="image-container">
          <img
            ref="imageRef"
            :src="imageUrl"
            class="map-image"
            alt="照片地圖"
            draggable="false"
            @load="onImageLoad"
            @error="onImageError"
          />

          <!-- 熱點 -->
          <button
            v-for="area in mapData"
            :key="area.id"
            type="button"
            class="hotspot"
            :style="hotspotStyle(area)"
            :aria-label="'查看 ' + area.alt + ' 的照片'"
            @click.stop="openGallery(area)"
          >
            <q-tooltip>
              {{ area.alt }}
            </q-tooltip>
          </button>
        </div>
      </div>

      <!-- 載入中 -->
      <q-linear-progress
        v-if="loadingAreas"
        indeterminate
        color="primary"
        class="q-mt-md"
      />

      <!-- 沒有熱區 -->
      <div
        v-if="!loadingAreas && !mapData.length"
        class="text-center text-grey-6 q-mt-md"
      >
        尚無熱區資料
      </div>
    </div>

    <!-- 照片 Gallery -->
    <q-dialog v-model="showGallery" maximized>
      <q-card class="column">
        <!-- 標題列 -->

        <q-card-section class="row items-center">
          <div class="text-h6">
            {{ galleryTitle }}
          </div>

          <q-space />

          <!-- 上一個熱點 -->
          <q-btn
            flat
            round
            icon="chevron_left"
            :disable="!hasPreviousHotspot"
            @click="openPreviousHotspot"
          >
            <q-tooltip> 上一個熱點 </q-tooltip>
          </q-btn>

          <!-- 下一個熱點 -->
          <q-btn
            flat
            round
            icon="chevron_right"
            :disable="!hasNextHotspot"
            @click="openNextHotspot"
          >
            <q-tooltip> 下一個熱點 </q-tooltip>
          </q-btn>

          <!-- 關閉 -->
          <q-btn
            icon="close"
            flat
            round
            dense
            aria-label="關閉照片"
            v-close-popup
          />
        </q-card-section>

        <!-- joey ---- -->

        <q-separator />

        <!-- 照片 -->
        <q-card-section class="col q-pa-none">
          <q-carousel
            v-model="currentSlide"
            animated
            arrows
            navigation
            swipeable
            infinite
            class="full-height bg-black"
          >
            <q-carousel-slide
              v-for="(photo, index) in galleryPhotos"
              :key="[index, photo].join('-')"
              :name="index"
              class="flex flex-center q-pa-lg"
            >
              <img :src="photo" class="gallery-image" alt="熱區照片" />
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from "vue";
import { onValue, ref as dbRef } from "firebase/database";
import { useQuasar } from "quasar";
import { db } from "boot/firebase_imgmap";

// 輪播
// import { ref } from 'vue'
const slide = ref(1);
// 輪播

const currentAreaIndex = ref(-1);
const $q = useQuasar();
/* =========================
 * 底圖
 * ========================= */
// joey modify
const imageUrl =
  "https://lh3.googleusercontent.com/d/1YDkrMvTx3ZclB2QQVRrHxzN6ib-ZA2sC=w1200";
// https://lh3.googleusercontent.com/d/1YDkrMvTx3ZclB2QQVRrHxzN6ib-ZA2sC=w1200

const imageRef = ref(null);

const imageSize = ref({
  width: 500,
  height: 300,
});

/* =========================
 * Firebase
 * ========================= */

const mapData = ref([]);
// joey ----
const hasNextHotspot = computed(() => {
  return (
    currentAreaIndex.value >= 0 &&
    currentAreaIndex.value < mapData.value.length - 1
  );
});
// joey ----
const hasPreviousHotspot = computed(() => {
  return currentAreaIndex.value > 0;
});

const loadingAreas = ref(true);

let stopAreasListener = null;

/* =========================
 * Gallery
 * ========================= */

const showGallery = ref(false);

const galleryPhotos = ref([]);

const galleryTitle = ref("");

const currentSlide = ref(0);

/* =========================
 * Lifecycle
 * ========================= */

onMounted(() => {
  listenAreas();
});

onUnmounted(() => {
  stopAreasListener?.();
});

/* =========================
 * Firebase 熱區
 * ========================= */

function listenAreas() {
  // const areasRef = dbRef(db, "areas");
  const areasRef = dbRef(db, "area_joey1");
  stopAreasListener = onValue(
    areasRef,
    (snapshot) => {
      const data = snapshot.val();

      mapData.value =
        data && typeof data === "object"
          ? Object.entries(data).map(([id, value]) => normalizeArea(id, value))
          : [];

      loadingAreas.value = false;
    },

    (error) => {
      loadingAreas.value = false;

      notifyError(error, "無法載入 Firebase 熱區資料");
    }
  );
}

/* =========================
 * 整理 Firebase 資料
 * ========================= */

function normalizeArea(id, value) {
  const source = value && typeof value === "object" ? value : {};

  const coords =
    source.coords && typeof source.coords === "object" ? source.coords : {};

  const rawPhotos = Array.isArray(source.photos)
    ? source.photos
    : source.photos && typeof source.photos === "object"
    ? Object.values(source.photos)
    : [];

  return {
    id,

    alt:
      typeof source.alt === "string" && source.alt.trim()
        ? source.alt
        : "未命名熱區",

    photos: rawPhotos.filter(
      (photo) => typeof photo === "string" && photo.trim()
    ),

    coords: {
      x: finiteNumber(coords.x, 0),
      y: finiteNumber(coords.y, 0),

      radius: Math.max(1, finiteNumber(coords.radius, 20)),
    },
  };
}

/* =========================
 * 圖片載入
 * ========================= */

function onImageLoad() {
  const width = imageRef.value?.naturalWidth;

  const height = imageRef.value?.naturalHeight;

  if (width && height) {
    imageSize.value = {
      width,
      height,
    };
  }
}

function onImageError() {
  $q.notify({
    type: "negative",
    message: "底圖載入失敗，請檢查圖片網址。",
  });
}

/* =========================
 * 熱點位置
 * ========================= */

function hotspotStyle(area) {
  const width = imageSize.value.width || 500;

  const height = imageSize.value.height || 300;

  const x = finiteNumber(area?.coords?.x, 0);

  const y = finiteNumber(area?.coords?.y, 0);

  const radius = Math.max(1, finiteNumber(area?.coords?.radius, 20));

  return {
    left: clamp((x / width) * 100, 0, 100) + "%",

    top: clamp((y / height) * 100, 0, 100) + "%",

    width: clamp(((radius * 2) / width) * 100, 1, 100) + "%",
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function finiteNumber(value, fallback) {
  const number = Number(value);

  return Number.isFinite(number) ? number : fallback;
}

/* =========================
 * 點擊熱點
 * ========================= */

function openGallery(area) {
  const index = mapData.value.findIndex((item) => item.id === area.id);

  currentAreaIndex.value = index;

  galleryTitle.value = area.alt || "熱區照片";

  galleryPhotos.value = area.photos || [];

  currentSlide.value = 0;

  showGallery.value = true;
}

/* =========================
 * 錯誤
 * ========================= */

function notifyError(error, fallbackMessage) {
  console.error(error);

  $q.notify({
    type: "negative",
    message: error?.message || fallbackMessage,
  });
}
function openNextHotspot() {
  if (!hasNextHotspot.value) {
    return;
  }

  const nextIndex = currentAreaIndex.value + 1;

  const nextArea = mapData.value[nextIndex];

  if (!nextArea) {
    return;
  }

  currentAreaIndex.value = nextIndex;

  galleryTitle.value = nextArea.alt || "熱區照片";

  galleryPhotos.value = nextArea.photos || [];

  currentSlide.value = 0;
}
function openPreviousHotspot() {
  if (!hasPreviousHotspot.value) {
    return;
  }

  const previousIndex = currentAreaIndex.value - 1;

  const previousArea = mapData.value[previousIndex];

  if (!previousArea) {
    return;
  }

  currentAreaIndex.value = previousIndex;

  galleryTitle.value = previousArea.alt || "熱區照片";

  galleryPhotos.value = previousArea.photos || [];

  currentSlide.value = 0;
}
</script>

<style scoped>
/* =========================
 * 整體
 * ========================= */

.photo-map {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

/* =========================
 * 地圖
 * ========================= */

.map-wrapper {
  width: 100%;
  text-align: center;
}

.image-container {
  position: relative;

  display: inline-block;

  width: 500px;
  max-width: 100%;

  overflow: hidden;

  border-radius: 10px;

  box-shadow: 0 3px 14px rgb(0 0 0 / 18%);

  line-height: 0;
}

.map-image {
  display: block;

  width: 100%;
  height: auto;

  user-select: none;
}

/* =========================
 * 熱點
 * ========================= */

.hotspot {
  position: absolute;

  z-index: 2;

  min-width: 14px;
  min-height: 14px;

  padding: 0;

  aspect-ratio: 1;

  transform: translate(-50%, -50%);

  border: 2px solid white;

  border-radius: 50%;

  background: rgb(220 38 38 / 55%);

  box-shadow: 0 0 0 2px rgb(220 38 38 / 85%);

  cursor: pointer;

  transition: transform 0.15s ease, background-color 0.15s ease;
}

.hotspot:hover,
.hotspot:focus-visible {
  z-index: 3;

  transform: translate(-50%, -50%) scale(1.2);

  background: rgb(220 38 38 / 80%);

  outline: none;
}

/* =========================
 * Gallery
 * ========================= */

.gallery-image {
  max-width: 100%;
  max-height: 100%;

  object-fit: contain;
}

/* 輪播 */
/* ========================================= Gallery Container ========================================= */
.drift-gallery {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20px;
  background: radial-gradient(
    circle at center top,
    rgba(0, 140, 255, 0.1),
    transparent 60%
  );
} /* ========================================= Carousel ========================================= */
.drift-carousel {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #05080d;
  border: 1px solid rgba(0, 160, 255, 0.45);
  box-shadow: 0 0 8px rgba(0, 150, 255, 0.25), 0 0 35px rgba(0, 120, 255, 0.12),
    0 20px 50px rgba(0, 0, 0, 0.45);
} /* ========================================= Slide ========================================= */
.drift-slide {
  background-color: #05080d;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
} /* ========================================= Image dark gradient ========================================= */
.drift-slide::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(0, 0, 0, 0.35) 25%,
    rgba(0, 0, 0, 0.05) 60%,
    rgba(0, 0, 0, 0.2) 100%
  );
} /* ========================================= Text information ========================================= */
.slide-info {
  position: absolute;
  left: 32px;
  bottom: 70px;
  z-index: 2;
  padding-left: 14px;
  border-left: 3px solid #00aaff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8);
} /* Number */
.slide-number {
  margin-bottom: 5px;
  font-size: 10px;
  letter-spacing: 3px;
  color: #00bfff;
} /* Title */
.slide-title {
  font-size: 25px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #ffffff;
} /* Subtitle */
.slide-subtitle {
  margin-top: 4px;
  font-size: 11px;
  letter-spacing: 3px;
  color: rgba(220, 240, 255, 0.72);
} /* ========================================= Thumbnails ========================================= */
.drift-carousel :deep(.q-carousel__thumbnail) {
  width: 90px;
  height: 55px;
  border-radius: 6px;
  opacity: 0.55;
  border: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.25s ease;
}
.drift-carousel :deep(.q-carousel__thumbnail--active) {
  opacity: 1;
  border: 1px solid #00aaff;
  box-shadow: 0 0 10px rgba(0, 170, 255, 0.55);
} /* ========================================= Progress bar ========================================= */
.carousel-progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  z-index: 10;
  background: rgba(0, 150, 255, 0.12);
}
.carousel-progress-bar {
  width: 0%;
  height: 100%;
  background: #00aaff;
  box-shadow: 0 0 8px #00aaff, 0 0 18px rgba(0, 170, 255, 0.8);
  animation: carousel-progress 5s linear forwards;
}
@keyframes carousel-progress {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
} /* ========================================= Navigation arrows ========================================= */
.drift-carousel :deep(.q-carousel__arrow) {
  background: rgba(0, 10, 20, 0.65);
  border: 1px solid rgba(0, 170, 255, 0.25);
  backdrop-filter: blur(5px);
  transition: all 0.25s ease;
}
.drift-carousel :deep(.q-carousel__arrow:hover) {
  background: rgba(0, 120, 200, 0.35);
  box-shadow: 0 0 15px rgba(0, 170, 255, 0.35);
} /* ========================================= Mobile ========================================= */
@media (max-width: 600px) {
  .drift-gallery {
    padding: 10px;
  }
  .drift-carousel {
    height: 390px !important;
    border-radius: 12px;
  }
  .slide-info {
    left: 18px;
    bottom: 65px;
  }
  .slide-title {
    font-size: 18px;
    letter-spacing: 1.5px;
  }
  .slide-subtitle {
    font-size: 9px;
    letter-spacing: 2px;
  }
  .drift-carousel :deep(.q-carousel__thumbnail) {
    width: 62px;
    height: 40px;
  }
}
</style>
