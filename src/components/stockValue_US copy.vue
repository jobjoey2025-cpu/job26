<template>
  <q-page padding class="dashboard-page">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="row items-center q-gutter-sm">
        <div class="text-grey-7 text-caption">
          最後更新：
          {{ lastUpdate }}
        </div>

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

    <!-- Table -->
    <q-table
      title="📈 美股看板"
      :rows="stocks"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      grid
      hide-header
      flat
      :rows-per-page-options="[4]"
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-3 col-sm-3 col-md-2 col-lg-1">
          <q-card flat bordered class="stock-card">
            <!-- 股票代號 -->
            <!-- <q-card-section class="text-center bg-grey-2">
              <div class="text-h6 text-weight-bold">
                {{ props.row.symbol }}
              </div> -->

            <div class="text-subtitle2 text-grey-7" style="text-align: center">
              {{ props.row.name }}
            </div>
            <!-- </q-card-section> -->

            <q-separator />

            <!-- 股價 -->
            <q-card-section class="text-center">
              <!-- <div class="text-caption text-grey">PRICE</div> -->

              <div class="text-h6 text-weight-bold text-primary">
                $ {{ formatNumber(props.row.price) }}
              </div>
            </q-card-section>

            <q-separator />

            <!-- 更新時間 -->
            <!-- <q-card-section class="text-center"> -->
            <!-- <div class="text-caption text-grey">Updated</div> -->

            <!-- <div class="text-body2">
                {{ formatTime(props.row.time) }}
              </div> -->
            <!-- </q-card-section> -->
          </q-card>
        </div>
      </template>
    </q-table>
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
.stock-card {
  border-radius: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stock-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
}

/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
