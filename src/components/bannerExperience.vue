<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-secondary">
      <template v-slot:avatar>
        <q-icon name="rocket_launch" color="white" />
      </template>
      connect to "Experience (專案)".
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <q-btn flat color="white" label="Link Experience" @click="$router.push({ name: 'Experience' })" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
