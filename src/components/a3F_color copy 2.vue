<template>
  <q-page class="q-pa-md flex flex-center">
    <div
      class="container"
      :style="{
        gridTemplateColumns: `repeat(${cols}, ${CELL_W}px)`,
        gridTemplateRows: `repeat(${rows}, ${CELL_H}px)`,
      }"
    >
      <div
        v-for="block in blocks"
        :key="block.id"
        class="block"
        :style="blockStyle(block)"
        @click="openLink(block)"
      >
        <div class="title">
          {{ block.id }}
        </div>

        <!-- <q-tooltip>
          <div>{{ block.id }}</div>
          <div>{{ block.color }}</div>
          <div v-if="block.url">🔗 {{ block.url }}</div>
        </q-tooltip> -->
        <q-tooltip>
          <div>{{ block.id }}</div>
          <div>{{ block.color }}</div>
          <div>{{ block.text }}</div>
        </q-tooltip>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

/**
 * ===== INPUT GRID (Excel) =====
 */
// const grida = [
const grid = [
  [
    "#F2F2F2",
    "#F2F2F2",
    "#C4D79B",
    "#C4D79B",
    "#C4D79B",
    "#F1E4C5",
    "#F1E4C5",
    "#DBE5F2",
    "#DBE5F2",
    "#DBE5F2",
    "#ECE4D8",
    "#ECE4D8",
    "#D9EAD3",
    "#D9EAD3",
  ],
  [
    "#F2F2F2",
    "#F2F2F2",
    "#C4D79B",
    "#C4D79B",
    "#C4D79B",
    "#F1E4C5",
    "#F1E4C5",
    "#DBE5F2",
    "#DBE5F2",
    "#DBE5F2",
    "#ECE4D8",
    "#ECE4D8",
    "#D9EAD3",
    "#D9EAD3",
  ],
  [
    "#F2F2F2",
    "#F2F2F2",
    "#C4D79B",
    "#C4D79B",
    "#C4D79B",
    "#F1E4C5",
    "#F1E4C5",
    "#DBE5F2",
    "#DBE5F2",
    "#DBE5F2",
    "#ECE4D8",
    "#ECE4D8",
    "#D9EAD3",
    "#D9EAD3",
  ],
  [
    "#D7E3BC",
    "#D7E3BC",
    "#C4D79B",
    "#C4D79B",
    "#C4D79B",
    "#EDDED5",
    "#EDDED5",
    "#A7BFDE",
    "#A7BFDE",
    "#A7BFDE",
    "#CCD9F6",
    "#CCD9F6",
    "#BCD5E4",
    "#BCD5E4",
  ],
  [
    "#D7E3BC",
    "#D7E3BC",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#A7BFDE",
    "#A7BFDE",
    "#A7BFDE",
    "#CCD9F6",
    "#CCD9F6",
    "#BCD5E4",
    "#BCD5E4",
  ],
  [
    "#D7E3BC",
    "#D7E3BC",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#948A5A",
    "#948A5A",
    "#948A5A",
    "#CCD9F6",
    "#CCD9F6",
    "#BCD5E4",
    "#BCD5E4",
  ],
  [
    "#D7E3BC",
    "#D7E3BC",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#948A5A",
    "#948A5A",
    "#948A5A",
    "#CCD9F6",
    "#CCD9F6",
    "#BCD5E4",
    "#BCD5E4",
  ],
  [
    "#D7E3BC",
    "#D7E3BC",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#948A5A",
    "#948A5A",
    "#948A5A",
    "#CCD9F6",
    "#CCD9F6",
    "#BCD5E4",
    "#BCD5E4",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#948A5A",
    "#948A5A",
    "#948A5A",
    "#B7DEE8",
    "#B7DEE8",
    "#8FBC8F",
    "#8FBC8F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#97B856",
    "#97B856",
    "#97B856",
    "#EDDED5",
    "#EDDED5",
    "#948A5A",
    "#948A5A",
    "#948A5A",
    "#B7DEE8",
    "#B7DEE8",
    "#8FBC8F",
    "#8FBC8F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#548235",
    "#548235",
    "#548235",
    "#EDDED5",
    "#EDDED5",
    "#9BD08C",
    "#9BD08C",
    "#9BD08C",
    "#B7DEE8",
    "#B7DEE8",
    "#8FBC8F",
    "#8FBC8F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#548235",
    "#548235",
    "#548235",
    "#D59393",
    "#D59393",
    "#9BD08C",
    "#9BD08C",
    "#9BD08C",
    "#B7DEE8",
    "#B7DEE8",
    "#8FBC8F",
    "#8FBC8F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#E1B9B7",
    "#E1B9B7",
    "#E1B9B7",
    "#F1E4C5",
    "#F1E4C5",
    "#9BD08C",
    "#9BD08C",
    "#9BD08C",
    "#B7DEE8",
    "#B7DEE8",
    "#6A6A0A",
    "#6A6A0A",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#E1B9B7",
    "#E1B9B7",
    "#E1B9B7",
    "#F1E4C5",
    "#F1E4C5",
    "#4D5340",
    "#4D5340",
    "#4D5340",
    "#B7DEE8",
    "#B7DEE8",
    "#6A6A0A",
    "#6A6A0A",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#E1B9B7",
    "#E1B9B7",
    "#E1B9B7",
    "#F1E4C5",
    "#F1E4C5",
    "#4D5340",
    "#4D5340",
    "#4D5340",
    "#B7DEE8",
    "#B7DEE8",
    "#6A6A0A",
    "#6A6A0A",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#E1B9B7",
    "#E1B9B7",
    "#E1B9B7",
    "#F1E4C5",
    "#F1E4C5",
    "#4D5340",
    "#4D5340",
    "#4D5340",
    "#B7DEE8",
    "#B7DEE8",
    "#6A6A0A",
    "#6A6A0A",
  ],
];

