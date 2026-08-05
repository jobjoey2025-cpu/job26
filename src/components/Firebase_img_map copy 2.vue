<template>
  <q-page class="flex flex-center">
    <div class="image-container">
      <!-- 圖片 -->
      <img src="https://picsum.photos/500/300" class="map-image" />

      <!-- Firebase 動態熱區 -->
      <div
        v-for="area in mapData"
        :key="area.id"
        class="hotspot"
        :class="area.shape"
        :style="getHotspotStyle(area)"
        @click="onAreaClick(area.message)"
      ></div>

      <!-- 點擊紅點 -->
      <div
        v-for="(point, index) in clickPoints"
        :key="index"
        class="click-point"
        :style="{
          left: point.x + 'px',
          top: point.y + 'px',
        }"
      ></div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "boot/firebase_imgmap";


const $q = useQuasar();

const clickPoints = ref([]);

// Firebase 資料
const mapData = ref([]);

// 讀取 Firebase
const loadAreas = () => {
  const areaRef = dbRef(db, "areas");

  onValue(areaRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      mapData.value = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
    } else {
      mapData.value = [];
    }

    console.log("areas=", mapData.value);
  });
};

onMounted(() => {
  loadAreas();
});

// 產生熱區 CSS
const getHotspotStyle = (area) => {
  const c = area.coords;

  if (area.shape === "circle") {
    return {
      left: `${c.x - c.radius}px`,
      top: `${c.y - c.radius}px`,
      width: `${c.radius * 2}px`,
      height: `${c.radius * 2}px`,
    };
  }

  if (area.shape === "rect") {
    return {
      left: `${c.x1}px`,
      top: `${c.y1}px`,
      width: `${c.x2 - c.x1}px`,
      height: `${c.y2 - c.y1}px`,
    };
  }

  return {};
};

// 點擊事件
const onAreaClick = (area) => {
  // 加入紅點
  clickPoints.value.push({
    x: area.coords.x,
    y: area.coords.y,
  });

  $q.notify({
    message: area.message,
    color: "primary",
  });
};
</script>

<style scoped>
.image-container {
  position: relative;

  width: 500px;

  max-width: 100%;
}

.map-image {
  width: 100%;

  display: block;
}

/* 所有熱區 */
.hotspot {
  position: absolute;

  cursor: pointer;

  background: rgba(255, 0, 0, 0.15);
}

/* 圓形 */
.hotspot.circle {
  border-radius: 50%;
}

/* 矩形 */
/* .hotspot.rect {
} */

.hotspot:hover {
  background: rgba(0, 150, 255, 0.35);
}

.click-point {
  position: absolute;

  width: 12px;
  height: 12px;

  background: red;

  border-radius: 50%;

  transform: translate(-50%, -50%);

  pointer-events: none;

  z-index: 10;
}
</style>
