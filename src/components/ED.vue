<template>
  <q-page class="q-pa-md">
    <!-- Header -->
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h5">🚑 ER / 急診 Recent</div>
        <div class="text-caption text-grey-7">
          痛到不能想時，不要做決策；Follow Recent Page
        </div>
      </div>

      <q-btn flat round icon="refresh" @click="resetAll" />
    </div>

    <!-- ----- -->
    <div>
      腸道問題: 缺火龍果 硬便 卡腸, 早上蠕動 牽動到 腎結石, 加上 但膽結石脹氣
      結果 : 左下腹 一陣陣的抽痛
      <!-- style="height: 540px; max-width: 450px" -->
      <div class="q-pa-md q-gutter-sm">
        <q-img
          src="./statics/ED.jpg"
          spinner-color="white"
          style="max-width: 300px"
        />
        <q-img
          src="./statics/ED1.jpg"
          spinner-color="white"
          style="max-width: 250px"
        />
        <q-img
          src="./statics/ED2.jpg"
          spinner-color="white"
          style="max-width: 250px"
        />
        <q-img
          src="./statics/ED3.jpg"
          spinner-color="white"
          style="max-width: 300px"
        />
        <q-img
          src="./statics/ED4.jpg"
          spinner-color="white"
          style="max-width: 250px"
        />
        <!-- <q-img src="./statics/ED.jpg" class="tech-image" fit="cover" /> -->
      </div>
    </div>

    <!-- ----- -->
    <!-- ========================= -->
    <!-- ① 現況 -->
    <!-- ========================= -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">① 現況</div>
        <div class="text-caption text-grey">先確認目前發生什麼</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item v-for="item in symptoms" :key="item.id">
            <q-item-section avatar>
              <q-checkbox v-model="item.checked" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ② 立即處理 -->
    <!-- ========================= -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">② 立即處理</div>
        <div class="text-caption text-grey">目標：降低 Rush</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item v-for="item in immediateActions" :key="item.id">
            <q-item-section avatar>
              <q-checkbox v-model="item.checked" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ③ 醫院 -->
    <!-- ========================= -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">③ 醫院 / 出發前</div>
        <div class="text-caption text-grey">平常準備，急診時直接拿</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item v-for="item in hospitalItems" :key="item.id">
            <q-item-section avatar>
              <q-checkbox v-model="item.checked" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ④ 診斷後 -->
    <!-- ========================= -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">④ 診斷後</div>
        <div class="text-caption text-grey">急診止痛 ≠ 問題已解決</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item v-for="item in afterDiagnosis" :key="item.id">
            <q-item-section avatar>
              <q-checkbox v-model="item.checked" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.label }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ⑤ 身體狀況 -->
    <!-- ========================= -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⑤ 身體狀況</div>
      </q-card-section>

      <q-card-section>
        <div class="text-subtitle2 q-mb-sm">疼痛程度</div>

        <q-slider v-model="painLevel" :min="0" :max="10" label markers />

        <div class="text-center text-h5 q-my-sm">{{ painLevel }} / 10</div>

        <q-input
          v-model="bodyNote"
          type="textarea"
          outlined
          label="目前身體狀況"
          placeholder="例如：腎痛、腹脹、排尿、排便..."
        />
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ⑥ Recent Rule -->
    <!-- ========================= -->

    <q-card bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚠️ Recent Rule</div>

        <q-banner class="q-mt-md" rounded>
          <template v-slot:avatar>
            <q-icon name="warning" />
          </template>

          <div class="text-weight-bold">痛到不能想時，不要做決策。</div>

          <div class="q-mt-sm">Follow Recent Page。</div>
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- ⑦ 急診室宅 -->
    <!-- ========================= -->

    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h6">🏠 急診室宅</div>
        <div class="text-caption text-grey">降低交通、生活、決策成本</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div v-for="item in emergencyHome" :key="item" class="col-6 col-sm-4">
            <q-chip outline icon="check_circle" class="full-width">
              {{ item }}
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ========================= -->
    <!-- Bottom Status -->
    <!-- ========================= -->

    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center">
          <div class="col">
            <div class="text-caption text-grey">Recent Progress</div>

            <q-linear-progress
              :value="progress"
              size="10px"
              rounded
              class="q-mt-sm"
            />
          </div>

          <div class="q-ml-md text-h6">{{ completed }}/{{ total }}</div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

// =========================
// ① 現況
// =========================

const symptoms = ref([
  { id: 1, label: "腎痛？", checked: false },
  { id: 2, label: "腹痛？", checked: false },
  { id: 3, label: "發熱／發冷？", checked: false },
  { id: 4, label: "排尿異常？", checked: false },
  { id: 5, label: "排便異常？", checked: false },
  { id: 6, label: "黑硬便？", checked: false },
  { id: 7, label: "是否可能尿阻塞？", checked: false },
  { id: 8, label: "是否可能腸阻塞？", checked: false },
]);

// =========================
// ② 立即處理
// =========================

const immediateActions = ref([
  { id: 1, label: "止痛", checked: false },
  { id: 2, label: "補水", checked: false },
  { id: 3, label: "不要硬撐", checked: false },
  { id: 4, label: "必要時 Uber／叫車", checked: false },
  { id: 5, label: "不要自己騎車硬撐", checked: false },
]);

// =========================
// ③ 醫院
// =========================

const hospitalItems = ref([
  { id: 1, label: "健保卡／證件", checked: false },
  { id: 2, label: "藥物／藥單", checked: false },
  { id: 3, label: "手機／充電", checked: false },
  { id: 4, label: "水", checked: false },
  { id: 5, label: "簡單食物", checked: false },
  { id: 6, label: "住院包", checked: false },
]);

// =========================
// ④ 診斷後
// =========================

const afterDiagnosis = ref([
  { id: 1, label: "腎結石處理", checked: false },
  { id: 2, label: "膽結石／手術計畫", checked: false },
  { id: 3, label: "住院", checked: false },
  { id: 4, label: "後續門診", checked: false },
  { id: 5, label: "恢復期", checked: false },
]);

// =========================
// ⑤ 身體狀況
// =========================

const painLevel = ref(0);

const bodyNote = ref("");

// =========================
// ⑦ 急診室宅
// =========================

const emergencyHome = [
  "冷暖氣",
  "熱水",
  "超商食物",
  "雨天停車",
  "電梯",
  "MRT／交通",
  "10 mins Walk",
  "水",
  "廁所",
  "可平躺",
];

// =========================
// Progress
// =========================

const allGroups = computed(() => [
  ...symptoms.value,
  ...immediateActions.value,
  ...hospitalItems.value,
  ...afterDiagnosis.value,
]);

const total = computed(() => allGroups.value.length);

const completed = computed(
  () => allGroups.value.filter((item) => item.checked).length
);

const progress = computed(() =>
  total.value === 0 ? 0 : completed.value / total.value
);

// =========================
// Reset
// =========================

function resetAll() {
  allGroups.value.forEach((item) => {
    item.checked = false;
  });

  painLevel.value = 0;
  bodyNote.value = "";
}
</script>
