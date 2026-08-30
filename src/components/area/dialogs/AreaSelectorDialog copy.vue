<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="selector-card">
      <q-card-section class="row items-center">
        <div class="text-h6">選擇區域</div>
        <q-space />
        <q-btn
          flat
          round
          dense
          icon="close"
          aria-label="關閉"
          @click="$emit('update:modelValue', false)"
        />
      </q-card-section>

      <q-separator />

      <q-card-section class="row q-col-gutter-md">
        <div
          v-for="category in categories"
          :key="category.name"
          class="col-6 col-sm-4"
        >
        
          <q-btn
            class="full-width"
            stack
            unelevated
            :outline="selected !== category.name"
            :color="selected === category.name ? 'primary' : 'grey-7'"
            :icon="category.icon"
            :label="category.name"
            @click="$emit('select', category.name)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  categories: {
    type: Array,
    default: () => [],
  },
  selected: {
    type: String,
    default: "All",
  },
});

defineEmits(["update:modelValue", "select"]);
</script>

<style scoped>
.selector-card {
  width: min(560px, 92vw);
  max-width: 92vw;
}
</style>
