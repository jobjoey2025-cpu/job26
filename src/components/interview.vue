<template>
  <q-page class="q-pa-md">
    <!-- 標題 -->
    <div class="text-h5 q-mb-md">職涯策略與面試判斷系統</div>

    <!-- 工作本質 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 工作本質</div>
        <q-list dense>
          <q-item v-for="item in workNature" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-yellow-2 q-mt-md">
          👉 真正的工作 ≠ 表面工作（溝通成本極高）
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 成長策略 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔧 成長策略</div>
        <q-list dense>
          <q-item v-for="item in growthStrategy" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 技能與定位 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧩 技能與定位</div>

        <q-list dense>
          <q-item v-for="item in skills" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-blue-2 q-mt-md">
          初階機構工程師（可做事，但需要帶）
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 求職條件 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 求職核心條件</div>

        <q-list dense>
          <q-item v-for="item in jobCriteria" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 風險提醒 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 核心風險</div>

        <q-list dense>
          <q-item v-for="item in risks" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>

        <q-banner class="bg-red-2 q-mt-md">
          👉 最大風險：不是產業錯，是進錯團隊 \\ 選錯：浪費 1–2 年 \ 技術歪掉
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- 面試殺手題 -->
    <q-expansion-item
      icon="help"
      label="🔪 面試判斷（必問問題）"
      class="q-mb-md"
      expand-separator
    >
      <q-card>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="q in interviewQuestions" :key="q.title">
              <q-item-section>
                <div class="text-weight-bold">{{ q.title }}</div>
                <div class="text-caption">{{ q.desc }}</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>

    <!-- 判斷技巧 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">👀 判斷技巧</div>

        <q-list dense>
          <q-item v-for="item in judgment" :key="item">
            <q-item-section>{{ item }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const workNature = [
  "反覆溝通",
  "修改設計",
  "跨部門協調",
  "處理突發狀況",
  "排優先順序",
  "承受壓力",
];

const growthStrategy = [
  "接手沒人要的項目",
  "低成本試錯累積經驗",
  "累積後跳更好的公司或產業升級",
];

const skills = [
  "CAD / CAE \\ 飛機型式是什麼？部門現在的發展方向？有哪些技術挑戰？",
  "BOM / DB / ERP（基礎）",
  "套版設計（初階）-- 只是做圖 打雜好",
  "目標薪資：55K",
];

const jobCriteria = [
  "技術同事多（可學習）",
  "通勤可接受 \ 主動撿 → 換信任 → 換技術 use time",
  "組織正常 \ 主管不要太奇怪 \ 慶龍 is good",
  "能撐久（最重要）🏠 財務目標 \ 2 年內達到房貸條件 \ 利率目標：2% 以下",
  "可轉無人機 / 航太",
];

const risks = [
  "1/3 主管不適任（沒帶人能力）\ 更不要說 [專業熄燈手]",
  "決策混亂 ⚠️ 主管風險（關鍵）很多 主管不適任 \\ 沒帶人能力 決策混亂",
  "高風險公司（只能當跳板）\\ 選錯：浪費 1–2 年 \ 技術歪掉",
  "第一份工作不該只看薪水（看團隊/技術/主管）",
];

const interviewQuestions = [
  {
    title: "專案是否量產？",
    desc: "判斷公司是否真正賺錢與穩定 \\ ✔ 正常答案 清楚講出型號 / 客戶 / 數量（例如：每月幾百台）❌ 地雷答案 「還在開發」「之後會量產」「目前主要是測試」👉 翻譯：還沒賺錢 = 不穩",
  },
  {
    title: "團隊幾人？是否有資深工程師？",
    desc: "避免沒人帶 → 自生自滅 \\ ✔ 正常 5人以上 有資深（3年以上）❌ 地雷 1～3人 「目前還在擴編」👉 翻譯：沒人帶你 = 自生自滅",
  },
  {
    title: "新人前三個月做什麼？",
    desc: "避免進去只打雜 \\  ✔ 正常「新人前三個月主要負責的內容是什麼？」❌ 地雷 「先熟悉環境」 「協助其他同事」👉 翻譯：雜事 + 打雜",
  },
  {
    title: "離職原因？",
    desc: "判斷主管問題 \\ ✔ 正常 擴編（且能說原因）❌ 地雷 閃爍其詞 「之前的人不適合」👉 翻譯：主管有問題機率↑",
  },
  {
    title: "跨部門怎麼合作？",
    desc: "有流程 vs 混亂公司 \\ ✔ 正常 有流程（review /會議）❌ 地雷 「就直接溝通」👉 翻譯：混亂公司",
  },
  {
    title: "加班頻率？",
    desc: "避免責任制爆炸 \\ 要聽「細節」，不是聽表面答案。每間都要問 \\ 飛機型式是什麼？部門現在的發展方向？有哪些技術挑戰？",
  },
];

const judgment = [
  "回答快 + 具體 → 好公司",
  "回答慢 + 模糊 → 地雷",
  "有數據 / 案例 → 正常",
  "空話 → 危險",
  "工程主管回答 →可信",
  "HR回答 →打折",
];
</script>

<style scoped></style>
