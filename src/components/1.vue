<template>
  <q-page padding>
    <!-- 標題 -->
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5">地圖座標管理</div>

        <div class="text-grey-7">
          點擊地圖新增 Marker，拖曳 Marker 可更新座標
        </div>
      </div>

      <q-space />

      <!-- 目前位置 -->
      <q-btn
        color="primary"
        icon="my_location"
        label="取得目前位置"
        :loading="locating"
        @click="getCurrentLocation"
      />

      <!-- 清除全部 -->
      <q-btn
        class="q-ml-sm"
        color="negative"
        outline
        icon="delete_sweep"
        label="清除全部"
        :disable="markers.length === 0"
        @click="clearAllMarkers"
      />
    </div>

    <div class="row q-col-gutter-md">
      <!-- 地圖 -->
      <div class="col-12 col-md-8">
        <q-card>
          <div ref="mapRef" class="map-container" />
        </q-card>
      </div>

      <!-- 右側資訊 -->
      <div class="col-12 col-md-4">
        <q-card>
          <q-card-section>
            <div class="text-h6">Marker Summary</div>

            <div class="text-grey-7">
              目前共有 {{ markers.length }} 個 Marker
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">操作方式</div>

            <div class="text-grey-7">1. 點擊地圖新增 Marker</div>

            <div class="text-grey-7">2. 拖曳 Marker 更新座標</div>

            <div class="text-grey-7">3. 點擊 Marker 查看資訊</div>

            <div class="text-grey-7">4. 使用下方表格管理 Marker</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-subtitle2">最後新增座標</div>

            <div v-if="lastMarker" class="q-mt-sm">
              <div>
                Latitude:
                <b>{{ lastMarker.lat }}</b>
              </div>

              <div>
                Longitude:
                <b>{{ lastMarker.lng }}</b>
              </div>
            </div>

            <div v-else class="text-grey-6 q-mt-sm">尚未新增 Marker</div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Marker Table -->
      <div class="col-12">
        <q-card>
          <q-card-section>
            <div class="text-h6">Marker List</div>
          </q-card-section>

          <q-table
            :rows="markers"
            :columns="columns"
            row-key="id"
            :pagination="{
              rowsPerPage: 10,
            }"
            flat
          >
            <!-- Actions -->
            <template #body-cell-actions="props">
              <q-td :props="props">
                <q-btn
                  flat
                  round
                  color="primary"
                  icon="location_on"
                  @click="focusMarker(props.row)"
                >
                  <q-tooltip> 定位 Marker </q-tooltip>
                </q-btn>

                <q-btn
                  flat
                  round
                  color="negative"
                  icon="delete"
                  @click="removeMarker(props.row.id)"
                >
                  <q-tooltip> 刪除 Marker </q-tooltip>
                </q-btn>
              </q-td>
            </template>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

/* --------------------------------
 * Leaflet Marker Icon Fix
 * Vite / Quasar 專案需要處理圖片路徑
 * -------------------------------- */

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* --------------------------------
 * DOM
 * -------------------------------- */

const mapRef = ref(null);

/* --------------------------------
 * Leaflet Map
 * -------------------------------- */

let map = null;

/*
 * Leaflet Marker instance
 *
 * Key:
 * marker id
 *
 * Value:
 * Leaflet Marker Object
 */

const leafletMarkers = new Map();

/* --------------------------------
 * Vue State
 * -------------------------------- */

const markers = ref([]);

const locating = ref(false);

/* --------------------------------
 * Default Position
 * 台北 101
 * -------------------------------- */

const defaultPosition = {
  lat: 25.033,
  lng: 121.5654,
};

/* --------------------------------
 * QTable Columns
 * -------------------------------- */

const columns = [
  {
    name: "id",
    label: "ID",
    field: "id",
    align: "left",
    sortable: true,
  },
  {
    name: "name",
    label: "名稱",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "lat",
    label: "Latitude",
    field: "lat",
    align: "left",
    sortable: true,
  },
  {
    name: "lng",
    label: "Longitude",
    field: "lng",
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "操作",
    field: "actions",
    align: "center",
  },
];

/* --------------------------------
 * 最後一個 Marker
 * -------------------------------- */

const lastMarker = computed(() => {
  if (markers.value.length === 0) {
    return null;
  }

  return markers.value[markers.value.length - 1];
});

/* --------------------------------
 * 建立 Marker
 * -------------------------------- */

