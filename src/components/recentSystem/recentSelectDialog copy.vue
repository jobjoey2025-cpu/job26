```vue
<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card style="width: 500px; max-width: 90vw">
      <q-card-section>
        <div class="text-h6">選擇區域</div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <!-- 直接抓 parent 傳進來的 categories -->
          <div
            v-for="category in categories"
            :key="category.name"
            class="col-6 col-sm-4"
          >
            <q-btn
              class="full-width"
              unelevated
              :icon="category.icon"
              :label="category.name"
              :color="selected === category.name ? 'primary' : 'grey-7'"
              :outline="selected !== category.name"
              @click="selectCategory(category)"
            />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" color="primary" @click="close" />
      </q-card-actions>
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

const emit = defineEmits(["update:modelValue", "select"]);

function selectCategory(category) {
  emit("select", category);
}

function close() {
  emit("update:modelValue", false);
}
</script>
```
