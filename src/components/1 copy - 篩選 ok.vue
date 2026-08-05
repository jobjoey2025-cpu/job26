<template>
  <q-page class="q-pa-md">
    <!-- 標題 -->
    <h6 class="text-center">Firebase Image Map Editor</h6>

    <!-- 擷取位置按鈕 -->
    <div class="text-center q-mb-md">
      <q-btn color="primary" label="擷取滑鼠位置" @click="captureMouse" />
    </div>

    <!-- 圖片區域 -->
    <div class="image-container">
      <img
        ref="imageRef"
        src="https://picsum.photos/500/300"
        class="map-image"
        @click="imageClick"
      />

      <!-- Firebase 熱點紅點 -->

      <div
        v-for="area in mapData"
        :key="area.id"
        class="center-point"
        :style="{
          left: area.coords.x + 'px',
          top: area.coords.y + 'px',
        }"
        @click.stop="onPointClick(area)"
      ></div>

      <!-- 新增位置暫存紅點 -->

      <div
        v-if="newArea.coords"
        class="new-point"
        :style="{
          left: newArea.coords.x + 'px',
          top: newArea.coords.y + 'px',
        }"
      ></div>
    </div>

    <!-- ============================= -->
    <!-- Selected Area Photo Card -->
    <!-- ============================= -->

    <div v-if="selectedArea" class="photo-card q-mt-lg">
      <q-card bordered>
        <q-card-section>
          <div class="text-h6">
            {{ selectedArea.alt }}
          </div>

          <div class="text-caption text-grey">
            {{ selectedArea.message }}
          </div>

          <div class="text-caption">
            座標：
            {{ selectedArea.coords.x }},
            {{ selectedArea.coords.y }}
          </div>
        </q-card-section>

        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">📷 Photos</div>

          <div class="row q-gutter-sm">
            <q-img
              v-for="(img, index) in selectedArea.photos || []"
              :key="index"
              :src="img"
              class="photo-thumb"
              @click="showImage(img)"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- ============================= -->
    <!-- 新增 Area Dialog -->
    <!-- ============================= -->

    <q-dialog v-model="showDialog">
      <q-card style="min-width: 380px">
        <q-card-section>
          <div class="text-h6">新增熱區</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="newArea.alt" label="名稱" outlined />

          <q-input v-model="newArea.message" label="訊息" outlined />

          <!-- 加入照片 -->

          <q-input v-model="newPhoto" label="照片 URL" outlined />

          <q-btn color="primary" label="加入照片" @click="addPhoto" />

          <!-- 已加入照片 -->

          <q-list bordered>
            <q-item v-for="(photo, index) in newArea.photos" :key="index">
              <q-item-section>
                {{ photo }}
              </q-item-section>

              <q-item-section side>
                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="newArea.photos.splice(index, 1)"
                />
              </q-item-section>
            </q-item>
          </q-list>

          <q-input
            v-model.number="newArea.coords.x"
            label="X"
            type="number"
            outlined
          />

          <q-input
            v-model.number="newArea.coords.y"
            label="Y"
            type="number"
            outlined
          />

          <q-input
            v-model.number="newArea.coords.radius"
            label="Radius"
            type="number"
            outlined
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" v-close-popup />

          <q-btn color="primary" label="儲存" @click="saveArea" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- ============================= -->
    <!-- 圖片放大 Dialog -->
    <!-- ============================= -->

    <q-dialog v-model="showGallery">
      <q-card>
        <q-img :src="galleryImage" style="width: 500px; max-width: 90vw" />
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";

import { ref as dbRef, push, onValue } from "firebase/database";

import { db } from "boot/firebase_imgmap";

import { useQuasar } from "quasar";

const $q = useQuasar();

// ==========================
// DOM Reference
// ==========================

const imageRef = ref(null);

// ==========================
// Firebase Areas
// ==========================

const mapData = ref([]);

// ==========================
// Selected Area
// ==========================

const selectedArea = ref(null);

// ==========================
// Dialog
// ==========================

const showDialog = ref(false);

// ==========================
// Gallery
// ==========================