function addMarker(lat, lng, options = {}) {
  const id = Date.now() + Math.random();

  const markerData = {
    id,
    name: options.name || `Marker ${markers.value.length + 1}`,
    lat: Number(lat.toFixed(6)),
    lng: Number(lng.toFixed(6)),
  };

  /*
   * 加入 Vue ref 陣列
   */

  markers.value.push(markerData);

  /*
   * 建立 Leaflet Marker
   */

  const leafletMarker = L.marker([markerData.lat, markerData.lng], {
    draggable: true,
  }).addTo(map);

  /*
   * Popup
   */

  updatePopup(leafletMarker, markerData);

  /*
   * Marker 拖曳結束
   */

  leafletMarker.on("dragend", () => {
    const position = leafletMarker.getLatLng();

    updateMarkerPosition(markerData.id, position.lat, position.lng);
  });

  /*
   * 儲存 Leaflet Marker instance
   */

  leafletMarkers.set(markerData.id, leafletMarker);

  /*
   * 自動打開 Popup
   */

  leafletMarker.openPopup();

  return markerData;
}

/* --------------------------------
 * 更新 Popup
 * -------------------------------- */

function updatePopup(leafletMarker, markerData) {
  leafletMarker.bindPopup(`
    <div>
      <b>${markerData.name}</b>

      <br>

      Latitude:
      ${markerData.lat}

      <br>

      Longitude:
      ${markerData.lng}
    </div>
  `);
}

/* --------------------------------
 * 更新 Marker 座標
 * -------------------------------- */

function updateMarkerPosition(id, lat, lng) {
  const markerData = markers.value.find((item) => item.id === id);

  if (!markerData) {
    return;
  }

  markerData.lat = Number(lat.toFixed(6));
  markerData.lng = Number(lng.toFixed(6));

  /*
   * 更新 Popup
   */

  const leafletMarker = leafletMarkers.get(id);

  if (leafletMarker) {
    updatePopup(leafletMarker, markerData);
  }
}

/* --------------------------------
 * 刪除單一 Marker
 * -------------------------------- */

function removeMarker(id) {
  /*
   * 移除 Leaflet Marker
   */

  const leafletMarker = leafletMarkers.get(id);

  if (leafletMarker) {
    leafletMarker.remove();

    leafletMarkers.delete(id);
  }

  /*
   * 移除 Vue Array 資料
   */

  const index = markers.value.findIndex((item) => item.id === id);

  if (index !== -1) {
    markers.value.splice(index, 1);
  }
}

/* --------------------------------
 * 清除全部 Marker
 * -------------------------------- */

function clearAllMarkers() {
  leafletMarkers.forEach((leafletMarker) => {
    leafletMarker.remove();
  });

  leafletMarkers.clear();

  markers.value = [];
}

/* --------------------------------
 * 定位到指定 Marker
 * -------------------------------- */

function focusMarker(markerData) {
  if (!map) {
    return;
  }

  map.flyTo([markerData.lat, markerData.lng], 18);

  const leafletMarker = leafletMarkers.get(markerData.id);

  if (leafletMarker) {
    leafletMarker.openPopup();
  }
}

/* --------------------------------
 * 取得目前位置
 * -------------------------------- */

function getCurrentLocation() {
  if (!map) {
    return;
  }

  locating.value = true;

  /*
   * Leaflet locationfound
   */

  map.once("locationfound", (event) => {
    locating.value = false;

    const { lat, lng } = event.latlng;

    /*
     * 移動地圖
     */

    map.setView([lat, lng], 17);

    /*
     * 新增 Marker
     */

    addMarker(lat, lng, {
      name: "目前位置",
    });
  });

  /*
   * Leaflet locationerror
   */

  map.once("locationerror", (event) => {
    locating.value = false;

    console.error("Location error:", event.message);

    alert(`無法取得目前位置：${event.message}`);
  });

  /*
   * 開始定位
   */

  map.locate({
    setView: false,
    enableHighAccuracy: true,
  });
}

/* --------------------------------
 * Map Click
 * -------------------------------- */

function onMapClick(event) {
  const { lat, lng } = event.latlng;

  addMarker(lat, lng);
}

/* --------------------------------
 * 初始化地圖
 * -------------------------------- */

onMounted(() => {
  /*
   * 建立地圖
   */

  map = L.map(mapRef.value).setView(
    [defaultPosition.lat, defaultPosition.lng],
    15
  );

  /*
   * OpenStreetMap
   */

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,

    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  /*
   * 點擊地圖
   */

  map.on("click", onMapClick);
});

/* --------------------------------
 * 清除
 * -------------------------------- */

onBeforeUnmount(() => {
  if (map) {
    map.off("click", onMapClick);

    map.remove();

    map = null;
  }

  leafletMarkers.clear();
});
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
}
</style>
