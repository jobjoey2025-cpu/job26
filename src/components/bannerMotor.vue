<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-red">
      <template v-slot:avatar>
        <q-icon name="wind_power" color="white" />
      </template>
      connect to "Motor".
      <template v-slot:action>
        <q-btn flat color="white" label="Link Motor" :to="{ name: 'Motor' }" />

      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
