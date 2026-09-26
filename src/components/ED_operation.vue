```vue
<template>
  <q-page class="q-pa-sm bg-grey-2">
    <!-- Header -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="row items-center justify-between">
          <div>
            <div class="text-h6 text-weight-bold">膽囊切除後</div>
            <div class="text-caption text-grey-7">術後 1～14 天恢復指南</div>
          </div>

          <q-chip color="primary" text-color="white" size="md">
            Day {{ currentDay }}
          </q-chip>
        </div>
      </q-card-section>
    </q-card>

    <!-- Day Selector -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-pa-sm">
        <div class="text-subtitle2 q-mb-xs">術後第幾天？</div>

        <div class="day-grid">
          <q-btn
            v-for="day in 14"
            :key="day"
            :label="`D${day}`"
            dense
            unelevated
            :color="currentDay === day ? 'primary' : 'grey-3'"
            :text-color="currentDay === day ? 'white' : 'grey-8'"
            @click="currentDay = day"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Today's Main Message -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-md">
        <div class="text-center">
          <div class="text-caption text-grey-7">今天的重點</div>

          <div class="text-h5 text-weight-bold q-mt-xs">
            {{ today.title }}
          </div>

          <div class="text-body2 text-grey-8 q-mt-sm">
            {{ today.summary }}
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Food -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="text-subtitle1 text-weight-bold">🍚 今天可以吃</div>

        <div class="text-body2 q-mt-sm">
          {{ today.food }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Avoid -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="text-subtitle1 text-weight-bold">⛔ 今天先不要</div>

        <div class="text-body2 q-mt-sm">
          {{ today.avoid }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Activity -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="text-subtitle1 text-weight-bold">🚶 活動</div>

        <div class="text-body2 q-mt-sm">
          {{ today.activity }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Normal Symptoms -->
    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="text-subtitle1 text-weight-bold">🟢 可能正常</div>

        <div class="text-body2 q-mt-sm">
          {{ today.normal }}
        </div>
      </q-card-section>
    </q-card>

    <!-- ================================================= -->
    <!-- Side Effects -->
    <!-- ================================================= -->

    <q-card flat bordered class="q-mb-sm">
      <q-card-section class="q-py-sm">
        <div class="row items-center justify-between">
          <div class="text-subtitle1 text-weight-bold">📋 膽囊切除副作用</div>

          <q-chip dense color="orange-2" text-color="orange-10">
            術後可能出現
          </q-chip>
        </div>
      </q-card-section>

      <!-- Key reminder -->
      <q-card-section class="q-pt-none">
        <div class="side-effect-summary">
          <div class="text-body2">
            <b>排便習慣可能改變</b>
          </div>

          <div class="text-body2 q-mt-xs">高油脂 → 比較容易腹瀉／腹脹</div>

          <div class="text-caption text-grey-7 q-mt-sm">
            部分持續性症狀可由醫師評估是否需要用藥物控制膽汁酸。
          </div>
        </div>
      </q-card-section>

      <!-- Mobile Side Effect List -->
      <q-list separator>
        <q-item
          v-for="item in sideEffects"
          :key="item.name"
          class="side-effect-item"
        >
          <q-item-section>
            <q-item-label class="text-weight-bold">
              {{ item.name }}
            </q-item-label>

            <q-item-label caption class="q-mt-xs">
              {{ item.condition }}
            </q-item-label>

            <q-item-label caption class="text-grey-8 q-mt-xs">
              {{ item.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-chip
              dense
              size="sm"
              :color="item.color"
              :text-color="item.textColor"
            >
              {{ item.frequency }}
            </q-chip>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- ================================================= -->
    <!-- Red Flags -->
    <!-- ================================================= -->

    <q-card flat bordered class="warning-card q-mb-sm">
      <q-card-section class="q-py-md">
        <div class="text-subtitle1 text-weight-bold">
          🚨 需要聯絡醫師／回醫院
        </div>

        <div class="text-body2 q-mt-sm">
          {{ today.warning }}
        </div>
      </q-card-section>
    </q-card>

    <!-- Bottom Rule -->
    <q-card flat class="bg-primary text-white">
      <q-card-section class="q-pa-md text-center">
        <div class="text-subtitle1 text-weight-bold">記住</div>

        <div class="text-body2 q-mt-xs">少量吃・慢慢走・不要用力</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const currentDay = ref(1);

/* =====================================================
   Day 1 ~ 14
===================================================== */

const days = {
  1: {
    title: "先休息，少量進食",
    summary: "麻醉剛退，今天重點是補水與觀察。",
    food: "水、溫開水、清淡流質；能吃再吃稀飯、軟食。",
    avoid: "油炸、肥肉、酒、辛辣、大餐。",
    activity: "休息為主，可以短距離慢慢走。",
    normal: "傷口痛、腹脹、肩膀痠痛、輕微噁心。",
    warning: "劇烈腹痛、持續嘔吐、呼吸困難、大量出血。",
  },

  2: {
    title: "開始吃軟食",
    summary: "能吃就慢慢增加，不要一次吃太多。",
    food: "稀飯、麵、吐司、蒸蛋、嫩豆腐。",
    avoid: "炸物、肥肉、油湯、酒。",
    activity: "短距離走路，避免提重物。",
    normal: "腹脹、排氣、傷口疼痛。",
    warning: "發燒、腹痛明顯增加、持續嘔吐。",
  },

  3: {
    title: "慢慢恢復正常飲食",
    summary: "開始加入瘦肉、魚、熟蔬菜。",
    food: "白飯＋瘦肉／魚＋熟蔬菜。",
    avoid: "油炸、肥肉、麻辣、大餐。",
    activity: "可以增加走路，但不要用力。",
    normal: "軟便、排便習慣改變、輕微腹脹。",
    warning: "黃疸、深色尿、持續劇烈腹痛。",
  },

  4: {
    title: "增加食物種類",
    summary: "觀察自己吃油後是否腹瀉或腹脹。",
    food: "正常食物逐步增加，維持低油。",
    avoid: "炸雞、香腸、培根、肥肉。",
    activity: "輕度日常活動。",
    normal: "腹脹、軟便仍可能存在。",
    warning: "發燒、傷口紅腫熱痛、流膿。",
  },

  5: {
    title: "接近一般飲食",
    summary: "少量多餐，繼續控制油脂。",
    food: "飯、魚、雞肉、蛋、豆腐、蔬菜。",
    avoid: "高油脂食物、酒。",
    activity: "可做簡單家事，不搬重物。",
    normal: "食慾、精神逐漸恢復。",
    warning: "無法進食、無法喝水、持續噁心。",
  },

  6: {
    title: "觀察腸胃反應",
    summary: "不要因為好一點就突然大吃。",
    food: "接近正常飲食，但油脂適量。",
    avoid: "一次大量油脂。",
    activity: "繼續散步。",
    normal: "軟便、腹瀉可能仍存在。",
    warning: "腹痛反而越來越嚴重。",
  },

  7: {
    title: "第一週檢查點",
    summary: "大部分活動可以逐步恢復。",
    food: "正常均衡飲食，仍控制油脂。",
    avoid: "油炸、大餐、酒。",
    activity: "增加日常活動，但避免劇烈運動。",
    normal: "傷口仍可能有拉扯感。",
    warning: "傷口裂開、流膿、持續發燒。",
  },

  8: {
    title: "逐漸恢復",
    summary: "如果前幾天吃得穩定，可以增加食物種類。",
    food: "接近正常飲食。",
    avoid: "一次吃大量油脂。",
    activity: "逐漸增加活動量。",
    normal: "偶爾腹脹。",
    warning: "黃疸、持續右上腹痛。",
  },

  9: {
    title: "觀察排便",
    summary: "注意哪些食物會讓你腹瀉。",
    food: "正常均衡飲食。",
    avoid: "會明顯造成腹瀉的食物。",
    activity: "依身體狀況增加活動。",
    normal: "排便逐漸穩定。",
    warning: "持續大量水瀉。",
  },

  10: {
    title: "逐漸回到生活",
    summary: "不要急著完全恢復所有活動。",
    food: "正常飲食，油脂適量。",
    avoid: "酒、油炸、大餐。",
    activity: "逐步恢復日常活動。",
    normal: "輕微傷口不適。",
    warning: "腹痛＋發燒／嘔吐。",
  },

  11: {
    title: "接近正常",
    summary: "持續觀察吃油後的腸胃反應。",
    food: "正常均衡飲食。",
    avoid: "個人明顯不耐受食物。",
    activity: "輕度運動依醫師許可。",
    normal: "消化逐漸恢復。",
    warning: "症狀突然惡化。",
  },

  12: {
    title: "恢復日常",
    summary: "飲食可以接近平常。",
    food: "正常均衡飲食。",
    avoid: "大量油炸食品。",
    activity: "逐步恢復活動。",
    normal: "偶爾腹脹。",
    warning: "黃疸、深色尿、持續腹痛。",
  },

  13: {
    title: "最後觀察",
    summary: "確認飲食、排便與傷口是否穩定。",
    food: "正常飲食。",
    avoid: "暴飲暴食。",
    activity: "逐漸恢復正常生活。",
    normal: "傷口逐漸穩定。",
    warning: "持續明顯腹瀉或腹痛。",
  },

  14: {
    title: "兩週檢查點",
    summary: "多數人已逐漸回到正常生活。",
    food: "可接近正常飲食。",
    avoid: "仍依個人耐受調整油脂。",
    activity: "重訓、搬重物依醫師指示。",
    normal: "傷口逐漸穩定。",
    warning: "任何持續或惡化的異常症狀。",
  },
};

/* =====================================================
   Side Effects
===================================================== */

const sideEffects = [
  {
    name: "腹瀉、軟便",
    frequency: "常見",
    condition: "排便習慣可能改變",
    description: "多在數週～數月內逐漸改善。",
    color: "orange-2",
    textColor: "orange-10",
  },

  {
    name: "吃油膩後容易拉肚子",
    frequency: "常見",
    condition: "高油脂 → 腹瀉／腹脹",
    description: "膽汁直接進入腸道，對高脂食物可能比較敏感。",
    color: "orange-2",
    textColor: "orange-10",
  },

  {
    name: "腹脹、放屁",
    frequency: "常見",
    condition: "腸胃重新適應",
    description: "術後腸胃需要一段時間重新適應。",
    color: "orange-2",
    textColor: "orange-10",
  },

  {
    name: "消化不良、吃太飽不舒服",
    frequency: "可能",
    condition: "少量多餐",
    description: "少量多餐通常比較容易適應。",
    color: "blue-2",
    textColor: "blue-10",
  },

  {
    name: "右上腹或傷口附近疼痛",
    frequency: "術後常見",
    condition: "恢復期間",
    description: "通常會隨著時間逐漸減輕。",
    color: "blue-2",
    textColor: "blue-10",
  },

  {
    name: "噁心",
    frequency: "可能",
    condition: "術後早期較常見",
    description: "可能與麻醉、止痛藥或腸胃適應有關。",
    color: "blue-2",
    textColor: "blue-10",
  },

  {
    name: "排便習慣改變",
    frequency: "可能",
    condition: "恢復期間",
    description: "有些人會持續一段時間。",
    color: "blue-2",
    textColor: "blue-10",
  },
];

const today = computed(() => days[currentDay.value]);
</script>

<style scoped>
.day-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.day-grid .q-btn {
  min-height: 34px;
  padding: 0;
}

/* Side Effect */

.side-effect-summary {
  background: #fff8e1;
  border-radius: 8px;
  padding: 12px;
}

.side-effect-item {
  min-height: 72px;
}

/* Warning */

.warning-card {
  border: 2px solid #c62828;
}

@media (max-width: 400px) {
  .day-grid {
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
  }

  .day-grid .q-btn {
    font-size: 11px;
  }
}
</style>
```
