<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">🧠 自我定位 + 外包決策控制台</div>

    <!-- 自我定位 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📍 自我定位</div>
        <q-select v-model="selfLevel" :options="levels" label="目前位置" />
        <div class="q-mt-sm text-caption">👉 每次選擇 = 對齊自己現況</div>
      </q-card-section>
    </q-card>

    <!-- 對話判斷 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🗣 對話判斷</div>
        <q-checkbox v-model="signals.noGrowth" label="對方沒有成長意圖" />
        <q-checkbox v-model="signals.talker" label="只會講（旁觀者型）」" />
        <q-checkbox v-model="signals.negative" label="負能量重" />
      </q-card-section>
    </q-card>

    <!-- 外包風險 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 外包風險</div>
        <q-checkbox v-model="risk.unstable" label="品質不穩" />
        <q-checkbox v-model="risk.delay" label="容易拖延" />
        <q-checkbox v-model="risk.noResponsibility" label="不承擔責任" />
      </q-card-section>
    </q-card>

    <!-- 決策輸出 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 決策建議</div>
        <div :class="decisionClass">{{ decision }}</div>
      </q-card-section>
    </q-card>

    <!-- 情境提示 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">💡 情境提示</div>
        <div>{{ hint }}</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const levels = ["資源不足（撐）", "過渡期（試）", "穩定期（控）"];
const selfLevel = ref("過渡期（試）");

const signals = ref({
  noGrowth: false,
  talker: false,
  negative: false,
});

const risk = ref({
  unstable: false,
  delay: false,
  noResponsibility: false,
});

const score = computed(() => {
  let s = 0;
  if (signals.value.noGrowth) s += 2;
  if (signals.value.talker) s += 2;
  if (signals.value.negative) s += 3;
  if (risk.value.unstable) s += 3;
  if (risk.value.delay) s += 2;
  if (risk.value.noResponsibility) s += 5;
  return s;
});

const decision = computed(() => {
  if (score.value >= 8) return "🔴 避開 / 停損";
  if (score.value >= 4) return "🟡 工具人（拆小用）";
  return "🟢 可合作（可觀察放大）";
});

const decisionClass = computed(() => {
  if (score.value >= 8) return "text-negative";
  if (score.value >= 4) return "text-warning";
  return "text-positive";
});

const hint = computed(() => {
  if (score.value >= 8) {
    return "立即降低依賴，準備替代方案，避免沉沒成本擴大";
  }
  if (score.value >= 4) {
    return "任務拆小，保留控制權，不給核心";
  }
  return "可以逐步增加信任，但仍需設驗收節點";
});
</script>

<style scoped></style>
