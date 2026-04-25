<template>
  <q-page class="flex flex-center column bg-dark text-white">
    <div class="text-h5 q-mb-lg">SYSTEM ACCESS DIAL</div>

    <!-- 儀表盤 -->
    <div class="dial-wrapper">
      <svg viewBox="0 0 300 300" class="dial-svg">
        <!-- 外圈 -->
        <circle cx="150" cy="150" r="130" class="dial-ring" />

        <!-- 刻度 -->
        <g>
          <line
            v-for="i in 60"
            :key="i"
            :x1="150"
            :y1="20"
            :x2="150"
            :y2="i % 5 === 0 ? 40 : 30"
            :transform="`rotate(${i * 6} 150 150)`"
            class="tick"
          />
        </g>

        <!-- 解鎖區間 -->
        <path :d="arcPath" class="unlock-zone" />

        <!-- 指針 -->
        <g :transform="`rotate(${angle} 150 150)`">
          <line x1="150" y1="150" x2="150" y2="40" class="needle" />
        </g>

        <!-- 中心 -->
        <circle cx="150" cy="150" r="8" class="center-dot" />
      </svg>

      <!-- 透明拖曳層 -->
      <div class="drag-layer" @mousedown="startDrag"></div>
    </div>

    <!-- 狀態 -->
    <q-badge
      :color="isUnlocked ? 'green' : 'grey'"
      :label="isUnlocked ? 'UNLOCKED' : 'LOCKED'"
      class="q-mt-md"
    />

    <!-- 按鈕 -->
    <q-btn
      class="q-mt-lg"
      label="ENTER"
      color="primary"
      :disable="!isUnlocked"
      @click="goLink"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const angle = ref(0);
const velocity = ref(0);
const isDragging = ref(false);

// 🎯 解鎖區間
const TARGET_MIN = 110;
const TARGET_MAX = 140;

const isUnlocked = ref(false);

// 🧠 阻尼動畫
let raf = null;
const animate = () => {
  angle.value += velocity.value;
  velocity.value *= 0.92; // 阻尼

  // 卡點（每30度）
  const snap = Math.round(angle.value / 30) * 30;
  if (Math.abs(angle.value - snap) < 1) {
    angle.value = snap;
  }

  // 判斷解鎖
  if (angle.value >= TARGET_MIN && angle.value <= TARGET_MAX) {
    isUnlocked.value = true;
  } else {
    isUnlocked.value = false;
  }

  raf = requestAnimationFrame(animate);
};

// 拖曳
const handleMove = (e) => {
  if (!isDragging.value) return;

  const rect = document.querySelector(".dial-wrapper").getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = e.clientX - cx;
  const dy = e.clientY - cy;

  let deg = Math.atan2(dy, dx) * (180 / Math.PI);
  deg += 90;
  if (deg < 0) deg += 360;

  velocity.value = (deg - angle.value) * 0.2;
};

const startDrag = () => {
  isDragging.value = true;
};
const stopDrag = () => {
  isDragging.value = false;
};

// arc path（解鎖區域）
const polarToCartesian = (cx, cy, r, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (start, end) => {
  const startPt = polarToCartesian(150, 150, 120, end);
  const endPt = polarToCartesian(150, 150, 120, start);

  return `M ${startPt.x} ${startPt.y}
          A 120 120 0 0 0 ${endPt.x} ${endPt.y}`;
};

const arcPath = describeArc(TARGET_MIN, TARGET_MAX);

// 連結
const goLink = () => {
  window.open("https://example.com", "_blank");
};

onMounted(() => {
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", stopDrag);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("mouseup", stopDrag);
  cancelAnimationFrame(raf);
});
</script>

<style scoped>
.dial-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

.dial-svg {
  width: 100%;
  height: 100%;
}

.dial-ring {
  fill: none;
  stroke: #666;
  stroke-width: 4;
}

.tick {
  stroke: #aaa;
  stroke-width: 2;
}

.needle {
  stroke: #00e5ff;
  stroke-width: 4;
  stroke-linecap: round;
}

.center-dot {
  fill: #fff;
}

.unlock-zone {
  fill: none;
  stroke: #00ff88;
  stroke-width: 6;
  opacity: 0.6;
}

.drag-layer {
  position: absolute;
  inset: 0;
  cursor: grab;
}
</style>