// const grid = grida[0].map((_, c) => grida.map(row => row[c]));
// const grid = grida[0].map((_, c) => grida.map(row => row[c])).reverse();

const rows = grid.length;
const cols = grid[0].length;
// const CELL = 50;
const CELL_W = 80; // 寬
const CELL_H = 30; // 高（= 1/3）
/**
 * ===== AUTO BLOCK ENGINE (FLOOD FILL) =====
 */

const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const blocks = [];

const regionNames = [
  "門口櫃上",
  "木櫃上",
  "夾鏈袋庫存",
  "相機 庫存",
  "包材 庫存",
  "櫃",
  "門口櫃中",
  "內褲衣",
  "路由器 庫存",
  "印表機",
  "水果櫃",
  "木櫃中",
  "防潮櫃",
  "門口櫃下",
  "冰箱",
  "庫存 (難)",
  "木櫃上抽",
  "TV櫃 (難)",
  "網櫃 (難)",
  "木櫃下抽",
  "網櫃地上 (難)",
  "工具包 地 (難)",
  "TV 櫃抽 (難)",
];

// const colorLinks = {
//   "#B2F0F2": "https://www.google.com/?hl=zh_TW",
// };
const colorTexts = {
  "#F2F2F2": "門口櫃上",
  "#DDD9C4": "木櫃上",
  "#C5D9F1": "夾鏈袋庫存",
  "#F2DCDB": "相機 庫存",
  "#E4DFEC": "包材 庫存",
  "#FDE9D9": "櫃",
  "#D9D9D9": "門口櫃中",
  "#8DB4E2": "內褲衣",
  "#E6B8B7": "路由器 庫存",
  "#CCC0DA": "印表機",
  "#FCD5B4": "水果櫃",
  "#C4BD97": "木櫃中",
  "#DA9694": "防潮櫃",
  "#A6A6A6": "門口櫃下",
  "#B1A0C7": "冰箱",
  "#FABF8F": "庫存 (難)",
  "#948A54": "木櫃上抽",
  "#C4D79B": "TV櫃 (難)",
  "#538DD5": "網櫃 (難)",
  "#EEECE1": "木櫃下抽",
  "#C5D9F1": "網櫃地上 (難)",
  "#E26B0A": "工具包 地 (難)",
  "#C0504D": "TV 櫃抽 (難)",
};
// Google Form
const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSf6ZvAV_156eeHf-pbHUumVYDTUno7OGDFZAmm8rkqW-y8prg/formResponse";

