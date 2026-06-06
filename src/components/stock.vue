<template>
  <q-page class="q-pa-sm">
    <!-- Title -->
    <!-- <div class="text-h5 text-weight-bold q-mb-sm">📊 股票 Dashboard</div> -->

    <!-- <stockValue /> <stockValue_exchange /> -->

    <stockFB />
    <stockRailway />

    <!-- pure text -->
    <stockPureText />

    <!-- 匯率 -->
    <div class="col-12 col-md-4">
      <stockValue_exchange />
    </div>
    <!-- 美股 -->
    <div class="col-12 col-lg-6">
      <stockValue_US />
    </div>
    <!-- Grid Layout -->
    <div class="row q-col-gutter-sm">
      <!-- 台股 -->
      <div class="col-12 col-lg-6">
        <stockValue />
      </div>

      <!-- 新聞 / Blog -->
      <div class="col-12 col-md-8">
        <stockBLGlist />
      </div>
    </div>

    <hr />
    <fastAPI />
  </q-page>
</template>

<script setup>
// import stockNews from "components/stockNews.vue";
import stockFB from "components/stockFB.vue";

import stockValue from "components/stockValue.vue";
import stockValue_US from "components/stockValue_US.vue";
import stockValue_exchange from "components/stockValue_exchange.vue";

import stockBLGlist from "components/stockBLGlist.vue";
import stockRailway from "components/stockRailway.vue";
import fastAPI from "components/fastAPI.vue";

import stockPureText from "components/stockPureText.vue";
</script>

<style>
.dashboard-card {
  border-radius: 12px;
  height: 100%;
}

.dashboard-scroll {
  max-height: 400px;
  overflow-y: auto;
}
</style>
