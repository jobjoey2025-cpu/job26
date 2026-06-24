<template>
  <q-page padding class="dashboard-page">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-weight-bold">💱 美股 Dashboard</div>

      <div class="row items-center q-gutter-sm">
        <div class="text-grey-7 text-caption">最後更新：{{ lastUpdate }}</div>
        <p>TM 155 \  *BABA 145 \ *NFLX 94 \ *GOOGL 370 \
          NVDA 88 \  MCD 275 \ KO 70 \ HMC 24.8 \ *GGR 9.3 \ F 10.5 \ CARR 68 \
        </p>
        <q-btn
          label="更新股價"
          color="primary"
          icon="refresh"
          @click="fetchStocks"
          :loading="loading"
        />
      </div>
    </div>

    <!-- Error -->
    <q-banner v-if="errorMsg" class="bg-red-1 text-red q-mb-md" rounded>
      {{ errorMsg }}
    </q-banner>

    <!-- 純文字股票列表 -->
    <!-- <div class="stock-list">
      <div v-for="stock in stocks" :key="stock.symbol" class="stock-row">
        <span class="stock-name">
          {{ stock.name }}
        </span>

        <span class="stock-price"> $ {{ formatNumber(stock.price) }} </span>
      </div>
    </div> -->
    <div class="ticker-board">
      <span v-for="stock in stocks" :key="stock.symbol" class="ticker-item">
        {{ stock.symbol }}
        ${{ formatNumber(stock.price) }}
      </span>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stocks = ref([]);
const loading = ref(false);

// 股票名稱對照
const stockNames = {
  AAPL: "Apple",
  NVDA: "NVIDIA",
};

// 欄位
const columns = [
  { name: "symbol", label: "代號", field: "symbol", align: "left" },
  { name: "name", label: "名稱", field: "name", align: "left" },
  { name: "price", label: "價格", field: "price", align: "right" },
  { name: "time", label: "時間", field: "time", align: "left" },
];

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
const fetchStocks = async () => {
  loading.value = true;

  try {
    const res = await fetch("/.netlify/functions/stock_US");
    const data = await res.json();

    // object -> array
    stocks.value = Object.entries(data).map(([symbol, price]) => ({
      symbol,
      name: stockNames[symbol] || symbol,
      price,
      time: new Date(),
    }));
  } catch (err) {
    console.error("API error:", err);
  }

  loading.value = false;
};

// 初始化 + 自動刷新
onMounted(() => {
  fetchStocks();
  setInterval(fetchStocks, 30000);
});
</script>

<style scoped>
.ticker-board {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 24px;

  font-family: Consolas, Monaco, monospace;
}

.ticker-item {
  white-space: nowrap;
  font-weight: 600;
}

/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
