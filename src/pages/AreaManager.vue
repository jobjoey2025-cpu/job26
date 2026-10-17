<template>
  <q-page class="bg-grey-2 q-pa-md">
    <q-btn
      label="使用手冊 多檔 GDS2021"
      color="primary"
      href="https://docs.google.com/spreadsheets/d/1RD7e6KDTXvP13MRv6vlyc7gt6FwAV7ppwuLMO5bIB-s/edit?gid=498659891#gid=498659891"
      target="_blank"
    />
    ☏
    <q-btn label="Find (Page [all] )" color="primary" target="_blank" />
    🐷
    <!-- <q-btn label="Find (Firedb [展開])" color="primary" target="_blank" /> -->
    -
    <!-- <q-btn label="4種 Search" color="primary" target="_blank" /> -->
    -
    <q-btn label="關鍵字" color="primary" @click="alert = true" />
    <!-- Header -->
    <AreaHeader v-model:view-mode="viewMode" />

    <!-- Category -->
    <AreaCategoryBar
      v-model="selectedCategory"
      :categories="categories"
      @open-selector="showSelector = true"
    />

    <!-- Error -->
    <q-banner
      v-if="displayError"
      rounded
      class="bg-red-1 text-negative q-mb-md"
    >
      {{ displayError }}
    </q-banner>

    <!-- ========================= -->
    <!-- Card View -->
    <!-- ========================= -->

    <AreaCardView
      v-if="viewMode === 'card'"
      :areas="filteredAreas"
      @edit="openEdit"
      @photo="showImage"
      @upload="uploadPhoto"
      @todo="handleUpdateTodo"
    />

    <!-- ========================= -->
    <!-- List View -->
    <!-- ========================= -->

    <AreaListView
      v-else
      :areas="filteredAreas"
      @photo="showImage"
      @upload="uploadPhoto"
    />

    <!-- Empty -->
    <div
      v-if="!loading && filteredAreas.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有符合的 Area
    </div>

    <!-- Loading -->
    <q-inner-loading :showing="loading">
      <q-spinner color="primary" size="48px" />
    </q-inner-loading>

    <!-- ========================= -->
    <!-- Edit Dialog -->
    <!-- ========================= -->

    <AreaEditDialog
      v-model="editDialog"
      :area="editArea"
      :saving="savingArea"
      :status-options="statusOptions"
      @save="handleSaveArea"
    />

    <!-- ========================= -->
    <!-- Add Dialog -->
    <!-- ========================= -->

    <AreaAddDialog
      v-model="addDialog"
      :saving="creatingArea"
      @create="handleCreateArea"
    />

    <!-- ========================= -->
    <!-- Photo Preview -->
    <!-- ========================= -->

    <AreaPhotoPreview
      v-model="previewDialog"
      :image="previewImage"
      :photos="previewPhotos"
    />

    <!-- ========================= -->
    <!-- Area Selector -->
    <!-- ========================= -->

    <!-- <AreaSelectorDialog
      v-model="showSelector"
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    /> -->
    <AreaSelectorDialog
      v-model="showSelector"
      :areas="areas"
      :selected="selectedCategory"
      @select="onSelectCategory"
    />

    <!-- ========================= -->
    <!-- Add Button -->
    <!-- ========================= -->

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="primary" icon="add" @click="addDialog = true" />
    </q-page-sticky>
  </q-page>

  <q-dialog v-model="alert">
    <q-card>
      <q-card-section>
        <div class="text-h6">Alert</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <!-- joey -->
        <pre>
  car \

  共4種 Search
  1 2 用 browser Find 找關鍵字 Page [all] \ Firedb [全部展開]比較深
  3 選擇區域 (auto List)
  4 手動 Btn


</pre
        >
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

// =========================
// Components
// =========================

import AreaHeader from "../components/area/AreaHeader.vue";

import AreaCategoryBar from "../components/area/AreaCategoryBar.vue";

import AreaCardView from "../components/area/AreaCardView.vue";

import AreaListView from "../components/area/AreaListView.vue";

import AreaEditDialog from "../components/area/dialogs/AreaEditDialog.vue";

import AreaAddDialog from "../components/area/dialogs/AreaAddDialog.vue";

import AreaPhotoPreview from "../components/area/dialogs/AreaPhotoPreview.vue";

import AreaSelectorDialog from "../components/area/dialogs/AreaSelectorDialog.vue";

// =========================
// Data Layer
// =========================

import { useAreas } from "../composables/useAreas";

// =========================
// Categories
// =========================

