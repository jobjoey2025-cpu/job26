<template>
  <q-page padding>
    <div class="text-h5 q-mb-lg">🧠 對話控制系統（催進度 / 判斷風險）</div>

    <!-- 核心策略 -->
    <q-banner class="bg-grey-2 q-mb-md">
      👉 前期聊天拿資訊 → 中期卡節奏 → 後期逼決策
    </q-banner>

    <q-banner class="bg-grey-3 q-mb-md">
      👉 你不是在催工，而是在測試「他是否失控或違約」
    </q-banner>

    <!-- 整體流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 整體流程</div>
        <div class="text-bold">
          建立關係 → 探資訊 → 拉進場 → 控進度 → 判斷風險 → 決策
        </div>
      </q-card-section>
    </q-card>

    <!-- 前期開場 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🥇 前期開場（拿資訊）</div>
        <ul>
          <li>最近還在忙工地嗎？</li>
          <li>最近比較忙還是比較有空？</li>
        </ul>
        <div class="text-caption">👉 看流動性</div>

        <q-separator class="q-my-sm" />

        <ul>
          <li>案子自己接還是固定業主？</li>
          <li>卡在人還是材料？</li>
          <li>會不會臨時缺人？</li>
        </ul>
        <div class="text-caption">👉 看資源 / 問題 / 缺口</div>

        <q-separator class="q-my-sm" />

        <ul>
          <li>我可以幫忙小工程</li>
          <li>採購 / 小段施工</li>
          <li>可以先試一小段</li>
        </ul>
        <div class="text-caption">👉 保留合作選項，不是求合作</div>
      </q-card-section>
    </q-card>

    <!-- 溫和催進度 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 text-warning">🟡 溫和控進度</div>
        <div>
          老闆，想跟您確認一下目前工程進度，之前時間已延後一段，
          想了解大概什麼時候可以開工或完成？
        </div>
        <div class="text-caption">👉 不指責，只要時間</div>
      </q-card-section>
    </q-card>

    <!-- 施壓 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 text-orange">🟠 施壓版</div>
        <div>
          目前工程已延誤一段時間，我也已支付80%訂金，
          希望確認明確開工與完工時間， 請這週提供排程。
        </div>
        <div class="text-caption">👉 提付款 + 要時間</div>
      </q-card-section>
    </q-card>

    <!-- 強硬 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 text-negative">🔴 強硬版</div>
        <div>
          目前工程已經延誤一年時間 我這邊也已經支付 80% 訂金
          希望可以確認明確開工與完工時間 如果沒有時程，對我這邊影響很大
          希望這週可以給我一個排程 \\ ??否則將依合約處理（延誤或退款）。??\\
        </div>
        <div class="text-caption">👉 設期限 + 丟後果</div>
      </q-card-section>
    </q-card>

    <!-- 判斷風險 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 風險判斷</div>
        <ul>
          <li>一直說下週</li>
          <li>不給明確日期</li>
          <li>不主動聯絡</li>
          <li>理由很多但沒方案</li>
          <li>
            關鍵判斷（他是不是要爆） 一直說「下週」 不給日期 不主動聯絡
            一堆理由（下雨/缺料/很忙）但沒方案 不是忙，是失控（排單 or
            資金問題）
          </li>
        </ul>
        <div class="text-negative">👉 結論：已失控（排單或資金問題）</div>
      </q-card-section>
    </q-card>

    <!-- 控制動作 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">💣 控制動作</div>
        <ul>
          <li>持續 call 壓節奏</li>
          <li>不再付款</li>
          <li>準備替代人選</li>
          <li>必要時調解 / 申訴 / 求償</li>
          <li>
            💣 七、你的控制動作（不要被拖死） ✔ 1. 持續 call（壓節奏）👉
            讓你變成「他不能忽略的人」 ✔ 2. 不再付款 👉 沒進度 = 不給錢 ✔ 3.
            準備替代方案 👉 你要有「隨時換人」能力 ✔ 4. 最後手段 \ 調解 \ 申訴 \
            民事求償
          </li>
        </ul>
      </q-card-section>
    </q-card>

    <!--❗「何時切換階段」 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">❗「何時切換階段」</div>
        <ul>
          <li>拖延天數：</li>
          <li>< 7天 → 溫和</li>
          <li>7–14天 → 施壓</li>
          <li>> 14天 → 強硬 + 準備換人</li>
          <li> 👉 這樣你不會：</li>
          <li>太早翻臉（關係斷掉）</li>
          <li>太晚出手（被拖死）</li>
          <li>這不是催工頁，是你「判斷對方是否失控並接管節奏」的控制器。</li>
        </ul>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup></script>

<style scoped></style>
