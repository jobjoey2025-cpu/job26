<template>
  <h6 class="text-center">一步一步來3</h6>
  <!-- <pre>{{ mapData }}</pre> -->
  <div style="text-align: center">
    <button @click="captureMouse">擷取滑鼠位置 倒數1秒</button>
  </div>

  <q-page class="flex flex-center">
    <div class="image-container">
      <img
        ref="imageRef"
        src="https://picsum.photos/500/300"
        usemap="#mountain-map"
        style="width: 500px; max-width: 100%; display: block"
        class="map-image"
        @click.left="imageClick($event, area)"
      />

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
      <!-- @click="onPointClick(area)" -->
      <!-- @click="onPointClick($event, area)" -->
      <!-- joey --- -->
    </div>
  </q-page>
  <q-dialog v-model="showDialog">
    <q-card style="min-width: 350px">
      <q-card-section>
        <div class="text-h6">新增熱區</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="newArea.alt" label="名稱" />
        <q-input v-model="newArea.message" label="訊息" />
        <!-- joey--- -->
        <q-input v-model="newArea.photo" label="第一張照片 URL" outlined />

        <q-input v-model.number="newArea.coords.x" label="X" type="number" />
        <q-input v-model.number="newArea.coords.y" label="Y" type="number" />
        <q-input
          v-model.number="newArea.coords.radius"
          label="半徑"
          type="number"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" v-close-popup />
        <q-btn color="primary" label="儲存" @click="saveArea" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="showGallery" maximized>
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">相簿</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-carousel
          v-model="currentSlide"
          animated
          arrows
          navigation
          swipeable
          height="70vh"
        >
          <q-carousel-slide
            v-for="(photo, index) in galleryPhotos"
            :key="index"
            :name="index"
            class="column flex-center"
          >
            <img
              :src="photo"
              style="max-width: 100%; max-height: 100%; object-fit: contain"
            />
          </q-carousel-slide>
        </q-carousel>
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

// joey ----

const showDialog = ref(false);

const newArea = ref({
  shape: "circle",
  alt: "",
  message: "",
  coords: {
    x: 0,
    y: 0,
    radius: 20,
  },
});
// joey ----

// 修改 imageClick
const showGallery = ref(false);
const galleryPhotos = ref([]);
const currentSlide = ref(0);

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

// joey ----
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
    coords: {
      x: Math.round(event.clientX - rect.left),
      y: Math.round(event.clientY - rect.top),
      radius: 20,
    },
    // joey---
    photos: newArea.value.photo ? [newArea.value.photo] : [],
  };

  showDialog.value = true;
}

async function saveArea() {
  try {
    const areaRef = dbRef(db, "areas");

    await push(areaRef, newArea.value);

    showDialog.value = false;

    $q.notify({
      color: "positive",
      message: "新增成功",
    });
  } catch (err) {
    $q.notify({
      color: "negative",
      message: err.message,
    });
  }
}

function captureMouse() {
  $q.notify({
    color: "orange",
    message: "1 秒後請在圖片上按一下左鍵",
  });

  setTimeout(() => {
    waitingCapture.value = true;

    $q.notify({
      color: "primary",
      message: "請點擊圖片",
    });
  }, 200);
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
</style>
