<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="dialog-card">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">新增 Area</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model.trim="draft.name"
            label="Area 名稱"
            outlined
            autofocus
            :rules="[(value) => Boolean(value) || '請輸入 Area 名稱']"
          />
          <q-input v-model.trim="draft.tag" label="分類 (Tag)" outlined />
          <q-input v-model.trim="draft.photo" label="第一張照片 URL" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="取消"
            :disable="saving"
            @click="$emit('update:modelValue', false)"
          />
          <q-btn
            color="primary"
            label="新增"
            type="submit"
            :loading="saving"
            :disable="!draft.name"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  saving: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "create"]);

const emptyArea = () => ({
  name: "",
  tag: "",
  photo: "",
});

const draft = ref(emptyArea());

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) draft.value = emptyArea();
  },
);

function submit() {
  if (!draft.value.name.trim()) return;

  emit("create", {
    name: draft.value.name.trim(),
    tag: draft.value.tag.trim(),
    photo: draft.value.photo.trim(),
  });
}
</script>

<style scoped>
.dialog-card {
  width: min(440px, 92vw);
  max-width: 92vw;
}
</style>

