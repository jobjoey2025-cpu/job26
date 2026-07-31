<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h5">🏠 2F 空間 Area 管理</div>
        <div class="text-caption">Living Lab / Construction MVP</div>
      </q-card-section>
    </q-card>

    <!-- Cards -->
    <div class="row q-col-gutter-md">
      <div
        v-for="area in areas"
        :key="area.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">
              {{ area.name }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">📷 Photo</div>

            <div class="row q-gutter-sm">
              <q-img
                v-for="img in area.photos"
                :key="img"
                :src="img"
                style="
                  width: 90px;
                  height: 70px;
                  border-radius: 8px;
                  cursor: pointer;
                "
                @click="showImage(img)"
              />

              <q-btn
                outline
                icon="add_a_photo"
                label="新增"
                @click="uploadPhoto(area)"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div
      v-if="areas.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有 Area 資料
    </div>

    <!-- 預覽 -->
    <q-dialog v-model="previewDialog">
      <q-card>
        <q-img :src="previewImage" style="max-width: 80vw; max-height: 80vh" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "boot/firebase_album";

const areas = ref([]);

const previewDialog = ref(false);
const previewImage = ref("");

function showImage(img) {
  previewImage.value = img;
  previewDialog.value = true;
}

function uploadPhoto(area) {
  console.log(area);
  // TODO: 上傳照片
}

function loadAreas() {
  const areaRef = dbRef(db, "areas");

  onValue(areaRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      areas.value = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
    } else {
      areas.value = [];
    }
  });
}

onMounted(() => {
  loadAreas();
});
</script>