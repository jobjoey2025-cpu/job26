<template>
  <q-page class="q-pa-md flex flex-center">
    <!-- 外層容器：定義 11 列 × 8 欄 的網格系統 -->
    <div class="grid-container">
      <!-- 渲染每一個合併後的區塊按鈕 -->
      <q-btn
        v-for="(block, index) in mergedBlocks"
        :key="index"
        :style="{
          backgroundColor: block.color,
          gridRow: `${block.startRow} / ${block.endRow}`,
          gridColumn: `${block.startCol} / ${block.endCol}`,
        }"
        class="merged-btn text-bold"
        flat
        square
        @click="onBlockClick(block)"
      >
        <!-- 按鈕文字顯示區塊範圍 -->
        {{ block.label }}

        <!-- 滑鼠懸停提示詳細資訊 -->
        <q-tooltip>
          範圍: {{ block.label }}<br />
          色碼: {{ block.color }}
        </q-tooltip>
      </q-btn>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// 欄位對應表，用來轉換顯示標籤
const colMap = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

/*
  將相同顏色的相鄰格子合併為區塊。
  CSS Grid 的編號從 1 開始：
  - startRow / startCol: 起始網格線
  - endRow / endCol: 結束網格線（不包含該線，所以欲包含到第 3 列，結束要寫 4）
*/
const mergedBlocks = ref([
  // --- 第 1 ~ 3 列 ---
  {
    startRow: 1,
    endRow: 4,
    startCol: 1,
    endCol: 3,
    color: "#D9EAD3",
    label: "A1-B3",
  },
  {
    startRow: 1,
    endRow: 4,
    startCol: 3,
    endCol: 5,
    color: "#B4A7D6",
    label: "C1-D3",
  },
  {
    startRow: 1,
    endRow: 4,
    startCol: 5,
    endCol: 7,
    color: "#8FB3BA",
    label: "E1-F3",
  },
  {
    startRow: 1,
    endRow: 4,
    startCol: 7,
    endCol: 9,
    color: "#0A6C22",
    label: "G1-H3",
  },

  // --- 第 4 ~ 7 列 ---
  {
    startRow: 4,
    endRow: 8,
    startCol: 1,
    endCol: 3,
    color: "#E4A428",
    label: "A4-B7",
  },
  {
    startRow: 4,
    endRow: 8,
    startCol: 3,
    endCol: 9,
    color: "#F1E4C5",
    label: "C4-H7",
  },

  // --- 第 8 ~ 11 列 ---
  {
    startRow: 8,
    endRow: 12,
    startCol: 1,
    endCol: 9,
    color: "#C4D79D",
    label: "A8-H11",
  },
]);

// 點擊事件
const onBlockClick = (block) => {
  console.log(`點擊了區塊: ${block.label}, 顏色: ${block.color}`);
};
</script>

<style scoped>
/*
  定義標準的 11列 × 8欄 網格系統
  每格固定為寬 50px、高 50px
*/
.grid-container {
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(11, 50px);
  gap: 4px; /* 格子間的縫隙 */
  background-color: #f5f5f5;
  padding: 8px;
  border-radius: 8px;
}

/* 合併按鈕的基礎樣式 */
.merged-btn {
  width: 100%;
  height: 100%;
  min-height: unset;
  padding: 0;
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #333; /* 預設深色文字 */
  font-size: 12px;
  transition: all 0.15s ease;
}

/* 針對深綠色 (#0A6C22) 區塊，將文字自動改為白色以利辨識 */
.merged-btn[style*="background-color: #0A6C22"] {
  color: #ffffff !important;
}

/* 滑鼠懸停效果：微幅放大並加上陰影 */
.merged-btn:hover {
  transform: scale(1.02);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  border-color: rgba(0, 0, 0, 0.3);
}
</style>
