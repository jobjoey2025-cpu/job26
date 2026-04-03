<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const items = ref([
  { id: 1, name: "A" },
  { id: 2, name: "B" },
]);
</script>

<template>
  🎯 最終正確EZ範例（你可以直接測）
  <draggable v-model="items" item-key="id">
    <template #item="{ element }">
      <div>{{ element.name }}</div>
    </template>
  </draggable>
</template>
