<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Alert" color="primary" @click="alert = true" />
    <q-btn label="傳照片" color="primary" to="/GAS_picUP" />
    <q-btn
      label="VOLT手冊"
      color="primary"
      href="https://docs.google.com/spreadsheets/d/1RD7e6KDTXvP13MRv6vlyc7gt6FwAV7ppwuLMO5bIB-s/edit?gid=2129479397#gid=2129479397"
      target="_blank"
    />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <pre>
          GGB CICD #

            回憶減少重複 開始有效了 with Firedb_Quasar_GPT
            Firedb_recent \\ roi
          1. 隨手寫 (難 search)
          2. GDS (難 search)
          3. BLG 長期 亂
          4. NAS 囤積 大型亂
          5. Quasar Firedb - 難input \ 閱讀品質高 \ 4hrs CICD

          joey達到差一點不可能的 境界(Firedb_Quasar_GPT) \ 估計這邊做熟就 over 60y
          joey身邊 幾乎 沒有這種技能的朋友 \
          我需要是有效的系統 not news 碎片 (現在太多了)
          </pre>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
  <q-page class="q-pa-md">
    <!-- <div class="text-h5 q-mb-lg">Page Menu</div>
    <h6>直接改 routes group 部分</h6> -->

    <div class="text-h5 q-mb-sm">Routes Group</div>
    <div class="text-subtitle2 text-grey-7 q-mb-lg">
      直接管理與修改路由群組設定
    </div>

    <div v-for="group in groups" :key="group.name" class="q-mb-lg">
      <!-- Group Title -->
      <div class="text-subtitle1 q-mb-sm">
        {{ group.name }}
      </div>

      <!-- Buttons -->
      <div class="row q-gutter-sm">
        <q-btn
          v-for="page in group.pages"
          :key="page.name"
          :label="page.label"
          :icon="page.icon"
          outline
          color="primary"
          @click="goPage(page.name)"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Route → Menu
const pages = computed(() => {
  return router
    .getRoutes()
    .filter((route) => route.meta?.menu === true)
    .map((route) => ({
      name: route.name,
      path: route.path,

      label: route.meta.label || String(route.name).replace(/_/g, " "),

      icon: route.meta.icon || "web",

      group: route.meta.group || "Other",
    }));
});

// Menu Group
const groups = computed(() => {
  const map = {};

  pages.value.forEach((page) => {
    if (!map[page.group]) {
      map[page.group] = [];
    }

    map[page.group].push(page);
  });

  return Object.entries(map).map(([name, pages]) => ({
    name,
    pages,
  }));
});

// Navigation
function goPage(name) {
  router.push({
    name,
  });
}
</script>
