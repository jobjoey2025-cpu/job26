```vue
<template>
  <q-page class="er-page">
    <!-- ========================= -->
    <!-- HOME -->
    <!-- ========================= -->

    <div v-if="page === 'home'" class="home-page">
      <!-- Header -->
      <div class="home-header">
        <div class="text-h4 text-weight-bold">🚑 急診</div>

        <div class="text-subtitle1 text-grey-7 q-mt-xs">痛的時候，不要想</div>
      </div>

      <!-- Core Rule -->
      <q-card flat bordered class="rule-card q-mb-lg">
        <q-card-section>
          <div class="text-h6 text-weight-bold">⚠️ Recent Rule</div>

          <div class="rule-text q-mt-sm">
            痛到不能想時<br />
            <strong>Follow Recent Page</strong>
          </div>
        </q-card-section>
      </q-card>

      <!-- 3 BIG BUTTONS -->

      <div class="main-buttons">
        <!-- 1 -->
        <q-btn
          class="main-btn"
          color="primary"
          icon="healing"
          label="我現在很痛"
          stack
          @click="page = 'pain'"
        />

        <!-- 2 -->
        <q-btn
          class="main-btn"
          color="negative"
          icon="local_hospital"
          label="我要去醫院"
          stack
          @click="page = 'hospital'"
        />

        <!-- 3 -->
        <q-btn
          class="main-btn"
          color="secondary"
          icon="backpack"
          label="住院包"
          stack
          @click="page = 'bag'"
        />
      </div>

      <!-- Bottom -->
      <div class="home-footer">
        <q-btn flat icon="home" label="急診室宅" @click="page = 'home'" />
      </div>
    </div>

    <!-- ========================= -->
    <!-- PAIN -->
    <!-- ========================= -->

    <div v-if="page === 'pain'" class="sub-page">
      <PageHeader
        title="😣 我現在很痛"
        subtitle="先不要思考太多"
        @back="page = 'home'"
      />

      <!-- Pain Level -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6">痛幾分？</div>

          <q-slider
            v-model="painLevel"
            :min="0"
            :max="10"
            label
            markers
            class="q-mt-lg"
          />

          <div class="pain-number">
            {{ painLevel }}
          </div>
        </q-card-section>
      </q-card>

      <!-- Symptoms -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">現在比較像哪一種？</div>

          <div class="choice-grid">
            <q-btn
              v-for="item in symptoms"
              :key="item.id"
              :label="item.label"
              :color="item.checked ? 'primary' : 'grey-3'"
              :text-color="item.checked ? 'white' : 'dark'"
              class="choice-btn"
              @click="item.checked = !item.checked"
            />
          </div>
        </q-card-section>
      </q-card>

      <!-- Immediate -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">現在先做</div>

          <q-list separator>
            <q-item v-for="item in immediateActions" :key="item.id">
              <q-item-section avatar>
                <q-checkbox v-model="item.checked" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1">
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Big Action -->

      <q-btn
        class="action-btn"
        color="negative"
        icon="local_hospital"
        label="我要去醫院"
        @click="page = 'hospital'"
      />
    </div>

    <!-- ========================= -->
    <!-- HOSPITAL -->
    <!-- ========================= -->

    <div v-if="page === 'hospital'" class="sub-page">
      <PageHeader
        title="🏥 我要去醫院"
        subtitle="不要硬撐"
        @back="page = 'home'"
      />

      <!-- Warning -->

      <q-banner class="warning-banner q-mb-md" rounded>
        <template v-slot:avatar>
          <q-icon name="warning" size="32px" />
        </template>

        痛到不能想時，<strong>不要自己做複雜決策。</strong>
      </q-banner>

      <!-- Transport -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">🚗 交通</div>

          <q-list separator>
            <q-item v-for="item in transport" :key="item.id">
              <q-item-section avatar>
                <q-checkbox v-model="item.checked" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1">
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Hospital items -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">🎒 帶著走</div>

          <q-list separator>
            <q-item v-for="item in hospitalItems" :key="item.id">
              <q-item-section avatar>
                <q-checkbox v-model="item.checked" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1">
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Hospital status -->

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6">🏥 診斷後</div>

          <div class="choice-grid q-mt-md">
            <q-btn
              v-for="item in afterDiagnosis"
              :key="item.id"
              :label="item.label"
              class="choice-btn"
              outline
            />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- ========================= -->
    <!-- BAG -->
    <!-- ========================= -->

    <div v-if="page === 'bag'" class="sub-page">
      <PageHeader
        title="🎒 住院包"
        subtitle="平常準備，急診直接拿"
        @back="page = 'home'"
      />

      <q-card class="section-card">
        <q-card-section>
          <div class="text-h6 q-mb-md">必帶</div>

          <q-list separator>
            <q-item v-for="item in hospitalBag" :key="item.id">
              <q-item-section avatar>
                <q-checkbox v-model="item.checked" size="lg" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-body1">
                  {{ item.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Progress -->

      <q-card class="section-card">
        <q-card-section>
          <div class="row items-center">
            <div class="col">
              <div class="text-caption text-grey">住院包完成度</div>

              <q-linear-progress
                :value="bagProgress"
                size="12px"
                rounded
                class="q-mt-sm"
              />
            </div>

            <div class="q-ml-md text-h6">
              {{ bagCompleted }}/{{ hospitalBag.length }}
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Done -->

      <q-btn
        class="action-btn"
        color="positive"
        icon="check"
        label="住院包 OK"
        @click="page = 'home'"
      />
    </div>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

// =========================
// Page
// =========================

const page = ref("home");

// =========================
// Pain
// =========================

const painLevel = ref(0);

// =========================
// Symptoms
// =========================

const symptoms = ref([
  {
    id: 1,
    label: "腎痛",
    checked: false,
  },
  {
    id: 2,
    label: "腹痛",
    checked: false,
  },
  {
    id: 3,
    label: "發熱／發冷",
    checked: false,
  },
  {
    id: 4,
    label: "排尿異常",
    checked: false,
  },
  {
    id: 5,
    label: "排便異常",
    checked: false,
  },
  {
    id: 6,
    label: "黑硬便",
    checked: false,
  },
]);

// =========================
// Immediate
// =========================

const immediateActions = ref([
  {
    id: 1,
    label: "止痛",
    checked: false,
  },
  {
    id: 2,
    label: "補水",
    checked: false,
  },
  {
    id: 3,
    label: "不要硬撐",
    checked: false,
  },
  {
    id: 4,
    label: "必要時叫車",
    checked: false,
  },
  {
    id: 5,
    label: "不要自己騎車硬撐",
    checked: false,
  },
]);

// =========================
// Transport
// =========================

const transport = ref([
  {
    id: 1,
    label: "Uber／叫車",
    checked: false,
  },
  {
    id: 2,
    label: "家人／朋友載",
    checked: false,
  },
  {
    id: 3,
    label: "下雨不要硬騎車",
    checked: false,
  },
]);

// =========================
// Hospital
// =========================

const hospitalItems = ref([
  {
    id: 1,
    label: "健保卡／證件",
    checked: false,
  },
  {
    id: 2,
    label: "藥物／藥單",
    checked: false,
  },
  {
    id: 3,
    label: "手機",
    checked: false,
  },
  {
    id: 4,
    label: "充電器",
    checked: false,
  },
  {
    id: 5,
    label: "水",
    checked: false,
  },
  {
    id: 6,
    label: "住院包",
    checked: false,
  },
]);

// =========================
// Diagnosis
// =========================

const afterDiagnosis = [
  "腎結石處理",
  "膽結石／手術計畫",
  "住院",
  "後續門診",
  "恢復期",
];

// =========================
// Hospital Bag
// =========================

const hospitalBag = ref([
  {
    id: 1,
    label: "健保卡／證件",
    checked: false,
  },
  {
    id: 2,
    label: "手機",
    checked: false,
  },
  {
    id: 3,
    label: "充電器",
    checked: false,
  },
  {
    id: 4,
    label: "藥物／藥單",
    checked: false,
  },
  {
    id: 5,
    label: "備用止痛藥",
    checked: false,
  },
  {
    id: 6,
    label: "水",
    checked: false,
  },
  {
    id: 7,
    label: "簡單食物",
    checked: false,
  },
  {
    id: 8,
    label: "衣物",
    checked: false,
  },
]);

// =========================
// Progress
// =========================

const bagCompleted = computed(() => {
  return hospitalBag.value.filter((item) => item.checked).length;
});

const bagProgress = computed(() => {
  if (!hospitalBag.value.length) {
    return 0;
  }

  return bagCompleted.value / hospitalBag.value.length;
});
</script>

<script>
export default {
  components: {
    PageHeader: {
      props: {
        title: String,
        subtitle: String,
      },

      emits: ["back"],

      template: `
        <div class="page-header q-mb-lg">

          <q-btn
            flat
            round
            icon="arrow_back"
            size="lg"
            @click="$emit('back')"
          />

          <div class="header-text">

            <div class="text-h5 text-weight-bold">
              {{ title }}
            </div>

            <div class="text-caption text-grey-7">
              {{ subtitle }}
            </div>

          </div>

        </div>
      `,
    },
  },
};
</script>

<style scoped>
.er-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;
}

/* ========================= */
/* Home */
/* ========================= */

.home-page {
  padding-top: 20px;
}

.home-header {
  margin-bottom: 24px;
}

.rule-card {
  border-radius: 16px;
}

.rule-text {
  font-size: 20px;
  line-height: 1.6;
}

/* ========================= */
/* Main buttons */
/* ========================= */

.main-buttons {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-btn {
  width: 100%;
  min-height: 130px;
  border-radius: 20px;
  font-size: 24px;
}

.main-btn :deep(.q-icon) {
  font-size: 42px;
}

.home-footer {
  margin-top: 30px;
  text-align: center;
}

/* ========================= */
/* Sub page */
/* ========================= */

.sub-page {
  padding-bottom: 30px;
}

.page-header {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-text {
  flex: 1;
}

/* ========================= */
/* Cards */
/* ========================= */

.section-card {
  margin-bottom: 16px;
  border-radius: 16px;
}

/* ========================= */
/* Choice */
/* ========================= */

.choice-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.choice-btn {
  min-height: 60px;
  font-size: 17px;
  border-radius: 12px;
}

/* ========================= */
/* Pain */
/* ========================= */

.pain-number {
  text-align: center;
  font-size: 56px;
  font-weight: bold;
  margin-top: 10px;
}

/* ========================= */
/* Action */
/* ========================= */

.action-btn {
  width: 100%;
  min-height: 70px;
  border-radius: 16px;
  font-size: 22px;
}

/* ========================= */
/* Warning */
/* ========================= */

.warning-banner {
  font-size: 17px;
  line-height: 1.5;
}
</style>
```
