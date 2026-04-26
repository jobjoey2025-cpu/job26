<template>
  <p style="text-align: center">lock</p>
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
            x1="150"
            y1="20"
            x2="150"
            :y2="i % 5 === 0 ? 40 : 30"
            :transform="`rotate(${i * 6} 150 150)`"
            class="tick"
          />
        </g>

        <!-- 解鎖區 -->
        <path :d="arcPath" class="unlock-zone" />

        <!-- 指針（旋轉） -->
        <g :transform="`rotate(${angle} 150 150)`">
          <line x1="150" y1="150" x2="150" y2="40" class="needle" />
        </g>

        <!-- 中心 -->
        <circle cx="150" cy="150" r="8" class="center-dot" />
      </svg>

      <!-- 拖曳層 -->
      <div class="drag-layer" @pointerdown="startDrag"></div>
    </div>

    <!-- 狀態 -->
    <!-- :label="isUnlocked ? 'UNLOCKED' : 'LOCKED'" -->

    <q-badge
      :color="isUnlocked ? 'green' : 'grey'"
      :label="isUnlocked ? 'NG' : 'OK'"
      class="q-mt-md"
    />

    <!-- 按鈕 -->
    <!-- color="primary" -->
    <!-- <q-btn
      class="q-mt-lg"
      label="ENTER"
      color="black"
      :disable="!isUnlocked"
      @click="goLink"
    /> -->
  </q-page>
  <!-- 按鈕 -->
  <!-- color="primary"  class="q-mt-lg" label="E"-->
  <q-btn
    round
    icon="close"
    color="black"
    :disable="!isUnlocked"
    @click="goLink"
  />
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";


const angle = ref(0);
const velocity = ref(0);
const isDragging = ref(false);

let lastAngle = null;
let raf = null;

// 🎯 解鎖區間 @joey
// const TARGET_MIN = 110;
// const TARGET_MAX = 140;
const TARGET_MIN = 90;
const TARGET_MAX = 270;
const isUnlocked = ref(false);

// 🎛️ 動畫（阻尼 + 卡點）
const animate = () => {
  angle.value += velocity.value;
  velocity.value *= 0.92;

  // 卡點（每30度）
  const snap = Math.round(angle.value / 30) * 30;
  if (Math.abs(angle.value - snap) < 1) {
    angle.value = snap;
  }

  // 解鎖判斷
  if (angle.value >= TARGET_MIN && angle.value <= TARGET_MAX) {
    isUnlocked.value = true;
  } else {
    isUnlocked.value = false;
  }

  raf = requestAnimationFrame(animate);
};

// 開始拖曳（支援觸控）
const startDrag = (e) => {
  isDragging.value = true;
  e.target.setPointerCapture(e.pointerId);
};

// 停止拖曳
const stopDrag = () => {
  isDragging.value = false;
  lastAngle = null;
};

// 計算角度（支援 touch / mouse）
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

  if (lastAngle !== null) {
    velocity.value = (deg - lastAngle) * 0.3;
  }

  lastAngle = deg;
};

// arc path
const polarToCartesian = (cx, cy, r, angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

const describeArc = (start, end) => {
  // const startPt = polarToCartesian(150, 150, 120, end);
  // const endPt = polarToCartesian(150, 150, 120, start);

  const startPt = polarToCartesian(150, 150, 120, end);
  const endPt = polarToCartesian(150, 150, 120, start);

  return `M ${startPt.x} ${startPt.y}
          A 120 120 0 0 0 ${endPt.x} ${endPt.y}`;
};

const arcPath = describeArc(TARGET_MIN, TARGET_MAX);

// import Qtable from "components/Qtable.vue";
import { useRouter } from 'vue-router'

const router = useRouter()

const goLink = () => {
  router.push('/outsourcingSOP') //@joey 解鎖的連結
}

// 連結
// const goLink = () => {
//   window.open("https://example.com", "_blank");
// };

// const goLink = () => {
//   router.push({ name: 'Qtable' })
// }



onMounted(() => {
  window.addEventListener("pointermove", handleMove);
  window.addEventListener("pointerup", stopDrag);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("pointermove", handleMove);
  window.removeEventListener("pointerup", stopDrag);
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

/* 🔥 觸控關鍵 */
.drag-layer {
  position: absolute;
  inset: 0;
  cursor: grab;
  touch-action: none;
}
</style>
