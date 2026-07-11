<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">PARA Classification</div>

      <div class="text-body2 text-grey-7 q-mb-lg">
        使用 PARA 系統管理專案： Project、Area、Resource、Archive。
      </div>

      <q-option-group
        v-model="project.Overview.PARA"
        :options="options"
        option-value="value"
        option-label="label"
        color="primary"
        @update:model-value="emitSave"
      />

      <q-banner v-if="currentType" rounded class="bg-grey-2 q-mt-lg">
        <div class="text-subtitle2">
          {{ currentType.label }}
        </div>

        <div class="text-body2">
          {{ currentType.description }}
        </div>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },

  paraTypes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["save"]);

function emitSave() {
  emit("save");
}

const options = computed(() => props.paraTypes);

const currentType = computed(() => {
  return props.paraTypes.find(
    (item) => item.value === props.project?.Overview?.PARA
  );
});
</script>
