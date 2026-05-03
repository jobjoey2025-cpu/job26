<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">🎣 推薦系統 × 創業 OS（MVP）</div>

    <!-- MVP 定義 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 MVP 目標</div>
        <div>設計一個 <b>Lure（類股票）推薦系統</b>，可上線、可迭代</div>
        <ul class="q-mt-sm">
          <li>輸入：魚種 / 水域 / 天氣 / 時段</li>
          <li>輸出：推薦 lure + 理由 + 使用建議</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 創業 OS 流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧭 創業 OS</div>
        <q-timeline>
          <q-timeline-entry title="Idea">
            輸入想法（Idea 輸入框）
          </q-timeline-entry>
          <q-timeline-entry title="Decision">
            套用 Checklist（做 / 不做 + 評分）
          </q-timeline-entry>
          <q-timeline-entry title="Build">
            先求有（netFn js / FastAPI）
          </q-timeline-entry>
          <q-timeline-entry title="Track">
            回測 / 指標 / 使用者回饋
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <!-- 評估框架 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 評估框架（每個 Idea 都跑）</div>
        <ul>
          <li>AI 趨勢（OS 層級）</li>
          <li>工具鏈（Claude / MCP）</li>
          <li>市場認知（BLG）</li>
          <li>做 / 不做（Checklist）</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 工具鏈 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ 工具鏈</div>
        <ul>
          <li>FastAPI（輕量 API）</li>
          <li>netFn js（快速上線）</li>
          <li>Quasar（UI）</li>
          <li>Netlify（CI / Deploy）</li>
        </ul>
        <div class="q-mt-sm">CI 流程：</div>
        <ul>
          <li>push → 自動測試</li>
          <li>AI 寫 test</li>
          <li>回饋 AI 修正</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 推薦系統核心 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 推薦系統（STP）</div>
        <ul>
          <li>關鍵通知（何時用什麼 lure）</li>
          <li>回測（賺錢 / 成效）</li>
          <li>使用者資料累積（資料飛輪）</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 指標 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📊 優良指標（Lure）</div>
        <div class="row">
          <div class="col-6">
            <ul>
              <li>顏色</li>
              <li>動作節奏</li>
              <li>震動型</li>
            </ul>
          </div>
          <div class="col-6">
            <ul>
              <li>唇片（lip）</li>
              <li>Frog 類型</li>
              <li>釣點</li>
            </ul>
          </div>
        </div>
        <div class="q-mt-sm text-weight-bold">👉 重點：釣魚效果 ≠ 精密 CFD</div>
      </q-card-section>
    </q-card>

    <!-- 優勢定位 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 優勢定位</div>
        <div class="row">
          <div class="col-6">
            <div class="text-positive">✅ 你的優勢</div>
            <ul>
              <li>CFD / 工程</li>
              <li>simulation</li>
              <li>系統化思維</li>
              <li>AI 工具鏈</li>
            </ul>
          </div>
          <div class="col-6">
            <div class="text-positive">🎯 戰場</div>
            <ul>
              <li>CFD 工具化</li>
              <li>工程決策工具</li>
              <li>推薦系統 + 資料</li>
            </ul>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 未來架構 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🚀 未來架構</div>
        <ul>
          <li>Quasar + FastAPI + OpenFOAM</li>
          <li>流場視覺化（流線 / 美觀）</li>
          <li>推薦系統 × CFD 輔助</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
