<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="area in areas"
      :key="area.id"
      class="col-12 col-sm-6 col-md-4 col-lg-3"
    >
      <AreaCard
        :area="area"
        @edit="$emit('edit', $event)"
        @photo="$emit('photo', $event)"
        @upload="$emit('upload', $event)"
        @todo="(...args) => $emit('todo', ...args)"
      />
    </div>
  </div>
</template>

<script setup>
import AreaCard from "./AreaCard.vue";

defineProps({
  areas: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["edit", "photo", "upload", "todo"]);
</script>

