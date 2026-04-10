<template>
  <q-page class="page">
    <!-- Layer 1 背景 -->
    <div class="layer bg"></div>

    <!-- Layer 2 -->
    <div class="layer img layer1"></div>

    <!-- Layer 3 -->
    <div class="layer img layer2"></div>

    <!-- 文字 -->
    <div class="layer content">
      <h1>Layer System</h1>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  // Layer 1（慢）
  gsap.to(".layer1", {
    y: 200,
    scrollTrigger: {
      trigger: ".page",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // Layer 2（快）
  gsap.to(".layer2", {
    y: 400,
    opacity: 1,
    scrollTrigger: {
      trigger: ".page",
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });

  // 文字淡入
  gsap.from(".content", {
    opacity: 0,
    y: 100,
    scrollTrigger: {
      trigger: ".page",
      start: "top center",
      end: "top top",
      scrub: true,
    },
  });
});

const layers = [
  { class: ".layer1", speed: 200 },
  { class: ".layer2", speed: 400 },
];

layers.forEach((l) => {
  gsap.to(l.class, {
    y: l.speed,
    scrollTrigger: {
      trigger: ".page",
      scrub: true,
    },
  });
});
</script>

<style scoped>
.page {
  height: 300vh;
  position: relative;
}

/* 所有 layer 共用 */
.layer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
}

/* 背景 */
.bg {
  background: url("https://picsum.photos/1920/1080?random=1") center/cover;
  z-index: 1;
}

/* 圖層1 */
.layer1 {
  background: url("https://picsum.photos/800/600?random=2") center/contain
    no-repeat;
  z-index: 2;
}

/* 圖層2 */
.layer2 {
  background: url("https://picsum.photos/800/600?random=3") center/contain
    no-repeat;
  z-index: 3;
  opacity: 0.2;
}

/* 文字 */
.content {
  z-index: 4;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 48px;
}
</style>
