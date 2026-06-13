<template>
  <q-page padding>
    <!-- Header -->
    <div class="text-h4 q-mb-md">🧠 AI 工具比較資料庫</div>

    <q-banner class="bg-blue-1 q-mb-md">
      建築 / 室內 / BIM / AI 生圖工具評估系統
    </q-banner>

    <!-- Filters -->
    <div class="row q-col-gutter-md q-mb-md items-end">
      <div class="col-3">
        <q-select
          v-model="filter.category"
          :options="categoryOptions"
          label="工具類型"
          dense
          outlined
        />
      </div>

      <div class="col-3">
        <q-select
          v-model="filter.domain"
          :options="domainOptions"
          label="適用領域"
          dense
          outlined
        />
      </div>

      <div class="col-3">
        <q-select
          v-model="filter.local"
          :options="localOptions"
          label="部署方式"
          dense
          outlined
        />
      </div>

      <div class="col-3">
        <q-btn
          label="顯示全部"
          color="primary"
          class="full-width"
          @click="resetFilter"
        />
      </div>
    </div>

    <!-- Table -->
    <q-table
      title="AI Tools Database"
      :rows="filteredRows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      dense
    >
      <!-- rating -->
      <template v-slot:body-cell-rating="props">
        <q-td :props="props">
          <q-rating v-model="props.row.rating" max="5" size="16px" readonly />
        </q-td>
      </template>

      <!-- local -->
      <template v-slot:body-cell-local="props">
        <q-td :props="props">
          <q-chip
            :color="props.row.local ? 'green' : 'grey'"
            text-color="white"
          >
            {{ props.row.local ? "Local" : "Cloud" }}
          </q-chip>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const ALL = "ALL";

/* -------------------------
   Filter State
-------------------------- */
const filter = ref({
  category: ALL,
  domain: ALL,
  local: ALL,
});

/* -------------------------
   Options
-------------------------- */
const categoryOptions = [
  ALL,
  "Image Generation",
  "AI Editing",
  "BIM Tool",
  "Workflow",
  "Batch Processing",
];

const domainOptions = [
  ALL,
  "Architecture",
  "Interior",
  "Landscape",
  "Urban",
  "BIM",
];

const localOptions = [ALL, "Local", "Cloud"];

/* -------------------------
   Table Columns
-------------------------- */
const columns = [
  { name: "name", label: "工具", field: "name", sortable: true },
  { name: "category", label: "類型", field: "category", sortable: true },
  { name: "domain", label: "領域", field: "domain", sortable: true },
  { name: "rating", label: "能力", field: "rating", sortable: true },
  { name: "local", label: "部署", field: "local", sortable: true },
  { name: "useCase", label: "用途", field: "useCase" },
];

/* -------------------------
   Data
-------------------------- */
const rows = [
  {
    name: "Nano Banana Pro",
    category: "Image Generation",
    domain: "Architecture",
    rating: 5,
    local: false,
    useCase: "文字/圖片生成 + 風格遷移",
  },
  {
    name: "GPT Image",
    category: "AI Editing",
    domain: "Interior",
    rating: 4,
    local: false,
    useCase: "概念設計 / 剪影 / 空間發想",
  },
  {
    name: "Stable Diffusion (ComfyUI)",
    category: "Image Generation",
    domain: "Architecture",
    rating: 5,
    local: true,
    useCase: "批次生成 / LoRA / 高控制",
  },
  {
    name: "Revit BIM",
    category: "BIM Tool",
    domain: "BIM",
    rating: 5,
    local: true,
    useCase: "建模 / 施工圖 / 造價",
  },
  {
    name: "建築學長 Tool DB",
    category: "Workflow",
    domain: "Architecture",
    rating: 3,
    local: false,
    useCase: "工具導航 / 資源整理",
  },
];

/* -------------------------
   Reset Filter
-------------------------- */
const resetFilter = () => {
  filter.value = {
    category: ALL,
    domain: ALL,
    local: ALL,
  };
};

/* -------------------------
   Filter Logic
-------------------------- */
const filteredRows = computed(() => {
  return rows.filter((r) => {
    const matchCategory =
      filter.value.category === ALL
        ? true
        : r.category === filter.value.category;

    const matchDomain =
      filter.value.domain === ALL ? true : r.domain === filter.value.domain;

    const matchLocal =
      filter.value.local === ALL
        ? true
        : filter.value.local === "Local"
        ? r.local
        : !r.local;

    return matchCategory && matchDomain && matchLocal;
  });
});
</script>
