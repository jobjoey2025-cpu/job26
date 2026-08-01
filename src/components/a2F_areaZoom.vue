<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section
        class="bg-primary text-white row items-center justify-between"
      >
        <div>
          <div class="text-h5">🏠 2F 空間 Area 管理</div>
          <div class="text-caption">Living Lab / Construction MVP</div>
        </div>

        <!-- <q-btn
          outline
          color="white"
          :icon="viewMode === 'card' ? 'view_list' : 'grid_view'"
          :label="viewMode === 'card' ? 'List' : 'Card'"
          @click="toggleView"
        /> -->
        <q-btn-toggle
          v-model="viewMode"
          toggle-color="white"
          color="primary"
          text-color="white"
          :options="[
            { label: 'Card', value: 'card', icon: 'grid_view' },
            { label: 'List', value: 'list', icon: 'view_list' },
          ]"
        />
      </q-card-section>
    </q-card>

    <!-- Card View -->
    <div v-if="viewMode === 'card'" class="row q-col-gutter-md">
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

    <!-- List View -->
    <q-list v-else bordered separator class="bg-white rounded-borders">
      <q-item v-for="area in areas" :key="area.id">
        <q-item-section avatar>
          <q-img
            v-if="area.photos?.length"
            :src="area.photos[0]"
            style="width: 60px; height: 60px; border-radius: 6px"
            @click="showImage(area.photos[0])"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">
            {{ area.name }}
          </q-item-label>

          <q-item-label caption>
            {{ area.photos?.length || 0 }} 張照片
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="add_a_photo" @click="uploadPhoto(area)" />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="areas.length === 0" class="text-center text-grey q-mt-xl">
      沒有 Area 資料
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ref as dbRef, onValue } from "firebase/database";
import { db } from "boot/firebase_album";

const areas = ref([]);

const previewDialog = ref(false);
const previewImage = ref("");

const viewMode = ref("card");

function toggleView() {
  viewMode.value = viewMode.value === "card" ? "list" : "card";
}

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
