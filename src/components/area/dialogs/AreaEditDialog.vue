```vue
<template>
  <q-dialog
    :model-value="modelValue"
    persistent
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="dialog-card">
      <q-form @submit.prevent="submit">
        <!-- ========================= -->
        <!-- Header -->
        <!-- ========================= -->

        <q-card-section>
          <div class="text-h6">編輯 Area</div>
        </q-card-section>

        <!-- ========================= -->
        <!-- Basic Info -->
        <!-- ========================= -->

        <q-card-section class="q-gutter-md">
          <!-- Area Name -->
          <q-input
            v-model.trim="draft.name"
            label="Area Name"
            outlined
            :rules="[(value) => Boolean(value) || '請輸入 Area 名稱']"
          />

          <!-- Message -->
          <q-input
            v-model="draft.message"
            outlined
            type="textarea"
            autogrow
            label="訊息"
            maxlength="500"
            counter
            :input-style="{
              minHeight: '200px',
              lineHeight: '1.6',
            }"
          />

          <!-- Tag -->
          <q-input
            v-model.trim="draft.tag"
            label="Tag"
            outlined
            :rules="[(value) => Boolean(value) || '請輸入分類名稱']"
          />

          <!-- Status -->
          <q-select
            v-model="draft.status"
            :options="statusOptions"
            label="Status"
            outlined
          />

          <!-- Cost -->
          <q-input
            v-model.number="draft.cost"
            type="number"
            label="Cost"
            outlined
            min="0"
          />

          <!-- Icon -->
          <q-input v-model.trim="draft.icon" label="Icon" outlined />

          <q-separator />

          <!-- ========================= -->
          <!-- Photos -->
          <!-- ========================= -->

          <div class="text-subtitle1">📷 Photos</div>

          <!-- Photo List -->
          <div v-if="draft.photos.length" class="column q-gutter-sm">
            <div
              v-for="(photo, index) in draft.photos"
              :key="index"
              class="row items-center q-col-gutter-sm"
            >
              <!-- URL -->
              <div class="col">
                <q-input
                  v-model.trim="draft.photos[index]"
                  label="Image URL"
                  dense
                  outlined
                />
              </div>

              <!-- Delete -->
              <div class="col-auto">
                <q-btn
                  type="button"
                  flat
                  round
                  color="negative"
                  icon="delete"
                  aria-label="刪除照片"
                  @click="removePhoto(index)"
                />
              </div>
            </div>
          </div>

          <!-- No Photos -->
          <div v-else class="text-caption text-grey-6">目前沒有照片</div>

          <!-- Add Photo -->
          <q-btn
            type="button"
            outline
            color="primary"
            icon="add"
            label="新增照片"
            @click="addPhoto"
          />
        </q-card-section>

        <!-- ========================= -->
        <!-- Actions -->
        <!-- ========================= -->

        <q-card-actions align="right">
          <!-- Cancel -->
          <q-btn
            type="button"
            flat
            label="取消"
            :disable="saving"
            @click="cancel"
          />

          <!-- Save -->
          <q-btn
            color="primary"
            label="儲存"
            type="submit"
            :loading="saving"
            :disable="saving || !draft.name.trim()"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";

// =========================
// Props
// =========================

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

// =========================
// Events
// =========================

const emit = defineEmits(["update:modelValue", "save"]);

// =========================
// Draft
// =========================

const draft = ref(createDraft());

// =========================
// Sync Area → Draft
// =========================

watch(
  [() => props.modelValue, () => props.area],

  ([isOpen, area]) => {
    if (!isOpen) return;

    draft.value = createDraft(area);
  },

  {
    immediate: true,
  }
);

// =========================
// Create Draft
// =========================

function createDraft(area = null) {
  return {
    id: area?.id ?? "",

    name: area?.name ?? "",

    message: area?.message ?? "",

    tag: area?.tag ?? "",

    status: area?.status ?? "",

    cost: Number(area?.cost ?? 0),

    icon: area?.icon ?? "place",

    photos: Array.isArray(area?.photos) ? [...area.photos].filter(Boolean) : [],
  };
}

// =========================
// Add Photo
// =========================

function addPhoto() {
  if (!Array.isArray(draft.value.photos)) {
    draft.value.photos = [];
  }

  draft.value.photos.push("");
}

// =========================
// Remove Photo
// =========================

function removePhoto(index) {
  if (index < 0 || index >= draft.value.photos.length) {
    return;
  }

  draft.value.photos.splice(index, 1);
}

// =========================
// Cancel
// =========================

function cancel() {
  if (props.saving) return;

  emit("update:modelValue", false);
}

// =========================
// Submit
// =========================

function submit() {
  if (props.saving) return;

  const name = draft.value.name.trim();

  if (!draft.value.id || !name) {
    return;
  }

  // 清理照片 URL
  const photos = draft.value.photos
    .map((photo) => photo.trim())
    .filter(Boolean);

  // 統一輸出資料
  emit("save", {
    ...draft.value,

    name,

    tag: draft.value.tag.trim(),

    icon: draft.value.icon.trim(),

    cost: Number(draft.value.cost || 0),

    photos,
  });
}
</script>

<style scoped>
.dialog-card {
  width: min(520px, 92vw);

  max-width: 92vw;
}
</style>
```
