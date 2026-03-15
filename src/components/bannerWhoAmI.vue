<template>
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-green">
      <template v-slot:avatar>
        <q-icon name="face" color="white" />
      </template>
      connect to "Who Am I". about me
      <template v-slot:action>
        <!-- <q-btn flat color="white" label="Link about me" /> -->
        <q-btn flat color="white" label="Link about me" @click="$router.push({ name: 'MyPage' })" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->

    </q-banner>
  </div>
</template>
