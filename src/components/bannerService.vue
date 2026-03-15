<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-primary">
      <template v-slot:avatar>
        <q-icon name="miscellaneous_services" color="white" />
      </template>
      connect to "Resume (履歷)".
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <q-btn flat color="white" label="Link 履歷" @click="$router.push({ name: 'Services' })" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
