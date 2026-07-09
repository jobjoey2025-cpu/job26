<template>
  <q-page class="page-shell">
    <section class="masthead">
      <h1>用是非題跑完 Kano 問卷分析流程</h1>
      <p>
        先把 RFQ
        或產品需求拆成「有此功能是否加分」與「沒有此功能是否不滿」兩個判斷，
        再依 Kano 分類矩陣轉成魅力型、期望型、必備型、無差異或反向需求， 最後用
        QTable 彙整成可執行的產品優先順序。
      </p>
    </section>

    <section class="workflow-grid">
      <div class="panel timeline-box">
        <div class="panel-heading">
          <h2 class="panel-title">
            <q-icon name="account_tree" color="teal-8" />
            分析流程
          </h2>
          <q-badge outline color="teal-8">
            {{ answeredCount }} / {{ requirements.length }} 已判定
          </q-badge>
        </div>

        <div class="panel-body">
          <q-timeline color="teal-8" layout="comfortable">
            <q-timeline-entry
              v-for="step in timelineSteps"
              :key="step.title"
              :title="step.title"
              :subtitle="step.subtitle"
              :icon="step.icon"
              :color="step.color"
            >
              <div class="step-copy">
                {{ step.body }}
              </div>
            </q-timeline-entry>
          </q-timeline>
        </div>
      </div>

      <div class="panel">
        <div class="panel-heading">
          <h2 class="panel-title">
            <q-icon name="rule" color="teal-8" />
            是非題問卷
          </h2>

          <div class="action-bar">
            <q-btn
              color="teal-8"
              unelevated
              icon="done_all"
              label="範例填答"
              @click="applySample"
            />
            <q-btn
              outline
              color="grey-8"
              icon="restart_alt"
              label="清空"
              @click="resetAnswers"
            />
          </div>
        </div>

        <div class="panel-body">
          <div class="question-grid text-caption text-grey-8 q-mb-sm gt-md">
            <div>需求項目</div>
            <div>功能型問題</div>
            <div>反功能型問題</div>
            <div>分類</div>
          </div>

          <div class="q-gutter-y-sm">
            <div
              v-for="item in requirements"
              :key="item.id"
              class="question-grid question-row"
            >
              <div>
                <p class="requirement-name">
                  {{ item.name }}
                </p>
                <p class="requirement-desc">
                  {{ item.desc }}
                </p>
              </div>

              <div class="answer-cell">
                <div class="text-weight-medium q-mb-xs">
                  如果有這項功能，你會覺得加分嗎？
                </div>
                <q-btn-toggle
                  v-model="item.functional"
                  spread
                  unelevated
                  toggle-color="teal-8"
                  :options="yesNoOptions"
                />
              </div>

              <div class="answer-cell">
                <div class="text-weight-medium q-mb-xs">
                  如果沒有這項功能，你會覺得不滿嗎？
                </div>
                <q-btn-toggle
                  v-model="item.dysfunctional"
                  spread
                  unelevated
                  toggle-color="amber-8"
                  :options="yesNoOptions"
                />
              </div>

              <div>
                <q-chip
                  square
                  class="classification-chip"
                  :color="classificationFor(item).color"
                  text-color="white"
                  :icon="classificationFor(item).icon"
                >
                  {{ classificationFor(item).label }}
                </q-chip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="workflow-grid q-mt-lg">
      <div class="panel">
        <div class="panel-heading">
          <h2 class="panel-title">
            <q-icon name="grid_on" color="teal-8" />
            Kano 分類矩陣
          </h2>
        </div>

        <div class="panel-body matrix-note">
          <div class="legend-strip">
            <q-chip
              square
              color="purple-6"
              text-color="white"
              icon="auto_awesome"
            >
              魅力型
            </q-chip>
            <q-chip square color="blue-7" text-color="white" icon="trending_up">
              期望型
            </q-chip>
            <q-chip
              square
              color="orange-8"
              text-color="white"
              icon="priority_high"
            >
              必備型
            </q-chip>
            <q-chip
              square
              color="grey-7"
              text-color="white"
              icon="remove_circle_outline"
            >
              無差異
            </q-chip>
            <q-chip square color="red-7" text-color="white" icon="swap_vert">
              反向
            </q-chip>
          </div>

          <q-table
            flat
            bordered
            dense
            row-key="state"
            :rows="matrixRows"
            :columns="matrixColumns"
            hide-pagination
            :pagination="{ rowsPerPage: 0 }"
          >
            <template #body-cell-functionalYes="props">
              <q-td :props="props">
                <q-chip
                  square
                  dense
                  :color="props.value.color"
                  text-color="white"
                  :icon="props.value.icon"
                >
                  {{ props.value.label }}
                </q-chip>
              </q-td>
            </template>

            <template #body-cell-functionalNo="props">
              <q-td :props="props">
                <q-chip
                  square
                  dense
                  :color="props.value.color"
                  text-color="white"
                  :icon="props.value.icon"
                >
                  {{ props.value.label }}
                </q-chip>
              </q-td>
            </template>
          </q-table>

          <div>
            矩陣以二元判斷快速分類：加分且缺少會不滿為期望型；不加分但缺少會不滿為必備型；
            加分但缺少不不滿為魅力型；兩者皆否為無差異。若出現受訪者偏好「沒有功能」的訊號，
            建議再訪談確認是否屬於反向需求。
          </div>
        </div>
      </div>

      <div class="panel">
        <div class="panel-heading">
          <h2 class="panel-title">
            <q-icon name="table_chart" color="teal-8" />
            分類結果 QTable
          </h2>

          <q-input
            v-model="filter"
            dense
            outlined
            clearable
            debounce="200"
            placeholder="搜尋需求"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>

        <div class="panel-body">
          <div class="score-grid q-mb-md">
            <div
              v-for="score in summaryScores"
              :key="score.label"
              class="score-tile"
            >
              <q-icon :name="score.icon" :color="score.color" size="22px" />
              <div class="score-number">
                {{ score.count }}
              </div>
              <div class="score-label">
                {{ score.label }}
              </div>
            </div>
          </div>

          <q-table
            flat
            bordered
            row-key="id"
            :rows="resultRows"
            :columns="resultColumns"
            :filter="filter"
            :pagination="{ rowsPerPage: 5 }"
          >
            <template #body-cell-category="props">
              <q-td :props="props">
                <q-chip
                  square
                  dense
                  :color="props.row.category.color"
                  text-color="white"
                  :icon="props.row.category.icon"
                >
                  {{ props.row.category.label }}
                </q-chip>
              </q-td>
            </template>

            <template #body-cell-action="props">
              <q-td :props="props">
                <q-badge outline :color="props.row.category.color">
                  {{ actionFor(props.row.category.key) }}
                </q-badge>
              </q-td>
            </template>
          </q-table>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed, reactive, ref } from "vue";

