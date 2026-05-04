<template>
  <q-page class="q-pa-md">
    <!-- 標題 -->
    <div class="text-h4 q-mb-lg">🌬️ CFD 實驗：Colab × PhiFlow</div>

    <!-- 核心概念 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 核心概念</div>
        <ul>
          <li>使用 Colab 跑 CFD（低成本）</li>
          <li>PhiFlow 做 2D 流體模擬</li>
          <li>搭配 AI（GPT）做分析與修正</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 系統流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ 系統流程</div>

        <q-timeline color="primary">
          <q-timeline-entry title="1️⃣ 建立模型">
            定義 domain / velocity / obstacle（cylinder）
          </q-timeline-entry>

          <q-timeline-entry title="2️⃣ Colab 執行 CFD">
            PhiFlow 運算（advection / diffusion / incompressible）
          </q-timeline-entry>

          <q-timeline-entry title="3️⃣ 儲存結果">
            log / 圖片 → Google Drive
          </q-timeline-entry>

          <q-timeline-entry title="4️⃣ AI 分析">
            GPT 分析流場 / 建議修改
          </q-timeline-entry>

          <q-timeline-entry title="5️⃣ 迭代優化">
            修改 code → 再 run
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <!-- CFD 核心 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧪 CFD 核心</div>

        <ul>
          <li>Advection（流動）</li>
          <li>Diffusion（擴散）</li>
          <li>Pressure Solve（不可壓縮）</li>
        </ul>

        <div class="q-mt-sm text-caption">👉 make_incompressible 是關鍵</div>
      </q-card-section>
    </q-card>

    <!-- 視覺化 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📊 視覺化</div>

        <ul>
          <li>Streamline（流線）</li>
          <li>Pressure contour（壓力分佈）</li>
          <li>Vorticity（渦流）</li>
        </ul>

        <div class="text-negative q-mt-sm">👉 渦流才是關鍵觀察點</div>
      </q-card-section>
    </q-card>

    <!-- 工程現實 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 工程現實</div>

        <ul>
          <li>Colab 不穩定（長時間運算）</li>
          <li>算力有限（~50k grid）</li>
          <li>AutoGPT 無法穩定自動運行</li>
          <li>GPT 無法執行大型 CFD</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 實戰策略 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🚀 CFD 實戰策略</div>

        <q-timeline color="secondary">
          <q-timeline-entry title="粗篩">
            50k grid → 看流場趨勢
          </q-timeline-entry>

          <q-timeline-entry title="比較">
            100k~300k → 比較設計
          </q-timeline-entry>

          <q-timeline-entry title="精算"> 1M grid → 最終驗證 </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <!-- 延伸 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🔮 延伸方向</div>

        <ul>
          <!-- <li>Quasar UI → 一鍵跑 CFD</li> -->
          <!-- <li>FastAPI → 任務系統</li> -->
          <li>CFD SaaS Prototype</li>
          <li>Lure 流場分析（應用）</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
