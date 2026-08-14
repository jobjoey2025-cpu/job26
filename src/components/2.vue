<template>
  <q-page class="q-pa-md">

    <div class="text-h5 q-mb-md">
      Pages
    </div>

    <div class="row q-gutter-sm">

      <q-btn
        v-for="page in pageButtons"
        :key="page.name"
        :label="page.label"
        :icon="page.icon"
        color="primary"
        outline
        @click="goPage(page.name)"
      />

    </div>

  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const pageButtons = computed(() => {
  return router.getRoutes()
    .filter(route => route.name)
    .map(route => ({
      name: route.name,
      path: route.path,
      label: formatLabel(route.name),
      icon: getIcon(route.name),
    }))
})

function formatLabel(name) {
  return String(name)
    .replace(/_/g, ' ')
}

function getIcon(name) {
  if (String(name).includes('Onlyview')) {
    return 'visibility'
  }

  if (String(name).includes('Building')) {
    return 'home'
  }

  if (String(name).includes('RC')) {
    return 'directions_car'
  }

  if (
    String(name).includes('Kyoto') ||
    String(name).includes('Umeda') ||
    String(name).includes('Numba') ||
    String(name).includes('Tokyo')
  ) {
    return 'location_on'
  }

  if (String(name).includes('Firebase_img_map')) {
    return 'map'
  }

  return 'web'
}

function goPage(name) {
  router.push({
    name,
  })
}
</script>