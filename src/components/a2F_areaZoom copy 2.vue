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
      <!-- <div v-for="category in categories" :key="category.name">
        <q-btn
          rounded
          outline
          :color="selectedCategory === category.name ? 'primary' : 'grey-7'"
          :icon="category.icon"
          :label="category.name"
          @click="selectedCategory = category.name"
        />
      </div> -->
      <q-btn flat icon="apps" label="All" @click="selectedCategory = 'All'" />
      <div v-for="category in categories" :key="category.name">
        <div class="q-mb-lg flex flex-center">
          <div class="container">
            <div v-for="(row, r) in grid" :key="r" class="grid-row">
              <div
                v-for="(color, c) in row"
                :key="c"
                class="cell"
                :style="cellStyle(r, c)"
                @mouseenter="hoverRegion(r, c)"
                @mouseleave="hovered = null"
                @click="selectRegion(r, c)"
              >
                <div v-if="isTopLeft(r, c)" class="text">
                  {{ colorTexts[color] }}
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <!-- <q-img
                v-for="img in area.photos"
                :key="img"
                :src="img"
                style="width: 90px; height: 70px; border-radius: 8px"
              /> -->
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
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, update } from "firebase/database";
import { db } from "boot/firebase_album";

import { useQuasar } from "quasar";
const $q = useQuasar();

// ----- jj

/**
 * ===== Excel Grid =====
 */
 const grid = [
  [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
];
/**
 * ===== Label =====
 */
const colorTexts = {
  "#D9D9D9": "廁所",
  "#948A54": "home",
  "#C4BD97": "Tent",
};
const rows = grid.length;
const cols = grid[0].length;
/**
 * ===== Hover / Select state =====
 */
const hovered = ref(null);
const selected = ref(null);
/**
 * ===== region 判斷（O(1) 無 floodFill）=====
 */
function getRegionKey(r, c) {
  return `${grid[r][c]}-${r}-${c}`;
}
/**
 * 左上角判斷
 */
function isTopLeft(r, c) {
  const color = grid[r][c];
  if (r > 0 && grid[r - 1][c] === color) return false;
  if (c > 0 && grid[r][c - 1] === color) return false;
  return true;
}
/**
 * ===== Hover 整個區塊（用 flood scan 即時擴散）=====
 */
function hoverRegion(r, c) {
  const color = grid[r][c];
  hovered.value = color;
}
/**
 * ===== Click 選取 ===== jj
 */
// function selectRegion(r, c) {
//   const color = grid[r][c];
//   selected.value = color;

//   $q.notify({
//     type: "positive",
//     message: colorTexts[color] || color,
//     position: "top",
//     timeout: 800,
//   });
// }
/**
 * ===== Cell Style（核心）=====
 */
function cellStyle(r, c) {
  const color = grid[r][c];

  const isHover = hovered.value === color;
  const isSelect = selected.value === color;

  return {
    backgroundColor: color,

    // hover highlight 整區
    filter: isHover ? "brightness(0.85)" : "none",

    // selected 更強
    outline: isSelect ? "2px solid #000" : "none",

    transition: "0.1s",
  };
}

// ----- jj

// joey----
const previewDialog = ref(false);
const previewImage = ref("");

const showImage = (img) => {
  previewImage.value = img;
  previewDialog.value = true;
};
// joey----

// 2. color 對應 category jj
const colorCategoryMap = {
  "#D9D9D9": "bath_room",
  "#948A54": "home",
  "#C4BD97": "Tent",
};

// 3. 修改 selectRegion()
/**
 * ===== Click 選取 =====
 */
function selectRegion(r, c) {
  const color = grid[r][c];

  selected.value = color;
  selectedCategory.value = colorCategoryMap[color];

  $q.notify({
    type: "positive",
    message: colorTexts[color],
    timeout: 800,
  });
}

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

// 4. filteredItems 不用改
// 分類過濾
const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return areas.value;
  }

  return areas.value.filter((area) => area.tag === selectedCategory.value);
});
</script>
