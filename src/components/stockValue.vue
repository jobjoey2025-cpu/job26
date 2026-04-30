<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <q-btn label="更新股價" color="primary" @click="fetchStocks" />
    </div>

    <q-table
      title="台股看板 2"
      :rows="stocks"
      :columns="columns"
      row-key="symbol"
      :loading="loading"
    >
      <template v-slot:body-cell-change="props">
        <q-td :props="props">
          <span :class="props.row.change > 0 ? 'text-red' : 'text-green'">
            {{ props.row.change.toFixed(2) }}
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

const columns = [
  { name: "symbol", label: "代號", field: "symbol" },
  { name: "name", label: "名稱", field: "name" },
  { name: "price", label: "價格", field: "price" },
  { name: "change", label: "漲跌", field: "change" },
  { name: "percent", label: "漲幅%", field: "percent" },
];

// 呼叫 Netlify function
const fetchStocks = async () => {
  loading.value = true

  const res = await fetch('/.netlify/functions/stock')
  const data = await res.json()

  stocks.value = data

  loading.value = false
}

onMounted(fetchStocks);
</script>
