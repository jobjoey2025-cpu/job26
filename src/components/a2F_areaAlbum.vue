<template>
  <q-page class="bg-grey-2 q-pa-md">
    <h4>🏠 2F 空間 Area 管理</h4>

    <div class="row q-col-gutter-md">
      <div v-for="area in areas" :key="area.id" class="col-12 col-md-4">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">
              {{ area.name }}
            </div>
          </q-card-section>

          <q-separator />

          <!-- Photo -->
          <q-card-section>
            <div class="text-subtitle2 q-mb-md">📷 Photo</div>

            <div class="row q-gutter-sm">
              <!-- 固定顯示兩格 -->
              <div v-for="i in 2" :key="i">
                <q-img
                  v-if="area.photos && area.photos[i - 1]"
                  :src="area.photos[i - 1]"
                  style="width: 100px; height: 80px; border-radius: 8px"
                />

                <div
                  v-else
                  class="bg-grey-3 flex flex-center"
                  style="width: 100px; height: 80px; border-radius: 8px"
                >
                  No Photo
                </div>
              </div>
            </div>

            <q-btn
              class="q-mt-md"
              outline
              icon="add_a_photo"
              label="新增照片"
              v-if="(area.photos?.length || 0) < 2"
              @click="selectPhoto(area.id)"
            />

            <input
              type="file"
              accept="image/*"
              :ref="(el) => (fileInputs[area.id] = el)"
              style="display: none"
              @change="uploadPhoto($event, area)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { ref as dbRef, onValue, update } from "firebase/database";

import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { db, storage } from "boot/firebase_album";

const areas = ref([]);

const fileInputs = {};

const loadAreas = () => {
  const areaRef = dbRef(db, "areas");

  onValue(areaRef, (snapshot) => {
    if (!snapshot.exists()) {
      areas.value = [];
      return;
    }

    const data = snapshot.val();

    areas.value = Object.entries(data).map(([id, value]) => ({
      id,
      ...value,
      photos: value.photos || [],
    }));
  });
};

const selectPhoto = (areaId) => {
  fileInputs[areaId]?.click();
};

const uploadPhoto = async (event, area) => {
  const file = event.target.files[0];

  if (!file) return;

  try {
    const fileName = Date.now() + "_" + file.name;

    const imgRef = storageRef(storage, `areas/${area.id}/${fileName}`);

    await uploadBytes(imgRef, file);

    const url = await getDownloadURL(imgRef);

    const photos = [...(area.photos || [])];

    // 最多兩張
    if (photos.length >= 2) {
      photos.shift();
    }

    photos.push(url);

    await update(dbRef(db, `areas/${area.id}`), {
      photos,
    });

    event.target.value = "";
  } catch (err) {
    console.error(err);
  }
};

// 更新 Todo
const updateTodo = async (areaId, index, value) => {
  const area = areas.value.find((a) => a.id == areaId);

  if (!area) return;

  area.todo[index].done = value;

  await update(dbRef(db, `areas/${areaId}`), {
    todo: area.todo,
  });
};

onMounted(() => {
  loadAreas();
});

function statusColor(status) {
  switch (status) {
    case "整理中":
      return "orange";

    case "施工中":
      return "blue";

    case "測試中":
      return "green";

    case "待施工":
      return "grey";

    default:
      return "grey";
  }
}
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
