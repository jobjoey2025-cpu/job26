<template>
  <q-page padding>

    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">

      <div class="text-h5">
        📊 美股看板
      </div>

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
    <q-banner
      v-if="errorMsg"
      class="bg-red-1 text-red q-mb-md"
      rounded
    >
      {{ errorMsg }}
    </q-banner>

    <!-- Table -->
    <q-table
      title="NASDAQ / 美股"
      :rows="stocks"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      flat
      bordered
      separator="cell"
      wrap-cells
      dense
    >

      <!-- Symbol -->
      <template v-slot:body-cell-symbol="props">
        <q-td :props="props">
          <div class="text-weight-bold">
            {{ props.row.symbol }}
          </div>
        </q-td>
      </template>

      <!-- Price -->
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <div class="text-weight-medium text-body1">
            {{ formatNumber(props.row.price) }}
          </div>
        </q-td>
      </template>

      <!-- Change -->
      <!-- <template v-slot:body-cell-change="props">
        <q-td :props="props">

          <div
            class="row items-center no-wrap"
            :class="getColor(props.row.change)"
          >
            <q-icon
              :name="props.row.change >= 0 ? 'arrow_drop_up' : 'arrow_drop_down'"
              size="20px"
            />

            {{ formatNumber(props.row.change) }}
          </div>

        </q-td>
      </template> -->

      <!-- Percent -->
      <!-- <template v-slot:body-cell-percent="props">
        <q-td :props="props">

          <q-badge
            :color="getBadgeColor(props.row.percent)"
            outline
          >
            {{ formatNumber(props.row.percent) }}%
          </q-badge>

        </q-td>
      </template> -->

      <!-- Volume -->
      <template v-slot:body-cell-volume="props">
        <q-td :props="props">
          {{ formatVolume(props.row.volume) }}
        </q-td>
      </template>

      <!-- Time -->
      <template v-slot:body-cell-time="props">
        <q-td :props="props">

          <div class="text-caption text-grey-7">
            {{ formatTime(props.row.time) }}
          </div>

        </q-td>
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
.text-positive {
  color: #d32f2f;
}

.text-negative {
  color: #2e7d32;
}
</style>