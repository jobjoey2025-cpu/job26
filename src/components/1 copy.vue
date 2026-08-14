<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">OpenStreetMap Demo</div>

    <div ref="mapRef" class="map-container"></div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

const mapRef = ref(null);

onMounted(() => {
  // 建立地圖
  const map = L.map(mapRef.value).setView([25.033, 121.5654], 15);

  // OpenStreetMap Tile Layer
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // Marker
  L.marker([24.593664, 121.834947]).addTo(map).bindPopup("噶瑪蘭救護").openPopup();
});
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
}
</style>
