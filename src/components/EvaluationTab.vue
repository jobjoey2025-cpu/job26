<template>
  <q-card flat bordered>
    <q-card-section>
      <div class="text-h6 q-mb-md">Evaluation</div>

      <div v-for="item in evaluations" :key="item.key" class="q-mb-xl">
        <div class="row items-center justify-between">
          <div>
            <div class="text-subtitle1">
              {{ item.title }}
            </div>

            <div class="text-caption text-grey">
              {{ item.description }}
            </div>
          </div>

          <div class="text-h6 text-primary">
            {{ project.Evaluation[item.key] }}/5
          </div>
        </div>

        <q-slider
          v-model="project.Evaluation[item.key]"
          :min="0"
          :max="5"
          :step="1"
          markers
          snap
          label
          color="primary"
          @update:model-value="emitSave"
        />
      </div>
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

const evaluations = [
  {
    key: "ROI",
    title: "ROI",
    description: "投入時間後可獲得的回報。",
  },
  {
    key: "Scalability",
    title: "Scalability",
    description: "是否容易擴充成系列專案。",
  },
  {
    key: "Interest",
    title: "Interest",
    description: "自己是否願意長期投入。",
  },
  {
    key: "Automation",
    title: "Automation",
    description: "是否能交給 AI 或程式自動化。",
  },
];
</script>
