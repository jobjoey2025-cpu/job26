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
      <!-- <q-tooltip> I am groot! </q-tooltip> -->
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <span class="cursor-pointer">
            {{ props.row.name }}

            <q-tooltip class="bg-purple text-body1" :offset="[10, 10]">
              {{ props.row.tooltip }}
            </q-tooltip>
          </span>
        </q-td>
      </template>

      <!-- rating -->
      <template v-slot:body-cell-rating="props">
        <q-td :props="props">
          <q-rating v-model="props.row.rating" max="5" size="26px" readonly />
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
        <!-- <q-tooltip> I am groot! </q-tooltip> -->
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
  // { name: "tooltips", label: "提示", field: "tooltips" },
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
    tooltip: "Nano Banana Pro 是基於 Gemini 3 Pro 的新一代文字與圖像生成模型",
  },
  {
    name: "GPT Image",
    category: "AI Editing",
    domain: "Interior",
    rating: 4,
    local: false,
    useCase: "概念設計 / 剪影 / 空間發想",
    tooltip: "need Token",
  },
  {
    name: "Stable Diffusion",
    category: "Image Generation",
    domain: "Architecture",
    rating: 5,
    local: true,
    useCase: "批次生成 / LoRA / 高控制",
    tooltip: "(ComfyUI) 使用龍蝦批次",
  },
  {
    name: "Revit BIM",
    category: "BIM Tool",
    domain: "BIM",
    rating: 5,
    local: true,
    useCase: "建模 / 施工圖 / 造價",
    tooltip: "不好安裝 & 新版有 ai \\ BIM revit - 價格估算 變化速度 & 設計變更 (專案太大 need cowork so 隨經濟預算變化 是常有的)",
  },
  {
    name: "建築學長 ",
    category: "Workflow",
    domain: "Architecture",
    rating: 3,
    local: false,
    useCase: "工具導航 / 資源整理",
    tooltip: "Tool DB (支付寶充值 AC help)",
  },
  {
    name: "blender 3D",
    category: "Workflow",
    domain: "Architecture",
    rating: 3,
    local: false,
    useCase: "工具導航 / 外掛 plugin",
    tooltip: "剪影法 角色設計 簡化與聚焦",
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
