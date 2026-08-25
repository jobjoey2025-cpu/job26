<template>
  <q-page class="q-pa-md">
    <div class="page-container">
      <!-- Header -->
      <div class="text-h5 text-weight-bold q-mb-xs">Execution System</div>

      <div class="text-caption text-grey-7 q-mb-md">
        問題發現 → 執行 → 能見度 → 留白 → 意志力 → 否決 → 系統
      </div>

      <!-- Outline -->
      <q-card flat bordered class="q-mb-xl outline-card">
        <q-card-section>
          <div class="text-subtitle1 text-weight-bold q-mb-sm">📑 目錄大綱</div>

          <q-list dense>
            <!-- <q-item
              v-for="item in sections"
              :key="item.id"
              clickable
              tag="a"
              :href="`#${item.id}`"
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
            </q-item> -->

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

      <!-- Timeline -->
      <q-timeline color="primary">
        <!-- 1 -->
        <section
          id="problem"
          class="timeline-section"

          data-section="problem"
        >
        <!-- ref="sectionRefs" -->

          <q-timeline-entry heading icon="priority_high" color="negative">
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
          <q-timeline-entry heading icon="flash_on" color="orange">
            🔪 執行：10mins Test／快刀亂麻
          </q-timeline-entry>

          <q-timeline-entry
            title="先做 10 分鐘"
            subtitle="Action"
            icon="timer"
            color="orange"
          >
            <div class="text-body1">10mins Test 還是快刀亂麻？</div>

            <div class="q-mt-md text-body1">先做 10 分鐘，不先判斷自己。</div>

            <q-separator class="q-my-md" />

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
          <q-timeline-entry heading icon="visibility" color="primary">
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
          <q-timeline-entry heading icon="space_bar" color="grey-7">
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
          <q-timeline-entry heading icon="battery_alert" color="amber-8">
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
          <q-timeline-entry heading icon="block" color="deep-orange">
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
          </q-timeline-entry>
        </section>

        <!-- 7 -->
        <section
          id="system"
          class="timeline-section"
          ref="sectionRefs"
          data-section="system"
        >
          <q-timeline-entry heading icon="memory" color="deep-purple">
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

const activeSection = ref("problem");

const sectionRefs = ref([]);

let observer = null;

// function scrollToSection(id) {
//   activeSection.value = id;
// }

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
.page-container {
  max-width: 900px;
  margin: 0 auto;
}

.outline-card {
  border-radius: 12px;

  /*
   * 如果之後希望目錄固定在上面，
   * 可以打開這個設定。
   */
  /*
  position: sticky;
  top: 16px;
  z-index: 10;
  */
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
  line-height: 1.8;
}

.q-timeline {
  padding-bottom: 40px;
}
</style>
