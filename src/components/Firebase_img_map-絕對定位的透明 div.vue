<template>
  <div class="image-container">
    <q-img src="https://picsum.photos/500/300" style="width: 500px" />

    <div class="hotspot circle" @click="onAreaClick('圓形')" />

    <div class="hotspot rect" @click="onAreaClick('矩形')" />
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

const onAreaClick = (msg) => {
  $q.notify({
    message: msg,
    color: "primary",
  });
};
</script>

<style scoped>
.image-container {
  position: relative;
  width: 500px;
}

.hotspot {
  position: absolute;
  cursor: pointer;
}

.circle {
  left: 100px;
  top: 100px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.rect {
  left: 300px;
  top: 100px;
  width: 150px;
  height: 100px;
}
</style>