const categories = {
  attractive: {
    key: "attractive",
    label: "魅力型",
    color: "purple-6",
    icon: "auto_awesome",
  },
  performance: {
    key: "performance",
    label: "期望型",
    color: "blue-7",
    icon: "trending_up",
  },
  must: {
    key: "must",
    label: "必備型",
    color: "orange-8",
    icon: "priority_high",
  },
  indifferent: {
    key: "indifferent",
    label: "無差異",
    color: "grey-7",
    icon: "remove_circle_outline",
  },
  reverse: {
    key: "reverse",
    label: "反向",
    color: "red-7",
    icon: "swap_vert",
  },
  pending: {
    key: "pending",
    label: "待判定",
    color: "blue-grey-5",
    icon: "help_outline",
  },
};

const requirements = reactive([
  {
    id: 1,
    name: "RFQ 文件自動解析",
    desc: "上傳客戶 RFQ 後，自動萃取需求條款、規格、交期與需回覆欄位。",
    functional: null,
    dysfunctional: null,
  },
  {
    id: 2,
    name: "報價風險提示",
    desc: "針對模糊規格、交期壓力、付款條件或缺件資訊給出風險提醒。",
    functional: null,
    dysfunctional: null,
  },
  {
    id: 3,
    name: "Kano 分類摘要",
    desc: "問卷完成後，自動產生每個需求的分類、優先級與產品建議。",
    functional: null,
    dysfunctional: null,
  },
  {
    id: 4,
    name: "匯出 Excel 報表",
    desc: "輸出原始填答、Kano 矩陣、統計摘要與 RFQ 評估結果。",
    functional: null,
    dysfunctional: null,
  },
  {
    id: 5,
    name: "即時通知協作",
    desc: "當業務、工程或採購完成評估時，通知負責人進行下一步確認。",
    functional: null,
    dysfunctional: null,
  },
]);

