<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h5">🏠 2F 空間 Area 管理</div>
        <div class="text-caption">Living Lab / Construction MVP</div>
      </q-card-section>
    </q-card>

    <!-- 分類 -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <q-btn
        icon="grid_view"
        label="選擇區域"
        color="primary"
        @click="showSelector = true"
      />

      <div v-for="category in categories" :key="category.name">
        <q-btn
          rounded
          outline
          :color="selectedCategory === category.name ? 'primary' : 'grey-7'"
          :icon="category.icon"
          :label="category.name"
          @click="selectedCategory = category.name"
        />
      </div>
    </div>

    <!-- Area List -->
    <div class="row q-col-gutter-md">
      <div
        v-for="area in filteredItems"
        :key="area.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card bordered>
          <q-card-section>
            <div class="row justify-between items-center">
              <div class="text-h6">
                {{ area.name }}
              </div>
            </div>
          </q-card-section>
          <q-separator />

          <!-- Photo -->
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

    <!-- 無資料 -->
    <div
      v-if="filteredItems.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有符合的 Area
    </div>
  </q-page>

  <!-- Image Preview -->
  <q-dialog v-model="previewDialog" maximized>
    <q-card class="bg-black flex flex-center">
      <q-btn
        icon="close"
        flat
        round
        dense
        color="white"
        class="absolute-top-right q-ma-md"
        v-close-popup
      />

      <q-img
        :src="previewImage"
        fit="contain"
        style="width: 100%; height: 100vh"
      />
    </q-card>
  </q-dialog>

  <q-dialog v-model="showSelector">
    <!-- <GridSelector @select="onSelectCategory" /> -->
    <a2F_btnLink @select="onSelectCategory" />
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, update } from "firebase/database";
import { db } from "boot/firebase_album";


import a2F_btnLink from "components/a2F_btnLink.vue";
// 或依你的實際路徑
// import GridSelector from "./GridSelector.vue";

const showSelector = ref(false);

// joey----
const previewDialog = ref(false);
const previewImage = ref("");

const showImage = (img) => {
  previewImage.value = img;
  previewDialog.value = true;
};
// joey----

// 分類
const selectedCategory = ref("All");

const categories = [
  {
    name: "All",
    icon: "apps",
  },
  {
    name: "home",
    icon: "home",
  },
  {
    name: "bath_room",
    icon: "shower",
  },
];

// Firebase Areas
const areas = ref([]);

// 載入 Firebase 資料
const loadAreas = () => {
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

    // window.alert("a=" + areas.photos);
  });
};

onMounted(() => {
  loadAreas();
});

// 分類過濾
const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return areas.value;
  }

  return areas.value.filter((area) => area.tag === selectedCategory.value);
});

// joey-----
function onSelectCategory(tag) {
  selectedCategory.value = tag;
  showSelector.value = false;
}
</script>

<style scoped>
.q-card {
  border-radius: 16px;
  transition: all 0.25s;
}

.q-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}
</style>
