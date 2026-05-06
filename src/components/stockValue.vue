<template>
  <q-page padding>
    <!-- 操作區 -->
    <div class="row items-center q-mb-md">
      <q-btn
        label="更新股價"
        color="primary"
        @click="fetchStocks"
        :loading="loading"
      />
    </div>

    <!-- 表格 -->
    <q-table
      title="📊 台股看板"
      :rows="stocks"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      flat
      bordered
      wrap-cells
    >
      <!-- 漲跌 -->
      <template v-slot:body-cell-change="props">
        <q-td :props="props">
          <span :class="getColor(props.row.change)">
            {{ formatNumber(props.row.change) }}
          </span>
        </q-td>
      </template>

      <!-- 漲幅 -->
      <template v-slot:body-cell-percent="props">
        <q-td :props="props">
          <span :class="getColor(props.row.percent)">
            {{ formatNumber(props.row.percent) }}%
          </span>
        </q-td>
      </template>

      <!-- 價格 -->
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <span class="text-weight-medium">
            {{ formatNumber(props.row.price) }}
          </span>
        </q-td>
      </template>

      <!-- 時間 -->
      <template v-slot:body-cell-time="props">
        <q-td :props="props">
          <span class="text-grey-7 text-caption">
            {{ formatTime(props.row.time) }}
          </span>
        </q-td>
      </template>
    </q-table>
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
.text-red {
  color: #d32f2f;
}
.text-green {
  color: #2e7d32;
}
</style>