const showGallery = ref(false);

const galleryImage = ref("");

// ==========================
// Mouse Capture
// ==========================

const waitingCapture = ref(false);

// ==========================
// New Area
// ==========================

const newArea = ref({
  shape: "circle",

  alt: "",

  message: "",

  photos: [],

  coords: {
    x: 0,

    y: 0,

    radius: 20,
  },
});

// 新照片輸入

const newPhoto = ref("");

// ==========================
// Firebase Load
// ==========================

onMounted(() => {
  loadAreas();
});

function loadAreas() {
  const areasRef = dbRef(db, "areas");

  onValue(
    areasRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        mapData.value = [];

        return;
      }

      mapData.value = Object.entries(data).map(([id, value]) => ({
        id,

        ...value,
      }));

      console.log("Firebase Areas:", mapData.value);

      // 預設選第一個

      if (mapData.value.length && !selectedArea.value) {
        selectedArea.value = mapData.value[0];
      }
    },

    (error) => {
      $q.notify({
        color: "negative",

        message: error.message,
      });
    }
  );
}

// ==========================
// 點擊紅點
// ==========================

function onPointClick(area) {
  selectedArea.value = area;

  $q.notify({
    color: "primary",

    message: `${area.alt}
(${area.coords.x},${area.coords.y})`,
  });
}

// ==========================
// 擷取滑鼠位置
// ==========================

function captureMouse() {
  $q.notify({
    color: "orange",

    message: "1秒後請點擊圖片",
  });

  setTimeout(() => {
    waitingCapture.value = true;

    $q.notify({
      color: "primary",

      message: "等待圖片座標",
    });
  }, 1000);
}

// ==========================
// 圖片 Click
// ==========================

function imageClick(event) {
  if (!waitingCapture.value) {
    return;
  }

  waitingCapture.value = false;

  const rect = imageRef.value.getBoundingClientRect();

  const x = Math.round(event.clientX - rect.left);

  const y = Math.round(event.clientY - rect.top);

  newArea.value = {
    shape: "circle",

    alt: "",

    message: "",

    photos: [],

    coords: {
      x,

      y,

      radius: 20,
    },
  };

  showDialog.value = true;
}

// ==========================
// 加入照片
// ==========================

function addPhoto() {
  if (!newPhoto.value.trim()) {
    return;
  }

  newArea.value.photos.push(newPhoto.value.trim());

  newPhoto.value = "";
}

// ==========================
// 顯示圖片
// ==========================

function showImage(img) {
  galleryImage.value = img;

  showGallery.value = true;
}

// ==========================
// Save Firebase
// Part 3 會補強 CRUD
// ==========================

async function saveArea() {
  try {
    const areasRef = dbRef(db, "areas");

    const data = {
      shape: newArea.value.shape,

      alt: newArea.value.alt,

      message: newArea.value.message,

      coords: newArea.value.coords,

      photos: newArea.value.photos,
    };

    console.log("Save Firebase:", data);

    await push(areasRef, data);

    showDialog.value = false;

    $q.notify({
      color: "positive",

      message: "新增成功",
    });
  } catch (error) {
    console.error(error);

    $q.notify({
      color: "negative",

      message: error.message,
    });
  }
}
</script>

<style scoped>
.image-container {
  position: relative;

  display: inline-block;
}

.map-image {
  width: 500px;

  max-width: 100%;

  display: block;
}

.center-point {
  position: absolute;

  width: 14px;

  height: 14px;

  background: red;

  border-radius: 50%;

  transform: translate(-50%, -50%);

  cursor: pointer;

  z-index: 100;
}

.center-point:hover {
  width: 18px;

  height: 18px;
}

.new-point {
  position: absolute;

  width: 14px;

  height: 14px;

  background: blue;

  border-radius: 50%;

  transform: translate(-50%, -50%);

  z-index: 200;
}

.photo-card {
  width: 500px;

  max-width: 100%;
}

.photo-thumb {
  width: 100px;

  height: 80px;

  border-radius: 8px;

  cursor: pointer;
}
</style>
