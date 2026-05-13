<template>
  <q-page class="q-pa-md dashboard-page">
    <q-input v-model="stockId" label="股票代號" />

    <q-btn label="分析" @click="analyze" class="q-mt-md" />

    <q-card v-if="report" class="q-mt-lg">
      <q-card-section>
        {{ report }}
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// import axios from "axios";

// const API = "https://your-app.up.railway.app";

// export async function analyzeStock(stockId) {
//   const res = await axios.get(`${API}/analyze/${stockId}`);

//   return res.data;
// }

import { ref } from "vue";
import { analyzeStock } from "src/api/stock";

const stockId = ref("2330");
const report = ref("");

const analyze = async () => {
  const res = await analyzeStock(stockId.value);
  report.value = res.report;
};
</script>
<style>
/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
