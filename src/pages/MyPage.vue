<template>
  <!-- <div class="q-pa-md">
    <q-video
      src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
    />
  </div> -->

  <!-- vuecli-cad104-2302/src/components/joeyOverview.vue -->
  <div class="column items-center justify-center" style="min-height: 100vh">
    <profileCard />
    <timeCurve />
  </div>

</template>
<script setup>
// import { ref } from 'vue'

import profileCard from "components/profileCard.vue";
import timeCurve from "components/timeCurve.vue";

</script>
