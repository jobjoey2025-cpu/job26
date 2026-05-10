<template>
  <q-page padding class="dashboard-page">
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
    <!-- title="📊 台股看板" -->
    <q-table

      :rows="stocks"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
      grid
      hide-header
      flat
      class="stock-grid"
      :rows-per-page-options="[8]"
    >
      <!-- Masonry Like Grid -->
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-3 col-sm-2 col-md-2 col-lg-1">
          <q-card flat bordered class="stock-card">
            <!-- Header -->
            <q-card-section class="bg-grey-1">
              <div class="row items-center justify-between">
                <div>
                  <div class="text-weight-bold">
                    {{ props.row.symbol }}{{ props.row.name }}
                  </div>

                  <div
                    class="text-subtitle2 text-grey-7"
                    style="text-align: center"
                  ></div>
                </div>

                <!-- 漲跌 icon -->
                <!-- <q-icon
              :name="
                props.row.change > 0
                  ? 'trending_up'
                  : props.row.change < 0
                  ? 'trending_down'
                  : 'trending_flat'
              "
              size="32px"
              :class="getColor(props.row.change)"
            /> -->
              </div>
            </q-card-section>

            <q-separator />

            <!-- Price -->
            <q-card-section class="text-center">
              <!-- <div class="text-caption text-grey">
            Current Price
          </div> -->

              <div class="text-h6 text-weight-bold q-mt-sm">
                {{ formatNumber(props.row.price) }}
              </div>
            </q-card-section>

            <q-separator />

            <!-- Change -->
            <!-- <q-card-section>
          <div class="row justify-between items-center q-mb-sm">
            <div class="text-grey-7">
              漲跌
            </div>

            <div
              class="text-weight-bold"
              :class="getColor(props.row.change)"
            >
              {{ formatNumber(props.row.change) }}
            </div>
          </div>

          <div class="row justify-between items-center">
            <div class="text-grey-7">
              漲幅
            </div>

            <div
              class="text-weight-bold"
              :class="getColor(props.row.percent)"
            >
              {{ formatNumber(props.row.percent) }}%
            </div>
          </div>
        </q-card-section> -->

            <q-separator />

            <!-- Time -->
            <!-- <q-card-section class="text-center">
          <div class="text-caption text-grey">
            Updated
          </div>

          <div class="text-body2 text-grey-8">
            {{ formatTime(props.row.time) }}
          </div>
        </q-card-section> -->
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
.stock-grid {
  margin-top: 12px;
}

.stock-card {
  border-radius: 18px;
  overflow: hidden;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stock-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.text-red {
  color: #d32f2f;
}

.text-green {
  color: #2e7d32;
}

/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
