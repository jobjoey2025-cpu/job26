<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="note-dialog">
      <q-card-section class="row items-center">
        <div class="text-h6">快速筆記</div>
        <q-space />
        <q-btn v-close-popup flat round dense icon="close" aria-label="關閉" />
      </q-card-section>
      <q-separator />
      <q-card-section class="q-pt-md">
        <q-list bordered separator class="rounded-list">
          <q-item v-for="note in notes" :key="note">
            <q-item-section avatar>
              <q-icon name="check_circle_outline" color="primary" />
            </q-item-section>
            <q-item-section>{{ note }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="完成" />
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
  notes: {
    type: Array,
    required: true,
  },
});

defineEmits(["update:modelValue"]);
</script>

<style scoped>
.note-dialog {
  width: min(92vw, 620px);
  border-radius: 14px;
}

.rounded-list {
  border-radius: 14px;
}
</style>
