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
 const grid = [
  [
    "#B2F0F2",
    "#B2F0F2",
    "#5DDBC4",
    "#5DDBC4",
    "#5DDBC4",
    "#45E2F1",
    "#45E2F1",
    "#7277DB",
    "#7277DB",
    "#7277DB",
    "#64E1EC",
    "#64E1EC",
    "#3DDFD9",
    "#3DDFD9",
  ],
  [
    "#B2F0F2",
    "#B2F0F2",
    "#5DDBC4",
    "#5DDBC4",
    "#5DDBC4",
    "#45E2F1",
    "#45E2F1",
    "#7277DB",
    "#7277DB",
    "#7277DB",
    "#64E1EC",
    "#64E1EC",
    "#3DDFD9",
    "#3DDFD9",
  ],
  [
    "#B2F0F2",
    "#B2F0F2",
    "#5DDBC4",
    "#5DDBC4",
    "#5DDBC4",
    "#45E2F1",
    "#45E2F1",
    "#7277DB",
    "#7277DB",
    "#7277DB",
    "#64E1EC",
    "#64E1EC",
    "#3DDFD9",
    "#3DDFD9",
  ],
  [
    "#79D9D9",
    "#79D9D9",
    "#5DDBC4",
    "#5DDBC4",
    "#5DDBC4",
    "#4DF1E2",
    "#4DF1E2",
    "#66B7B7",
    "#66B7B7",
    "#66B7B7",
    "#CCCADA",
    "#CCCADA",
    "#FCD7B4",
    "#FCD7B4",
  ],
  [
    "#79D9D9",
    "#79D9D9",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#66B7B7",
    "#66B7B7",
    "#66B7B7",
    "#CCCADA",
    "#CCCADA",
    "#FCD7B4",
    "#FCD7B4",
  ],
  [
    "#79D9D9",
    "#79D9D9",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#9A9694",
    "#9A9694",
    "#9A9694",
    "#CCCADA",
    "#CCCADA",
    "#FCD7B4",
    "#FCD7B4",
  ],
  [
    "#79D9D9",
    "#79D9D9",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#9A9694",
    "#9A9694",
    "#9A9694",
    "#CCCADA",
    "#CCCADA",
    "#FCD7B4",
    "#FCD7B4",
  ],
  [
    "#79D9D9",
    "#79D9D9",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#9A9694",
    "#9A9694",
    "#9A9694",
    "#CCCADA",
    "#CCCADA",
    "#FCD7B4",
    "#FCD7B4",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#9A9694",
    "#9A9694",
    "#9A9694",
    "#91A5C7",
    "#91A5C7",
    "#BAC58F",
    "#BAC58F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#64C297",
    "#64C297",
    "#64C297",
    "#4DF1E2",
    "#4DF1E2",
    "#9A9694",
    "#9A9694",
    "#9A9694",
    "#91A5C7",
    "#91A5C7",
    "#BAC58F",
    "#BAC58F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#548494",
    "#548494",
    "#548494",
    "#4DF1E2",
    "#4DF1E2",
    "#A4D89B",
    "#A4D89B",
    "#A4D89B",
    "#91A5C7",
    "#91A5C7",
    "#BAC58F",
    "#BAC58F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#548494",
    "#548494",
    "#548494",
    "#9395D5",
    "#9395D5",
    "#A4D89B",
    "#A4D89B",
    "#A4D89B",
    "#91A5C7",
    "#91A5C7",
    "#BAC58F",
    "#BAC58F",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#EEE2E1",
    "#EEE2E1",
    "#EEE2E1",
    "#45E2F1",
    "#45E2F1",
    "#A4D89B",
    "#A4D89B",
    "#A4D89B",
    "#91A5C7",
    "#91A5C7",
    "#62580A",
    "#62580A",
  ],
  [
    "#A6A6A6",
    "#A6A6A6",
    "#EEE2E1",
    "#EEE2E1",
    "#EEE2E1",
    "#45E2F1",
    "#45E2F1",
    "#00004D",
    "#00004D",
    "#00004D",
    "#91A5C7",
    "#91A5C7",
    "#62580A",
    "#62580A",
  ],
];

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
  "Bedroom",
  "Corridor",
  "Storage",
  "Service",
  "Outdoor",
  "Core",
  "WetArea",
  "PrivateZone",
];

// const colorLinks = {
//   "#B2F0F2": "https://www.google.com/?hl=zh_TW",
//   "#5DDBC4": "https://example.com/wood-top",
//   "#45E2F1": "https://example.com/cabinet-a",
//   "#7277DB": "https://example.com/cabinet-b",
//   "#64E1EC": "https://example.com/cabinet-c",
//   "#3DDFD9": "https://example.com/cabinet-d",

// };
const colorTexts = {
  "#B2F0F2": "門口櫃上",
  "#5DDBC4": "木櫃上",
  "#45E2F1": "冰箱",
  "#7277DB": "餐桌",
  "#64E1EC": "沙發",
  "#3DDFD9": "電視櫃",

  "#79D9D9": "https://example.com/door-middle",
  "#4DF1E2": "https://example.com/storage",
  "#66B7B7": "https://example.com/zone-a",
  "#CCCADA": "https://example.com/zone-b",
  "#FCD7B4": "https://example.com/zone-c",

  "#A6A6A6": "https://example.com/door-bottom",
  "#64C297": "https://example.com/green-zone",
  "#548494": "https://example.com/blue-zone",
  "#9395D5": "https://example.com/purple-zone",
  "#EEE2E1": "https://example.com/white-zone",
  "#00004D": "https://example.com/dark-zone",
  "#91A5C7": "https://example.com/steel-zone",
  "#BAC58F": "https://example.com/olive-zone",
  "#62580A": "iPad TEST",
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
