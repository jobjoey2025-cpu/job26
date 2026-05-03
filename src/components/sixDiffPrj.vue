<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">🚀 AutoGPT × CFD 實戰架構</div>

    <!-- 核心現實 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 核心現實</div>
        <div class="text-negative">
          AutoGPT + CFD 長時間運算 → 現階段不可行（成本 / 穩定性）
        </div>
        <div class="q-mt-sm">算力 = 成本（不可能免費長時間跑）</div>
        <div>GPT 無法跑大型程式，只能輔助</div>
      </q-card-section>
    </q-card>

    <!-- GPT 能力邊界 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ GPT 能力邊界</div>
        <div class="row">
          <div class="col-6">
            <div class="text-positive text-weight-bold">✅ 做得到</div>
            <ul>
              <li>寫 / 改 code</li>
              <li>整理 JSON / 表格</li>
              <li>建議解法</li>
            </ul>
          </div>
          <div class="col-6">
            <div class="text-negative text-weight-bold">❌ 做不到</div>
            <ul>
              <li>長時間運算</li>
              <li>穩定跑 CFD</li>
              <li>複雜 debug</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 正確架構 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ 正確系統架構</div>
        <q-timeline>
          <q-timeline-entry title="Quasar UI"> 按鈕觸發任務 </q-timeline-entry>
          <q-timeline-entry title="Backend / Python">
            執行 CFD / 任務
          </q-timeline-entry>
          <q-timeline-entry title="Simulation">
            OpenFOAM / Colab 運算
          </q-timeline-entry>
          <q-timeline-entry title="Storage">
            存 log（Drive / DB）
          </q-timeline-entry>
          <q-timeline-entry title="GPT"> 分析結果（非運算） </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <!-- 工程現實 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 工程現實</div>
        <ul>
          <li>CFD debug 困難（mesh / 邊界條件）</li>
          <li>不知道的問題 GPT 也救不了</li>
          <li>3 分鐘內回應才適合 GPT</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 開發工具 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🛠 開發工具</div>
        <ul>
          <li>Git / GitHub（避免焦慮與技術債）</li>
          <li>Cursor / Claude（輔助開發）</li>
          <li>Colab（測試運算）</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- Lure insight -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎣 Lure 現實</div>
        <ul>
          <li>釣魚效果 ≠ 精密 CFD</li>
          <li>顏色 / 節奏 / 釣點更重要</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 機會方向 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 機會方向</div>
        <div class="row">
          <div class="col-6">
            <div class="text-negative">❌ 不建議</div>
            <ul>
              <li>AutoGPT CFD 全自動</li>
              <li>24hr 無人運算</li>
            </ul>
          </div>
          <div class="col-6">
            <div class="text-positive">✅ 建議</div>
            <ul>
              <li>CFD 輔助工具</li>
              <li>結果分析 / 視覺化</li>
              <li>推薦系統（STP）</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- MVP 建議 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🚀 MVP 建議</div>
        <ol>
          <li>建立 Lure 資料庫</li>
          <li>加入魚種 / 水域 / 動作</li>
          <li>做推薦系統</li>
          <li>CFD 當加分項（非核心）</li>
        </ol>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
