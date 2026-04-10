<template>
  <div class="q-pa-md row q-col-gutter-sm">

    <!-- 左邊 Tree -->
    <div class="col-12 col-sm-6">
      <h6 class="text-center">
        tree input 沒有 Table 快, 但是比較好閱讀 <br />
        為什麼 不用 mindMap → mobile 不順
      </h6>

      <q-tree
        :nodes="simple"
        node-key="id"
        v-model:ticked="ticked"
        v-model:expanded="expanded"
        v-model:selected="selected"
        :tick-strategy="tickStrategy"
        default-expand-all
        @update:selected="openLink"
      />
    </div>

    <!-- 右邊控制 + 顯示 -->
    <div class="col-12 col-sm-6">

      <q-option-group
        v-model="tickStrategy"
        :options="tickStrategies"
      />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div v-for="tick in ticked" :key="tick">
        {{ tick }}
      </div>

      <!-- 面板 -->
      <q-tab-panels
        v-model="selected"
        animated
      >
        <q-tab-panel name="ggb">
          <div class="text-h5">Google Panel</div>
        </q-tab-panel>
      </q-tab-panels>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

/* ✅ 建議：每個 node 一定要有 id */
const simple = [
  {
    id: "ggb",
    label: "GGB Google",
    link: "https://www.google.com/?hl=zh_TW",
    children: [
      {
        id: "income",
        label: "income 軍機處",
        children: [
          {
            id: "job104",
            label: "104 Quasar",
            link: "https://104vtol.netlify.app/#/",
          }
        ]
      }
    ]
  }
];

const selected = ref(null);
const ticked = ref([]);
const expanded = ref([]);
const tickStrategy = ref("strict");

const tickStrategies = [
  { value: "none", label: "None" },
  { value: "strict", label: "Strict" },
  { value: "leaf", label: "Leaf" },
  { value: "leaf-filtered", label: "Leaf Filtered" },
];

/* ✅ 用 id 找 node（比 label 安全） */
const openLink = (key) => {
  const findNode = (nodes) => {
    for (const node of nodes) {
      if (node.id === key) return node;
      if (node.children) {
        const found = findNode(node.children);
        if (found) return found;
      }
    }
  };

  const node = findNode(simple);

  if (node?.link && node.link !== "NA") {
    window.open(node.link, "_blank");
  }
};
</script>