const filter = ref("");

const yesNoOptions = [
  { label: "是", value: true },
  { label: "否", value: false },
];

const answeredCount = computed(
  () =>
    requirements.filter(
      (item) => item.functional !== null && item.dysfunctional !== null
    ).length
);

const timelineSteps = computed(() => [
  {
    title: "1. 定義 RFQ 需求",
    subtitle: "把需求拆成可判定功能項",
    icon: "inventory_2",
    color: "teal-8",
    body: "每列只放一個功能或服務項目，避免同一道題同時問兩件事。",
  },
  {
    title: "2. 設計是非題題組",
    subtitle: "功能型 + 反功能型",
    icon: "fact_check",
    color: "blue-7",
    body: "功能型題目問「有沒有加分」，反功能型題目問「沒有會不會不滿」。",
  },
  {
    title: "3. 套用 Kano 矩陣",
    subtitle: `${answeredCount.value} 個需求已有完整答案`,
    icon: "grid_on",
    color: "orange-8",
    body: "用二元矩陣快速把需求轉成魅力型、期望型、必備型或無差異。",
  },
  {
    title: "4. 轉成 RFQ 行動",
    subtitle: "從分類轉成決策",
    icon: "low_priority",
    color: "purple-6",
    body: "必備型先補齊，期望型投入品質深度，魅力型安排差異化提案或實驗。",
  },
]);

const classify = (functional, dysfunctional) => {
  if (functional === null || dysfunctional === null) {
    return categories.pending;
  }

  if (functional === true && dysfunctional === true) {
    return categories.performance;
  }

  if (functional === true && dysfunctional === false) {
    return categories.attractive;
  }

  if (functional === false && dysfunctional === true) {
    return categories.must;
  }

  return categories.indifferent;
};

const classificationFor = (item) =>
  classify(item.functional, item.dysfunctional);

const matrixColumns = [
  {
    name: "state",
    label: "沒有此功能會不滿嗎？",
    field: "state",
    align: "left",
  },
  {
    name: "functionalYes",
    label: "有此功能會加分：是",
    field: "functionalYes",
    align: "left",
  },
  {
    name: "functionalNo",
    label: "有此功能會加分：否",
    field: "functionalNo",
    align: "left",
  },
];

const matrixRows = [
  {
    state: "是",
    functionalYes: categories.performance,
    functionalNo: categories.must,
  },
  {
    state: "否",
    functionalYes: categories.attractive,
    functionalNo: categories.indifferent,
  },
];

const resultColumns = [
  {
    name: "name",
    label: "需求",
    field: "name",
    align: "left",
    sortable: true,
  },
  {
    name: "functionalText",
    label: "有會加分",
    field: "functionalText",
    align: "center",
    sortable: true,
  },
  {
    name: "dysfunctionalText",
    label: "沒有會不滿",
    field: "dysfunctionalText",
    align: "center",
    sortable: true,
  },
  {
    name: "category",
    label: "Kano 分類",
    field: (row) => row.category.label,
    align: "left",
    sortable: true,
  },
  {
    name: "action",
    label: "建議行動",
    field: (row) => actionFor(row.category.key),
    align: "left",
  },
];

