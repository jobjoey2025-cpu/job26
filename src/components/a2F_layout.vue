<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md">Living System Planner</div>

    <q-splitter v-model="splitter" style="height: calc(100vh - 120px)">
      <!-- LEFT -->

      <template v-slot:before>
        <q-card flat bordered class="fit">
          <q-card-section class="text-h6"> Function </q-card-section>

          <q-separator />

          <q-tree
            :nodes="nodes"
            node-key="id"
            label-key="label"
            children-key="children"
            default-expand-all
            selected-color="primary"
            v-model:selected="selected"
          />
        </q-card>
      </template>

      <!-- RIGHT -->

      <template v-slot:after>
        <q-card flat bordered class="fit">
          <q-card-section>
            <div class="text-h6">
              {{ currentTitle }}
            </div>

            <div class="text-caption text-grey">
              {{ currentGoal }}
            </div>
          </q-card-section>

          <q-separator />

          <q-list bordered separator>
            <q-item v-for="task in currentTasks" :key="task.label">
              <q-item-section avatar>
                <q-checkbox v-model="task.done" />
              </q-item-section>

              <q-item-section>
                {{ task.label }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </template>
    </q-splitter>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

const splitter = ref(28);

const selected = ref("recovery");

const nodes = [
  {
    id: "recovery",
    label: "Recovery",
    goal: "目的：旅遊放鬆，回老家看看。",
    tasks: [
      { label: "睡三天", done: false },
      { label: "SUAO 地區巡邏", done: false },
      { label: "調整作息", done: false },
    ],
  },

  {
    id: "digital",
    label: "Digital Twin",
    goal: "目的：阿媽 House 虛實對齊 in mobile",
    tasks: [
      { label: "House 量測", done: false },
      { label: "CAD 建模 （Reality ↔ CAD quasar BLG）", done: false },
      { label: "Reality Alignment（虛實對齊）", done: false },
      { label: "推進 House 專案", done: false },
    ],
  },

  {
    id: "maintenance",
    label: "Maintenance",
    goal: "目的：住宅維護，延長住宅使用壽命。",
    tasks: [
      { label: "修地磚", done: false },
      { label: "填平2F院子", done: false },
      { label: "更換矽酸鈣板 - 高張力螺絲", done: false },
      { label: "家具 展示櫃 擺設", done: false },
      { label: "鏽變漆", done: false },
      { label: "帆布 on 角料", done: false },
      { label: "帳篷佈置，帳篷測試", done: false },
    ],
  },

  {
    id: "storage",
    label: "Storage",
    goal: "整理物品",
    tasks: [
      { label: "洗地毯", done: false },
      { label: "曬棉被", done: false },
      { label: "洗被單", done: false },
      { label: "重組箱子", done: false },
      { label: "分類物品", done: false },
      { label: "淘汰不必要物品 1720 垃圾車", done: false },
    ],
  },

  {
    id: "knowledge",
    label: "Knowledge",
    goal: "累積知識",
    tasks: [
      { label: "拍照", done: false },
      { label: "更新JSON", done: false },
      { label: "寫Blog", done: false },
      { label: "Living PlayBook", done: false },
    ],
  },
];

const current = computed(() => {
  return nodes.find((i) => i.id === selected.value);
});

const currentTitle = computed(() => current.value?.label);

const currentGoal = computed(() => current.value?.goal);

const currentTasks = computed(() => current.value?.tasks ?? []);
</script>
