<template>
  <div>
    <div>
      <bannerMotor />
      <bannerGearbox />
      <bannerGearbox />
      <bannerDC10 />
      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="blue"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script setup>
//
import bannerMotor from "components/bannerMotor.vue";
import bannerGearbox from "components/bannerGearbox.vue";
import bannerDC10 from "components/bannerDC10.vue";
</script>
