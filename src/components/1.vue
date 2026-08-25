<template>
  <q-page class="q-pa-md page-shell">
    <main class="page-container">
      <header class="q-mb-lg">
        <div class="row items-start justify-between q-col-gutter-md">
          <div class="col-12 col-sm">
            <div class="text-overline text-primary text-weight-bold">
              Execution System
            </div>
            <h1 class="page-title q-my-xs">Recent System</h1>
            <p class="text-body2 text-grey-7 q-my-none">
              縮小範圍、縮小實驗、縮小差距，讓下一步清楚可執行。
            </p>
          </div>

          <div class="col-12 col-sm-auto row q-gutter-sm">
            <q-btn
              color="primary"
              unelevated
              icon="sticky_note_2"
              label="快速筆記"
              @click="dialogOpen = true"
            />
            <q-btn
              color="primary"
              outline
              icon-right="open_in_new"
              label="開啟 GDS"
              href="https://docs.google.com/spreadsheets/d/1bZ6SuThGhK8dr51nmCOE6hSAqwR_77cQm9xTqzoey4Q/edit?gid=0#gid=0"
              target="_blank"
              rel="noopener noreferrer"
            />
          </div>
        </div>
      </header>

      <!-- 頁面大綱 -->
      <q-card flat bordered class="outline-card q-mb-xl">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">頁面大綱</div>
          <q-list dense class="outline-list">
            <q-item
              v-for="item in outlineItems"
              :key="item.id"
              clickable
              :active="activeSection === item.id"
              active-class="outline-active"
              @click="scrollToSection(item.id)"
            >
              <q-item-section avatar>
                <q-icon
                  :name="item.icon"
                  :color="activeSection === item.id ? item.color : 'grey-6'"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  :class="{ 'text-weight-bold': activeSection === item.id }"
                >
                  {{ item.navTitle ?? item.title }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- time line -->

      <q-timeline color="primary" layout="comfortable">
        <section
          v-for="item in timelineSections"
          :id="item.id"
          :key="item.id"
          class="timeline-section"
          :data-section="item.id"
        >
          <q-timeline-entry
            :title="item.title"
            :subtitle="item.subtitle"
            :icon="item.icon"
            :color="item.color"
          >
            <!-- <p class="text-body1 q-mt-none">{{ item.summary }}</p> -->
            <div v-html="item.summary"></div>

            <q-list
              v-if="item.details.length"
              dense
              bordered
              separator
              class="rounded-list"
            >
              <q-item v-for="detail in item.details" :key="detail">
                <q-item-section avatar>
                  <q-icon name="arrow_right" :color="item.color" />
                </q-item-section>
                <q-item-section>{{ detail }}</q-item-section>
              </q-item>
            </q-list>

            <!-- <p>bb</p> -->

            <q-card v-if="item.id === 'test'" flat bordered class="q-mt-md">
              <q-card-section>
                <div class="text-subtitle2 text-weight-bold q-mb-sm">
                  行動判斷
                </div>
                <div class="row q-col-gutter-md">
                  <div
                    v-for="action in testActions"
                    :key="action.title"
                    class="col-12 col-sm-6"
                  >
                    <div class="text-weight-bold">{{ action.title }}</div>
                    <!-- <div class="text-body2 text-grey-7">
                      {{ action.description }}
                    </div> -->
                    <div
                      class="text-body2 text-grey-7"
                      v-html="action.description"
                    ></div>
                  </div>
                </div>
              </q-card-section>
            </q-card>

            <!-- <p>aa</p> -->
            <template v-if="item.id === 'test'">
              <p>pre 預先格式化元素 for CICD speed</p>
              <!-- joey modify --- -->
              <div>
                <pre>
  <b>⏱ 10mins Test，不先判斷自己。</b>
  * Shift + Tab 鍵 (可向左縮排。)
  先做 10 分鐘， 用實際執行結果判斷自己現在的狀態。
  觀察當下實際能力狀況 (6個 level)
  確認 Fn → Project → Task → List 是否能具體 描述能見度
  做 10 分鐘 體驗後重新判斷 \ 現場訊息密度比數位高
              </pre>
              </div>

              <div>
                <pre>
  <b>⚔ 快刀亂麻 - just do it 突破。</b>
  * Shift + Tab 鍵 (可向左縮排。)
  一定要親自做的類型 (不用浪費精力逃避) :
1. 太難的 - 別人不會做 \ 溝通也要時間 \ 除非 他有套板
2. 太重要的 - 別人不好幫你決定的 \ 財務 賭博 \ 社會潛規則 不好說
3. 緊急的 - 臨時找不到可靠的人

事情太多時，不是熬夜，而是砍掉一些事情。
必做太多 - 必須忍痛刪掉一些事情， 否則只能犧牲睡眠， 長期對健康危險。
真的推不動 - TD6 放鬆 加速轉念一下， 但不要花太久。
AI 幫忙排序 - GPT 分析慾望， 排出 Top 5。只做分類、去除重複位置與整理層級，盡量保留你的原句。
104 Quasar 後 - 事情會開始變複雜， 收納等問題累積幾十年， 要提前處理。
BLG - 一寫就是四小時， 104 前要減少 TD6。

不分析太久，快速完成最低限度行動。邊做邊檢查還缺甚麼 \
批次處理時期 just do it 消耗項目就很好
* 水／廁所 : 5mins 可到 \ 人不多 有位置
* 平躺／休息 : 空調 冷熱泉 基地 車宿 濕毛巾 暖暖包
* 現金／基本生活確認 : 711 超市 百貨 餐廳
* 必要時收兵 : 身體不好 \ <b>一直出錯 不順</b> \ 忘東忘西 \ Bugs 2個 ⇧
* Allow Lose：允許今天沒有完成 \ 難過的事情 如果不能變好，就加速他的速度 減少存在感。
              </pre>
              </div>
            </template>

            <!-- 讓下一步看得見 -->
            <template v-if="item.id === 'visibility'">
              <q-list separator>
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="battery_charging_full" />
                  </q-item-section>
                  <q-item-section> Energy Level 當下 (6 Level)</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="list_alt" />
                  </q-item-section>
                  <q-item-section>
                    Fn Prj Task List (具體程度 must Table List)</q-item-section
                  >
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="storage" />
                  </q-item-section>
                  <q-item-section> PARA 有想到的 db（img map） </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="phone_iphone" />
                  </q-item-section>
                  <q-item-section>
                    📱 Mobile Vue（list） 有時間 Quasar ?</q-item-section
                  >
                </q-item>
              </q-list>
            </template>

            <template v-if="item.id === 'visibility'">
              <q-card flat bordered class="q-mt-md">
                <q-card-section>
                  <div class="text-subtitle2 text-weight-bold q-mb-sm">
                    Energy Level（6 Levels）
                  </div>
                  <q-list separator>
                    <q-item v-for="level in energyLevels" :key="level.level">
                      <q-item-section avatar>
                        <q-avatar
                          :color="level.color"
                          text-color="white"
                          size="32px"
                        >
                          {{ level.level }}
                        </q-avatar>
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ level.title }}</q-item-label>
                        <q-item-label caption>{{
                          level.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
              <q-card flat bordered class="q-mt-md">
                <q-card-section>
                  <div class="text-subtitle2 text-weight-bold q-mb-sm">
                    行動層級可視化
                  </div>
                  <q-list separator>
                    <q-item
                      v-for="visibilityItem in visibilityItems"
                      :key="visibilityItem.title"
                      tag="label"
                    >
                      <q-item-section avatar>
                        <q-checkbox v-model="visibilityItem.done" />
                      </q-item-section>
                      <q-item-section>
                        <q-item-label>{{ visibilityItem.title }}</q-item-label>
                        <q-item-label caption>{{
                          visibilityItem.description
                        }}</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </template>

            <!-- 留白：停止只見樹不見林 -->
            <q-banner
              v-if="item.id === 'space'"
              rounded
              class="bg-grey-9 text-white q-mt-md"
            >
              <template #avatar>
                <q-icon name="self_improvement" />
              </template>
              留白不是浪費。它讓系統重新顯示全貌，避免只處理眼前噪音。
            </q-banner>
          </q-timeline-entry>
        </section>
      </q-timeline>
      <!-- 現場快速檢查 -->
      <section
        id="checklist"
        class="timeline-section checklist-section q-mt-xl"
        data-section="checklist"
      >
        <div class="row items-center justify-between q-col-gutter-md q-mb-md">
          <div class="col">
            <div class="text-overline text-primary text-weight-bold">
              One Page Check
            </div>
            <h2 class="section-title q-my-xs">現場快速檢查</h2>
            <p class="text-body2 text-grey-7 q-my-none">
              用一頁維持現況、工作、學習與 ROI 的可見度。
            </p>
          </div>
          <div class="col-auto">
            <q-btn
              flat
              round
              icon="refresh"
              aria-label="重設全部檢查項目"
              @click="resetAll"
            >
              <q-tooltip>重設全部</q-tooltip>
            </q-btn>
          </div>
        </div>

        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <div class="row items-center justify-between">
              <div>
                <div class="text-subtitle1 text-weight-bold">
                  Check Progress
                </div>
                <div class="text-caption text-grey-7">
                  {{ completedCount }} / {{ totalCount }} completed
                </div>
              </div>
              <div class="text-h6">{{ progress }}%</div>
            </div>
            <q-linear-progress
              :value="progress / 100"
              color="positive"
              track-color="grey-3"
              rounded
              size="10px"
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-md">
          <div
            v-for="section in checklistSections"
            :key="section.id"
            class="col-12 col-sm-6 col-md-4"
          >
            <q-card
              flat
              bordered
              class="check-card full-height"
              :class="{ 'check-card-done': isSectionComplete(section) }"
            >
              <q-card-section class="row items-center no-wrap">
                <q-avatar
                  size="40px"
                  class="q-mr-sm"
                  :color="section.color"
                  text-color="white"
                >
                  <q-icon :name="section.icon" />
                </q-avatar>
                <div class="col">
                  <div class="text-subtitle1 text-weight-bold">
                    {{ section.title }}
                  </div>
                  <div class="text-caption text-grey-7">
                    {{ sectionCompleted(section) }} / {{ section.items.length }}
                  </div>
                </div>
                <q-icon
                  v-if="isSectionComplete(section)"
                  name="check_circle"
                  color="positive"
                  size="24px"
                />
              </q-card-section>

              <q-separator />

              <q-list separator>
                <q-item
                  v-for="checkItem in section.items"
                  :key="checkItem.id"
                  clickable
                  @click="checkItem.checked = !checkItem.checked"
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="checkItem.checked" @click.stop />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label
                      :class="{ 'text-strike text-grey-6': checkItem.checked }"
                    >
                      {{ checkItem.text }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>
        </div>
      </section>
    </main>

    <q-dialog v-model="dialogOpen">
      <q-card class="note-dialog">
        <q-card-section class="row items-center">
          <div class="text-h6">快速筆記</div>
          <q-space />
          <q-btn
            v-close-popup
            flat
            round
            dense
            icon="close"
            aria-label="關閉"
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="q-pt-md">
          <q-list bordered separator class="rounded-list">
            <q-item v-for="note in quickNotes" :key="note">
              <q-item-section avatar>
                <q-icon name="check_circle_outline" color="primary" />
              </q-item-section>
              <q-item-section>{{ note }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn v-close-popup flat color="primary" label="完成" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";

const dialogOpen = ref(false);
const activeSection = ref("problem");

const timelineSections = [
  {
    id: "problem",
    navTitle: "先確認問題 \ room db NG",
    title: "先判斷真正的問題",
    subtitle: "Problem",
    icon: "priority_high",
    color: "negative",
    // ，避免直接把工具或 AI 當成答案
    summary:
      "卡住時先確認現在要解決的是什麼。 <br>* 思緒跑到 JPT，正要做 Su-Ao Project 沒動力， 更不要說 Room DB。<br>* 不要先判斷自己，先試著問 GPT。",
    details: [
      "描述目前狀態與預期結果。",
      "列出已知限制，區分事實、推測與情緒。",
      "把問題縮小成下一個可以驗證的假設。",
    ],
  },
  {
    id: "test",
    navTitle: "10 分鐘測試 或快刀",
    title: "10 分鐘測試，或快刀斬亂麻",
    subtitle: "Action",
    icon: "flash_on",
    color: "orange",
    summary:
      "先用低成本測試取得資訊；若事情已經足夠明確，就直接完成最小可交付結果。",
    details: [
      "測試前先寫下要驗證的問題。",
      "設定 10 分鐘上限，時間到就整理結果。",
      "不能增加決策資訊的工作，指引用db，要計算判斷的停止或延後。",
    ],
  },
  {
    id: "visibility",
    navTitle: "讓行動可見 - List",
    title: "讓下一步看得見",
    subtitle: "Visibility",
    icon: "visibility",
    color: "primary",
    summary:
      "把 Function、Project、Task 與 List 分層呈現，並依目前能量選擇合適工作。",
    details: [],
  },
  {
    id: "space",
    navTitle: "保留空白",
    title: "留白：停止只見樹不見林",
    subtitle: "Reset",
    icon: "space_bar",
    color: "grey-7",
    summary: "留出沒有輸入與任務的時間，重新檢查方向、限制與優先順序。",
    details: ["先處理睡眠、飲食、移動與環境。", "清掉不再服務目前目標的項目。"],
  },
  {
    id: "energy",
    navTitle: "管理能量",
    title: "🔋 意志力消耗管理",
    subtitle: "Energy",
    icon: "battery_alert",
    color: "amber-8",
    summary:
      "先看能量，再看任務；把最佳狀態保留給高價值、高不確定性的工作。<br>* 不要用高能量處理低價值問題",
    details: [
      "低能量時以恢復與維持為主。",
      "高能量時處理判斷、創作與長期價值。",
    ],
  },
  {
    id: "decision",
    navTitle: "設定否決條件(風險 超控)",
    title: "最後加入否決條件",
    subtitle: "Decision",
    icon: "gavel",
    color: "deep-orange",
    summary: "好選項不只要有優點，也要通過底線檢查；任一重大風險成立就停止。",
    details: [
      "是否傷害健康或基本生活？",
      "維護成本是否高於長期收益？",
      "是否擠壓更重要且不可逆的選擇？",
    ],
  },
  {
    id: "system",
    navTitle: "人腦記憶(印象 補腦)",
    title: "把記憶放進可回看的系統",
    subtitle: "System",
    icon: "memory",
    color: "deep-purple",
    summary: "系統負責保存脈絡、連結與決策理由，人只需要專注在目前這一步。",
    details: [
      "所有入口集中到一個索引。",
      "每個專案保留狀態、下一步與最近決策。",
      "定期整理，不要求一次完成。",
    ],
  },
];

const outlineItems = computed(() => [
  ...timelineSections,
  {
    id: "checklist",
    title: "現場快速檢查",
    icon: "checklist",
    color: "positive",
  },
]);

const testActions = [
  {
    title: "⏱先做10分鐘測試",
    description: "適合資訊不足、需要先看結果再決定的情況。",
  },
  {
    title: "⚔ 快刀亂麻，直接完成",
    description:
      "適合風險低、方向清楚，而且拖延成本較高的情況。just do it 突破 <br>* 水／廁所：5mins 可到 \ 人不多、有位置 \ 就 GO。 ",
  },
];

const visibilityItems = ref([
  {
    title: "Function",
    description: "長期負責的功能或責任範圍，用來判斷投入的理由。",
    done: false,
  },
  {
    title: "Project",
    description: "有清楚完成條件的階段性成果。",
    done: false,
  },
  {
    title: "Task",
    description: "下一個可以直接執行、最好能在單次工作時段完成的動作。",
    done: false,
  },
  {
    title: "List",
    description: "提醒、參考與待分類項目；不讓它們混入當下的下一步。",
    done: false,
  },
]);

const energyLevels = [
  {
    level: 1,
    title: "生存",
    description: "安全、補水、進食、睡眠與基本移動。",
    color: "red-8",
  },
  {
    level: 2,
    title: "恢復",
    description: "休息、散步、低刺激活動與環境整理。",
    color: "orange-8",
  },
  {
    level: 3,
    title: "緊急",
    description: "處理有時限、會快速擴大的必要事項。",
    color: "amber-8",
  },
  {
    level: 4,
    title: "學習",
    description: "練習技能、整理 SOP 與吸收關鍵知識。",
    color: "light-green-8",
  },
  {
    level: 5,
    title: "興趣",
    description: "影像、創作、遊戲或其他能補充動力的活動。",
    color: "teal-7",
  },
  {
    level: 6,
    title: "創造價值",
    description: "高判斷、高創造、可累積長期成果的工作。",
    color: "deep-purple-7",
  },
];

const checklistSections = ref([
  {
    id: "cognition",
    title: "認知",
    icon: "psychology",
    color: "deep-purple",
    items: [
      { id: "c1", text: "目前範圍是否已經超過一頁？", checked: false },
      { id: "c2", text: "GDS 是否維持 One Page View？", checked: false },
      { id: "c3", text: "卡住是能力不足，還是資訊過載？", checked: false },
    ],
  },
  {
    id: "field",
    title: "現場",
    icon: "location_on",
    color: "blue",
    items: [
      {
        id: "f1",
        text: "這件事是否必須親自、現場或立即處理？",
        checked: false,
      },
      { id: "f2", text: "是否已定義觸發條件與一小時檢查點？", checked: false },
    ],
  },
  {
    id: "tools",
    title: "工具",
    icon: "build",
    color: "orange",
    items: [
      { id: "t1", text: "TD6 是否只顯示目前需要的資訊？", checked: false },
      { id: "t2", text: "GDS 是否維持單一入口與一頁視圖？", checked: false },
      { id: "t3", text: "AI 的時間與 Token 成本是否值得？", checked: false },
    ],
  },
  {
    id: "learning",
    title: "學習",
    icon: "school",
    color: "green",
    items: [
      { id: "l1", text: "這次結果能否整理成可重複的 SOP？", checked: false },
      { id: "l2", text: "是否已留下決策理由與下次入口？", checked: false },
      { id: "l3", text: "資訊密度是否足以支持下一個判斷？", checked: false },
    ],
  },
  {
    id: "roi",
    title: "ROI",
    icon: "payments",
    color: "red",
    items: [
      { id: "r1", text: "三個月後，這件事仍會產生價值嗎？", checked: false },
      { id: "r2", text: "維護成本是否低於預期收益？", checked: false },
      { id: "r3", text: "是否能先做更小、可逆的實驗？", checked: false },
      {
        id: "r4",
        text: "成果與素材是否已保存到可搜尋的位置？",
        checked: false,
      },
    ],
  },
]);

const quickNotes = [
  "先寫下目前狀態、目標與限制，再決定要不要使用工具。",
  "需要更多資訊時，設定 10 分鐘或一小時的檢查點。",
  "所有專案保留一個入口、一個下一步與一個完成條件。",
  "先完成可逆的小步驟，再處理昂貴或不可逆的決策。",
];

const totalCount = computed(() =>
  checklistSections.value.reduce(
    (total, section) => total + section.items.length,
    0
  )
);

const completedCount = computed(() =>
  checklistSections.value.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.checked).length,
    0
  )
);

const progress = computed(() =>
  totalCount.value === 0
    ? 0
    : Math.round((completedCount.value / totalCount.value) * 100)
);

let observer;

function sectionCompleted(section) {
  return section.items.filter((item) => item.checked).length;
}

function isSectionComplete(section) {
  return (
    section.items.length > 0 &&
    sectionCompleted(section) === section.items.length
  );
}

function resetAll() {
  checklistSections.value.forEach((section) => {
    section.items.forEach((item) => {
      item.checked = false;
    });
  });

  visibilityItems.value.forEach((item) => {
    item.done = false;
  });
}

function scrollToSection(id) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  activeSection.value = id;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

onMounted(async () => {
  await nextTick();

  if (!("IntersectionObserver" in window)) {
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (first, second) =>
            Math.abs(first.boundingClientRect.top) -
            Math.abs(second.boundingClientRect.top)
        );

      const currentSection = visibleSections[0]?.target.dataset.section;

      if (currentSection) {
        activeSection.value = currentSection;
      }
    },
    {
      rootMargin: "-100px 0px -55% 0px",
      threshold: [0, 0.1, 0.5],
    }
  );

  document.querySelectorAll(".timeline-section").forEach((element) => {
    observer.observe(element);
  });
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.page-shell {
  background: radial-gradient(
      circle at top right,
      rgba(25, 118, 210, 0.08),
      transparent 34rem
    ),
    #fafafa;
}

.page-container {
  width: min(100%, 960px);
  margin: 0 auto;
}

.page-title,
.section-title {
  font-weight: 700;
  line-height: 1.2;
}

.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
}

.outline-card,
.rounded-list,
.check-card,
.note-dialog {
  border-radius: 14px;
}

.outline-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
}

.outline-active {
  color: var(--q-primary);
  background: rgba(25, 118, 210, 0.08);
  border-left: 3px solid var(--q-primary);
}

.timeline-section,
.checklist-section {
  scroll-margin-top: 24px;
}

.text-body1 {
  line-height: 1.7;
}

.check-card {
  overflow: hidden;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.check-card-done {
  border-color: var(--q-positive);
  box-shadow: 0 0 0 1px var(--q-positive);
}

.note-dialog {
  width: min(92vw, 620px);
}

@media (max-width: 599px) {
  .outline-list {
    grid-template-columns: 1fr;
  }
}
</style>
