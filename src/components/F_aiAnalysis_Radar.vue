<template>
  <q-card flat bordered class="q-mb-lg">
    <q-card-section>
      <div class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">📊 綜合評分</div>

        <q-chip color="primary" text-color="white" icon="star">
          總分 {{ averageScore }}
        </q-chip>
      </div>

      <v-chart class="radar-chart q-mt-md" :option="radarOption" autoresize />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";
import { computed } from "vue";

const scores = [
  { label: "美感", score: 9 },
  { label: "溫馨感", score: 9.5 },
  { label: "採光", score: 10 },
  { label: "空間感", score: 9 },
  { label: "收納", score: 7 },
  { label: "設計一致性", score: 9 },
  { label: "可施工性", score: 9 },
];

const averageScore = computed(() => {
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return (total / scores.length).toFixed(1);
});

const radarOption = computed(() => ({
  tooltip: {
    trigger: "item",
  },

  radar: {
    radius: "68%",

    indicator: scores.map((item) => ({
      name: item.label,
      max: 10,
    })),

    splitNumber: 5,

    axisName: {
      color: "#333",
      fontSize: 14,
      fontWeight: 600,
    },

    splitArea: {
      areaStyle: {
        color: [
          "rgba(0,0,0,0.02)",
          "rgba(0,0,0,0.04)",
          "rgba(0,0,0,0.06)",
          "rgba(0,0,0,0.08)",
          "rgba(0,0,0,0.1)",
        ],
      },
    },
  },

  series: [
    {
      name: "室內設計評分",
      type: "radar",

      data: [
        {
          value: scores.map((item) => item.score),
          name: "Design Score",

          areaStyle: {
            opacity: 0.35,
          },

          lineStyle: {
            width: 3,
          },

          symbolSize: 8,
        },
      ],
    },
  ],
}));
</script>

<style scoped>
.radar-chart {
  width: 100%;
  height: 500px;
}
</style>
