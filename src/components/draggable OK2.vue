<template>
  <div class="q-pa-md">
    <q-tree :nodes="treeData" node-key="id" default-expand-all>
      <!-- 自訂節點（包 draggable） -->
      <template #default-header="prop">
        <draggable
          v-model="prop.node.children"
          group="tree"
          item-key="id"
          ghost-class="ghost"
        >
          <template #item="{ element }">
            <div class="row items-center q-pa-xs bg-grey-2 q-mb-xs">
              🌳 {{ element.label }}
            </div>
          </template>
        </draggable>

        <div class="q-ml-sm">📁 {{ prop.node.label }}</div>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable"; // Vue3版本

// tree data
const treeData = ref([
  {
    id: 1,
    label: "Root 1",
    children: [
      { id: 2, label: "Child 1-1" },
      { id: 3, label: "Child 1-2" },
    ],
  },
  {
    id: 4,
    label: "Root 2",
    children: [{ id: 5, label: "Child 2-1" }],
  },
]);
</script>

<style>
.ghost {
  opacity: 0.4;
}
</style>
