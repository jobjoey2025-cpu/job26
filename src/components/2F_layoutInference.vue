```vue
<template>
  <q-page padding>
    <!-- Header -->
    <div class="text-h4 q-mb-md">🎨 AI Style Engine</div>

    <q-banner class="bg-orange-1 q-mb-lg">
      建築外觀 → 風格辨識 → 家具布局 → 材質推薦 → AI 改圖 → 效果圖
    </q-banner>

    <!-- Logic Engine -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">🧠 推論 組合邏輯 - 不能衝突（Logic Composition）</div>

        <pre>
空間需求
    ↓
風格推論
    ↓
元素組合
    ↓
配置生成
    ↓
效果圖
    ↓
AB TEST (0 1 choose)
        </pre>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-chip>* 住宅</q-chip>
        <q-chip>商空</q-chip>
        <q-chip>飯店</q-chip>
        <q-chip>* 預算</q-chip>
        <q-chip>建築外觀 \ 庭園造景</q-chip>
        <q-chip>* 文化偏好</q-chip>
      </q-card-section>
    </q-card>
<!-- Exterior Interior -->
<q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">🏠 Exterior → Interior Alignment</div>
        <p>室內設計風格 統一 建築外觀</p>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item>
          <q-item-section> 清水模 </q-item-section>

          <q-item-section side> 極簡風 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section> 日式木構 </q-item-section>

          <q-item-section side> 侘寂風 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section> 玻璃帷幕 </q-item-section>

          <q-item-section side> 科技風 </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- Banana -->
    <q-expansion-item
      icon="auto_fix_high"
      label="Nano Banana 智能改圖"
      default-opened
      class="q-mb-md"
    >
    <p>banana 智能改圖 銜接建築風格</p>
      <q-list bordered separator>
        <q-item>
          <q-item-section> 改成侘寂風 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section> 增加植栽 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section> 改暖光 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section> 換木地板 </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    
    <!-- Furniture AI -->
    <q-expansion-item
      icon="chair"
      label="家具智能布局 AI"
      default-opened
      class="q-mb-md"
    >
      <q-card flat bordered>
        <q-card-section>
          <div class="text-subtitle1">自動考量：</div>

          <q-chip color="primary" text-color="white"> 動線 </q-chip>

          <q-chip color="primary" text-color="white"> 收納 </q-chip>

          <q-chip color="primary" text-color="white"> 採光 </q-chip>

          <q-chip color="primary" text-color="white"> 視線 </q-chip>

          <pre class="q-mt-md">
沙發 (床 能平躺 是最優先的 on-bed-NB)
 ↓
茶几 (床頭櫃 cellPhone water 衛生紙)
 ↓
電視牆 (收納牆 \ 一次一個主題)
 ↓
走道距離 (不要踢到腳)
 ↓
照明 (色溫 清晰度 辨別速度)
          </pre>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- Style Components -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">🎨 色調 / 元素 / 佈局</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1">Color</div>

        <q-chip color="brown">暖木色</q-chip>
        <q-chip color="grey">灰白極簡</q-chip>
        <q-chip color="blue-grey">工業風</q-chip>
        <q-chip color="amber">侘寂</q-chip>

        <div class="text-subtitle1 q-mt-lg">Elements</div>

        <q-chip>木格柵</q-chip>
        <q-chip>石材</q-chip>
        <q-chip>金屬</q-chip>
        <q-chip>植栽</q-chip>
        <q-chip>燈光</q-chip>

        <div class="text-subtitle1 q-mt-lg">Layout</div>

        <q-chip>開放式</q-chip>
        <q-chip>回字動線</q-chip>
        <q-chip>飯店式</q-chip>
        <q-chip>展示型商空</q-chip>
      </q-card-section>
    </q-card>



    <!-- Style DB -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h5">📚 Style DB</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-tree :nodes="styleTree" node-key="label" default-expand-all />
      </q-card-section>
    </q-card>

    <!-- WYSIWYG -->
    <q-card flat bordered class="bg-green-1">
      <q-card-section>
        <div class="text-h5">🖼 所見即所得（WYSIWYG）</div>

        <pre>
材質拖拉
    ↓
家具拖拉
    ↓
風格切換
    ↓
即時效果圖
        </pre>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const styleTree = [
  {
    label: "現代極簡",
    children: [
      { label: "材質" },
      { label: "家具" },
      { label: "色彩" },
      { label: "燈光" },
      { label: "建築外觀" },
    ],
  },
  {
    label: "侘寂",
    children: [
      { label: "木材" },
      { label: "灰泥" },
      { label: "亞麻" },
      { label: "暖光" },
    ],
  },
  {
    label: "工業風",
    children: [{ label: "水泥" }, { label: "金屬" }, { label: "黑色元素" }],
  },
];
</script>
```
