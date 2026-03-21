<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-deep-orange-7">
      <template v-slot:avatar>
        <q-icon name="miscellaneous_services" color="white" />
      </template>
      connect to "GearAnimate".
      <template v-slot:action>
        <q-btn flat color="white" label="Link GearAnimate" :to="{ name: 'GearAnimate' }" />

      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
