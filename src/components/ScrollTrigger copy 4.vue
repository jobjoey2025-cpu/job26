<template>
  <q-page class="page">

    <!-- 左側控制 -->
    <div class="nav-left">
      <q-btn
        v-for="(img, i) in images"
        :key="i"
        flat
        :label="'Scene ' + (i + 1)"
        @click="goTo(i)"
      />
    </div>

    <!-- 漸變圖片區 -->
    <div class="section">
      <div
        v-for="(img, i) in images"
        :key="i"
        class="bg"
        :style="{
          backgroundImage: `url(${img})`,
          zIndex: i
        }"
      ></div>
    </div>

  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const images = [
  "https://picsum.photos/1920/1080?1",
  "https://picsum.photos/1920/1080?2",
  "https://picsum.photos/1920/1080?3"
];

const sections = ref([]);

onMounted(() => {
  const layers = document.querySelectorAll(".bg");

  // 🔥 Scroll 漸變
  layers.forEach((layer, i) => {
    if (i === 0) return;

    gsap.to(layer, {
      opacity: 1,
      scrollTrigger: {
        trigger: ".section",
        start: () => `${i * 100}% top`,
        end: () => `${(i + 1) * 100}% top`,
        scrub: true
      }
    });
  });
});

// 🔥 按鈕跳轉
const goTo = (index) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: index * window.innerHeight
    },
    ease: "power2.out"
  });
};
</script>

<style scoped>
.page {
  height: 300vh;
}

/* 左側控制 */
.nav-left {
  position: fixed;
  left: 0;
  top: 200px;
  z-index: 999;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* 圖片區 */
.section {
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
}

/* 每一層圖片 */
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  opacity: 0;
}

/* 第一張圖預設顯示 */
.bg:first-child {
  opacity: 1;
}
</style>