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

        <q-toolbar-title> VTOL Portfolio </q-toolbar-title>

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

    <classC />

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

const linksList = [
  {
    title: "Home",
    caption: "內部頁面",
    icon: "home", // IndexPage MyPage
    to: "/", // ✅ Vue Router 內部跳轉
  },
  {
    title: "About me",
    caption: "內部頁面",
    icon: "face", // MyPage
    to: { name: "MyPage" }, // ✅ Vue Router 內部跳轉
  },
  {
    title: "Services（履歷）",
    caption: "內部頁面",
    icon: "miscellaneous_services",
    to: "/Services", // ✅ Vue Router 內部跳轉
  },
  {
    title: "Experience (專案)",
    caption: "內部頁面",
    icon: "rocket_launch",
    to: "/Experience", // ✅ Vue Router 內部跳轉
  },
  {
    title: "Blog (部落格)",
    caption: "內部頁面",
    icon: "rss_feed",
    to: "/BLG", // ✅ Vue Router 內部跳轉
  },
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
