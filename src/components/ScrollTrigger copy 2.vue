<template>
  <q-page class="page">
    <div>
    <!-- 控制按鈕 -->
    <!-- <div class="fixed-left column q-pa-md q-gutter-sm" style="top: 200px;z-index:999"> -->
    <div class="nav-left">
      <!-- <h1 style="text-align: center">SS</h1> -->

      <q-btn label="Section 1" @click="goTo('.s1')" />
      <q-btn label="Section 2" @click="goTo('.s2')" />
      <q-btn label="Section 3" @click="goTo('.s3')" />
    </div>

    <!-- Sections -->
    <section class="section s1">Section 1</section>
    <section class="section s2">Section 2</section>
    <section class="section s3">Section 3</section>
  </div>
  </q-page>
</template>
<script setup>
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const goTo = (target) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: target,
    ease: "power2.out",
  });
};
</script>
<style scoped>
.nav-left {
  position: fixed;
  left: 16px;
  top: 500px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  z-index: 999;
  color: white;
}
.section {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

.s1 {
  background: #111;
  color: white;
}
.s2 {
  background: #333;
  color: white;
}
.s3 {
  background: #555;
  color: white;
}
</style>
