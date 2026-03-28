<template>
  <q-page class="q-pa-lg">
    <!-- joey 元件從這裡插入 -->

    <!-- <div class="text-center"> -->
    <!-- <h1>自行車前燈專案 總攬</h1> -->
    <!-- joey 元件從這裡插入 -->
    <!-- <imgMap_iF /> -->
    <!-- </div> -->

    <!-- 專案標題 -->
    <!-- <div class="text-center q-mb-xl"> -->
    <div class="text-center">
      <!-- <h1>自行車前燈專案 總攬</h1> -->
      <h4>自行車前燈專案 總攬</h4>
    </div>
    <!-- <div class="q-my-xs"><imageMap /></div> -->
    <!-- 產品全視圖 -->
    <div class="q-my-xl">
      <imageTr />
    </div>
    <q-separator spaced="ls" />
    <!-- 專案說明 -->
    <div class="q-my-xl">
      <ExpansionG12 />
    </div>

    <q-separator spaced="lg" />

    <!-- 產品設計 SOP -->
    <!-- <div class="q-my-xl">
      <timeLine_lightSop />
    </div> -->
    <!-- 產品開發 SOP -->
    <div class="q-my-xl">
      <imageGridG12sop />
    </div>

    <h4 style="text-align: center">產品設計 SOP</h4>
    <bannerDesign />

    <q-separator spaced="lg" />

    <!-- 開發時間線 專案排程-->
    <div class="q-my-xl">
      <timeline_g12 />
    </div>

    <q-separator spaced="xl" />
    <imageMap />
  </q-page>
</template>

<script setup>
import timeline_g12 from "../components/timeline_g12.vue";
// import timeLine_lightSop from "../components/timeLine_lightSop.vue";
import imageGridG12sop from "../components/imageGridG12sop.vue";
import imageTr from "../components/imageTr.vue";
// import imgMap_iF from "../components/imgMap_iF.vue";
import ExpansionG12 from "../components/ExpansionG12.vue";

import bannerDesign from "components/bannerDesign.vue";

import imageMap from "components/imageMap.vue";
</script>
