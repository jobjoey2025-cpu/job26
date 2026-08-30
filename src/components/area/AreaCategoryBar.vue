<template>
  <div class="row q-col-gutter-sm q-mb-lg">
    <div class="col-auto">
      <q-btn
        icon="grid_view"
        label="選擇區域"
        color="primary"
        @click="$emit('open-selector')"
      />
    </div>

    <div
      v-for="category in categories"
      :key="category.name"
      class="col-auto"
    >
      <q-btn
        rounded
        outline
        :color="modelValue === category.name ? 'primary' : 'grey-7'"
        :icon="category.icon"
        :label="category.name"
        @click="$emit('update:modelValue', category.name)"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: "All",
  },
  categories: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue", "open-selector"]);
</script>

