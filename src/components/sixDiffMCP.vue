<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md" style="text-align: center">
      📊 商業護城河 / 成長機制表
    </div>

    <q-table
      title="策略整理 5大項元素 檢查"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
    />

    <!-- ------------ -->

    <div class="text-h4 q-mb-lg">🔥 AI × 市場 × 技術 決策框架</div>

    <!-- 核心結論 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 核心結論 （濃縮版）</div>
        <div class="text-body1 q-mt-sm">
          👉 真正值得做的：<b>高技術門檻 × 可規模化 × 有護城河</b>
        </div>
        <div class="q-mt-sm text-negative">
          低技術門檻 = 幾乎必死（AI 壓平）
        </div>
        <div class="text-positive">高技術門檻 = GPT NG 點（你的機會）</div>
        <div class="q-mt-sm">護城河本質：別人複製你的難度</div>
      </q-card-section>


    <!-- AI 趨勢 -->

      <q-card-section>
        <div class="text-h6">💥 AI 趨勢</div>
        <q-list>
          <q-item>
            <q-item-section>AI 是作業系統層級競爭（不是 App）</q-item-section>
          </q-item>
          <q-item>
            <q-item-section
              >未來：🔥不是你「用軟體」 → AI → 操作所有軟體 * 是這差別嗎
              ?</q-item-section
            >
          </q-item>
          <q-item>
            <q-item-section>UI 正在消失（指令取代操作）</q-item-section>
            <P
              >👉 未來不再需要：按鈕 \ 表單 \ 複雜介面 <Br></Br> 👉
              變成：「幫我分析台股最強股票」</P
            >
          </q-item>
          <q-item>
            <q-item-section>軟體沒有消失，但毛利下降（平民化）</q-item-section>
          </q-item>
          <!-- <q-space></q-space> -->
          <hr />
          <q-item
            >疑慮 : AI 程式設計智慧體被過度炒作 ? <br />
            所以 joey強化 閱讀品質有點不對 ??<br />
            NOT 通用 - Focus → Drone Fixed Biz \\ after 訊息套版 的"認知判斷"
            方向
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 市場理解 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 市場理解（BLG）👉 市場需求 ≠ 工程師看到的世界</div>

        <div class="q-mt-sm text-weight-bold">市場 ≠ 技術圈</div>
        <div>Web Dev 實際需求沒那麼多，實際多的是：</div>
        <ul>
          <li>剪片</li>
          <li>餐飲</li>
          <li>CAD / 工程 高頻需求常在「非技術圈」</li>
        </ul>

        <div class="q-mt-sm text-weight-bold">風口來源 （不是機密技術）</div>
        <ul>
          <li>英翻中（國外 → 台灣）</li>
          <li>陸轉台（中國 → 台灣）</li>
          <li>應用層 + timing 👉 NOT：台積電等級技術機密</li>
        </ul>

        <div class="q-mt-sm text-weight-bold">Fashion 動力</div>
        <div class="text-negative">❌ 追 hype → 短命</div>
        <div class="text-positive">✅ hype → 工具化 / 商業化</div>
      </q-card-section>
    </q-card>

    <!-- AI 工具 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ AI 工具生態</div>
        <q-list bordered>
          <q-item>
            <q-item-section>Claude Code：本機調用（可控、偏工程）</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>Cursor：雲端 IDE 自動補全 + 寫 code</q-item-section>
          </q-item>
          <q-item>
            <q-item-section>AutoGPT：❌ 不穩定</q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-sm text-negative">❌ 👉 AI 現階段 無法完全自動</div>
        <div class="text-positive">✅ 必須人監控 + 測試</div>
      </q-card-section>
    </q-card>

    <!-- 開發實踐 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧪 AI 開發實踐</div>

        <div class="text-weight-bold">記憶系統</div>
        <ul>
          <li>claude.md（統一上下文）每次先讀 </li>
          <li>skills（長期能力）提升 LLM 長期能力</li>
          <li>subagents（任務拆分（多角色））</li>
        </ul>

        <div class="text-weight-bold">控制 AI</div>
        <ul>
          <li>Hooks（限制行為）</li>
          <li>MCP（直接讀寫：連接 DB / API / 檔案）</li>
        </ul>

        <div class="text-weight-bold">工程基礎</div>
        <ul>
          <li>Git / GitHub</li>
          <li>測試流程 → 必須（目前你缺這塊）</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 判斷標準 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 關鍵判斷</div>

        <div class="row">
          <div class="col-6">
            <div class="text-negative text-weight-bold">❌ 不值得做</div>
            <ul>
              <li>CRUD App</li>
              <li>無門檻 SaaS</li>
              <li>UI 工具</li>
              <li>ChatGPT wrapper</li>
            </ul>
          </div>

          <div class="col-6">
            <div class="text-positive text-weight-bold">✅ 值得做</div>
            <ul>
              <li>CFD / simulation</li>
              <li>深 domain knowledge</li>
              <li>AI 難取代</li>
              <li>數據 / 模型 / know-how</li>
            </ul>
          </div>
        </div>
      </q-card-section>

    <!-- 最終公式 -->

      <q-card-section>
        <div class="text-h6">🧠 決策公式</div>
        <div class="text-body1">
          機會 = (市場需求 × 技術門檻 × scale × moat) × 你的位置
        </div>
      </q-card-section>
    </q-card>

    <!-- 行動 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🔥 行動指令</div>
        <ol>
          <li>建立 AI workflow（Claude + 測試 + GitHub）</li>
          <li>持續強化 : CFD → 工具化 \\ simulation → web 化</li>
          <li>找 CAD / 工程 / 製造市場\\ 不要只看 web dev</li>
        </ol>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
const columns = [
  { name: "category", label: "分類", field: "category", align: "left" },
  { name: "content", label: "內容", field: "content", align: "left" },
];

const rows = [
  {
    category: "管道分發",
    content:
      "郵件列表 / 社群 / 聲譽 / 分發網路 / 行銷即產品（BLG累積） / 外包需顧問",
  },
  {
    category: "資料飛輪",
    content: "Google Analytics / 數據回饋優化 / 外包需顧問",
  },
  {
    category: "網路效應",
    content: "LinkedIn / Reddit / Discord / Roblox（重點不在工程複雜度）",
  },
  {
    category: "硬體整合（最強防禦）",
    content: "特斯拉 / Anduril / 奇異 / 波士頓動力 / SpaceX / 品味",
  },
  {
    category: "垂直縱深（產業護城河）",
    content:
      "審批流程 / 檢查網路 / 監管資料 / 產業關係 / 品牌 / 社群 / 監管壁壘",
  },
];
</script>

<style scoped></style>
