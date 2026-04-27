<template>
  <q-page padding>
    <q-btn
      flat
      color="primary"
      label="3F tin "
      href="https://docs.google.com/spreadsheets/d/1BOO44OJj1Hm3KDkXzEsFpO9kr_CyXjsrmsfIqMcI6Oc/edit?gid=777997665#gid=777997665
"
      target="_blank"
      icon="open_in_new"
    />
    <!-- https://docs.google.com/spreadsheets/d/1BOO44OJj1Hm3KDkXzEsFpO9kr_CyXjsrmsfIqMcI6Oc/edit?gid=777997665#gid=777997665 -->
    <q-btn flat color="primary" label="密碼鎖" to="/lock" icon="open_in_new" />
    <q-btn
      flat
      color="primary"
      label="卡片Table"
      to="/Qtable"
      icon="open_in_new"
    />
    <q-btn
      flat
      color="primary"
      label="2F 老屋翻新"
      to="/2Finference"
      icon="open_in_new"
    />
    <q-btn
      flat
      color="primary"
      label="Notion"
      to="/notion"
      icon="open_in_new"
    />
    <q-btn
      flat
      color="primary"
      label="interview"
      to="/interview"
      icon="open_in_new"
    />

    <hr />
    <p>
      電話 \ 語音信箱 \ Line \ 店面 \<br />
      預估情況 : 電話 \ Line 都沒有接 -- 還是要打 (習慣就好)<br />
      #0908-260-138 許玟<br />
      蘇澳鎮蘇濱路1段485號<br />
      建築工程 很麻煩 \ 最好買做好的 \ cuz 連電視 風城改造 都 delay 2年 買地$50w
      利息$20w 預計賣$140w - 只能花$69w 內才不虧本.
    </p>
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
      label="4 outsourceSimulation 溝通執行"
      to="/outsourceComunication"
      icon="open_in_new"
    />

    <q-btn
      flat
      color="primary"
      label="5 outsourceScript 執行腳本"
      to="/outsourceScript"
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
  "請問你是 ... 坤億鐵工廠嗎 ?",
  "我是聖湖里聖賢路90號",
  "-------------------",

  "最近還在忙工地嗎？",
  "現在案子是自己接還是固定業主？",
  "最近比較卡在人還是材料？",
  "有時候會不會臨時缺人？",

  "目前工程已經延誤一年時間",
  "我這邊也已經支付 80% 訂金",
  "希望可以確認明確開工與完工時間",
  "如果沒有時程，對我這邊影響很大",
  "希望這週可以給我一個排程",
  "-------------------",

  "建立關係 → 探資訊 → 拉進場 → 控進度 → 判斷風險 → 決策",

  "關鍵判斷（他是不是要爆）",
  "一直說下週",
  "不給日期",
  "不主動聯絡",

  "情緒（舒服不舒服）低端",
  "邏輯（講得通）白領",
  "利益（值不值得）老闆／生意人",

  "目標可視化",
  "反饋即時化",
  "難度個性化",
  "失敗安全化",
  "-------------------",

  "對方不接球就停（停在第6句，不要硬推）",

  "你的進化路線：現在是觀察世界",
  "下一步：控制節點（人 / 任務 / 流動）",
];
</script>

<style scoped></style>
