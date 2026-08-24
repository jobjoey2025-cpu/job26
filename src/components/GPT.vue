<template>
  <q-page class="q-pa-md">
    <!-- Header -->

    <!-- <h6>臨時筆記</h6> -->
     <p style="text-align: center;"><b>臨時筆記</b></p>
    <div>
      <pre>

        只做分類、去除重複位置與整理層級，盡量保留你的原句，不改變原本意思。
        不要要求自己記住：應該讓系統顯示。
      *	針對以下句子 做簡要的分析 \ 小於 1000字 :
      *	將下列 筆記做成 quasar page 提高閱讀品質 :
      *	整理內容 比 coding 難 \ cuz ai 一直改我的順序
      *	coding issue is 頭痛還要 解 bug \ like 想睡還要 等 channel JP program
      *	做得好 才會 常用 \ 做到 常用 才是 KEY
      *	GPT 基本上會越問越好

      * 六個賺錢差 \ 5個苦 都是深入研究不是ez選擇，不適合 recent sys。
      </pre>
    </div>

    <hr>
    <br>
    <div class="row items-center q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">GPT 技巧架構</div>
        <div class="text-caption text-grey-7">
          Goal → Context → Task → Method → Output → Feedback
        </div>
      </div>

      <q-space />

      <q-btn flat round icon="refresh" @click="reset" />
    </div>

    <!-- Main Flow -->
    <div class="row q-col-gutter-md">
      <!-- Left : Flow -->
      <div class="col-12 col-md-8">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold">🧠 GPT 工作流程</div>
          </q-card-section>

          <q-separator />

          <q-list separator>
            <q-item
              v-for="(item, index) in layers"
              :key="item.id"
              clickable
              :active="selectedId === item.id"
              active-class="bg-blue-1"
              @click="selectLayer(item)"
            >
              <!-- Number -->
              <q-item-section avatar>
                <q-avatar
                  size="36px"
                  :color="selectedId === item.id ? 'primary' : 'grey-4'"
                  :text-color="selectedId === item.id ? 'white' : 'dark'"
                >
                  {{ index + 1 }}
                </q-avatar>
              </q-item-section>

              <!-- Content -->
              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ item.title }}
                </q-item-label>

                <q-item-label caption>
                  {{ item.subtitle }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-icon :name="item.icon" size="28px" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- Selected Layer -->
        <q-card v-if="selected" flat bordered class="q-mt-md">
          <q-card-section>
            <div class="row items-center">
              <q-icon :name="selected.icon" size="30px" class="q-mr-sm" />

              <div>
                <div class="text-h6">
                  {{ selected.title }}
                </div>

                <div class="text-caption text-grey-7">
                  {{ selected.subtitle }}
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-body1 q-mb-md">
              {{ selected.description }}
            </div>

            <div class="text-subtitle2 q-mb-sm">範例</div>

            <q-card flat class="bg-grey-2">
              <q-card-section>
                <pre class="example">{{ selected.example }}</pre>
              </q-card-section>
            </q-card>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right : Principle -->
      <div class="col-12 col-md-4">
        <q-card flat bordered>
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold">🎯 核心原則</div>
          </q-card-section>

          <q-separator />

          <q-list>
            <q-item v-for="rule in principles" :key="rule.title">
              <q-item-section avatar>
                <q-icon :name="rule.icon" color="primary" />
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-weight-bold">
                  {{ rule.title }}
                </q-item-label>

                <q-item-label caption>
                  {{ rule.text }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>

    <!-- GPT Skill System -->
    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="text-h6 text-weight-bold">GPT Skill System</div>

        <div class="text-caption text-grey-7">
          不只是問 GPT，而是建立工作系統
        </div>
      </q-card-section>

      <q-separator />

      <div class="row">
        <div
          v-for="system in skillSystems"
          :key="system.title"
          class="col-12 col-md-4 q-pa-md"
        >
          <q-card flat class="fit bg-grey-1">
            <q-card-section>
              <div class="row items-center q-mb-sm">
                <q-icon
                  :name="system.icon"
                  size="28px"
                  class="q-mr-sm"
                  color="primary"
                />

                <div class="text-h6">
                  {{ system.title }}
                </div>
              </div>

              <div class="text-caption text-grey-7 q-mb-md">
                {{ system.description }}
              </div>

              <q-chip
                v-for="item in system.items"
                :key="item"
                dense
                outline
                class="q-mr-xs q-mb-xs"
              >
                {{ item }}
              </q-chip>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-card>

    <!-- Core Concept -->
    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="text-h6 text-weight-bold">🚀 核心概念</div>

        <div class="text-h5 text-center q-pa-lg">不要只學「怎麼問 GPT」</div>

        <div class="text-center text-grey-7">
          建立 Goal → Context → Task → Method → Output → Feedback 的工作流
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const layers = [
  {
    id: "goal",
    title: "Goal",
    subtitle: "目標：我要去哪裡？",
    icon: "flag",
    description: "先定義真正想解決的問題，而不是直接要求 GPT 做某個動作。",
    example: `不要只說：
「幫我做一個 Quasar Page」

改成：
「我要降低專案的搜尋成本與決策成本」`,
  },

  {
    id: "context",
    title: "Context",
    subtitle: "情境：GPT 需要知道什麼？",
    icon: "dataset",
    description: "提供 GPT 所需要的專案背景、資料來源、技術環境與限制。",
    example: `目前專案：
Vue 3 + Quasar + Firebase

資料來源：
Firebase Realtime Database

限制：
不要重新建立另一份 Menu Database`,
  },

  {
    id: "task",
    title: "Task",
    subtitle: "任務：GPT 要做什麼？",
    icon: "task",
    description: "明確指定 GPT 的動作，避免「幫我整理一下」這種模糊指令。",
    example: `Task：

把 Route 本身轉成
Page Menu 的資料來源。`,
  },

  {
    id: "method",
    title: "Method",
    subtitle: "方法：GPT 要怎麼做？",
    icon: "account_tree",
    description: "指定處理順序與思考方法，讓 GPT 不要直接跳到答案。",
    example: `先不要寫 Code
→ 找資料結構
→ 找出重複
→ 提出最小修改
→ 最後產生 Code`,
  },

  {
    id: "output",
    title: "Output",
    subtitle: "輸出：最後要長什麼樣？",
    icon: "output",
    description: "指定輸出的格式，讓結果可以直接進入你的工作流程。",
    example: `Output：

Quasar Page
Q-Card
Q-List
Q-Item

可直接貼到專案。`,
  },

  {
    id: "feedback",
    title: "Feedback",
    subtitle: "迭代：做完之後怎麼繼續？",
    icon: "loop",
    description:
      "不要把 GPT 當成一次性問答，而是建立測試、修正、再測試的循環。",
    example: `需求
↓
GPT
↓
實作
↓
測試
↓
ISSUE
↓
GPT 分析
↓
修正
↓
再測試`,
  },
];

const principles = [
  {
    icon: "search",
    title: "降低搜尋成本",
    text: "讓資訊更容易找到。",
  },
  {
    icon: "psychology",
    title: "降低決策成本",
    text: "把選項與判斷結構化。",
  },
  {
    icon: "memory",
    title: "降低記憶成本",
    text: "把知識外部化。",
  },
  {
    icon: "dashboard",
    title: "降低操作成本",
    text: "讓 UI 與流程直接可使用。",
  },
];

const skillSystems = [
  {
    title: "Thinking",
    icon: "psychology",
    description: "思考與決策",
    items: ["分析", "分類", "比較", "找問題", "決策"],
  },

  {
    title: "Making",
    icon: "build",
    description: "實際製作",
    items: ["Code", "UI", "文件", "資料", "Prototype"],
  },

  {
    title: "Managing",
    icon: "account_tree",
    description: "專案與知識管理",
    items: ["Project", "Task", "Knowledge", "Rule", "Workflow"],
  },
];

const selectedId = ref("goal");

const selected = ref(layers[0]);

function selectLayer(item) {
  selectedId.value = item.id;
  selected.value = item;
}

function reset() {
  selectedId.value = "goal";
  selected.value = layers[0];
}
</script>

<style scoped>
.example {
  margin: 0;
  white-space: pre-wrap;
  font-family: monospace;
  font-size: 13px;
  line-height: 1.6;
}
</style>
