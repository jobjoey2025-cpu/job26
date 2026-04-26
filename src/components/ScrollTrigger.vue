<template>
  <p style="text-align: center">ScrollTrigge</p>
  <!-- https://neutra-vdl.org/ -->
  <!-- <q-page class="page" style="margin-top: 100px"> -->
  <q-page class="page q-pt-xl">
    <div>
      <!-- 左側控制 -->
      <div class="nav-left">
        <q-btn
          v-for="(img, i) in images"
          :key="i"
          :label="'Scene ' + (i + 1)"
          flat
          @click="changeScene(i)"
        />
      </div>

      <!-- 圖片層 -->
      <div class="stage">
        <div
          v-for="(img, i) in images"
          :key="i"
          class="bg"
          :style="{
            backgroundImage: `url(${img})`,
            zIndex: i,
          }"
        ></div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";

const images = [
  "/img/20260410002.png",
  "/img/20260410003.png",
  "/img/20260410004.png",
];

const current = ref(0);
let layers = [];

onMounted(() => {
  layers = document.querySelectorAll(".bg");

  // 初始化：只顯示第一張
  layers.forEach((el, i) => {
    gsap.set(el, { opacity: i === 0 ? 1 : 0 });
  });
});

// 🔥 核心：切換場景（fade）
const changeScene = (index) => {
  if (index === current.value) return;

  const prev = layers[current.value];
  const next = layers[index];

  // 淡出舊的
  gsap.to(prev, {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out",
  });

  // 淡入新的
  gsap.to(next, {
    opacity: 1,
    duration: 0.6,
    ease: "power2.out",
  });

  current.value = index;
};
</script>

<style scoped>
.page {
  /* height: 100vh; */
  overflow: hidden;
  /* padding-top: 64px; */
}

/* 左側按鈕 */
.nav-left {
  /* position: fixed; */
  left: 0;
  /* top: 200px; */
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 圖片舞台 */
.stage {
  /* position: fixed; */
  /* margin-top: 300px; */
  /* margin: 100px; */

  width: 70%;
  height: 70vh;
  /* top: 0; */
  left: 0;
}

/* 圖片層 */
.bg {
  position: absolute;
  /* margin-top: 300px; */
  /* margin: 100px; */
  width: 70%;
  height: 70%;
  background-position: center;
  background-size: cover;
}
</style>
