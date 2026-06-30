<template>
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
    "#F2F2F2",
    "#F2F2F2",
    "#DCE6F1",
    "#DCE6F1",
    "#DCE6F1",
    "#FDE9D9",
    "#FDE9D9",
    "#B8CCE4",
    "#B8CCE4",
    "#B8CCE4",
    "#FCD5B4",
    "#FCD5B4",
    "#95B3D7",
    "#95B3D7",
  ], // Row 1
  [
    "#F2F2F2",
    "#F2F2F2",
    "#DCE6F1",
    "#DCE6F1",
    "#DCE6F1",
    "#FDE9D9",
    "#FDE9D9",
    "#B8CCE4",
    "#B8CCE4",
    "#B8CCE4",
    "#FCD5B4",
    "#FCD5B4",
    "#95B3D7",
    "#95B3D7",
  ], // Row 2
  [
    "#F2F2F2",
    "#F2F2F2",
    "#DCE6F1",
    "#DCE6F1",
    "#DCE6F1",
    "#FDE9D9",
    "#FDE9D9",
    "#B8CCE4",
    "#B8CCE4",
    "#B8CCE4",
    "#FCD5B4",
    "#FCD5B4",
    "#95B3D7",
    "#95B3D7",
  ], // Row 3
  [
    "#DDD9C4",
    "#DDD9C4",
    "#DCE6F1",
    "#DCE6F1",
    "#DCE6F1",
    "#D9D9D9",
    "#D9D9D9",
    "#E6B8B7",
    "#E6B8B7",
    "#E6B8B7",
    "#BFBFBF",
    "#BFBFBF",
    "#DA9694",
    "#DA9694",
  ], // Row 4
  [
    "#DDD9C4",
    "#DDD9C4",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#E6B8B7",
    "#E6B8B7",
    "#E6B8B7",
    "#BFBFBF",
    "#BFBFBF",
    "#DA9694",
    "#DA9694",
  ], // Row 5
  [
    "#DDD9C4",
    "#DDD9C4",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#D8E4BC",
    "#D8E4BC",
    "#D8E4BC",
    "#BFBFBF",
    "#BFBFBF",
    "#DA9694",
    "#DA9694",
  ], // Row 6
  [
    "#DDD9C4",
    "#DDD9C4",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#D8E4BC",
    "#D8E4BC",
    "#D8E4BC",
    "#BFBFBF",
    "#BFBFBF",
    "#DA9694",
    "#DA9694",
  ], // Row 7
  [
    "#DDD9C4",
    "#DDD9C4",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#D8E4BC",
    "#D8E4BC",
    "#D8E4BC",
    "#BFBFBF",
    "#BFBFBF",
    "#DA9694",
    "#DA9694",
  ], // Row 8
  [
    "#C5D9F1",
    "#C5D9F1",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#D8E4BC",
    "#D8E4BC",
    "#D8E4BC",
    "#948A54",
    "#948A54",
    "#C4D79B",
    "#C4D79B",
  ], // Row 9
  [
    "#C5D9F1",
    "#C5D9F1",
    "#F2DCDB",
    "#F2DCDB",
    "#F2DCDB",
    "#D9D9D9",
    "#D9D9D9",
    "#D8E4BC",
    "#D8E4BC",
    "#D8E4BC",
    "#948A54",
    "#948A54",
    "#C4D79B",
    "#C4D79B",
  ], // Row 10
  [
    "#C5D9F1",
    "#C5D9F1",
    "#EBF1DE",
    "#EBF1DE",
    "#EBF1DE",
    "#D9D9D9",
    "#D9D9D9",
    "#CCC0DA",
    "#CCC0DA",
    "#CCC0DA",
    "#948A54",
    "#948A54",
    "#C4D79B",
    "#C4D79B",
  ], // Row 11
  [
    "#C5D9F1",
    "#C5D9F1",
    "#EBF1DE",
    "#EBF1DE",
    "#EBF1DE",
    "#C4BD97",
    "#C4BD97",
    "#CCC0DA",
    "#CCC0DA",
    "#CCC0DA",
    "#948A54",
    "#948A54",
    "#C4D79B",
    "#C4D79B",
  ], // Row 12
  [
    "#C5D9F1",
    "#C5D9F1",
    "#E4DFEC",
    "#E4DFEC",
    "#E4DFEC",
    "#8DB4E2",
    "#8DB4E2",
    "#CCC0DA",
    "#CCC0DA",
    "#CCC0DA",
    "#948A54",
    "#948A54",
    "#B1A0C7",
    "#B1A0C7",
  ], // Row 13
  [
    "#C5D9F1",
    "#C5D9F1",
    "#E4DFEC",
    "#E4DFEC",
    "#E4DFEC",
    "#8DB4E2",
    "#8DB4E2",
    "#B7DEE8",
    "#B7DEE8",
    "#B7DEE8",
    "#948A54",
    "#948A54",
    "#B1A0C7",
    "#B1A0C7",
  ], // Row 14
  [
    "#C5D9F1",
    "#C5D9F1",
    "#E4DFEC",
    "#E4DFEC",
    "#E4DFEC",
    "#8DB4E2",
    "#8DB4E2",
    "#B7DEE8",
    "#B7DEE8",
    "#B7DEE8",
    "#948A54",
    "#948A54",
    "#B1A0C7",
    "#B1A0C7",
  ], // Row 15
  [
    "#C5D9F1",
    "#C5D9F1",
    "#E4DFEC",
    "#E4DFEC",
    "#E4DFEC",
    "#8DB4E2",
    "#8DB4E2",
    "#B7DEE8",
    "#B7DEE8",
    "#B7DEE8",
    "#948A54",
    "#948A54",
    "#B1A0C7",
    "#B1A0C7",
  ], // Row 16
];

