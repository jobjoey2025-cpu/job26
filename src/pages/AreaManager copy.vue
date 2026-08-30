<template>
  <q-page class="bg-grey-2 q-pa-md">
    <AreaHeader v-model:view-mode="viewMode" />

    <AreaCategoryBar
      v-model="selectedCategory"
      :categories="categories"
      @open-selector="showSelector = true"
    />

    <AreaCardView
      v-if="viewMode === 'card'"
      :areas="filteredItems"
      @edit="openEdit"
      @photo="showImage"
      @upload="uploadPhoto"
      @todo="updateTodo"
    />

    <AreaListView
      v-else
      :areas="filteredItems"
      @photo="showImage"
      @upload="uploadPhoto"
    />

    <div
      v-if="filteredItems.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有符合的 Area
    </div>

    <AreaEditDialog
      v-model="editDialog"
      :area="editArea"
      :status-options="statusOptions"
      @save="saveArea"
    />

    <AreaAddDialog v-model="addDialog" :area="newArea" @create="createArea" />

    <AreaPhotoPreview v-model="previewDialog" :image="previewImage" />

    <AreaSelectorDialog v-model="showSelector" @select="onSelectCategory" />

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="primary" icon="add" @click="addDialog = true" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import AreaHeader from "components/area/AreaHeader.vue";
import AreaCategoryBar from "components/area/AreaCategoryBar.vue";
import AreaCardView from "components/area/AreaCardView.vue";
import AreaListView from "components/area/AreaListView.vue";

import AreaEditDialog from "components/area/AreaEditDialog.vue";
import AreaAddDialog from "components/area/AreaAddDialog.vue";
import AreaPhotoPreview from "components/area/AreaPhotoPreview.vue";
import AreaSelectorDialog from "components/area/AreaSelectorDialog.vue";

import { useAreas } from "composables/useAreas";

// =========================
// UI State
// =========================

const viewMode = ref("card");

const selectedCategory = ref("All");

const showSelector = ref(false);

const editDialog = ref(false);

const addDialog = ref(false);

const previewDialog = ref(false);

const previewImage = ref("");

// =========================
// Area Data
// =========================

const { areas, loadAreas, updateArea, updateTodo, createArea } = useAreas();

// =========================
// Category
// =========================

const categories = [
  { name: "All", icon: "apps" },
  { name: "living", icon: "home" },
  { name: "bath", icon: "shower" },
  { name: "tent", icon: "holiday_village" },
  { name: "car", icon: "no_crash" },
  { name: "doc", icon: "document_scanner" },
];

const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return areas.value;
  }

  return areas.value.filter((area) => area.tag === selectedCategory.value);
});

// =========================
// Edit
// =========================

const editArea = ref({});

function openEdit(area) {
  editArea.value = JSON.parse(JSON.stringify(area));

  editDialog.value = true;
}

// =========================
// Photo
// =========================

function showImage(img) {
  previewImage.value = img;

  previewDialog.value = true;
}

// =========================
// Category Selector
// =========================

function onSelectCategory(tag) {
  selectedCategory.value = tag;

  showSelector.value = false;
}

// =========================
// Init
// =========================

onMounted(() => {
  loadAreas();
});
</script>
