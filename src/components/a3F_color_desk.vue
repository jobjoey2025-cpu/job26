<template>
  <h6 style="text-align: center;">Desk __ ⇩⇩⇩</h6>
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
  ["#F2F2F2", "#F2F2F2", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#DDD9C4", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#F2F2F2", "#F2F2F2", "#C5D9F1", "#DCE6F1", "#DCE6F1", "#DCE6F1", "#F2DCDB", "#F2DCDB", "#F2DCDB"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#FFFFFF", "#808080", "#808080", "#808080", "#808080", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#EBF1DE", "#EBF1DE", "#FFFFFF", "#FFFFFF", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#EBF1DE", "#EBF1DE", "#E4DFEC", "#E4DFEC", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#EBF1DE", "#EBF1DE", "#E4DFEC", "#E4DFEC", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#EBF1DE", "#EBF1DE", "#E4DFEC", "#E4DFEC", "#FDE9D9", "#FDE9D9", "#FDE9D9", "#FFFFFF"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080", "#808080"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#FFFFFF"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#D9D9D9", "#D9D9D9", "#D9D9D9", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#DAEEF3", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#C4BD97", "#C4BD97", "#C4BD97", "#8DB4E2"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"],
  ["#B8CCE4", "#E6B8B7", "#D8E4BC", "#CCC0DA", "#B7DEE8", "#FCD5B4", "#BFBFBF", "#BFBFBF", "#BFBFBF"]
];


/**
 * ===== Label =====
 */
 const colorTexts = {
  "#F2F2F2": "電源插座",
  "#DDD9C4": "Giga NB 顯卡",
  "#F2DCDB": "備用藥 2層",
  "#C5D9F1": "檯燈",
  "#DCE6F1": "完整藥 (現用)",
  "#FDE9D9": "文件櫃",
  "#EBF1DE": "標籤",
  "#E4DFEC": "3倍鏡",
  "#DAEEF3": "長條",
  "#D9D9D9": "筆筒",
  "#C4BD97": "門診 BOX", // 原始文字為：門診BOX
  "#8DB4E2": "臨時文件",
  "#B8CCE4": "文件1",
  "#E6B8B7": "文件2",
  "#D8E4BC": "文件3",
  "#CCC0DA": "文件4",
  "#B7DEE8": "文件5",
  "#FCD5B4": "文件6",
  "#BFBFBF": "免洗餐具 大集合"
};

const rows = grid.length;
const cols = grid[0].length;

/**
 * ===== Hover / Select state =====
 */
const hovered = ref(null);
const selected = ref(null);

// ----

// Google Form
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf6ZvAV_156eeHf-pbHUumVYDTUno7OGDFZAmm8rkqW-y8prg/formResponse";

// Google Form 簡答題 entry
const ENTRY_ID = "entry.1483699422";
// -----

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

// -----
async function handleClick(r, c) {
  selectRegion(r, c);
  await submitGoogleForm(r, c);
}

async function submitGoogleForm(r, c) {
  const color = grid[r][c];
  const text = colorTexts[color];

  if (!text) return;

  $q.notify({
    type: "info",
    message: `送出：${text}`,
    timeout: 800,
  });

  const formData = new FormData();

  formData.append(ENTRY_ID, text);

  try {
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    $q.notify({
      type: "positive",
      message: `Google Form 已送出：${text}`,
      timeout: 1200,
    });
  } catch (err) {
    console.error(err);

    $q.notify({
      type: "negative",
      message: "送出失敗",
    });
  }
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
  width: 80px;
  height: 30px;

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
