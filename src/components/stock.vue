<template>
  <q-page padding>
    <h3 class="text-center">股看板</h3>
    <stockValue />
    <stockValue_US />
    <!-- <stockNews /> -->
    <stockBLGlist />
  </q-page>
</template>

<script setup>
// import stockNews from "components/stockNews.vue";

import stockValue from "components/stockValue.vue";
import stockValue_US from "components/stockValue_US.vue";


import stockBLGlist from "components/stockBLGlist.vue";

</script>
