<template>
  <q-page class="flex flex-center">
    <div>
      <!-- 改成原生 img -->
      <img
        src="https://picsum.photos/500/300"
        usemap="#mountain-map"
        style="width: 500px; max-width: 100%"
      />

      <map name="mountain-map">
        <!-- 圓形 -->
        <area
          shape="circle"
          coords="150,150,50"
          href="#"
          alt="Circle"
          @click.prevent="onAreaClick('你點擊了圓形熱區！')"
        />
      </map>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

const onAreaClick = (message) => {
  $q.notify({
    message,
    color: "primary",
  });
};
</script>
