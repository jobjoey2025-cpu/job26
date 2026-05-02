<!-- <template>
  <q-table :rows="rows" :columns="columns" row-key="gap" />
</template> -->
<template v-slot:body-cell-core="props">
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">AI Limit & NetFn 筆記整理</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">💰 AI 成本與限制</div>
        <ul>
          <li>AI 有成本限制（約 $600 NTD / 月 或 Token 計算）</li>
          <li>GPT 本質不是即時 loop，而是「訓練好的模型再試算」</li>
          <li>因此使用上要考慮 Token 與成本，而不是無限迴圈</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ 開發策略（NetlifyFn）</div>
        <ul>
          <li>先做 NetFn：1 Button Quasar app（最小可行產品）</li>
          <li>CFD / 算力相關功能目前仍不穩定或成本高</li>
          <li>FB stock 等需要手動用 Colab 處理</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">☁️ Cloud / Infra 現實</div>
        <ul>
          <li>Netlify / cloud 設定進入新領域，錯誤是正常的</li>
          <li>風險類似工程試錯，而ai寫code 連run 設定還不順 \ 這種服務不便宜 vs 一個博士生</li>
          <li>Colab 會斷線（idle 幾分鐘就會死）</li>
          <li>進階方案需要 cloud run，但學習與維護成本高</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">❌ 目前痛點</div>
        <ul>
          <li>Colab 不穩定（會自動斷線）</li>
          <li>需要額外時間與精力學 cloud run \ 像類似風險 netlify.toml setting 新領域 錯是正常的 </li>
          <li>問題不在原理，而是在「服務成本與穩定性」</li>
          <li><b>某些場景下，現在 一個博士生的成本可能更低</b></li>

        </ul>
      </q-card-section>
    </q-card>
  </q-page>
  <!-- ------ -->
  <h4 style="text-align: center;">六個差來賺錢</h4>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="gap"
    :pagination="{ rowsPerPage: 7 }"
  >
    <template v-slot:body-cell-core="props">
      <q-td :props="props">
        <span :class="{ 'line-through': deletedList.includes(props.row.core) }">
          {{ props.row.core }}
        </span>
      </q-td>
    </template>
  </q-table>

  <sixDiffExsample />

</template>

<script setup>

import sixDiffExsample from "components/sixDiffExsample.vue";

const deletedList = ["刻意練習", "努力"];
// columns
const columns = [
  { name: "gap", label: "六個差（你定義）", field: "gap", align: "left" },
  { name: "rank", label: "排序（市場殘酷版）", field: "rank", align: "left" },
  { name: "core", label: "核心來源", field: "core", align: "left" },
  { name: "pain", label: "對應的苦", field: "pain", align: "left" },
];

// rows
const rows = [
  {
    gap: "權力差（證照 / 背景 / 決策權）",
    rank: "權力差",
    core: "資源 / 時機",
    pain: "",
  },
  {
    gap: "平台差（圈子 / 資源）",
    rank: "平台差（最難複製）",
    core: "選擇",
    pain: "忍辱尊嚴的苦",
  },
  {
    gap: "認知差（判斷能力）",
    rank: "認知差=joey 目前;人腦有極限;用錢做一個 收斂檢查點",
    core: "思考 + 經驗",
    pain: "獨立思考 苦",
  },
  {
    gap: "訊息差（資訊掌握）",
    rank: "訊息差（AI 正在吃掉）",
    core: "換位置 / AI help",
    pain: "持久 耐力苦",
  },
  {
    gap: "執行差（落地能力）",
    rank: "執行差",
    core: "刻意練習",
    pain: "讀書 孤獨苦",
  },
  {
    gap: "競爭差（腦力 / 體力）",
    rank: "競爭差（最容易被取代）",
    core: "努力",
    pain: "體力苦",
  },
];
</script>
<style scoped>
.line-through {
  text-decoration: line-through;
  opacity: 0.5;
  color: #999;
}
ul {
  padding-left: 18px;
}
li {
  margin-bottom: 6px;
}
</style>
