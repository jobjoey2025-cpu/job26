<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-deep-orange-7">
      <template v-slot:avatar>
        <q-icon name="miscellaneous_services" color="white" />
      </template>
      connect to "RC CAR" (DC10).
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <!-- <q-btn flat color="white" label="Link 產品設計SOP" @click="$router.push({ name: 'bannerDesign' })" /> -->
        <q-btn flat color="white" label="Link RC CAR"" :to="{ name: 'DC10' }" />

      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
