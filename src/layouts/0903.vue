<!-- q-btn + q-menu + q-list + dense -->
<template>
  <q-layout view="hHh Lpr fFf">
    <!-- Header -->
    <q-header>
      <q-toolbar>
        <!-- Menu Button -->
        <q-btn flat round dense icon="menu">
          <!-- 小型選單 -->
          <q-menu anchor="bottom left" self="top left">
            <q-list style="min-width: 180px">
              <q-item clickable v-close-popup to="/">
                <q-item-section> Home </q-item-section>
              </q-item>

              <q-item clickable v-close-popup to="/Services">
                <q-item-section> 作品與證照 </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>

        <q-toolbar-title> JOEY </q-toolbar-title>

        <!-- Layout 切換 -->
        <!-- <q-btn
          flat
          round
          dense
          :icon="layoutMode === 'drawer' ? 'view_quilt' : 'menu'"
          @click="toggleLayout"
        /> -->
      </q-toolbar>
    </q-header>

    <!-- Page -->
    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- Footer -->
    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <div>底部</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
// 不需要 drawerOpen
</script>
