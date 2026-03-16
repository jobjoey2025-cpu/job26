<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-positive">
      <template v-slot:avatar>
        <q-icon name="miscellaneous_services" color="white" />
      </template>
      Connect to "Bike (Lamp)".
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <!-- <q-btn flat color="white" label="Link Bike" @click="$router.push({ name: 'test' })" /> -->
        <q-btn flat color="white" label="Link Bike" :to="{ name: 'testNavi' }" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->
      <!-- Services -->
      <!-- testNavi -->
    </q-banner>
  </div>
</template>
