<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="dialog-card">
      <q-form @submit.prevent="submit">
        <q-card-section>
          <div class="text-h6">編輯 Area</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model.trim="draft.name"
            label="Area Name"
            outlined
            :rules="[(value) => Boolean(value) || '請輸入 Area 名稱']"
          />

          <q-input
            v-model="draft.message"
            outlined
            type="textarea"
            autogrow
            label="訊息"
            maxlength="500"
            counter
            :input-style="{ minHeight: '200px', lineHeight: '1.6' }"
          />

          <q-select
            v-model="draft.status"
            :options="statusOptions"
            label="Status"
            outlined
          />

          <q-input
            v-model.number="draft.cost"
            type="number"
            label="Cost"
            outlined
          />

          <q-input v-model="draft.icon" label="Icon" outlined />

          <q-separator />

          <div class="text-subtitle1">📷 Photos</div>

          <div
            v-for="(_, index) in draft.photos"
            :key="index"
            class="row items-center q-col-gutter-sm"
          >
            <div class="col">
              <q-input
                v-model="draft.photos[index]"
                label="Image URL"
                dense
                outlined
              />
            </div>

            <div class="col-auto">
              <q-btn
                flat
                round
                color="negative"
                icon="delete"
                aria-label="刪除照片"
                @click="removePhoto(index)"
              />
            </div>
          </div>

          <q-btn
            outline
            color="primary"
            icon="add"
            label="新增照片"
            @click="addPhoto"
          />
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
            label="儲存"
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
  area: {
    type: Object,
    default: null,
  },
  statusOptions: {
    type: Array,
    default: () => [],
  },
  saving: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "save"]);

const draft = ref(createDraft());

watch(
  [() => props.modelValue, () => props.area],
  ([isOpen, area]) => {
    if (isOpen) draft.value = createDraft(area);
  },
  { immediate: true },
);

function createDraft(area = null) {
  return {
    id: area?.id ?? "",
    name: area?.name ?? "",
    message: area?.message ?? "",
    status: area?.status ?? "",
    cost: area?.cost ?? 0,
    icon: area?.icon ?? "place",
    photos: Array.isArray(area?.photos) ? [...area.photos] : [],
  };
}

function addPhoto() {
  draft.value.photos.push("");
}

function removePhoto(index) {
  draft.value.photos.splice(index, 1);
}

function submit() {
  if (!draft.value.id || !draft.value.name.trim()) return;

  emit("save", {
    ...draft.value,
    name: draft.value.name.trim(),
    photos: draft.value.photos.filter(Boolean),
  });
}
</script>

<style scoped>
.dialog-card {
  width: min(520px, 92vw);
  max-width: 92vw;
}
</style>

