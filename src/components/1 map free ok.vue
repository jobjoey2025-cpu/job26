<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Quasar + Leaflet Map</div>

    <div class="row q-col-gutter-md">
      <!-- 地圖 -->
      <div class="col-12 col-md-8">
        <q-card>
          <div ref="mapRef" class="map-container"></div>
        </q-card>
      </div>

      <!-- 座標資訊 -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Marker Position</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="q-mb-md">
              <div class="text-grey-7">Latitude</div>

              <div class="text-h6">
                {{ latitude }}
              </div>
            </div>

            <div class="q-mb-md">
              <div class="text-grey-7">Longitude</div>

              <div class="text-h6">
                {{ longitude }}
              </div>
            </div>

            <q-btn
              color="primary"
              label="Reset Position"
              @click="resetPosition"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

/*
 * Leaflet Marker icon 修正
 * 在 Vite / Quasar 環境中，
 * 預設 icon 有時候會找不到圖片路徑
 */

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// DOM
const mapRef = ref(null);

// Leaflet instance
let map = null;
let marker = null;

// 預設位置：台北 101
const defaultPosition = {
  lat: 25.033,
  lng: 121.5654,
};
// 24.593638, 121.834936 噶瑪蘭

// 顯示座標
const latitude = ref(defaultPosition.lat);
const longitude = ref(defaultPosition.lng);

/**
 * 更新 Marker
 */
// function updateMarker(lat, lng) {
//   latitude.value = Number(lat.toFixed(6))
//   longitude.value = Number(lng.toFixed(6))

//   // 如果 Marker 已經存在
//   if (marker) {
//     marker.setLatLng([lat, lng])
//   } else {
//     // 建立新的 Marker
//     marker = L.marker([lat, lng])
//       .addTo(map)
//   }

//   // Popup
//   marker
//     .bindPopup(`
//       <b>Selected Position</b>
//       <br>
//       Latitude: ${lat.toFixed(6)}
//       <br>
//       Longitude: ${lng.toFixed(6)}
//     `)
//     .openPopup()
// }
function addMarker(lat, lng) {
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      `
      Latitude: ${lat.toFixed(6)}
      <br>
      Longitude: ${lng.toFixed(6)}
    `
    )
    .openPopup();

  latitude.value = Number(lat.toFixed(6));
  longitude.value = Number(lng.toFixed(6));
}

/**
 * Reset 到預設位置
 */
function resetPosition() {
  updateMarker(defaultPosition.lat, defaultPosition.lng);

  map.setView([defaultPosition.lat, defaultPosition.lng], 16);
}

/**
 * 初始化地圖
 */
onMounted(() => {
  // 建立 Leaflet Map
  map = L.map(mapRef.value).setView(
    [defaultPosition.lat, defaultPosition.lng],
    16
  );

  // OpenStreetMap Tile Layer
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,

    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  // 預設 Marker
  updateMarker(defaultPosition.lat, defaultPosition.lng);

  /*
   * 點擊地圖事件
   *
   * e.latlng.lat
   * e.latlng.lng
   */
  map.on("click", (e) => {
    const { lat, lng } = e.latlng;

    // updateMarker(lat, lng);
    addMarker(lat, lng);
  });
});

/**
 * 離開頁面時清除地圖
 */
onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
