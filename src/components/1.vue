<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Header -->
    <q-header>
      <q-toolbar>
        <!-- 漢堡模式才顯示 -->
        <q-btn
          v-if="layoutMode === 'drawer'"
          flat
          round
          dense
          icon="menu"
          @click="drawerOpen = !drawerOpen"
        />

        <q-toolbar-title> My System </q-toolbar-title>

        <!-- Layout 切換 -->
        <q-btn
          flat
          round
          dense
          :icon="layoutMode === 'drawer' ? 'view_quilt' : 'menu'"
          @click="toggleLayout"
        />
      </q-toolbar>
    </q-header>

    <!-- Drawer Layout -->
    <q-drawer v-if="layoutMode === 'drawer'" v-model="drawerOpen" bordered>
      <q-list>
        <q-item clickable to="/">
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable to="/area">
          <q-item-section>Area</q-item-section>
        </q-item>

        <q-item clickable to="/project">
          <q-item-section>Project</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- 共用 Page -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";

const layoutMode = ref("drawer");
const drawerOpen = ref(true);

function toggleLayout() {
  layoutMode.value = layoutMode.value === "drawer" ? "single" : "drawer";
}
</script>
