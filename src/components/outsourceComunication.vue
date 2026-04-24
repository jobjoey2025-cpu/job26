<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">🧠 外包控制系統（決策 + 溝通 + 派工）</div>

    <!-- 核心一句話 -->
    <q-banner class="bg-grey-2 q-mb-md">
      👉 你不是在找人做事，而是在不公平系統中找到「可用且不會爆」的位置
    </q-banner>

    <!-- 自動策略 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">👉 使用策略自動生成</div>
        <div class="text-positive">🟢 可合作 → 長期任務</div>
        <div class="text-warning">🟡 工具人 → 任務拆小 + 不給核心</div>
        <div class="text-negative">🔴 高風險 → 不合作 / 抽離</div>
      </q-card-section>
    </q-card>

    <!-- 整體框架 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 整體流程</div>
        <div class="text-bold">觀察 → 試探 → 判斷 → 分配 → 控制 → 收尾</div>
      </q-card-section>
    </q-card>

    <!-- 開場腳本 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 開場腳本（拿資訊）</div>
        <div class="q-mt-sm">✔ 開場</div>
        <ul>
          <li>最近還在忙工地嗎？</li>
          <li>最近比較忙還是比較空？</li>
        </ul>
        <div class="q-mt-sm">✔ 探結構</div>
        <ul>
          <li>案子自己接還是固定業主？</li>
          <li>卡在人還是材料？</li>
          <li>會不會臨時缺人？</li>
        </ul>
        <div class="q-mt-sm">✔ 埋自己</div>
        <ul>
          <li>我可以幫忙小工程</li>
          <li>採購 / 小段施工</li>
          <li>可以先試一小段</li>
        </ul>
        <div class="text-caption">👉 不講合作 / 不講賺錢 / 只講補位</div>
      </q-card-section>
    </q-card>

    <!-- 任務潛規則 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 任務分配潛規則</div>
        <div class="text-negative">🔴 風險結構</div>
        <ul>
          <li>風險大 → 給可犧牲的人</li>
          <li>吃力不討好 → 丟給不聽話的</li>
          <li>沒人做 → 丟給老實人</li>
        </ul>
        <div class="text-warning">🟡 成長結構</div>
        <ul>
          <li>棘手 → 給有能力的（練經驗）</li>
          <li>小事 → 新人試錯</li>
        </ul>
        <div class="text-positive">🟢 利益結構</div>
        <ul>
          <li>利益大 → 心腹</li>
          <li>能曝光 → 提拔對象 \ 輕鬆露臉 老闆自己</li>
          <li>👉 結論：	你被分到什麼任務 = 你在系統裡的位置</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 識人模型 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 識人模型</div>
        <ul>
          <li>1️⃣ 有沒有資源 : 資源（錢 / 案 / 人）</li>
          <li>2️⃣ 有沒有流動性 :流動性（有沒有在動）</li>
          <li>3️⃣ 有沒有風險 : 風險（會不會爆（拖款 / 爛尾 / 情緒））</li>
        </ul>
        <div class="text-caption">👉 我可以插在哪？</div>
      </q-card-section>
    </q-card>

    <!-- 溝通控制 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 溝通控制👉 不同人吃不同層</div>
        <div>情緒（舒服不舒服）低端 / 邏輯（講得通）白領 / 利益（值不值得）老闆 生意人</div>
        <q-separator class="q-my-sm" />
        <ul>
          <li>目標可視化</li>
          <li>反饋即時化</li>
          <li>難度個性化</li>
          <li>失敗安全化</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 交付控制 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔧 交付控制（3P 模型）</div>
        <div>People（誰做） / Process（怎麼做） / Publish（怎麼驗收）</div>
      </q-card-section>
    </q-card>

    <!-- 止損 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">💣 止損策略</div>
        <ul>
          <li>持續 call 壓進度</li>
          <li>不行就換人</li>
          <li>最後認賠結案</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- 操作原則 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">❗ 操作原則</div>
        <ul>
          <li>不要一次想完 → 多次接觸 \\ GPT 有限 👉 靠「多次接觸」慢慢拼出結構</li>
          <li>對方不接球就停 👉 停在第 6 句，不要硬推</li>
          <li>👉 你的進化路線	現在：觀察世界 \\ 下一步：👉 控制節點（人 / 任務 / 流動）</li>
          <li>🧠 最終總結（一句話）你不是在找人做事，而是在一個不公平的系統裡，找到「可以安全利用且不會爆」的位置。</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
