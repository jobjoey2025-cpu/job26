<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-lg">🚀 CFD 決策流程</div>

    <q-timeline color="primary">
      <!-- Step 1 -->
      <q-timeline-entry
        title="Step 1｜粗篩（最重要）"
        subtitle="10 ~ 20 個設計"
        icon="filter_alt"
        color="green"
      >
        <div class="q-mb-sm">低解析 CFD（~50k grid）</div>

        <ul>
          <li>渦流位置（vortex）</li>
          <li>分離點（separation）</li>
          <li>流線是否順暢</li>
        </ul>

        <div class="text-bold text-green q-mt-sm">
          👉 目標：淘汰 80% 不良設計
        </div>
      </q-timeline-entry>

      <!-- Step 2 -->
      <q-timeline-entry
        title="Step 2｜中階比較"
        subtitle="剩 3 ~ 5 個設計"
        icon="analytics"
        color="orange"
      >
        <div class="q-mb-sm">中解析 CFD（100k ~ 300k grid）</div>

        <ul>
          <li>Drag trend（阻力趨勢）</li>
          <li>Wake 穩定性（尾流）</li>
        </ul>

        <div class="text-bold text-orange q-mt-sm">
          👉 目標：找出最有潛力設計
        </div>
      </q-timeline-entry>

      <!-- Step 3 -->
      <q-timeline-entry
        title="Step 3｜精算（最後才做）"
        subtitle="前 1 ~ 2 個設計"
        icon="science"
        color="red"
      >
        <div class="q-mb-sm">高解析 CFD（~1M grid）</div>

        <ul>
          <li>Cd / Cl（氣動係數）</li>
          <li>壓力分佈（Pressure）</li>
        </ul>

        <div class="text-bold text-red q-mt-sm">
          👉 目標：最終驗證 + 報告級數據
        </div>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
