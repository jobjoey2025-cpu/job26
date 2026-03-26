<template>
  <q-page padding>
    <q-tree
      :nodes="nodes"
      node-key="id"
      label-key="name"
      children-key="children"
      default-expand-all
      tick-strategy="leaf"
      show-checkbox
      v-model:ticked="ticked"
    />

    <div class="q-mt-md">
      <div v-if="ticked.length === 0">No selection</div>
      <div v-else>
        <div v-for="id in ticked" :key="id">
          {{ nodeMap[id]?.name }}
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const ticked = ref([]);

const nodes = ref([
  {
    id: 1,
    name: "Root技能樹",
    children: [
      {
        id: 2,
        name: "擅長工具",
        children: [
          {
            id: 3,
            name: "電腦輔助工程",
            children: [
              { id: 4, name: "icePak" },
              { id: 5, name: "Ansys" },
            ],
          },
          {
            id: 6,
            name: "工程製圖",
            children: [
              { id: 7, name: "AutoCad 2D" },
              { id: 8, name: "Pro/E" },
              { id: 9, name: "SolidWorks" },
            ],
          },
          {
            id: 10,
            name: "辦公室應用",
            children: [
              { id: 11, name: "Access" },
              { id: 12, name: "Project" },
              { id: 13, name: "Excel" },
              { id: 14, name: "Xmind" },
            ],
          },
          {
            id: 15,
            name: "品保類",
            children: [
              { id: 16, name: "DFMEA" },
              { id: 17, name: "6 Sigma" },
              { id: 18, name: "SPC" },
            ],
          },
          {
            id: 19,
            name: "程式設計",
            children: [
              { id: 20, name: "javascript" },
              { id: 21, name: "Python" },
              { id: 22, name: "Visual Basic" },
              { id: 23, name: "C#" },
            ],
          },
        ],
      },
      {
        id: 24,
        name: "工作技能",
        children: [
          {
            id: 25,
            name: "專案管理",
            children: [
              { id: 26, name: "進度控管" },
              { id: 27, name: "專案溝通" },
            ],
          },
          {
            id: 28,
            name: "機構設計",
            children: [
              { id: 29, name: "電腦輔助設計" },
              { id: 30, name: "樣品圖樣" },
              { id: 31, name: "專利申請" },
            ],
          },
          {
            id: 32,
            name: "品質工程",
            children: [
              { id: 33, name: "半導體" },
              { id: 34, name: "電子散熱" },
              { id: 35, name: "TFTLCD" },
            ],
          },
          {
            id: 60, // ⚠️ 修正重複 id
            name: "團隊協調",
            children: [{ id: 36, name: "人員培訓與激勵" }],
          },
        ],
      },
    ],
  },
]);

// 🔥 建立查表（超重要）
const nodeMap = {};

function buildMap(nodes) {
  nodes.forEach((n) => {
    nodeMap[n.id] = n;
    if (n.children) buildMap(n.children);
  });
}
buildMap(nodes.value);
</script>
