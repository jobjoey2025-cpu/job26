<template>
  <h3>Test Page 3</h3>

  <q-btn
    flat
    color="primary"
    label="104QuasarVTOL (GDS 維護 sheet)"
    href="https://docs.google.com/spreadsheets/d/13FjdQ1Fw4ln1BwmHOEqH14ZDRq1okHsBVAt7pNXXmb4/edit?gid=211385191#gid=211385191"
    target="_blank"
    icon="open_in_new"
  />

  <q-btn
    flat
    color="primary"
    label="網站地圖 octopus"
    href="https://octopus.do/3abe0185a92c"
    target="_blank"
    icon="open_in_new"
  />

  draggable
  <draggable />
  <!-- <bannerWhoAmI /> -->
</template>

<script setup>
// import { ref } from 'vue'
import draggable from "components/draggable.vue";

import profileCard from "components/profileCard.vue";
import timeCurve from "components/timeCurve.vue";
import bannerWhoAmI from "components/bannerWhoAmI.vue";
</script>
