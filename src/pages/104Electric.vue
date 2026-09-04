<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img alt="Quasar logo" src="/logo/logo-mono-white.svg" />
          </q-avatar> -->
          履歷 JOEY
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/Services" label="作品與證照" />
        <q-route-tab to="/Motor" label="機電保修" />
        <q-route-tab to="/ERP" label="工程資料管理" />
        <q-route-tab to="/testNavi" label="自行車前燈專案" />
        <q-route-tab to="/Gearbox" label="齒輪箱修模專案" />
        <q-route-tab to="/MyPage" label="經驗與技術" />
      </q-tabs>
    </q-header>

    <br />
    <br />
    <br />

    <carousel_104Electric />
    <!-- <classC /> -->

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page class="flex flex-center" style="min-height: 5vh">
      <profileCard />
    </q-page>

    <timeCurve />

    <br />
    <br />
    <br />
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <!-- <q-avatar>
            <img alt="Quasar logo" src="/logo/logo-mono-white.svg" />
          </q-avatar> -->
          <div>End</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script setup>
import { ref } from "vue";
// import classC from "components/classC.vue"; // 輪播
import carousel_104Electric from "components/carousel_104Electric.vue"; // 輪播

import profileCard from "src/components/profileCard.vue";
import timeCurve from "components/timeCurve.vue";
</script>
