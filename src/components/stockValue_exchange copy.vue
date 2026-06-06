<template>
  <q-page padding class="dashboard-page">
    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">💱 匯率 Dashboard</div>

      <div class="row items-center q-gutter-sm">
        <div class="text-grey-7 text-caption">
          最後更新：
          {{ formatTime(lastUpdate) }}
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

    <!-- Masonry Like Grid -->
    <div class="row q-col-gutter-md">
      <div
        v-for="item in rates"
        :key="item.pair"
        class="col-3 col-sm-3 col-md-2 col-lg-2"
      >
        <q-card flat bordered class="rate-card">
          <!-- Header -->
          <q-card-section class="bg-grey-1 text-center">
            <!-- <div class="text-caption text-grey">
              Currency Pair
            </div> -->

            <div class="text-h5 text-weight-bold">
              {{ item.pair }}
            </div>
          </q-card-section>

          <q-separator />

          <!-- Rate -->
          <q-card-section class="text-center">
            <!-- <div class="text-caption text-grey">
              Exchange Rate
            </div> -->

            <div class="text-h6 text-primary text-weight-bold q-mt-sm">
              {{ formatNumber(item.rate) }}
            </div>
          </q-card-section>

          <q-separator />

          <!-- Footer -->
          <!-- <q-card-section class="text-center">

            <div class="text-caption text-grey">
              Updated
            </div>

            <div class="text-body2">
              {{ formatTime(lastUpdate) }}
            </div>

          </q-card-section> -->
        </q-card>
      </div>
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
.rate-card {
  border-radius: 18px;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.rate-card:hover {
  transform: translateY(-4px);

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}
/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
