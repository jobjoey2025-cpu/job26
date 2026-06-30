<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-primary">
      <template v-slot:avatar>
        <q-icon name="signal_wifi_off" color="white" />
      </template>
      <!-- You have lost connection to the internet. This app is offline. -->
      This app is offline.
      <template v-slot:action>
        <q-btn flat color="white" label="Link 104" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->
    </q-banner>
    <a3F_color />
    <a3-f_color2 />

  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import draggable from "components/draggable.vue";
import a3F_color from "components/a3F_color.vue";
import a3F_color2 from "components/a3F_color2.vue";


</script>