const resultRows = computed(() =>
  requirements.map((item) => ({
    ...item,
    functionalText:
      item.functional === null ? "未答" : item.functional ? "是" : "否",
    dysfunctionalText:
      item.dysfunctional === null ? "未答" : item.dysfunctional ? "是" : "否",
    category: classificationFor(item),
  }))
);

const summaryScores = computed(() => {
  const keys = ["must", "performance", "attractive", "indifferent", "pending"];

  return keys.map((key) => ({
    ...categories[key],
    count: resultRows.value.filter((row) => row.category.key === key).length,
  }));
});

const actionFor = (key) => {
  const actions = {
    must: "先補齊門檻",
    performance: "投入品質深度",
    attractive: "安排亮點實驗",
    indifferent: "降低開發權重",
    reverse: "重新訪談確認",
    pending: "等待完整填答",
  };

  return actions[key] || actions.pending;
};

const resetAnswers = () => {
  requirements.forEach((item) => {
    item.functional = null;
    item.dysfunctional = null;
  });
};

const applySample = () => {
  const sample = [
    [true, true],
    [false, true],
    [true, false],
    [false, true],
    [false, false],
  ];

  requirements.forEach((item, index) => {
    item.functional = sample[index][0];
    item.dysfunctional = sample[index][1];
  });
};
</script>

<style scoped>
.page-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
  color: #1d2530;
  background: #f6f8fb;
}

.masthead {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.masthead h1 {
  margin: 0;
  font-size: clamp(28px, 4vw, 48px);
  line-height: 1.08;
  letter-spacing: 0;
}

.masthead p {
  max-width: 860px;
  margin: 0;
  color: #607080;
  font-size: 16px;
  line-height: 1.65;
}

.workflow-grid {
  display: grid;
  grid-template-columns: minmax(320px, 0.92fr) minmax(480px, 1.55fr);
  gap: 18px;
  align-items: start;
}

.panel {
  border: 1px solid #d9e0e7;
  border-radius: 8px;
  background: white;
}

.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid #d9e0e7;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.panel-body {
  padding: 16px 18px 18px;
}

.timeline-box {
  position: sticky;
  top: 18px;
}

.step-copy {
  color: #607080;
  line-height: 1.6;
}

.question-grid {
  display: grid;
  grid-template-columns:
    minmax(240px, 1.1fr)
    minmax(260px, 1fr)
    minmax(240px, 1fr)
    minmax(150px, 0.55fr);
  gap: 12px;
  align-items: start;
}

.question-row {
  padding: 14px;
  border: 1px solid #d9e0e7;
  border-radius: 8px;
  background: #ffffff;
}

.requirement-name {
  margin: 0 0 6px;
  font-size: 16px;
  font-weight: 700;
}

.requirement-desc {
  margin: 0;
  color: #607080;
  line-height: 1.55;
}

.answer-cell {
  min-height: 78px;
}

.matrix-note {
  display: grid;
  gap: 8px;
  color: #607080;
  line-height: 1.55;
}

.legend-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.classification-chip {
  min-width: 92px;
  justify-content: center;
}

.score-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  gap: 10px;
}

.score-tile {
  border: 1px solid #d9e0e7;
  border-radius: 8px;
  padding: 12px;
  background: #ffffff;
}

.score-number {
  font-size: 28px;
  line-height: 1;
  font-weight: 800;
}

.score-label {
  margin-top: 6px;
  color: #607080;
  font-size: 13px;
}

.action-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

@media (max-width: 1120px) {
  .workflow-grid {
    grid-template-columns: 1fr;
  }

  .timeline-box {
    position: static;
  }

  .question-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .page-shell {
    padding: 14px;
  }

  .panel-heading {
    align-items: flex-start;
    flex-direction: column;
  }

  .score-grid {
    grid-template-columns: repeat(2, minmax(120px, 1fr));
  }
}
</style>


