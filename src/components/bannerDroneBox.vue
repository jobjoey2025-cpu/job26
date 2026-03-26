<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-cyan-13">
      <template v-slot:avatar>
        <q-icon name="connecting_airports" color="white" />
      </template>
      <!-- flight_land -->
      connect to "DroneBox" (無人機地面站維護)
      <!-- joey 未來發展 想像 -->
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <!-- <q-btn flat color="white" label="Link 產品設計SOP" @click="$router.push({ name: 'bannerDesign' })" /> -->
        <q-btn flat color="white" label="Link DroneBox 地面站" :to="{ name: 'DroneBox' }" />

      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
