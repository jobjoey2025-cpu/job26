<template>
  <div>
    <header class="q-mb-lg">
      <div class="row items-start justify-between q-col-gutter-md">
        <!-- =========================
             Title
        ========================== -->
        <div class="col-12 col-sm-auto">
          <div class="text-overline text-primary text-weight-bold">
            Execution System
          </div>

          <p class="text-body2 text-grey-7 q-my-none">
            縮小範圍、縮小實驗、縮小差距，讓下一步清楚可執行。
          </p>
        </div>

        <!-- =========================
             選擇區域
        ========================== -->
        <div class="col-12 col-sm-auto">
          <q-btn
            icon="grid_view"
            label="選擇區域"
            color="primary"
            unelevated
            @click="showSelector = true"
          />
        </div>
      </div>
    </header>

    <!-- =========================
         Area Selector Dialog
    ========================== -->
    <!-- <recentSelectDialog
      v-model="showSelector"
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    /> -->

    <recentSelectDialog
      v-model="showSelector"
      :items="recentItems"
      :selected="selectedRecentItem"
      @select="onRecentSelect"
    />

    <!-- =========================
         Recent Select Dialog
    ========================== -->
    <!-- <recentSelectDialog
      v-model="showRecentSelectDialog"
      :items="recentItems"
      :selected="selectedRecentItem"
      @select="onRecentSelect"
    /> -->

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          最近 biz 排序 with 最新情報
          <pre>
  <b>⏱ 104 Drone 有那麼難嗎 ?</b>
  * Shift + Tab 鍵 (可向左縮排。)
suao 泉源 \ key is 怎麼賣 ?
Drone 保養廠 \ 水電工 \ 2F 機電保修
Watch DIY \ 縫紉 3DP \
Quasar FireJson in cellPhone 還是最重要的
  * 某金錢以下是情面，以上是利益。
                  </pre>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

import { useRouter } from "vue-router";
import recentSelectDialog from "../components/recentSystem/recentSelectDialog.vue";

// Emits
const emit = defineEmits(["open-notes"]);

// Router
const router = useRouter();

// Other state
const alert = ref(false);
const expanded = ref(false);

// ============================================================
// Area Selector
// ============================================================

const showSelector = ref(false);

// const selectedCategory = ref("All");

// const categories = [
//   {
//     name: "All",
//     icon: "apps",
//   },
//   {
//     name: "living",
//     icon: "home",
//   },
//   {
//     name: "bath",
//     icon: "shower",
//   },
//   {
//     name: "tent",
//     icon: "holiday_village",
//   },
//   {
//     name: "car",
//     icon: "no_crash",
//   },
//   {
//     name: "doc",
//     icon: "document_scanner",
//   },
// ];

// function onSelectCategory(category) {
//   selectedCategory.value = category.name;

//   showSelector.value = false;
// }

// ============================================================
// Recent Items
// ============================================================

const recentItems = [
  {
    id: "notes",
    label: "快速筆記",
    icon: "sticky_note_2",
    action: "open-notes",
  },

  {
    id: "fcards",
    label: "3☏ FCards",
    icon: "sticky_note_2",
    action: "route",
    route: {
      name: "AreaManager",
    },
  },

  {
    id: "todo",
    label: "4☏ ToDo",
    icon: "sticky_note_2",
    action: "route",
    route: {
      name: "Firedb_Todolist",
    },
  },

  {
    id: "biz-sort",
    label: "biz 排序",
    icon: "sort",
    action: "alert",
  },

  {
    id: "gskld",
    label: "2☏ Gskld",
    icon: "open_in_new",
    iconRight: "open_in_new",
    color: "primary",
    outline: true,
    action: "external",
    href: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=56163573#gid=56163573",
  },
];

// ============================================================
// Recent Select Dialog
// ============================================================

const showRecentSelectDialog = ref(false);
const selectedRecentItem = ref(null);
// 點擊 Recent Button
function openRecentSelectDialog(item) {
  selectedRecentItem.value = item;
  showRecentSelectDialog.value = true;
}
// Dialog 選擇項目後執行
function onRecentSelect(item) {
  showRecentSelectDialog.value = false;
  if (!item) {
    return;
  }
  switch (item.action) {
    // 快速筆記
    case "open-notes":
      emit("open-notes");
      break;
    // Vue Router
    case "route":
      if (item.route) {
        router.push(item.route);
      }
      break;
    // biz 排序
    case "alert":
      alert.value = true;
      break;
    // 外部網址
    case "external":
      if (item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
      break;
  }
}
</script>

<style scoped>
.page-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.2;
}
</style>
