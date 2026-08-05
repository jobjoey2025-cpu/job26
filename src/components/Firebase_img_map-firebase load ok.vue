<template>
  <h6 class="text-center">一步一步來3</h6>
  <pre
    >{{ mapData }}
</pre
  >

  <q-page class="flex flex-center">
    <div class="image-container">
      <img
        ref="imageRef"
        src="https://picsum.photos/500/300"
        usemap="#mountain-map"
        style="width: 500px; max-width: 100%; display: block"
      />

      <!-- <map name="mountain-map">
        <area
          v-for="(area, index) in mapData"
          :key="index"
          :shape="area.shape"
          :coords="getCoordsString(area)"
          href="#"
          :alt="area.alt"
          @click.prevent="onAreaClick($event, area)"
        />
      </map>
      中心紅點
      <div
        v-for="(area, index) in mapData"
        :key="'point-' + index"
        class="center-point"
        :style="{
          left: area.coords.x + 'px',
          top: area.coords.y + 'px',
        }"
      /> -->

      <area
        v-for="area in mapData"
        :key="area.id"
        :shape="area.shape"
        :coords="getCoordsString(area)"
        href="#"
        :alt="area.alt"
        @click.prevent="onAreaClick($event, area)"
      />

      <div
        v-for="area in mapData"
        :key="'point-' + area.id"
        class="center-point"
        :style="{
          left: area.coords.x + 'px',
          top: area.coords.y + 'px',
        }"
      />
    </div>
  </q-page>
</template>

<script setup>
import { db } from "boot/firebase_imgmap";
import { ref as dbRef, onValue } from "firebase/database";
import { ref, onMounted } from "vue";

import { useQuasar } from "quasar";
const $q = useQuasar();

const imageRef = ref(null);

// 由 Firebase 載入
const mapData = ref([]);

onMounted(() => {
  loadAreas();
});

function loadAreas() {
  const areasRef = dbRef(db, "areas");

  onValue(
    areasRef,
    (snapshot) => {
      // joey---
      console.log("Firebase snapshot:", snapshot);

      const data = snapshot.val();

      // joey---
      console.log("Firebase data:", data);

      if (!data) {
        console.warn("Firebase 沒有 areas 資料");
        mapData.value = [];
        return;
      }

      mapData.value = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));

      console.log("mapData:", mapData.value);

      $q.notify({
        color: "positive",
        message: `成功載入 ${mapData.value.length} 個 Area`,
      });
    },
    (error) => {
      console.error("Firebase error:", error);

      $q.notify({
        color: "negative",
        message: error.message,
      });
    }
  );
}

function getCoordsString(area) {
  if (area.shape === "circle") {
    return `${area.coords.x},${area.coords.y},${area.coords.radius}`;
  }

  return "";
}

function onAreaClick(event, area) {
  if (!imageRef.value) return;

  const rect = imageRef.value.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  $q.notify({
    color: "primary",
    html: true,
    message: `
      <b>${area.id}</b><br>
      x=${Math.round(x)}<br>
      y=${Math.round(y)}
    `,
  });
}
</script>

<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}

/* .click-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 999;
} */

.center-point {
  position: absolute;
  width: 10px;
  height: 10px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 100;
}
</style>
