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

</script>