/**
 * ===== Label =====
 */
const colorTexts = {
  "#F2F2F2": "門口櫃上",
  "#DCE6F1": "木櫃上",
  "#FDE9D9": "夾鏈袋庫存",
  "#B8CCE4": "相機 庫存",
  "#FCD5B4": "包材 庫存",
  "#95B3D7": "櫃",
  "#DDD9C4": "門口櫃中",
  "#D9D9D9": "內褲衣",
  "#E6B8B7": "路由器 庫存",
  "#BFBFBF": "印表機",
  "#DA9694": "水果櫃",
  "#F2DCDB": "木櫃中",
  "#D8E4BC": "防潮櫃",
  "#C5D9F1": "門口櫃下",
  "#948A54": "冰箱",
  "#C4D79B": "庫存 (難)",
  "#EBF1DE": "木櫃上抽",
  "#CCC0DA": "TV櫃 (難)",
  "#C4BD97": "網櫃 (難)",
  "#E4DFEC": "木櫃下抽",
  "#8DB4E2": "網櫃地上 (難)",
  "#B1A0C7": "工具包 地 (難)",
  "#B7DEE8": "TV 櫃抽  (難)",
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



// async function openLink(block) {
//   // 立即顯示通知 👉 先顯示（最重要）
//   $q.notify({
//     type: "info",
//     message: `已點擊：${block.text}`,
//     position: "top",
//     timeout: 1000,
//     icon: "touch_app",
//   });

//   if (!block.text) return;

//   const formData = new FormData();

//   formData.append(ENTRY_ID, block.text);

//   try {


//     await fetch(FORM_URL, {
//       method: "POST",
//       mode: "no-cors",
//       body: formData,
//     });

//     $q.notify({
//       type: "positive",
//       message: `已點擊按鈕：${block.text}`,
//       position: "top",
//       color: "primary",
//       timeout: 1500,
//       icon: "check_circle",
//     });
//   } catch (err) {
//     console.error(err);

//     $q.notify({
//       type: "negative",
//       message: "送出失敗",

//       position: "top",
//       timeout: 2000,
//       icon: "error",
//     });
//   }
// }
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
