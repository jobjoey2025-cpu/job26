<template>
  <q-page class="q-pa-md">
    <!-- 標題 -->
    <div class="text-h5 q-mb-md">AI 情報整理與輸出系統</div>

    <!-- GPT能力 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">✨ GPT 能力（結構化整理）</div>

        <q-list dense>
          <q-item v-for="item in gptStruct" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-blue-2 q-mt-md">
          👉 GPT 請整理筆記 / 直接貼上 GDS 方塊
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 閱讀品質 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📖 提高閱讀品質</div>

        <q-list dense>
          <q-item v-for="item in readingQuality" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-green-2 q-mt-md">
          👉 筆記 → Quasar Page（清楚 + 可擴展）
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- GPT API -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔗 GPT API / 資料分析</div>

        <q-list dense>
          <q-item v-for="item in gptApi" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-yellow-2 q-mt-md">
          👉 使用 Token（成本低於月費）
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- Tree UI -->
    <q-expansion-item
      icon="account_tree"
      label="🌳 Tree UI / 系統化"
      expand-separator
      class="q-mb-md"
    >
      <q-card>
        <q-card-section>
          <q-list dense>
            <q-item v-for="item in treeUI" :key="item">
              <q-item-section>{{ item }}</q-item-section>
            </q-item>
          </q-list>

          <q-banner class="bg-orange-2 q-mt-md">
            👉 從「收集資料」→「輸出內容」
          </q-banner>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- 核心流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔁 固定輸出流程</div>

        <q-banner class="bg-grey-3 text-black text-center q-pa-md">
          GPT → 整理 → Quasar Page → Tree → 重複使用
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 核心觀念 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 核心觀念</div>

        <q-list dense>
          <q-item v-for="item in coreConcept" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-red-2 q-mt-md">
          👉 你卡的不是技術，是「最後一步輸出」
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 學習與風險 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">⚠️ 新學習與風險</div>

        <q-list dense>
          <q-item v-for="item in learning" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const gptStruct = [
  "prompt : 整理以下筆記",
  "做主題大綱（不用自己想, 把類似的筆記放在一起）",
  "主流規格整理（含圖示）主流就是沒甚麼變化",
  "快速筆記整理 \ 省時省腦力",
  "可轉為 Blog（完成一篇內容）快速小整理 複習信心 完成度",
];

const readingQuality = [
  "prompt : 將以下筆記轉為 quasar page\ then 用GDS 校正",
  "coding（基礎）",
  "GPT + Quasar（UI輸出）",
  "UI清楚、可擴展",
  "提升閱讀與理解效率",
];

const gptApi = [
  "PDF 財報分析",
  "批次 PDF 閱讀 + 推薦 排名（RAG）",
  "資料分析（例如 FB stock）",
];

const treeUI = [
  "需要自行開發（DIY）",
  "UI 客製成本高",
  "資料需可重複使用",
  "結合 Quasar 作為前端",
];

const coreConcept = [
  "建立固定輸出流程",
  "做可變現內容（Blog / 互動頁）",
  "建立資料系統（SQL / 可搜尋）",
  "把資訊轉成可用、可賺錢",
  "重複使用 才是穩固,「可變現內容」才能長久",
];

const learning = [
  "購物車 prompt 腳本 - 蒐集",
  "自動化 coding 過快 (強化學習 \ 軟體規格書 IQC)  → joey 基礎不穩",
  "* 語言轉換成本高（EN → 中 → 台式理解）以陸為先 \ 沒有再 English",
  "配色設計（googleFigma）",
  // "多語言來源（EN / JP / CN）",
  "觀察市場與有錢人的行為 \ 在做甚麼 \ 不能做甚麼 & 我有甚麼不同 ",
];
</script>

<style scoped></style>
