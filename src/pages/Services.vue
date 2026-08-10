<template>
  <div>
    <schoolCards />

    <!-- <h3 style="text-align: center">技能樹</h3> -->

    <!-- <ansysTree /> -->
    <!-- <p>* _____ electric104</p> -->
    <!-- https://electric104.netlify.app/#/ -->
    <!-- <p>* _____ Experience : 公司	職位	成果</p> -->
    <!-- <p>* _____ Education : 學校	科系</p> -->
    <!-- <p>* _____ ├ Certifications : 證書	證照	專利 號碼</p> -->
    <!-- https://104cad23-02.netlify.app/ -->
    <!-- <p>* _____ Joey skill animate : 力導向</p> -->
    <div>
      <h3 style="text-align: center">LINK 104 & download PDF</h3>
      <!-- <li><a href="https://www.104.com.tw/">104</a></li> -->
    </div>

    <div style="text-align: center">
      <q-btn
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        icon="link"
        label="LINK 104 & download PDF"
        href="https://www.104.com.tw/"
        target="”_blank”"
      />
    </div>
  </div>

  <p>Services</p>
  <!-- <h3>Service Page</h3> -->
  <!-- <p>* _____Related Projects</p> -->
  <!-- <p>* _____Project Leads</p> -->
</template>
<script setup>
// import { ref } from 'vue'

import schoolCards from "components/schoolCards.vue";
import ansysTree from "components/ansysTree.vue";
import timeCurve from "components/timeCurve.vue";
import bannerWhoAmI from "components/bannerWhoAmI.vue";
</script>
