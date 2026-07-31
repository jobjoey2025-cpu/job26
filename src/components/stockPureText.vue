<template>
  <q-page padding class="dashboard-page">
    <!-- <div class="row items-center q-mb-md">
      <q-btn
        label="更新股價"
        color="primary"
        @click="fetchStocks"
        :loading="loading"
      />
    </div> -->
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h6 text-weight-bold">💱 台股 Dashboard</div>
      <p> *東元 83 \ 宏達電 40 \ 和泰車 548 \  世芯 526 \ TSMC 588 \ 印度 32.2 \ 中華電105  \ *永豐餘 32</p>
      <div class="row items-center q-gutter-sm">
        <div class="text-grey-7 text-caption">
          最後更新：{{ formatTime(lastUpdate) }}
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

    <div class="row q-col-gutter-md">
      <div
        v-for="(group, index) in groupedStocks"
        :key="index"
        class="col-6 col-sm-4 col-md-3 col-lg-3"
      >
        <q-card flat bordered>
          <q-card-section>
            <div v-for="stock in group" :key="stock.symbol" class="stock-row">
              <span> {{ stock.symbol }} {{ stock.name }} </span>

              <span class="text-weight-bold">
                {{ formatNumber(stock.price) }}
              </span>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { computed } from "vue";
const groupedStocks = computed(() => {
  const result = [];

  for (let i = 0; i < stocks.value.length; i += 5) {
    result.push(stocks.value.slice(i, i + 5));
  }

  return result;
});

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

  padding: 6px 0;

  border-bottom: 1px solid #eee;
}

.stock-row:last-child {
  border-bottom: none;
}

/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
