<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">外包用人評估系統</div>

    <q-btn
      flat
      color="primary"
      label="1 outsourceAlign 階級對齊"
      to="/outsourceAlign"
      icon="open_in_new"
    />

    <q-btn
      flat
      color="primary"
      label="2 outsourceDefined 定義麻煩"
      to="/outsourceDefined"
      icon="open_in_new"
    />

    <q-btn
      flat
      color="primary"
      label="3 outsourceSimulation 小徵兆大模擬"
      to="/outsourceSimulation"
      icon="open_in_new"
    />


    <q-btn
      flat
      color="primary"
      label="4 outsourceSimulation 溝通執行腳本"
      to="/outsourceSimulation"
      icon="open_in_new"
    />
    <!-- Step 1: 基本判斷 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Step 1：快速辨識</div>
        <q-checkbox v-model="signals.negative" label="負能量 / 抱怨多" />
        <q-checkbox v-model="signals.unreliable" label="不負責 / 推拖" />
        <q-checkbox v-model="signals.messy" label="做事混亂" />
        <q-checkbox v-model="signals.trouble" label="製造麻煩" />
        <q-checkbox v-model="signals.shortTerm" label="短期導向" />
      </q-card-section>
    </q-card>

    <!-- Step 2: 價值判斷 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Step 2：價值判斷</div>
        <q-checkbox v-model="value.skill" label="有實際能力" />
        <q-checkbox v-model="value.responsibility" label="會負責" />
        <q-checkbox v-model="value.longTerm" label="可長期合作" />
      </q-card-section>
    </q-card>

    <!-- 結果 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">判斷結果</div>
        <div class="text-subtitle1">{{ result }}</div>
      </q-card-section>
    </q-card>

    <!-- 聊天腳本 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">鐵工廠開場腳本</div>
        <q-list bordered>
          <q-item v-for="(line, index) in scripts" :key="index">
            <q-item-section>{{ line }}</q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, reactive } from "vue";

const signals = reactive({
  negative: false,
  unreliable: false,
  messy: false,
  trouble: false,
  shortTerm: false,
});

const value = reactive({
  skill: false,
  responsibility: false,
  longTerm: false,
});

const result = computed(() => {
  const riskCount = Object.values(signals).filter((v) => v).length;
  const valueCount = Object.values(value).filter((v) => v).length;

  if (riskCount >= 3) return "🔴 高風險：避免合作";
  if (valueCount >= 2 && riskCount <= 1) return "🟢 可合作";
  return "🟡 僅限低風險使用";
});

const scripts = [
  "最近還在忙工地嗎？",
  "現在案子是自己接還是固定業主？",
  "最近比較卡在人還是材料？",
  "有時候會不會臨時缺人？",
  "我最近有在看一些小工程可以幫忙",
  "像採購或小段施工也可以支援",
  "不用一次做大，可以先試一小段",
  "如果你那邊忙不過來可以丟一點出來",
  "我這邊彈性很大，可以配合",
  "你排好時間再跟我說，我再配合",
];
</script>

<style scoped></style>
