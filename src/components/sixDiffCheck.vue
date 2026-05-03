<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md" style="text-align: center;">🔥 決策檢查表</div>

    <!-- Core Rule -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">核心原則</div>
        <div class="text-body1">
          只做：<b>可規模化 × 有護城河</b>
          不用 高技術門檻 (國貿 英翻中 陸轉台 優先) 認知決擇 level \  找風口 NOT 台積營業秘密
        </div>
      </q-card-section>
    </q-card>

    <!-- Reject Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">❌ 快速否決（先砍掉 80% ideas）任何一條成立 → 直接不做</div>

        <q-list bordered separator>
          <q-item v-for="item in rejectList" :key="item.label">
            <q-item-section>
              <q-item-label class="text-weight-bold">{{
                item.label
              }}</q-item-label>
              <q-item-label caption>{{ item.desc }}</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="item.value" color="negative" />
            </q-item-section>
          </q-item>
        </q-list>

        <div class="text-negative q-mt-sm" v-if="isRejected">
          ⚠️ 此 Idea 建議直接放棄
        </div>
      </q-card-section>
    </q-card>

    <!-- Scoring Section -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚖️ 進入評分（留下來的才評）\ 每個 idea 打分（1~5） \ 👉 總分低於 20 → 不做</div>

        <div v-for="item in scoreList" :key="item.label" class="q-mb-md">
          <div>{{ item.label }}</div>
          <q-slider v-model="item.value" :min="1" :max="5" label />
        </div>

        <div class="text-h6">總分：{{ totalScore }}</div>
        <div :class="totalScore < 20 ? 'text-negative' : 'text-positive'">
          {{ totalScore < 20 ? "❌ 不建議執行" : "✅ 可以評估執行" }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Boss Check -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 主管判斷</div>

        <q-list>
          <q-item v-for="item in bossList" :key="item.label">
            <q-item-section>
              {{ item.label }}
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="item.value" color="primary" />
            </q-item-section>
          </q-item>
        </q-list>

        <div v-if="!isBossValid" class="text-negative q-mt-sm">
          ⚠️ 主管條件不足，風險高
        </div>
      </q-card-section>
    </q-card>

    <!-- Summary -->
    <q-card>
      <q-card-section>
        <div class="text-h6">🧭 最終結論</div>
        <div>
          {{ finalDecision }}
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

// Reject checklist
const rejectList = ref([
  { label: "大廠會做(台灣) / 已存在平台", desc: "Shopee / SQL 工具類 / 通用工具 本質只是「重做一遍已有東西」/ 大規模系統只能選不能Dev", value: false },
  { label: "投入不如買", desc: "成本（時間/精力） > 購買(手作品質 太差) \ 發展性，空閒時間 機會成本 無螢幕時間（生活品質）", value: false },
  { label: "無法 scale 👉 不能 scale = 直接淘汰", desc: "低價 / 客製不可複製 / 無法達到經濟規模", value: false },
  { label: "沒有護城河", desc: "「別人複製你有多難？」 容易被 copy / 連專利都難成立 \\ 沒技術門檻 \\ 沒資源優勢", value: false },
  { label: "不符合能力 / 興趣", desc: "做不久 / 沒樂趣的 fashion 聲光，短期 hyp / 能力 gap 太大（ex: 英文 / 技術）", value: false },
  { label: "時機不成熟", desc: "技術 / 法規未開放 / 成本太高 網路速度 / API / UX 還不成熟\ 台灣用戶的網路速度 專利期限 技術還不穩（ex: early AutoGPT）", value: false },
]);

const isRejected = computed(() => rejectList.value.some((i) => i.value));

// Scoring
const scoreList = ref([
  { label: "Platform leverage \ 能不能借勢平台", value: 3 },
  { label: "Scale \ 能不能放大", value: 3 },
  { label: "Moat \ 能不能防守 護城河", value: 3 },
  { label: "技術門檻 \ GPT 做不出來嗎？", value: 3 },
  { label: "個人優勢 \ 你有沒有 edge", value: 3 },
  { label: "時機 \ 現在是不是對的時間", value: 3 },
]);

const totalScore = computed(() =>
  scoreList.value.reduce((sum, i) => sum + i.value, 0)
);

// Boss check
const bossList = ref([
  { label: "有決策權", value: false },
  { label: "有資源", value: false },
  { label: "有成長軌道", value: false },
]);

const isBossValid = computed(() => bossList.value.every((i) => i.value));

// Final decision
const finalDecision = computed(() => {
  if (isRejected.value) return "❌ 不做（觸發否決條件）";
  if (totalScore.value < 20) return "❌ 不做（分數不足）";
  if (!isBossValid.value) return "⚠️ 可做但環境風險高";
  return "✅ 可以投入執行";
});
</script>

<style scoped></style>
