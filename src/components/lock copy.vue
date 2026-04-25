<template>
  <q-page class="flex flex-center column q-pa-xl">
    <!-- 標題 -->
    <div class="text-h5 q-mb-lg">Access Control Dial</div>

    <!-- 旋鈕 -->
    <div
      class="dial"
      :style="{ transform: `rotate(${angle}deg)` }"
      @mousedown="startRotate"
    >
      <div class="dial-center"></div>
    </div>

    <!-- 角度顯示 -->
    <div class="q-mt-md">Angle: {{ Math.round(angle) }}°</div>

    <!-- 狀態 -->
    <q-badge
      :color="isUnlocked ? 'green' : 'grey'"
      :label="isUnlocked ? 'UNLOCKED' : 'LOCKED'"
      class="q-mt-md"
    />

    <!-- 連結按鈕 -->
    <q-btn
      class="q-mt-lg"
      label="Enter System"
      color="primary"
      :disable="!isUnlocked"
      @click="goLink"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const angle = ref(0);
const isDragging = ref(false);

const TARGET = 120; // 🎯 目標角度
const TOLERANCE = 10; // 誤差範圍

const isUnlocked = ref(false);

const startRotate = () => {
  isDragging.value = true;
};

const stopRotate = () => {
  isDragging.value = false;
};

const handleMove = (e) => {
  if (!isDragging.value) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const dx = e.clientX - centerX;
  const dy = e.clientY - centerY;

  let deg = Math.atan2(dy, dx) * (180 / Math.PI);
  deg = deg + 90;
  if (deg < 0) deg += 360;

  angle.value = deg;
  // angle.value += (targetAngle - angle.value) * 0.1

  // 判斷解鎖
  if (Math.abs(deg - TARGET) < TOLERANCE) {
    isUnlocked.value = true;
  } else {
    isUnlocked.value = false;
  }
};

const goLink = () => {
  window.open("https://example.com", "_blank");
};

onMounted(() => {
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", stopRotate);
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("mouseup", stopRotate);
});

</script>

<style scoped>
.dial {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: radial-gradient(circle, #444, #111);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  transition: transform 0.1s;
}

.dial-center {
  width: 20px;
  height: 20px;
  background: #fff;
  border-radius: 50%;
}
</style>
