<template>
  <q-card>
    <q-card-section>
      <v-chart :option="option" style="height: 500px; width: 100%" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import VChart from "vue-echarts";
import "echarts";

const option = {
  tooltip: {},

  radar: {
    indicator: [
      { name: '美感', max: 10 },
      { name: '溫馨感', max: 10 },
      { name: '採光', max: 10 },
      { name: '空間感', max: 10 },
      { name: '收納', max: 10 },
      { name: '設計一致性', max: 10 },
      { name: '可施工性', max: 10 }
    ]
  },

  series: [
    {
      type: 'radar',

      data: [
        {
          value: [9, 9.5, 10, 9, 7, 9, 9]
        }
      ]
    }
  ]
}
</script>

