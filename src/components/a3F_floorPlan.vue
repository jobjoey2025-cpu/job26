<template>
  <!-- <div class="q-pa-xs"> -->
  <q-page>
    <q-banner dense inline-actions class="text-white bg-primary">
      <template #avatar>
        <q-icon name="signal_wifi_off" color="white" />
      </template>

      This app is offline.

      <template #action>
        <q-btn flat color="white" label="Link 104" />
      </template>
    </q-banner>

    <a3F_color class="q-mb-xs" />
    <a3F_color2 />
    <!-- </div> -->
  </q-page>
</template>

<script setup>
// import { ref } from 'vue'
// import draggable from "components/draggable.vue";
import a3F_color from "components/a3F_color.vue";
import a3F_color2 from "components/a3F_color2.vue";
</script>

<style scoped>
.q-page {
  min-height: auto !important;
}
</style>
