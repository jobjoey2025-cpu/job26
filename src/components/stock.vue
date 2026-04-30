<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <q-btn label="一鍵更新" color="primary" @click="fetchStocks" />
      <q-btn label="自動更新" flat @click="toggleAuto" class="q-ml-sm" />
    </div>

    <q-table
      title="台股看板"
      :rows="stocks"
      :columns="columns"
      row-key="symbol"
    />
  </q-page>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import axios from "axios";

const stocks = ref([]);
let timer = null;

const symbols = ["2330.TW", "2317.TW", "2454.TW"];

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
    timer = setInterval(fetchStocks, 5000);
  }
};

onBeforeUnmount(() => {
  if (timer) clearInterval(timer);
});
</script>
