<template>
  <q-page class="bg-grey-2 q-pa-md">
    <AreaHeader v-model:view-mode="viewMode" />

    <AreaCategoryBar
      v-model="selectedCategory"
      :categories="categories"
      @open-selector="showSelector = true"
    />

    <q-banner
      v-if="displayError"
      rounded
      class="bg-red-1 text-negative q-mb-md"
    >
      {{ displayError }}
    </q-banner>

    <AreaCardView
      v-if="viewMode === 'card'"
      :areas="filteredAreas"
      @edit="openEdit"
      @photo="showImage"
      @upload="uploadPhoto"
      @todo="handleUpdateTodo"
    />

    <AreaListView
      v-else
      :areas="filteredAreas"
      @photo="showImage"
      @upload="uploadPhoto"
    />

    <div
      v-if="!loading && filteredAreas.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有符合的 Area
    </div>

    <q-inner-loading :showing="loading">
      <q-spinner color="primary" size="48px" />
    </q-inner-loading>

    <AreaEditDialog
      v-model="editDialog"
      :area="editArea"
      :saving="savingArea"
      :status-options="statusOptions"
      @save="handleSaveArea"
    />

    <AreaAddDialog
      v-model="addDialog"
      :saving="creatingArea"
      @create="handleCreateArea"
    />

    <AreaPhotoPreview v-model="previewDialog" :image="previewImage" />

    <AreaSelectorDialog
      v-model="showSelector"
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="primary" icon="add" @click="addDialog = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

import AreaHeader from "../components/area/AreaHeader.vue";
import AreaCategoryBar from "../components/area/AreaCategoryBar.vue";
import AreaCardView from "../components/area/AreaCardView.vue";
import AreaListView from "../components/area/AreaListView.vue";
import AreaEditDialog from "../components/area/dialogs/AreaEditDialog.vue";
import AreaAddDialog from "../components/area/dialogs/AreaAddDialog.vue";
import AreaPhotoPreview from "../components/area/dialogs/AreaPhotoPreview.vue";
import AreaSelectorDialog from "../components/area/dialogs/AreaSelectorDialog.vue";
import { useAreas } from "../composables/useAreas";

const categories = [
  { name: "All", icon: "apps" },
  { name: "living", icon: "home" },
  { name: "bath", icon: "shower" },
  { name: "tent", icon: "holiday_village" },
  { name: "car", icon: "no_crash" },
  { name: "doc", icon: "document_scanner" },
];

const statusOptions = ["整理中", "施工中", "測試中", "待施工"];
const uploadUrl =
  "https://script.google.com/macros/s/AKfycbzJ_d-j6Z_kxKvp7RNu_93yuueqZwiFoNfzm0FI_GR0SM9Av9bwwLRz0p3ZHkEYOE-j/exec";

// 畫面狀態只留在頁面層；子元件不直接接觸 Firebase。
const viewMode = ref("card");
const selectedCategory = ref("All");
const showSelector = ref(false);
const editDialog = ref(false);
const addDialog = ref(false);
const previewDialog = ref(false);
const previewImage = ref("");
const editArea = ref(null);
const savingArea = ref(false);
const creatingArea = ref(false);
const operationError = ref("");

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

const filteredAreas = computed(() => {
  if (selectedCategory.value === "All") return areas.value;
  return areas.value.filter((area) => area.tag === selectedCategory.value);
});

const displayError = computed(
  () => operationError.value || dataError.value,
);

function openEdit(area) {
  operationError.value = "";
  editArea.value = area;
  editDialog.value = true;
}

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

async function handleUpdateTodo(areaId, index, done) {
  operationError.value = "";

  try {
    await updateTodo(areaId, index, done);
  } catch (error) {
    operationError.value = error.message || "Todo 更新失敗";
  }
}

function showImage(image) {
  if (!image) return;
  previewImage.value = image;
  previewDialog.value = true;
}

function uploadPhoto() {
  window.open(uploadUrl, "_blank", "width=520,height=620");
}

function onSelectCategory(category) {
  selectedCategory.value = category;
  showSelector.value = false;
}

onMounted(loadAreas);
onBeforeUnmount(dispose);
</script>
