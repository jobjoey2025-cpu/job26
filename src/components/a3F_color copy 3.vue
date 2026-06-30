<template>
  <q-page class="q-pa-md flex flex-center">
    <h6>0630</h6>
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
 * ===== Excel 原始 Grid（不要轉換）=====
 */
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

const rows = grid.length;
const cols = grid[0].length;

const CELL_W = 80;
const CELL_H = 30;

/**
 * ===== 顏色 → 文字（唯一正確來源）=====
 */
const colorTexts = {
  "#F2F2F2": "門口櫃上",
  "#C4D79B": "木櫃上",
  "#F1E4C5": "夾鏈袋庫存",
  "#DBE5F2": "相機 庫存",
  "#ECE4D8": "包材 庫存",
  "#D9EAD3": "櫃",

  "#D7E3BC": "門口櫃中",
  "#EDDED5": "內褲衣",
  "#A7BFDE": "路由器 庫存",
  "#CCD9F6": "印表機",
  "#BCD5E4": "水果櫃",

  "#97B856": "木櫃中",
  "#948A5A": "防潮櫃",

  "#A6A6A6": "門口櫃下",
  "#B7DEE8": "冰箱",
  "#8FBC8F": "庫存 (難)",

  "#548235": "木櫃上抽",
  "#9BD08C": "TV櫃 (難)",

  "#D59393": "網櫃 (難)",

  "#E1B9B7": "木櫃下抽",

  "#6A6A0A": "工具包 地 (難)",

  "#4D5340": "TV 櫃抽 (難)",
};

const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

const blocks = [];

function inBounds(r, c) {
  return r >= 0 && c >= 0 && r < rows && c < cols;
}

/**
 * ===== Flood Fill（Excel 真實區塊）=====
 */
function floodFill(sr, sc) {
  const color = grid[sr][sc];
  const stack = [[sr, sc]];

  const block = {
    color,
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

  block.id = block.text;
  block.area = block.cells.length;

  blocks.push(block);
}

/**
 * build blocks
 */
for (let r = 0; r < rows; r++) {
  for (let c = 0; c < cols; c++) {
    if (!visited[r][c]) {
      floodFill(r, c);
    }
  }
}

/**
 * ===== STYLE（Excel 精準對齊）=====
 */
function blockStyle(b) {
  return {
    backgroundColor: b.color,

    gridRowStart: b.minR + 1,
    gridRowEnd: b.maxR + 2,

    gridColumnStart: b.minC + 1,
    gridColumnEnd: b.maxC + 2,

    border: "1px solid rgba(0,0,0,.2)",
    boxSizing: "border-box",
  };
}

async function openLink(block) {
  $q.notify({
    type: "info",
    message: block.text,
    position: "top",
  });
}
</script>

<style scoped>
.container {
  display: grid;
  grid-auto-flow: row;
  /* grid-auto-flow: column; */
  /* ⭐ Excel 對齊關鍵 */

  gap: 1px;
  background: #666;
  padding: 1px;
  user-select: none;
}

.block {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 600;
  color: #222;
  transition: 0.15s;
  cursor: pointer;
}

.block:hover {
  filter: brightness(0.95);
  transform: scale(0.98);
}

.title {
  pointer-events: none;
}
</style>
