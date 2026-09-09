
<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> JOEY Portfolio </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <!-- ⇧⇧⇧ Tool Bar Top -->

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- ⇧⇧⇧ Left Bar Side -->
    <br />
    <br />
    <br />

    <classC />

    <q-page class="flex flex-center" style="min-height: 5vh">
      <profileCard />
    </q-page>

    <timeCurve />

    <q-page-container>
      <router-view />
    </q-page-container>

    <bannerFoot />
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

import classC from "components/classC.vue"; // 輪播
import bannerFoot from "components/bannerFoot.vue";

import profileCard from "src/components/profileCard.vue";
import timeCurve from "components/timeCurve.vue";

const linksList = [
  {
    title: "Home",
    caption: "經歷",
    icon: "home", // IndexPage MyPage
    to: "/", // ✅ Vue Router 內部跳轉
  },

  {
    title: "About me",
    caption: "經驗與技術",
    icon: "face", // MyPage
    to: { name: "MyPage" }, // ✅ Vue Router 內部跳轉

    // 👇 新增子連結
    children: [
      {
        title: "Bike Front Lights",
        caption: "產品設計到開發完成",
        icon: "directions_bike",
        to: "/testNavi",
      },
      {
        title: "產品設計SOP",
        caption: "從企劃規格到模擬性能",
        icon: "flashlight_on",
        to: "/timeLine_lightSop",
      },
      // {
      //   title: "ERP",
      //   caption: "工程資料管理",
      //   icon: "join_left",
      //   to: "/ERP",
      // },
      // {
      //   title: "DroneBox",
      //   caption: "無人機地面站維護",
      //   icon: "connecting_airports",
      //   to: "/DroneBox",
      // },
    ],
  },
  {
    title: "Services（履歷）",
    caption: "作品與證照",
    icon: "miscellaneous_services",
    to: "/Services", // ✅ Vue Router 內部跳轉
  },
  {
    title: "Experience (專案)",
    caption: "CFD 技術",
    icon: "rocket_launch",
    to: "/Experience", // ✅ Vue Router 內部跳轉

    // 👇 新增子連結
    children: [
      // {
      //   title: "Motor",
      //   caption: "機電馬達工程",
      //   icon: "wind_power",
      //   to: "/Motor",
      // },
      {
        title: "Gearbox",
        caption: "Gearbox 修模履歷",
        icon: "miscellaneous_services",
        to: "/Gearbox",
      },
      // {
      //   title: "RC CAR",
      //   caption: "1/10 甩尾遙控車開發",
      //   icon: "toys",
      //   to: "/DC10",
      // },
    ],
  },
  // {
  //   title: "Blog (部落格)",
  //   caption: "內部頁面",
  //   icon: "rss_feed",
  //   to: "/BLG", // ✅ Vue Router 內部跳轉
  // },
  {
    title: "Connect me",
    caption: "外部頁面 104",
    icon: "favorite",
    href: "https://www.104.com.tw/", // ✅ 外部連結
    target: "_blank", // (建議) 開新分頁
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
