<template>
<!-- <p>??</p> -->
  <q-card flat bordered>
    <!-- <h6>show me the money</h6> -->
    <q-card-section>
      <div class="text-h6 q-mb-lg">Overview</div>

      <q-input
        v-model="project.Overview.Name"
        label="Project Name"
        outlined
        @update:model-value="emitSave"
      />

      <q-input
        class="q-mt-md"
        v-model="project.Overview.Description"
        label="Description"
        type="textarea"
        rows="4"
        outlined
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
