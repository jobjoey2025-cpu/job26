<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold q-mb-md">齒輪箱修模專案（RC10B7）</div>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案背景</div>
        <div>
          與美國客戶合作，針對齒輪箱 gear mesh
          過緊問題，進行多輪修模與設計優化（共7次迭代）。
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">核心職責</div>
        <ul>
          <li>跨國工程溝通（美國客戶 / 模具廠）</li>
          <li>齒輪嚙合問題分析與修模策略制定</li>
          <li>模糊需求轉換為工程執行方案</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">問題分析歷程</div>

        <q-timeline>
          <q-timeline-entry title="初期判讀" subtitle="1st">
            客戶僅回饋 mesh 過緊，透過 Yes/No 問題確認方向，建立快速修模流程。
          </q-timeline-entry>

          <q-timeline-entry title="測試差異" subtitle="2nd">
            美國實測 vs 台灣量測差異，重新設計 pin 位置並與模具廠確認。
          </q-timeline-entry>

          <q-timeline-entry title="材料問題" subtitle="3rd">
            發現齒輪吸水膨脹，導致干涉問題。
          </q-timeline-entry>

          <q-timeline-entry title="設計主導" subtitle="4th">
            修改客戶2D圖面，放寬公差並同步3D外殼。
          </q-timeline-entry>

          <q-timeline-entry title="製造極限" subtitle="Final">
            評估需重開模仁，進行成本與性能平衡決策。
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案成果</div>
        <ul>
          <li>完成7次跨國修模迭代</li>
          <li>解決 gear mesh 過緊與能量損失</li>
          <li>建立跨國驗證流程</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6">工程能力</div>
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Tolerance Analysis</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm">DFM</q-chip>
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Problem Solving</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Cross-team Communication</q-chip
        >
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style></style>
