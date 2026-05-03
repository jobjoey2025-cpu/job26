<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">
      🚀 AutoGPT × CFD × 24hrs Month $600 實作策略
    </div>

    <!-- 核心架構 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔥 核心架構</div>
        <div>AutoGPT 專案（24hr run）+ OpenFOAM + Cursor</div>
        <div class="q-mt-sm">👉 CFD 模擬輸出：</div>
        <ul>
          <li>渦流（vortex）</li>
          <li>流場比較（icePack optimiz）</li>
          <li>擺動頻率</li>
          <li>拖曳力</li>
        </ul>
        <div class="q-mt-sm text-weight-bold">👉 價值：Lure 流場分析</div>
      </q-card-section>
    </q-card>

    <!-- 系統分工 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚙️ 系統分工（關鍵）</div>
        <q-timeline>
          <q-timeline-entry title="外部運算">
            CFD / Python 跑 simulation
          </q-timeline-entry>
          <q-timeline-entry title="資料儲存">
            Colab → Drive → log
          </q-timeline-entry>
          <q-timeline-entry title="Backend"> 讀取結果 </q-timeline-entry>
          <q-timeline-entry title="Frontend（Quasar）">
            顯示 residual（類 Fluent）
          </q-timeline-entry>
          <q-timeline-entry title="GPT">
            分析結果（非 loop 運算）
          </q-timeline-entry>
        </q-timeline>
        <div class="q-mt-sm text-negative">
          Colab CFD / AutoGPT → ❌ 不穩定（早期）
        </div>
      </q-card-section>
    </q-card>

    <!-- 操作流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔁 操作流程</div>
        <ol>
          <li>Quasar 按鈕觸發</li>
          <li>開啟 Colab / Python 任務</li>
          <li>執行 CFD</li>
          <li>存 log 到 oneDrive</li>
          <li>Backend 讀取</li>
          <li>Quasar 顯示</li>
          <li>貼給 GPT 分析</li>
          <li>修改 code → 再 run</li>
        </ol>
      </q-card-section>
    </q-card>

    <!-- 測試系統 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧪 自動測試（關鍵補強）</div>
        <ul>
          <li>Python → pytest</li>
          <li>JS → vitest / jest</li>
          <li>AI 寫 code → 同時生成 test</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 工程現實 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 工程現實</div>
        <ul>
          <li>算力需要成本（不能長時間免費跑）</li>
          <li>AutoGPT 無法穩定自動運行</li>
          <li>GPT 不會幫你跑大型程式</li>
          <li>
            Replit 類工具 → 僅輔助，不可依賴 \\ 這邊很高深 \ 不是 ez "Replit"
            免費免強 用一點 \ 不要投入太多 \
          </li>
          <li>
            cuz gemini 的建議 不是 很好 \\ 也不會自動 連續run \ 還沒找到這種服務
          </li>
          <li>
            時候未到 <b>就是不死心</b> 去打工 會看到 高手 \ 想加在 履歷上面 ~~
          </li>
          <li>不如養龍蝦 \\養了龍蝦 也沒有 CFD 相關的免費範例</li>
          <li>OpenFOAM 就跑到 另一個 system 了 \ 另外一個問題了</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 決策 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">💰 決策現實</div>
        <ul>
          <li>算力 = 錢（第一原理）</li>
          <li>不如買 ANSYS + 專業人才（現實解）</li>
          <li>現在做 → 偏研究 / 履歷加分</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 方向 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 發展方向</div>
        <ul>
          <li>提高閱讀品質（先做）</li>
          <li>AOI 訓練 / 收納 joey 會用到的</li>
          <li>CFD 當輔助，不是核心產品</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 個人定位 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🧠 Joey 模式轉變</div>
        <ul>
          <li>不再只是整理資訊 \ 蒐集 排版 大事化小說法</li>
          <li>轉為：決策 (認知決擇 level) / 商業連結（國貿 / 英翻中）</li>
          <li>角色：稽核 / 批准 / 上線</li>
          <li>
            降低協調成本（無內部政治）\\ 沒有協調成本 沒有內部政治 被稀釋的願景
            產品經理改成安全版本。工程師互相推諉 計師為圖示位置爭論
          </li>
          <li>
            個人創作者時代（AI 放大個人能力）軟體正在迎來個人創作者的文藝復興。
          </li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