// joey modify
const categories = [
  {
    name: "All",
    icon: "apps",
  },
  {
    name: "垃圾流",
    icon: "delete_forever",
  },
  {
    name: "3F1st",
    icon: "home",
  },
  // {
  //   name: "living",
  //   icon: "home",
  // },
  // {
  //   name: "bath",
  //   icon: "shower",
  // },
  // {
  //   name: "tent",
  //   icon: "holiday_village",
  // },
  {
    name: "car",
    icon: "no_crash",
  },
  {
    name: "doc",
    icon: "document_scanner",
  },
];

const alert = ref(false);
// =========================
// Status
// =========================

const statusOptions = ["整理中", "施工中", "測試中", "待施工"];

// =========================
// Upload
// =========================

const uploadUrl =
  "https://script.google.com/macros/s/AKfycbzJ_d-j6Z_kxKvp7RNu_93yuueqZwiFoNfzm0FI_GR0SM9Av9bwwLRz0p3ZHkEYOE-j/exec";

// =========================
// UI State
// =========================

const viewMode = ref("card");

const selectedCategory = ref("All");

const showSelector = ref(false);

const editDialog = ref(false);

const addDialog = ref(false);

const previewDialog = ref(false);

// =========================
// Photo Preview State
// =========================

// 目前顯示的照片
const previewImage = ref("");

// 所有照片
const previewPhotos = ref([]);

// =========================
// Area State
// =========================

const editArea = ref(null);

const savingArea = ref(false);

const creatingArea = ref(false);

const operationError = ref("");

// =========================
// Firebase / Data
// =========================

const {
  areas,
  loading,
  error: dataError,
  loadAreas,
  dispose,
  updateArea,
  updateTodo,
  createArea,
} = useAreas();

// =========================
// Filter + Sort
// =========================

// const filteredAreas = computed(() => {
//   if (selectedCategory.value === "All") {
//     return areas.value;
//   }

//   return areas.value.filter((area) => area.tag === selectedCategory.value);
// });
const filteredAreas = computed(() => {
  const result =
    selectedCategory.value === "All"
      ? areas.value
      : areas.value.filter((area) => area.tag === selectedCategory.value);
  // 依 name 排序
  // 特別用了 [...result]，避免直接對 areas.value 做 .sort()，這樣不會改動 Firebase 回傳的原始資料順序。
  return [...result].sort((a, b) =>
    String(a.name || "").localeCompare(String(b.name || ""), "zh-Hant", {
      numeric: true,
      sensitivity: "base",
    })
  );
});

// =========================
// Error
// =========================

const displayError = computed(() => {
  return operationError.value || dataError.value;
});

// =========================
// Edit Area
// =========================

function openEdit(area) {
  operationError.value = "";

  editArea.value = area;

  editDialog.value = true;
}

// =========================
// Save Area
// =========================

async function handleSaveArea(area) {
  savingArea.value = true;

  operationError.value = "";

  try {
    await updateArea(area.id, {
      name: area.name,
      status: area.status,
      cost: area.cost ?? 0,
      icon: area.icon,
      photos: area.photos ?? [],
      message: area.message ?? "",
    });

    editDialog.value = false;
  } catch (error) {
    operationError.value = error.message || "Area 儲存失敗";
  } finally {
    savingArea.value = false;
  }
}

// =========================
// Create Area
// =========================

async function handleCreateArea(area) {
  creatingArea.value = true;

  operationError.value = "";

  try {
    await createArea(area);

    addDialog.value = false;
  } catch (error) {
    operationError.value = error.message || "Area 新增失敗";
  } finally {
    creatingArea.value = false;
  }
}

// =========================
// Todo
// =========================

async function handleUpdateTodo(areaId, index, done) {
  operationError.value = "";

  try {
    await updateTodo(areaId, index, done);
  } catch (error) {
    operationError.value = error.message || "Todo 更新失敗";
  }
}

// =========================
// Photo Preview
// =========================

function showImage(image, photos = []) {
  if (!image) return;

  previewImage.value = image;

  previewPhotos.value = photos;

  previewDialog.value = true;
}

// =========================
// Upload Photo
// =========================

function uploadPhoto() {
  window.open(uploadUrl, "_blank", "width=520,height=620");
}

// =========================
// Category Selector
// =========================

function onSelectCategory(category) {
  selectedCategory.value = category;

  showSelector.value = false;
}

// =========================
// Lifecycle
// =========================

onMounted(() => {
  loadAreas();
});

onBeforeUnmount(() => {
  dispose();
});
</script>
