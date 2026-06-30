<template>
  <q-page class="q-pa-md flex flex-center">
    <div class="container">
      <div v-for="(row, r) in grid" :key="r" class="row">
        <div
          v-for="(color, c) in row"
          :key="c"
          class="cell"
          :style="{ backgroundColor: color }"
          @click="onClick(r, c)"
        >
          <div class="text">
            {{ colorTexts[color] || "" }}
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();

/**
 * ===== Excel Grid（原樣，不做任何轉換）=====
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

/**
 * ===== 顏色 → 文字（唯一真相來源）=====
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

/**
 * ===== 點擊事件 =====
 */
function onClick(r, c) {
  const color = grid[r][c];
  const text = colorTexts[color] || "";

  $q.notify({
    type: "info",
    message: `${text} (${r},${c})`,
    position: "top",
    timeout: 1000,
  });
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;

  gap: 1px;
  background: #666;
  padding: 1px;

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

  border: 1px solid rgba(0, 0, 0, 0.08);
  box-sizing: border-box;

  cursor: pointer;
  transition: 0.12s;
}

.cell:hover {
  filter: brightness(0.92);
  transform: scale(0.98);
}

.text {
  pointer-events: none;
}
</style>
