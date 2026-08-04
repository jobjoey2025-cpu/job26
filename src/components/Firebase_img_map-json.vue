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

const $q = useQuasar();

// 1. 將 coords="150,150,50" 轉為 JSON 陣列結構
const mapData = [
  {
    shape: "circle",
    coords: {
      x: 150,
      y: 150,
      radius: 50
    },
    alt: "Circle",
    message: "你點擊了圓形熱區！"
  }
];

// 2. 將 JSON 格式的座標轉換回 HTML area 所需的字串格式
const getCoordsString = (area) => {
  if (area.shape === "circle") {
    return `${area.coords.x},${area.coords.y},${area.coords.radius}`;
  }
  return "";
};

const onAreaClick = (message) => {
  $q.notify({
    message,
    color: "primary",
  });
};
</script>