// Google Form 簡答題 entry
const ENTRY_ID = "entry.1483699422";

let nameIndex = 0;

function inBounds(r, c) {
  return r >= 0 && c >= 0 && r < rows && c < cols;
}

function floodFill(sr, sc) {
  const color = grid[sr][sc];
  const stack = [[sr, sc]];

  const block = {
    // id: `region_${blocks.length+1}`,
    id: regionNames[nameIndex++] || `Region_${nameIndex}`,
    color,
    // url: colorLinks[color] || null, // ⭐ 加這行
    text: colorTexts[color] || "",
    cells: [],
    minR: sr,
    maxR: sr,
    minC: sc,
    maxC: sc,
  };

  visited[sr][sc] = true;

  while (stack.length) {
    const [r, c] = stack.pop();

    block.cells.push([r, c]);

    block.minR = Math.min(block.minR, r);
    block.maxR = Math.max(block.maxR, r);
    block.minC = Math.min(block.minC, c);
    block.maxC = Math.max(block.maxC, c);

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (!inBounds(nr, nc)) continue;
      if (visited[nr][nc]) continue;
      if (grid[nr][nc] !== color) continue;

      visited[nr][nc] = true;
      stack.push([nr, nc]);
    }
  }

  block.area = block.cells.length;

  // convert bbox → CSS grid
  block.startRow = block.minR + 1;
  block.endRow = block.maxR + 2;

  block.startCol = block.minC + 1;
  block.endCol = block.maxC + 2;

  blocks.push(block);
}

/**
 * build all blocks
 */
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!visited[r][c]) {
      floodFill(r, c);
    }
  }
}

/**
 * ===== UI STATE =====
 */
const active = ref(null);

/**
 * ===== STYLE =====
 */
// function blockStyle(b) {

function blockStyle(b) {
  return {
    backgroundColor: b.color,

    gridRow: `${b.startRow} / span ${b.maxR - b.minR + 1}`,

    gridColumn: `${b.startCol} / span ${b.maxC - b.minC + 1}`,

    border: "1px solid rgba(0,0,0,.2)",

    boxSizing: "border-box",
  };
}
// function openLink(block) {
//   if (!block.url) return;

//   window.open(block.url, "_blank");
// }

async function openLink(block) {
  // 立即顯示通知 👉 先顯示（最重要）
  $q.notify({
    type: "info",
    message: `已點擊：${block.text}`,
    position: "top",
    timeout: 1000,
    icon: "touch_app",
  });

  if (!block.text) return;

  const formData = new FormData();

  formData.append(ENTRY_ID, block.text);

  try {
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    $q.notify({
      type: "positive",
      message: `已點擊按鈕：${block.text}`,
      position: "top",
      color: "primary",
      timeout: 1500,
      icon: "check_circle",
    });
  } catch (err) {
    console.error(err);

    $q.notify({
      type: "negative",
      message: "送出失敗",

      position: "top",
      timeout: 2000,
      icon: "error",
    });
  }
}
</script>

<style scoped>
.container {
  display: grid;

  gap: 1px;

  background: #666;

  padding: 1px;

  user-select: none;
}

.block {
  width: 100%;
  height: 100%;
  cursor: pointer;

  display: flex;

  justify-content: center;

  align-items: center;

  overflow: hidden;

  box-sizing: border-box;

  font-size: 12px;

  font-weight: 600;

  color: #222;

  cursor: pointer;

  transition: 0.15s;
}

.block:hover {
  filter: brightness(0.95);

  transform: scale(0.98);
}

.title {
  padding: 2px;

  text-align: center;

  line-height: 1.2;

  pointer-events: none;
}
</style>
