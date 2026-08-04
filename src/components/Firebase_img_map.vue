<template>
  <q-page class="flex flex-center">
    <div>
      <!-- 原生 img -->
      <img
        src="https://picsum.photos/500/300"
        usemap="#mountain-map"
        style="width: 500px; max-width: 100%"
      />

      <map name="mountain-map">
        <!-- 使用 v-for 綁定 JSON 資料 -->
        <area
          v-for="(area, index) in mapData"
          :key="index"
          :shape="area.shape"
          :coords="getCoordsString(area)"
          href="#"
          :alt="area.alt"
          @click.prevent="onAreaClick(area.message)"
        />
      </map>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, update, push } from "firebase/database"; // joey -----
import { db } from "boot/firebase_imgmap";

const $q = useQuasar();

// 1. 將 coords="150,150,50" 轉為 JSON 陣列結構
// const mapData = [
//   {
//     shape: "circle",
//     coords: {
//       x: 150,
//       y: 150,
//       radius: 50
//     },
//     alt: "Circle",
//     message: "你點擊了圓形熱區！"
//   }
// ];

const mapData = ref([]);

// 2. 將 JSON 格式的座標轉換回 HTML area 所需的字串格式
// const getCoordsString = (area) => {
//   if (area.shape === "circle") {
//     return `${area.coords.x},${area.coords.y},${area.coords.radius}`;
//   }
//   return "";
// };

const getCoordsString = (area) => {
  switch (area.shape) {
    case "circle":
      return `${area.coords.x},${area.coords.y},${area.coords.radius}`;

    case "rect":
      return `${area.coords.x1},${area.coords.y1},${area.coords.x2},${area.coords.y2}`;

    case "poly":
      return area.coords.map((p) => `${p.x},${p.y}`).join(",");

    default:
      return "";
  }
};

const onAreaClick = (message) => {
  $q.notify({
    message,
    color: "primary",
  });
};

// Firebase Areas
// const areas = ref([]);

// 載入 Firebase 資料
// const loadAreas = () => {
//   const areaRef = dbRef(db, "areas");

//   onValue(areaRef, (snapshot) => {
//     if (snapshot.exists()) {
//       const data = snapshot.val();

//       areas.value = Object.entries(data).map(([id, value]) => ({
//         id,
//         ...value,
//       }));
//     } else {
//       areas.value = [];
//     }

//     // window.alert("a=" + areas.photos);
//   });
// };

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
  });
};

onMounted(() => {
  loadAreas();
});
</script>
