<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="area in areas"
      :key="area.id"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <!-- 編輯 -->
      <!-- 照片：image + photos -->
      <!-- 上傳照片 -->
      <!-- Todo -->

      <AreaCard
        :area="area"
        @edit="$emit('edit', $event)"
        @photo="(...args) => $emit('photo', ...args)"
        @upload="$emit('upload', $event)"
        @todo="(...args) => $emit('todo', ...args)"
      />
    </div>
  </div>
</template>

<script setup>
import AreaCard from "./AreaCard.vue";

// =========================
// Props
// =========================

defineProps({
  areas: {
    type: Array,
    default: () => [],
  },
});

// =========================
// Events
// =========================

defineEmits(["edit", "photo", "upload", "todo"]);
</script>
