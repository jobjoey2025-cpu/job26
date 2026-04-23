<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">外包識人與定義麻煩</div>

    <!-- 一、關鍵風險判斷 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">📌 關鍵風險判斷</div>
        <q-list>
          <q-item><q-item-section>關鍵時刻是否會消失？</q-item-section></q-item>
          <q-item
            ><q-item-section
              >出事不見人 / 壓力就退 / 不承擔責任</q-item-section
            ></q-item
          >
          <q-item
            ><q-item-section class="text-caption text-grey"
              >👉 可靠性比能力更重要</q-item-section
            ></q-item
          >
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 二、麻煩型人格 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧨 麻煩型人格</div>
        <div>麻煩的人不是事情多，而是會持續製造麻煩 \ 不舒服 \ 沒禮貌 \ Rush \ </div>
        <div class="text-caption text-grey">👉 找「不讓事情變更麻煩的人」</div>
      </q-card-section>
    </q-card>

    <!-- 三、能力定位 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧠 能力定位</div>
        <div>能力是入場券，長期取決於：</div>
        <ul>
          <li>穩定性</li>
          <li>持續價值</li>
          <li>價值匹配</li>
        </ul>
        <div class="text-caption text-grey">👉 合作是價值交換</div>
      </q-card-section>
    </q-card>

    <!-- 四、外包風險 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🏢 外包風險結構</div>
        <div class="text-negative">⚠️ 小公司 / 低價：高風險（易爛尾）\ 人力吃緊 \ 沒有好系統</div>
        <div class="text-positive">✅ 高報價：流程穩定</div>
        <div class="text-caption">👉 越便宜越要小心</div>
      </q-card-section>
    </q-card>

    <!-- 五、時間策略 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⏳ 時間策略</div>
        <div>不要急著用人，用時間篩選 \ 專案時間也不能壓太緊，cuz 延後是低價的常態</div>
        <div class="text-caption">👉 低價 / 低端 = 高不確定</div>
      </q-card-section>
    </q-card>

    <!-- 六、低端特性 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔄 低端特性</div>
        <div>短期導向，缺乏長期合作能力</div>
        <div class="text-caption">👉 找長期價值交換者</div>
      </q-card-section>
    </q-card>

    <!-- 七、人性風險 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ 人性風險</div>
        <ul>
          <li>規則卡你</li>
          <li>人情綁你</li>
          <li>關係施壓 \ 把關係搞僵逼你讓步</li>
        </ul>
        <div class="text-caption">👉 用結構壓你</div>
      </q-card-section>
    </q-card>

    <!-- 八、商業套路 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">💸 商業套路</div>
        <div>月租 / 訂閱：賭你忘記取消 \ 懶得處理</div>
        <div class="text-caption">👉 定期清理 \ 主動清理</div>
      </q-card-section>
    </q-card>

    <!-- 決策總結 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧩 決策總結</div>
        <div>✔ 找人：可靠 / 不麻煩 / 可持續</div>
        <div>❌ 避坑：太便宜 / 太急 / 太熟</div>
        <div class="text-bold q-mt-sm">👉 核心：關鍵時刻不拖累你</div>
        <div>🧠 一句話核心	找對人，不是看他多強，而是看他會不會在關鍵時刻讓事情變更糟。</div>
      </q-card-section>
    </q-card>

    <!-- 使用策略生成 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">👉 使用策略</div>
        <q-select
          v-model="mode"
          :options="['🟢 可合作', '🟡 工具人', '🔴 高風險']"
          label="選擇對象類型"
        />
        <q-input type="textarea" v-model="strategy" autogrow />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, watch } from "vue";

const mode = ref("🟡 工具人");
const strategy = ref("");

watch(
  mode,
  (val) => {
    if (val.includes("🔴")) {
      strategy.value = "不合作 / 直接避開";
    } else if (val.includes("🟡")) {
      strategy.value = "任務拆小 + 不給核心 + 可替換";
    } else {
      strategy.value = "可長期合作 + 穩定分工";
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
