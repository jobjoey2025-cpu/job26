<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-info">
      <template v-slot:avatar>
        <q-icon name="rss_feed" color="white" />
      </template>
      connect to "Blog (部落格)".
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <q-btn flat color="white" label="Link BLG" @click="$router.push({ name: 'BLG' })" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
