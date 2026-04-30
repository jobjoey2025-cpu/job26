<template>
  <q-page padding>
    <h3 class="text-center">台股看板</h3>
    <stockValue />
    <stockNews />
    <stockBLGlist />
  </q-page>
</template>

<script setup>
import stockNews from "components/stockNews.vue";

import stockValue from "components/stockValue.vue";

import stockBLGlist from "components/stockBLGlist.vue";

import { ref, onBeforeUnmount } from "vue";
import axios from "axios";

const stocks = ref([]);
let timer = null;

const symbols = ["2330.TW", "2317.TW", "2454.TW"];
// has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.

const columns = [
  { name: "symbol", label: "代號", field: "symbol" },
  { name: "name", label: "名稱", field: "name" },
  { name: "price", label: "價格", field: "price" },
  { name: "change", label: "漲跌", field: "change" },
];

// 🔘 一鍵更新
const fetchStocks = async () => {
  try {
    const res = await axios.get(
      `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${symbols.join(
        ","
      )}`
    );

    stocks.value = res.data.quoteResponse.result.map((s) => ({
      symbol: s.symbol,
      name: s.shortName,
      price: s.regularMarketPrice,
      change: s.regularMarketChange,
    }));
  } catch (err) {
    console.error(err);
  }
};

// 🔄 自動更新
const toggleAuto = () => {
  if (timer) {
    clearInterval(timer);
    timer = null;
  } else {
    fetchStocks();
    timer = setInterval(fetchStocks, 500000);
  }
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>
