<template>
  <v-chart :option="option" style="height: 400px; width: 100%" />
</template>

<script setup lang="ts">
import VChart from 'vue-echarts'
import 'echarts'
const option = {
  radar: {
    indicator: [
      { name: "A", max: 10 },
      { name: "B", max: 10 },
      { name: "C", max: 10 },
    ],
  },

  series: [
    {
      type: "radar",
      data: [
        {
          value: [8, 9, 10],
        },
      ],
    },
  ],
};
</script>


