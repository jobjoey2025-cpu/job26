<template>
  <h4 style="text-align: center;">具體分類</h4>
  <q-table :rows="rows" :columns="columns" row-key="title" wrap-cells />
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
