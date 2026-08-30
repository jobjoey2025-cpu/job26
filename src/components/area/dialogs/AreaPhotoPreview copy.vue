<template>
  <q-dialog
    :model-value="modelValue"
    maximized
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="bg-black flex flex-center">
      <q-btn
        icon="close"
        flat
        round
        dense
        color="white"
        class="absolute-top-right q-ma-md preview-close"
        aria-label="關閉預覽"
        @click="$emit('update:modelValue', false)"
      />

      <q-img
        :src="image"
        fit="contain"
        class="full-width preview-image"
      />
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  image: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.preview-close {
  z-index: 1;
}

.preview-image {
  height: 100vh;
}
</style>

