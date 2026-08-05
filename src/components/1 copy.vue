<template>
  <h6 class="text-center">一步一步來3</h6>
  <div style="text-align: center">
    <button @click="captureMouse">擷取滑鼠位置 倒數1秒</button>
  </div>
  <!-- <q-page class="flex flex-center"> -->
  <q-page class="q-pa-md">
    <div class="image-container">
      <img
        ref="imageRef"
        src="https://picsum.photos/500/300"
        usemap="#mountain-map"
        style="width: 500px; max-width: 100%; display: block"
        class="map-image"
        @click.left="imageClick"
      />
      <!-- @click.left="imageClick($event, area)" -->
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
        :key="area.id"
        class="center-point"
        :style="{
          left: area.coords.x + 'px',
          top: area.coords.y + 'px',
        }"
        @click="onPointClick(area)"
      ></div>
    </div>

    <!-- Photo Card View -->
    <div class="photo-list q-mt-lg">
      <div v-for="area in mapData" :key="area.id" class="q-mb-md">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">
              {{ area.alt }}
            </div>

            <div class="text-caption text-grey">
              {{ area.message }}
            </div>
          </q-card-section>

          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">📷 Photos</div>

            <div class="row q-gutter-sm">
              <q-img
                v-for="(img, index) in area.photos"
                :key="index"
                :src="img"
                style="
                  width: 100px;
                  height: 80px;
                  border-radius: 8px;
                  cursor: pointer;
                "
                @click="showImage(img)"
              />
            </div>
          </q-card-section>

          <q-card-section class="text-caption text-grey">
            座標：
            {{ area.coords.x }},
            {{ area.coords.y }}
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>

  <q-dialog v-model="showGallery">
    <q-card style="width: 500px">
      <q-card-section>
        <q-img
          :src="galleryPhotos[currentSlide]"
          style="width: 100%; height: 400px"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { db } from "boot/firebase_imgmap";
import { ref as dbRef, push, onValue } from "firebase/database";
import { ref, onMounted } from "vue";

import { useQuasar } from "quasar";
const $q = useQuasar();

const imageRef = ref(null);
const waitingCapture = ref(false);
const showDialog = ref(false);

// 修改 imageClick
const showGallery = ref(false);
const galleryPhotos = ref([]);
const currentSlide = ref(0);

const newPhoto = ref("");

// 由 Firebase 載入
const mapData = ref([]);

onMounted(() => {
  loadAreas();
});

function showImage(img) {
  galleryPhotos.value = [img];

  currentSlide.value = 0;

  showGallery.value = true;
}

function loadAreas() {
  const areasRef = dbRef(db, "areas");
  onValue(
    areasRef,
    (snapshot) => {
      const data = snapshot.val();
      if (!data) {
        console.warn("Firebase 沒有 areas 資料");
        mapData.value = [];
        return;
      }
      mapData.value = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
      $q.notify({
        color: "positive",
        message: `成功載入 ${mapData.value.length} 個 Area`,
      });
    },
    (error) => {
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
function onPointClick(area) {
  $q.notify({
    color: "primary",
    message: `${area.id}\n(${area.coords.x}, ${area.coords.y})`,
  });
}
function openDialog(event) {
  const rect = imageRef.value.getBoundingClientRect();

  newArea.value = {
    shape: "circle",
    alt: "",
    message: "",
    photo: "",
    photos: [],
    coords: {
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
      radius: 20,
    },
  };

  showDialog.value = true;
  // 如果你希望保留剛加入的照片，不要再次呼叫 openDialog()。
}
async function saveArea() {
  try {
    const areaRef = dbRef(db, "areas");

    const data = {
      shape: newArea.value.shape,
      alt: newArea.value.alt,
      message: newArea.value.message,
      coords: {
        x: newArea.value.coords.x,
        y: newArea.value.coords.y,
        radius: newArea.value.coords.radius,
      },
      photos: newArea.value.photos, // <-- 修正這裡
    };

    console.log("準備寫入 Firebase:", data);

    await push(areaRef, data);

    showDialog.value = false;

    $q.notify({
      color: "positive",
      message: "新增成功",
    });
  } catch (err) {
    console.error(err);

    $q.notify({
      color: "negative",
      message: err.message,
    });
  }
}
function imageClick(event, area) {
  if (!waitingCapture.value) return;
  waitingCapture.value = false;
  const rect = imageRef.value.getBoundingClientRect();
  newArea.value.coords.x = Math.round(event.clientX - rect.left);
  newArea.value.coords.y = Math.round(event.clientY - rect.top);
  showDialog.value = true;
  if (area.photos && area.photos.length) {
    galleryPhotos.value = [...area.photos];
    currentSlide.value = 0;
    showGallery.value = true;
    return;
  }
  $q.notify({
    message: "沒有相片",
    color: "warning",
  });
}
</script>
<style scoped>
.image-container {
  position: relative;
  display: inline-block;
}
.center-point {
  position: absolute;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 1000;
}
.photo-list {
  width: 500px;
  max-width: 100%;
}
</style>
