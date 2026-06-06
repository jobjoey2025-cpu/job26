<template>
  <q-page padding class="dashboard-page">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-weight-bold">💱 匯率 Dashboard</div>

      <div class="row items-center q-gutter-sm">
        <div class="text-grey-7 text-caption">
          最後更新：{{ formatTime(lastUpdate) }}
        </div>

        <q-btn
          label="更新匯率"
          color="primary"
          icon="refresh"
          @click="fetchRates"
          :loading="loading"
        />
      </div>
    </div>

    <!-- Error -->
    <q-banner v-if="errorMsg" class="bg-red-1 text-red q-mb-md" rounded>
      {{ errorMsg }}
    </q-banner>

    <!-- 純文字列表 -->
    <!-- <div class="rate-list">
      <div v-for="item in rates" :key="item.pair" class="rate-row">
        <span class="pair">
          {{ item.pair }}
        </span>

        <span class="rate">
          {{ formatNumber(item.rate) }}
        </span>
      </div>
    </div> -->
    <div class="rate-board">
      <span v-for="item in rates" :key="item.pair" class="rate-item">
        {{ item.pair }}
        {{ formatNumber(item.rate) }}
      </span>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const loading = ref(false);
const errorMsg = ref("");

const lastUpdate = ref("");

const rates = ref([]);

// 數字格式
const formatNumber = (val) => {
  if (val === null || val === undefined) return "-";

  return Number(val).toFixed(2);
};

// 時間格式
const formatTime = (val) => {
  if (!val) return "-";

  try {
    return new Date(val).toLocaleString("zh-TW", {
      hour12: false,
    });
  } catch {
    return val;
  }
};

// API 呼叫
const fetchRates = async () => {
  loading.value = true;

  errorMsg.value = "";

  try {
    const res = await fetch("/.netlify/functions/stock_exchange");

    const data = await res.json();

    rates.value = data;

    lastUpdate.value = new Date();
  } catch (err) {
    console.error(err);

    errorMsg.value = "匯率更新失敗";
  }

  loading.value = false;
};

// 初始化
onMounted(() => {
  fetchRates();

  setInterval(fetchRates, 30000);
});
</script>

<style scoped>
.rate-board {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;

  font-family: Consolas, Monaco, monospace;
}

.rate-item {
  white-space: nowrap;
  font-size: 16px;
}
</style>
