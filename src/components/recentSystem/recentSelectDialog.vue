```vue
<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card
      style="
        width: 500px;
        max-width: 90vw;
      "
    >
      <q-card-section>
        <div class="text-h6">
          最近功能
        </div>

        <div class="text-caption text-grey-7">
          選擇要開啟的功能
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row q-col-gutter-sm">

          <div
            v-for="item in items"
            :key="item.id"
            class="col-12"
          >
            <q-btn
              class="full-width"
              align="left"
              no-caps
              :color="item.color || 'primary'"
              :outline="item.outline || false"
              unelevated
              :icon="item.icon"
              :label="item.label"
              @click="selectItem(item)"
            />
          </div>

        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat
          label="取消"
          color="primary"
          @click="close"
        />
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

  items: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "update:modelValue",
  "select",
]);

function selectItem(item) {
  emit("select", item);
}

function close() {
  emit("update:modelValue", false);
}
</script>
```
