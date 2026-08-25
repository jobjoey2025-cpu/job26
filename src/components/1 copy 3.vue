<template>
  <q-page class="q-pa-md">
    <div class="page-container">
      <!-- Header -->
      <!-- <div class="text-h5 text-weight-bold q-mb-xs">Execution System</div> -->
      <div class="col">
        <div class="text-h5 text-weight-bold">
          Recent System --
          <q-btn color="primary" label="臨時筆記" @click="dialog0 = true" />
          --
          <!-- <q-btn color="primary" label="GDS 手冊" /> -->

          <a
            href="https://docs.google.com/spreadsheets/d/1bZ6SuThGhK8dr51nmCOE6hSAqwR_77cQm9xTqzoey4Q/edit?gid=0#gid=0"
            target="_blank"
            rel="noopener noreferrer"
            ><q-btn color="primary" label="GDS 手冊"
          /></a>
        </div>
        <div class="text-caption text-grey-7">縮小範圍，縮小虛實之間的差距</div>
      </div>

      <div class="text-caption text-grey-7 q-mb-md">
        問題發現 → 執行 → 能見度 → 留白 → 意志力 → 否決 → 系統
      </div>

      <!-- Outline -->
      <q-card flat bordered class="q-mb-xl outline-card">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">📑 目錄大綱</div>

          <q-list dense>
            <!-- joey -->
            <q-item
              v-for="item in sections"
              :key="item.id"
              clickable
              :class="{
                'outline-active': activeSection === item.id,
              }"
              @click="scrollToSection(item.id)"
            >
              <q-item-section avatar>
                <q-icon
                  :name="item.icon"
                  :color="activeSection === item.id ? item.color : 'grey-6'"
                />
              </q-item-section>

              <q-item-section>
                <span
                  :class="{
                    'text-weight-bold': activeSection === item.id,
                  }"
                >
                  {{ item.title }}
                </span>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <!-- --------- -->
      <!-- --------- -->
      <!-- Timeline -->
      <q-timeline color="primary">
        <!-- 1 -->
        <section id="problem" class="timeline-section" data-section="problem">
          <!-- ref="sectionRefs" -->

          <!-- <q-timeline-entry heading icon="priority_high" color="negative"> -->
          <q-timeline-entry class="joey" icon="priority_high" color="negative">
            🟥 發現問題
          </q-timeline-entry>

          <q-timeline-entry
            title="先不要判斷自己"
            subtitle="Problem"
            icon="psychology"
            color="negative"
          >
            <div class="text-body1">
              思緒跑到 JPT，正要做 Su-Ao Project 沒動力， 更不要說 Room DB。
            </div>

            <q-separator class="q-my-md" />

            <div class="text-body1">不要先判斷自己，先試著問 GPT。</div>
          </q-timeline-entry>
        </section>

        <!-- 2 -->
        <section
          id="test"
          class="timeline-section"
          ref="sectionRefs"
          data-section="test"
        >
          <q-timeline-entry class="joey" icon="flash_on" color="orange">
            🔪 執行：<b>10mins Test</b> or <b>快刀亂麻</b>
          </q-timeline-entry>

          <q-timeline-entry
            title="先做 10 分鐘"
            subtitle="Action"
            icon="timer"
            color="orange"
          >
            <!-- <div class="text-body1">10mins Test 還是快刀亂麻？</div> -->
            <div class="joey">⏱ 10mins Test，不先判斷自己。</div>

            <!-- joey modify --- -->
            <div>
              <pre>
  * Shift + Tab 鍵 (可向左縮排。)
  先做 10 分鐘， 用實際執行結果判斷自己現在的狀態。
  觀察當下實際能力狀況 (6個 level)
  確認 Fn → Project → Task → List 是否能具體 描述能見度
  做 10 分鐘 體驗後重新判斷 \ 現場訊息密度比數位高
              </pre>
            </div>

            <q-separator class="q-my-md" />
            <!-- <hr> -->

            <div class="joey">⚔ 快刀亂麻 - just do it 突破</div>

            <!-- joey modify --- -->
            <div>
              <pre>
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

            <div class="text-body1">
              水／廁所：5mins 可到 \ 人不多、有位置 \ 就 GO。
            </div>
          </q-timeline-entry>
        </section>

        <!-- 3 -->
        <section
          id="visibility"
          class="timeline-section"
          ref="sectionRefs"
          data-section="visibility"
        >
          <q-timeline-entry class="joey" icon="visibility" color="primary">
            👁 執行層級能見度
          </q-timeline-entry>

          <q-timeline-entry
            title="讓下一步看得見"
            subtitle="Visibility"
            icon="visibility"
            color="primary"
          >
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
          </q-timeline-entry>
        </section>

        <!-- ------- -->

        <q-list bordered separator>
          <div style="text-align: center">
            <b>Energy Level 當下的能力狀況</b>
          </div>
          <q-item>
            <q-item-section avatar>1️⃣</q-item-section>
            <q-item-section>
              <strong>求生模式</strong>

              <div class="text-grey">最差狀況、生病住院，只專心活下去。</div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>2️⃣</q-item-section>

            <q-item-section>
              <strong>恢復模式</strong>

              <div class="text-grey">Relax、TV、TD6、睡眠、等待恢復。</div>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>3️⃣</q-item-section>

            <q-item-section>
              <strong>緊急處理</strong>

              Team Work、 財產、 旅行、 104 工作。
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>xx4️⃣</q-item-section>

            <q-item-section>
              <strong>學習模式</strong>

              104 工作、 飛行保養廠、 高強度學習。
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>*5️⃣</q-item-section>

            <q-item-section>
              <strong>Hobby</strong>

              Pic、 Video、 球賽、 Hobby、 等待 Hobby Money。
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>*6️⃣</q-item-section>

            <q-item-section>
              <strong>創造價值</strong>

              賺錢、 開發、 認知提升、 Watch、 3DP、 Easy Go Life。
            </q-item-section>
          </q-item>
        </q-list>
        <br />
        <!-- 執行能見度 -->
        <q-card flat bordered class="q-mb-md">
          <q-card-section>
            <!-- <div class="text-h6">👁 3. 執行層級能見度</div> -->
            <div style="text-align: center"><b>行動 具體 能見度</b></div>
            <div class="text-caption text-grey-7 q-mb-md">
              當下不是「能力不夠」，可能只是下一層沒有被看見。
            </div>

            <q-list bordered separator>
              <q-item
                v-for="(item, index) in visibilityItems"
                :key="index"
                tag="label"
              >
                <q-item-section avatar>
                  <q-checkbox v-model="item.done" />
                </q-item-section>

                <q-item-section>
                  <q-item-label>
                    {{ item.title }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ item.description }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <!-- ------- -->

        <!-- 4 -->
        <section
          id="space"
          class="timeline-section"
          ref="sectionRefs"
          data-section="space"
        >
          <q-timeline-entry class="joey" icon="space_bar" color="grey-7">
            留白／重新取得視野
          </q-timeline-entry>

          <q-timeline-entry
            title="留白 - 防止見樹不建林"
            subtitle="Reset"
            icon="visibility"
            color="grey-7"
          >
            <!-- title="留白" -->
            <!-- <div class="text-body1">留白是系統重新取得視野的時間。</div> -->
          </q-timeline-entry>

          <!-- 留白 -->
          <q-card flat bordered class="q-mb-md bg-grey-9 text-white">
            <q-card-section>
              <div class="text-h6">⬜ 留白</div>

              <div class="text-h5 q-mt-md">留白不是浪費時間。</div>

              <div class="text-body1 q-mt-sm">
                留白是系統重新取得視野的時間。
              </div>
            </q-card-section>
          </q-card>
        </section>

        <!-- 5 -->
        <section
          id="energy"
          class="timeline-section"
          ref="sectionRefs"
          data-section="energy"
        >
          <q-timeline-entry class="joey" icon="battery_alert" color="amber-8">
            🔋 意志力消耗管理
          </q-timeline-entry>

          <q-timeline-entry
            title="不要用興趣判斷工作的價值"
            subtitle="Energy"
            icon="battery_alert"
            color="amber-8"
          >
            <div class="text-body1">
              不要用興趣判斷工作的價值（醫院宅 \ ROI）。
            </div>

            <q-separator class="q-my-md" />

            <div class="text-body1">增加時間尺度。</div>
          </q-timeline-entry>
        </section>

        <!-- 6 -->
        <section
          id="decision"
          class="timeline-section"
          ref="sectionRefs"
          data-section="decision"
        >
          <q-timeline-entry class="joey" icon="block" color="deep-orange">
            否決條件／決策
          </q-timeline-entry>

          <q-timeline-entry
            title="最後加一道否決條件"
            subtitle="Decision"
            icon="gavel"
            color="deep-orange"
          >
            <div class="text-body1">
              最後加一道「否決條件」， 有些事情不是平均分數可以解決的。
            </div>

            <!-- joey modify --- -->
            <div>
              <pre>
  * Shift + Tab 鍵 (可向左縮排。)
  * 記錄我在哪裡找到遺失？然後規範這個入口。
  * issue 規劃沒完 不敢睡
  * 事情太多 捨不得放棄
  * 塞車 沒車位 沒辦法平躺
  * 頭痛就要停，maybe 脹氣的影響
              </pre>
            </div>
          </q-timeline-entry>
        </section>

        <!-- 7 -->
        <section
          id="system"
          class="timeline-section"
          ref="sectionRefs"
          data-section="system"
        >
          <q-timeline-entry class="joey" icon="memory" color="deep-purple">
            🧠 記憶／GPT／系統
          </q-timeline-entry>

          <q-timeline-entry
            title="記憶仍然是重要技能"
            subtitle="System"
            icon="memory"
            color="deep-purple"
          >
            <div class="text-body1">
              🧠 記憶仍然是重要技能 \ 比 GPT 快 & 30y link maybe。
            </div>

            <q-separator class="q-my-md" />

            <div class="text-body1">
              sys 最好能解決人腦的疑問， 不然快刀亂麻損失會比較多。
            </div>
          </q-timeline-entry>
        </section>
      </q-timeline>
    </div>
    <!-- 8 -->

    <section
      id="checklist"
      class="timeline-section"
      ref="sectionRefs"
      data-section="system"
    >
      <!-- Header -->
      <h6 id="現場 核取方塊">現場 核取方塊</h6>
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h5 text-weight-bold">
            One Page、快速掃描、30 秒完成檢查
          </div>
          <div class="text-caption text-grey-7">
            避免資訊 Overload，維持現場、工具、學習與 ROI 的有效性
          </div>
        </div>

        <q-btn flat round icon="refresh" @click="resetAll">
          <q-tooltip>重新檢查</q-tooltip>
        </q-btn>
      </div>
      <!-- Progress -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row items-center justify-between">
            <div>
              <div class="text-subtitle1 text-weight-bold">Check Progress</div>
              <div class="text-caption text-grey-7">
                {{ completedCount }} / {{ totalCount }} completed
              </div>
            </div>

            <div class="text-h6">{{ progress }}%</div>
          </div>

          <q-linear-progress
            :value="progress / 100"
            rounded
            size="10px"
            class="q-mt-sm"
          />
        </q-card-section>
      </q-card>

      <!-- Checklist -->
      <div class="row q-col-gutter-md">
        <div
          v-for="section in sections"
          :key="section.id"
          class="col-12 col-sm-6 col-md-4"
        >
          <q-card
            flat
            bordered
            class="check-card"
            :class="{
              'check-card-done': isSectionComplete(section),
            }"
          >
            <!-- Section Header -->
            <q-card-section class="row items-center">
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
                  {{ sectionCompleted(section) }} /
                  {{ section.items.length }}
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

            <!-- Items -->
            <q-card-section class="q-pa-sm">
              <q-list separator>
                <q-item
                  v-for="item in section.items"
                  :key="item.id"
                  clickable
                  @click="item.checked = !item.checked"
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="item.checked" @click.stop />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      :class="{
                        'text-strike text-grey-6': item.checked,
                      }"
                    >
                      {{ item.text }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </q-page>
  <!-- Dialog0-->
  <q-dialog v-model="dialog0">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">臨時筆記 不能太多</div>
      </q-card-section>

      <q-card-section>
        <!-- joey modify --- -->
        <div>
          <pre>
  Shift + Tab 鍵 (可向左縮排。)
  * 記錄我在哪裡找到遺失？然後規範這個入口。
    pic 只能隨便拍，沒有多於力去整理才是key，快刀斬亂麻 just do it
    拍了也沒辦法 仔細檢查 \ need 更短的 判斷 → 1hr 前 check list
    todo list in Firedb then quasar 閱讀品質會更好 (短時間可以實現吸收)

  * 縮 and 作目錄 link \ 精簡 提高密度
  * 只做分類、去除重複位置與整理層級，盡量保留你的原句，不改變原本意思。
  * 出發後就不開NB，Max is iPad。原則啟動前24hrs 就 ☏多休息☏ Focus One \
  不再 開發其他 Prj \ modify 就 GDS - 隨手寫 no VSC
  * 終於想到 洗車廠 也可以 洗水槽 \ 不需要載回宜蘭院子


記錄我在哪裡找到遺失？然後規範這個入口。
      忘了再做一次 \ 直到 快刀斬亂麻 dash 很好用
      pic 只能隨便拍，沒有多於力去整理才是key，need 快刀斬亂麻 just do it
      拍了也沒辦法 仔細檢查 \ need 更好的內容品質 for 更短判斷 →
  1hr 前 check list \\\
  作目錄 Link \ 精簡 提高密度 \\\
  熟悉熟練的區域 限制裡 \\\ google GPT
  即使累，也知道從哪裡開始找 \\\ 1Btn 剪髮日
  是 UI 要顯示 \\\ ?? 顯示的 Rule ?
  封存設計 \\\ 怎麼找 ? key words \ 標籤 ?
  Firedb then Quasar \\\ todo list in Firedb then quasar 閱讀品質會更好 (短時間可以實現吸收)
        </pre
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="關閉" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

// ---目錄
// joey
const sections = [
  {
    id: "problem",
    title: "🟥 發現問題",
    icon: "priority_high",
    color: "negative",
  },
  {
    id: "test",
    title: "🔪 10mins Test／快刀亂麻",
    icon: "flash_on",
    color: "orange",
  },
  {
    id: "visibility",
    title: "👁 執行層級能見度",
    icon: "visibility",
    color: "primary",
  },
  {
    id: "space",
    title: "留白／重新取得視野",
    icon: "space_bar",
    color: "grey-7",
  },
  {
    id: "energy",
    title: "🔋 意志力消耗管理",
    icon: "battery_alert",
    color: "amber-8",
  },
  {
    id: "decision",
    title: "否決條件／決策",
    icon: "block",
    color: "deep-orange",
  },
  {
    id: "system",
    title: "🧠 記憶／GPT／系統",
    icon: "memory",
    color: "deep-purple",
  },

  {
    id: "checklist",
    title: "✅ 現場 核取方塊",
    icon: "check",
    color: "deep-purple",
  },
];

const visibilityItems = ref([
  {
    title: "Fn",
    description: "目前到底在完成哪個 Function？ \\ Fn 可長久 ROI",
    done: false,
  },
  {
    title: "Project",
    description: "這個 Function 屬於哪個 Project？ \\ prj 是有截止日的",
    done: false,
  },
  {
    title: "Task",
    description:
      "下一個實際可以執行的 Task 是什麼？ \\ 有成功的 [數值] [里程碑] ",
    done: false,
  },
  {
    title: "List",
    description: "不要一次看整個系統，檢查表 一項一項打勾。",
    done: false,
  },
]);

// joey dialog 改 自動 也要時間 \ 先推內容好了 \ 穩定基礎
const dialog0 = ref(false);

const activeSection = ref("problem");

const sectionRefs = ref([]);

let observer = null;

function scrollToSection(id) {
  const element = document.getElementById(id);

  if (!element) {
    console.warn(`Section not found: #${id}`);
    return;
  }

  activeSection.value = id;

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

onMounted(async () => {
  await nextTick();

  const elements = document.querySelectorAll(".timeline-section");

  observer = new IntersectionObserver(
    (entries) => {
      /*
       * 找出目前最接近 viewport 上方
       * 的 section。
       */
      const visibleSections = [...entries].filter(
        (entry) => entry.isIntersecting
      );

      if (!visibleSections.length) {
        return;
      }

      visibleSections.sort(
        (a, b) =>
          Math.abs(a.boundingClientRect.top) -
          Math.abs(b.boundingClientRect.top)
      );

      const current = visibleSections[0].target.dataset.section;

      if (current) {
        activeSection.value = current;
      }
    },
    {
      /*
       * 上方留 100px，
       * 讓 header / outline 不會干擾判斷。
       */
      root: null,

      rootMargin: "-100px 0px -55% 0px",

      threshold: [0, 0.1, 0.5],
    }
  );

  elements.forEach((element) => observer.observe(element));
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<style scoped>
.joey {
  font-family: "Microsoft JhengHei", Arial, sans-serif;
  font-size: 24px;
  font-weight: normal;
  font-style: normal;
}

.page-container {
  max-width: 900px;
  margin: 0 auto;
}

.outline-card {
  border-radius: 12px;
}

/* joey ---- */
.timeline-section {
  scroll-margin-top: 80px;
}

/* Active Outline */
.outline-active {
  background: rgba(25, 118, 210, 0.08);
  border-left: 3px solid var(--q-primary);
}

.outline-active .q-item__section {
  color: var(--q-primary);
}

.text-body1 {
  /* line-height: 1.8; */
  line-height: 0.5;
}

.q-timeline {
  padding-bottom: 40px;
}
</style>
