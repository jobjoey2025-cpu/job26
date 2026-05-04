<template>
  <q-page class="flex flex-center" style="min-height: 5vh">
    <profileCard />
  </q-page>
  <br><br></br>
  <bannerWhoAmI />
  <bannerService />
  <bannerExperience />
  <bannerBLG />
  <timeCurve />


  <!-- <p>IndexPage</p> -->
  <q-btn flat color="white" label="Link test.vue" :to="{ name: 'test' }" />


</template>

<script setup>
import profileCard from "src/components/profileCard.vue";
import timeCurve from "components/timeCurve.vue";
import bannerWhoAmI from "components/bannerWhoAmI.vue";
import bannerService from "components/bannerService.vue";
import bannerExperience from "components/bannerExperience.vue";
import bannerBLG from "components/bannerBLG.vue";

//
</script>
<!-- 網站地圖 job2021 -->
<!-- https://octopus.do/3abe0185a92c -->
