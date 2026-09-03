<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-lg">Page Menu</div>
    <h6>直接改 routes group 部分</h6>

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
