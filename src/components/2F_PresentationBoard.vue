```vue
<template>
  <q-page padding>
    <!-- Header -->
    <div class="text-h4 q-mb-md">🎨 Interior Presentation Board</div>

    <q-banner class="bg-blue-1 q-mb-lg">
      室內設計展板資料庫（Presentation DB）
      <br />
      CAD → AI → Render → Presentation Board
    </q-banner>

    <!-- Checklist -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h5">📋 展板 Checklist</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list dense>
          <q-item v-for="item in checklist" :key="item">
            <q-item-section avatar>
              <q-checkbox v-model="checked[item]" />
            </q-item-section>

            <q-item-section>
              {{ item }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- Main Sections -->
    <q-timeline color="primary">
      <!-- Cover -->
      <q-timeline-entry
        title="01 封面 Cover"
        subtitle="Hero Image"
        icon="image"
      >
        <q-card flat bordered>
          <q-card-section>
            <q-chip color="primary" text-color="white"> 專案名稱 </q-chip>

            <q-chip color="primary" text-color="white"> 設計理念 </q-chip>

            <q-chip color="primary" text-color="white"> Hero Render </q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Concept -->
      <q-timeline-entry title="02 設計概念" icon="psychology">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 q-mb-sm">Keywords</div>

            <q-chip>自然</q-chip>
            <q-chip>露營</q-chip>
            <q-chip>社交</q-chip>
            <q-chip>模組化</q-chip>
            <q-chip>溫暖</q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Mood Board -->
      <q-timeline-entry title="03 Mood Board" icon="palette">
        <q-card flat bordered>
          <q-card-section>
            <q-chip color="brown"> 木質 </q-chip>

            <q-chip color="grey"> 石材 </q-chip>

            <q-chip color="green"> 植栽 </q-chip>

            <q-chip color="amber"> 暖光 </q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Material -->
      <q-timeline-entry title="04 材質板" icon="grid_view">
        <q-card flat bordered>
          <q-list bordered separator>
            <q-item>
              <q-item-section> 木地板 </q-item-section>

              <q-item-section side> M01 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> 石英磚 </q-item-section>

              <q-item-section side> M02 </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-timeline-entry>

      <!-- Floor Plan -->
      <q-timeline-entry title="05 平面配置圖" icon="floorplan">
        <q-card flat bordered>
          <q-card-section>
            <q-chip>客廳</q-chip>
            <q-chip>餐廳</q-chip>
            <q-chip>廚房</q-chip>
            <q-chip>衛浴</q-chip>
            <q-chip>臥室</q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Analysis -->
      <q-timeline-entry title="06 分析圖" icon="analytics">
        <q-card flat bordered>
          <q-card-section>
            <q-chip color="blue"> 動線 </q-chip>

            <q-chip color="orange"> 視線 </q-chip>

            <q-chip color="green"> 採光 </q-chip>

            <q-chip color="purple"> 日照 </q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Render -->
      <q-timeline-entry title="07 效果圖" icon="photo_library">
        <q-card flat bordered>
          <q-list dense>
            <q-item>
              <q-item-section> 客廳 Render </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> 臥室 Render </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> 外觀 Render </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </q-timeline-entry>

      <!-- Lighting -->
      <q-timeline-entry title="08 照明計畫" icon="light_mode">
        <q-card flat bordered>
          <q-card-section>
            <q-chip>2700K</q-chip>
            <q-chip>3000K</q-chip>
            <q-chip>4000K</q-chip>
          </q-card-section>
        </q-card>
      </q-timeline-entry>

      <!-- Furniture -->
      <q-timeline-entry title="09 家具表" icon="chair">
        <q-table
          flat
          dense
          bordered
          :rows="furnitureRows"
          :columns="furnitureColumns"
          row-key="id"
        />
      </q-timeline-entry>

      <!-- Material Schedule -->
      <q-timeline-entry title="10 材料表" icon="inventory_2">
        <q-table
          flat
          dense
          bordered
          :rows="materialRows"
          :columns="materialColumns"
          row-key="id"
        />
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";

const checklist = [
  "封面 (設計概念封面 文化底蘊分析)",
  "設計概念 (設計理念分析)",
  "Mood Board (Eagle)",
  "動線分析 (空間流線分析圖)",
  "空間尺度分析圖",
  "材質板 (軟裝材質分析)",
  "平面配置圖",
  "軸測圖",
  "立面圖",
  "剖面圖",
  "效果圖 (細分效果圖)",
  "照明計畫",
  "家具表",
  "材料表",
];

const checked = reactive(Object.fromEntries(checklist.map((i) => [i, false])));

const furnitureColumns = [
  { name: "id", label: "編號", field: "id" },
  { name: "name", label: "家具", field: "name" },
  { name: "size", label: "尺寸", field: "size" },
];

const furnitureRows = [
  {
    id: "F01",
    name: "沙發",
    size: "2400mm",
  },
  {
    id: "F02",
    name: "餐桌",
    size: "1800mm",
  },
];

const materialColumns = [
  { name: "id", label: "編號", field: "id" },
  { name: "name", label: "材料", field: "name" },
  { name: "spec", label: "規格", field: "spec" },
];

const materialRows = [
  {
    id: "M01",
    name: "超耐磨木地板",
    spec: "8mm",
  },
  {
    id: "M02",
    name: "石英磚",
    spec: "60×120cm",
  },
];
</script>
```
