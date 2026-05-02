<template>
  <h4 style="text-align: center">具體分類</h4>
  <q-table :rows="rows" :columns="columns" row-key="title" wrap-cells />

  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">
      🧠 職涯升級模型（執行 → 訊息 → 認知 → 平台 → 權力）
    </div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 1. 放大「執行差」（能做事的人）</div>
        <ul>
          <li>接跨部門任務（很關鍵）</li>
          <li>學 debug / root cause 分析</li>
          <li>做事情 → 解問題</li>
          <li>❌ 一直練執行力 → 但沒升級位置</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📡 2. 掌握「訊息差」（AI 正在吃掉）</div>
        <ul>
          <li>掌握「訊息差」（開始賺錢）</li>
          <li>👉 你比別人「早知道」</li>
          <li>接收資訊 → 控制資訊流</li>
          <li>建立「資訊來源網」\ Base 備份在 NAS AI</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 3. 建立「認知差」（開始決策）</div>
        <ul>
          <li>👉 典型：PM / 中階主管 / 技術負責人</li>
          <li><b>解問題 → 定義問題</b></li>
          <li><b>多做「選擇題」而不是「執行題」</b></li>
          <li>商業模型 / 系統思維 / 風險判斷</li>
          <li>❌ 沒接觸商業 → 永遠停在工程層</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🌐 4. 卡位「平台差」（關鍵躍遷）</div>
        <ul>
          <li>👉 進入「高價值圈子」</li>
          <li>個人能力 → 所在位置</li>
          <li> <b>綁定強者（老闆 / 客戶）</b></li>
          <li>❌ 不敢換環境 → 卡死平台差</li>
          <li>👉 人生升級不是變強，而是「換賽道」</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md bg-grey-2">
      <q-card-section>
        <div class="text-h6">👑 5.「權力差」（最頂層）</div>
        <ul>
          <li>👉 典型：老闆 / 董事 / 專業牌照</li>
          <li>你能決定規則</li>
          <li>拿證照（醫師 / 律師 / 會計 / 電工也可以）</li>
          <li>股權 / 決策權 / 資源控制權</li>
          <li>影響事情 → 決定事情</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
// columns
const columns = [
  { name: "title", label: "職稱", field: "title", align: "left" },
  { name: "gaps", label: "Top 3 個差", field: "gaps", align: "left" },
  { name: "desc", label: "說明", field: "desc", align: "left" },
];

// rows
const rows = [
  {
    title: "董事長 / 帝王術 / 權限",
    gaps: "*平台差(圈圈) 資本圈 / 政商圈\n*認知差：決策方向（產業判斷）\n*權力差(證照 背景)",
    desc: "👉 不是你多強，是你「在哪個局」",
  },
  {
    title: "貿易（潛規則 / 錢）",
    gaps: "*訊息差：價格 / 匯率 / 市場 timing\n*平台差：客戶 / 通路 / 國家關係\n*認知差：判斷市場風險",
    desc: "👉 誰先知道價格變動，誰賺錢",
  },
  {
    title: "💼 業務（Sales）",
    gaps: "*平台差：人脈（超級關鍵）\n*訊息差：客戶需求 / 決策人\n*執行差：拜訪 / 跟單",
    desc: "👉 不是賣產品，是進入「決策圈」",
  },
  {
    title: "電工（現場變化）",
    gaps: "訊息差\n權力差(證照)\n競爭差(腦力 / 體力)",
    desc: "",
  },
  {
    title: "專案（方法 / 溝通 / 外包）",
    gaps: "*認知差(拆問題 / 排優先順序)\n*執行差(推進進度)\n*訊息差(握各部門狀況)",
    desc: "👉 資訊整合 + 決策壓縮機",
  },
  {
    title: "法律（人 / 文字 / 數字）",
    gaps: "認知差\n平台差(圈圈)\n權力差(證照 背景)",
    desc: "",
  },
  {
    title: "🧠 客服（2線 / 技術支援）",
    gaps: "*認知差：解問題能力（關鍵）\n*訊息差：系統 / bug / 架構\n*執行差：回覆與處理效率",
    desc: "👉 半工程師角色",
  },
  {
    title: "🎧 客服（1線）",
    gaps: "*執行差：回應速度 / SOP\n*競爭差：人力替代性高\n*訊息差：基本產品知識",
    desc: "👉 情緒處理 + 流程操作",
  },
  {
    title: "🛒 收銀員",
    gaps: "*競爭差：低門檻（人很多）\n*執行差：操作準確 / 速度\n*訊息差：價格 / 流程",
    desc: "👉 標準化勞動（可替代性高）",
  },
];
</script>
<style scoped>
ul {
  padding-left: 18px;
}
li {
  margin-bottom: 6px;
}
</style>
