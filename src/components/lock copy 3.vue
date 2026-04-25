<template>
  <q-page class="bg-dark text-white flex flex-center column">
    <div class="text-h5 q-mb-lg">SAFE LOCK SYSTEM</div>

    <div class="row q-gutter-xl">
      <!-- 左旋鈕 -->
      <div class="dial-wrap">
        <div
          class="dial"
          :style="{ transform: `rotate(${angleL}deg)` }"
          @mousedown="startDrag('L', $event)"
        >
          <div class="needle"></div>
        </div>
      </div>

      <!-- 右旋鈕 -->
      <div class="dial-wrap">
        <div
          class="dial"
          :style="{ transform: `rotate(${angleR}deg)` }"
          @mousedown="startDrag('R', $event)"
        >
          <div class="needle"></div>
        </div>
      </div>
    </div>

    <!-- 狀態 -->
    <q-badge
      :color="unlocked ? 'green' : 'grey'"
      :label="statusText"
      class="q-mt-lg"
    />

    <q-btn
      label="ENTER"
      color="primary"
      class="q-mt-md"
      :disable="!unlocked"
      @click="go"
    />
  </q-page>
</template>

<script setup>
// import { ref, onMounted, onBeforeUnmount } from "vue";
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const angleL = ref(0);
const angleR = ref(0);

const velL = ref(0);
const velR = ref(0);

let dragging = null;

// 🎯 解鎖流程
let step = 0;
const unlocked = ref(false);

const TARGET_L = 120;
const TARGET_R = 300;
const TOL = 8;

// 🎵 音效
const click = new Audio("/sounds/click.mp3");
const unlock = new Audio("/sounds/unlock.mp3");

// 狀態文字
const statusText = computed(() => {
  if (unlocked.value) return "UNLOCKED";
  if (step === 1) return "STEP 2";
  return "LOCKED";
});

// 拖曳
function startDrag(side, e) {
  dragging = side;
}

function stopDrag() {
  dragging = null;
}

// 計算角度
function calcAngle(e, el) {
  const rect = el.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;

  const dx = e.clientX - cx;
  const dy = e.clientY - cy;

  let deg = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
  if (deg < 0) deg += 360;
  return deg;
}

function handleMove(e) {
  if (!dragging) return;

  const el = document.querySelectorAll(".dial")[dragging === "L" ? 0 : 1];
  const deg = calcAngle(e, el);

  if (dragging === "L") {
    velL.value = (deg - angleL.value) * 0.2;
  } else {
    velR.value = (deg - angleR.value) * 0.2;
  }
}

// 🎛️ 動畫（阻尼 + 卡點）
function animate() {
  // 左
  angleL.value += velL.value;
  velL.value *= 0.92;

  // 右
  angleR.value += velR.value;
  velR.value *= 0.92;

  // 卡點（每15度）
  snap(angleL);
  snap(angleR);

  checkUnlock();

  requestAnimationFrame(animate);
}

function snap(angleRef) {
  const snap = Math.round(angleRef.value / 15) * 15;
  if (Math.abs(angleRef.value - snap) < 1) {
    angleRef.value = snap;
    click.currentTime = 0;
    click.play();
  }
}

// 🧠 解鎖流程（方向很重要）
function checkUnlock() {
  // Step1：左旋鈕 順時針
  if (
    step === 0 &&
    angleL.value > TARGET_L - TOL &&
    angleL.value < TARGET_L + TOL
  ) {
    step = 1;
  }

  // Step2：右旋鈕 逆時針
  if (
    step === 1 &&
    angleR.value > TARGET_R - TOL &&
    angleR.value < TARGET_R + TOL
  ) {
    unlocked.value = true;
    unlock.play();
  }
}

function go() {
  window.open("https://example.com");
}

onMounted(() => {
  window.addEventListener("mousemove", handleMove);
  window.addEventListener("mouseup", stopDrag);
  animate();
});

onBeforeUnmount(() => {
  window.removeEventListener("mousemove", handleMove);
  window.removeEventListener("mouseup", stopDrag);
});
</script>

<style scoped>
.dial-wrap {
  width: 180px;
  height: 180px;
}

/* 🎛️ 金屬旋鈕 */
.dial {
  width: 100%;
  height: 100%;
  border-radius: 50%;

  background: radial-gradient(circle at 30% 30%, #bbb, #444 60%, #111),
    linear-gradient(145deg, #999, #222);

  box-shadow: inset -4px -4px 10px rgba(0, 0, 0, 0.8),
    inset 4px 4px 10px rgba(255, 255, 255, 0.2), 0 4px 10px rgba(0, 0, 0, 0.8);

  position: relative;
  cursor: grab;
}

/* 指針 */
.needle {
  position: absolute;
  top: 10px;
  left: 50%;
  width: 4px;
  height: 40%;
  background: #00e5ff;
  transform: translateX(-50%);
  border-radius: 2px;
}
</style>
