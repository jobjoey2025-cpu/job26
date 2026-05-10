<template>
  <q-page padding>
    <h3 class="text-center">股票看板</h3>
    <stockValue />
    <stockValue_US />
    <!-- <h6>匯率看板</h6> -->
    <stockValue_exchange />
    <!-- <stockNews /> -->
    <stockBLGlist />
  </q-page>
</template>

<script setup>
// import stockNews from "components/stockNews.vue";

import stockValue from "components/stockValue.vue";
import stockValue_US from "components/stockValue_US.vue";
import stockValue_exchange from "components/stockValue_exchange.vue";

import stockBLGlist from "components/stockBLGlist.vue";

</script>
