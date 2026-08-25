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
            🔪 執行：<b>10mins Test</b>  or <b>快刀亂麻</b>
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
                  <q-icon name="list_alt" />
                </q-item-section>
                <q-item-section> Fn Prj Task List </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="storage" />
                </q-item-section>
                <q-item-section> PARA 有想到的 db（img map） </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="battery_charging_full" />
                </q-item-section>
                <q-item-section> Energy Level 當下 </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="phone_iphone" />
                </q-item-section>
                <q-item-section> 📱 Mobile Vue（list） </q-item-section>
              </q-item>
            </q-list>
          </q-timeline-entry>
        </section>

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
            title="留白"
            subtitle="Reset"
            icon="visibility"
            color="grey-7"
          >
            <div class="text-body1">留白是系統重新取得視野的時間。</div>
          </q-timeline-entry>
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
];

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
