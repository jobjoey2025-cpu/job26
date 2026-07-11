<template>
  <q-card flat bordered v-if="project">
    <q-card-section>
      <div class="text-h6">Overview</div>

      <q-input
        v-model="project.Overview.Name"
        label="Project Name"
        outlined
        @update:model-value="emitSave"
      />

      <q-input
        class="q-mt-md"
        v-model="project.Overview.Description"
        type="textarea"
        outlined
        rows="4"
        label="Description"
        @update:model-value="emitSave"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["save"]);

function emitSave() {
  emit("save");
}
</script>
