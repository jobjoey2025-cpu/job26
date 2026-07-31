<template>
  <h6 style="text-align: center">
    SuAo 2樓 __ ⇩⇩⇩
  </h6>
  <q-page class="q-pa-md flex flex-center">
    <div class="container">
      <div v-for="(row, r) in grid" :key="r" class="row">
        <div
          v-for="(color, c) in row"
          :key="c"
          class="cell"
          :style="cellStyle(r, c)"
          @mouseenter="hoverRegion(r, c)"
          @mouseleave="hovered = null"
          @click="handleClick(r, c)"
        >
          <!-- @click="selectRegion(r, c)"  -->
          <!-- 只顯示左上角 label -->
          <div v-if="isTopLeft(r, c)" class="text">
            {{ colorTexts[color] || "" }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

/**
 * ===== Excel Grid =====
 */

const grid = [
  [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#D9D9D9",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#31869B",
    "#31869B",
    "#31869B",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#31869B",
    "#31869B",
    "#31869B",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#31869B",
    "#31869B",
    "#31869B",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#31869B",
    "#31869B",
    "#31869B",
    "#948A54",
    "#948A54",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
    "#C4BD97",
  ],
  [
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
    "#538DD5",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
    "#DDD9C4",
  ],
  [
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
  ],
  [
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
  ],
  [
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
  ],
  [
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
  ],
  [
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
    "#00B050",
  ],
];

/**
 * ===== Label =====
 */

 const colorTexts = {
  "#D9D9D9": "廁所",
  "#948A54": "走道",
  "#C4BD97": "Tent",
  "#31869B": "樓梯",
  "#538DD5": "隔斷",
  "#DDD9C4": "前廳 400",
  "#00B050": "騎樓 350"
};


const rows = grid.length;
const cols = grid[0].length;

/**
 * ===== Hover / Select state =====
 */
const hovered = ref(null);
const selected = ref(null);

/**
 * ===== region 判斷（O(1) 無 floodFill）=====
 */
function getRegionKey(r, c) {
  return `${grid[r][c]}-${r}-${c}`;
}

/**
 * 左上角判斷
 */
function isTopLeft(r, c) {
  const color = grid[r][c];
  if (r > 0 && grid[r - 1][c] === color) return false;
  if (c > 0 && grid[r][c - 1] === color) return false;
  return true;
}

/**
 * ===== Hover 整個區塊（用 flood scan 即時擴散）=====
 */
function hoverRegion(r, c) {
  const color = grid[r][c];
  hovered.value = color;
}

/**
 * ===== Click 選取 =====
 */
function selectRegion(r, c) {
  const color = grid[r][c];
  selected.value = color;

  $q.notify({
    type: "positive",
    message: colorTexts[color] || color,
    position: "top",
    timeout: 800,
  });
}

/**
 * ===== Cell Style（核心）=====
 */
function cellStyle(r, c) {
  const color = grid[r][c];

  const isHover = hovered.value === color;
  const isSelect = selected.value === color;

  return {
    backgroundColor: color,

    // hover highlight 整區
    filter: isHover ? "brightness(0.85)" : "none",

    // selected 更強
    outline: isSelect ? "2px solid #000" : "none",

    transition: "0.1s",
  };
}



</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  user-select: none;
}

/* row */
.row {
  display: flex;
}

/* cell */
.cell {
  /* joey 比例調整 */
  width: 20px;
  height: 27px;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 11px;
  font-weight: 600;
  color: #222;

  box-sizing: border-box;
  cursor: pointer;
}

.text {
  pointer-events: none;
  white-space: nowrap;
}
</style>
