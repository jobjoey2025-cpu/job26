<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <q-btn
        label="更新股價"
        color="primary"
        @click="fetchStocks"
        :loading="loading"
      />
    </div>

    <div v-for="stock in stocks" :key="stock.symbol" class="stock-row">
      <span class="symbol"> {{ stock.symbol }} {{ stock.name }} </span>

      <span class="price">
        {{ formatNumber(stock.price) }}
      </span>
    </div>
  </q-page>
</template>
<script setup>
import { ref, onMounted } from "vue";

const stocks = ref([]);
const loading = ref(false);

// 欄位
const columns = [
  { name: "symbol", label: "代號", field: "symbol", align: "left" },
  { name: "name", label: "名稱", field: "name", align: "left" },
  { name: "price", label: "價格", field: "price", align: "right" },
  { name: "time", label: "時間", field: "time", align: "left" },

  { name: "change", label: "漲跌", field: "change", align: "right" },
  { name: "percent", label: "漲幅%", field: "percent", align: "right" },
];

// 顏色判斷（台股：紅漲綠跌）
const getColor = (val) => {
  if (val > 0) return "text-red";
  if (val < 0) return "text-green";
  return "text-grey";
};

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
    const res = await fetch("/.netlify/functions/stock");
    const data = await res.json();

    stocks.value = data;
  } catch (err) {
    console.error("API error:", err);
  }

  loading.value = false;
};

// 初始化 + 自動刷新
onMounted(() => {
  fetchStocks();
  setInterval(fetchStocks, 30000); // 每30秒更新
});
</script>

<style scoped>
.stock-row {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 4px 8px;
  border-bottom: 1px solid #eee;

  font-family: monospace;
}

.symbol {
  font-weight: 600;
}

.price {
  text-align: right;
  min-width: 80px;
}
</style>
