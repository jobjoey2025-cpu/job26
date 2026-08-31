<!-- Execution System
Recent System
說明文字
◎ 最近重點
快速筆記
開啟 job2021 -->

<template>
  <div>
    <header class="q-mb-lg">
      <div class="row items-start justify-between q-col-gutter-md">
        <!-- <div class="col-12 col-sm"> -->
        <div class="col-12 col-sm-auto">
          <div class="text-overline text-primary text-weight-bold">
            Execution System
          </div>
          <h1 class="page-title q-my-xs">Recent System</h1>
          <p class="text-body2 text-grey-7 q-my-none">
            縮小範圍、縮小實驗、縮小差距，讓下一步清楚可執行。
          </p>
          <p class="text-body2 text-grey-7 q-my-none">
            * 記錄我在哪裡找到遺失？然後規範強化這個入口。
          </p>
          <p class="text-body2 text-grey-7 q-my-none">
            * GPT | Firedb_recent | Firedb_Todolist
          </p>
          <p>不要要求自己記住：應該讓系統自動顯示。</p>
          <!-- <p>
              * 這一個 Page 超過 500行 \ 不要再增加 Fn 只 modify \ use routes
              嵌入其他 Page。
            </p> -->

          <q-expansion-item
            v-model="expanded"
            icon="perm_identity"
            label="◎ 最近重點"
            caption="最近 遇到的問題"
          >
            <!-- joey modify --- -->
            <pre>
讓系統在沒有情緒時，仍然可以指出下一步。

* 這一個 Page 超過 500行 \ 不要再增加 Fn 只 modify \ use routes 嵌入其他 Page。
* 發現 寫執行計畫 很花時間幾天 幾週
## 物業管理 不是小規模，Room db 也是選不到 好 system
* 事情很多可以做(基本2F做不完 還有阿媽花園) \ 但是有 team 組織的 多一點優先, after 身體狀況  \ 尤其是運動項目 \
* GPT 對 SuAo 物業管理的效果，沒有 Quasar db 有效。
              </pre
            >
          </q-expansion-item>
        </div>

        <!-- @click="dialogOpen = true" -->
        <div class="col-12 col-sm-auto row q-gutter-sm">
          <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="快速筆記"
            @click="$emit('open-notes')"
          />
          <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="3☏ FCards"
            :to="{ name: 'AreaManager' }"
          />
          <!-- <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="4☏ ToDo"
            :to="{ name: 'Firedb_Todolist' }"
          />

          <q-btn
            color="primary"
            outline
            icon-right="open_in_new"
            label="2☏ Gskld"
            href="https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=56163573#gid=56163573"
            target="_blank"
            rel="noopener noreferrer"
          />
          <q-btn
            color="primary"
            outline
            icon-right="open_in_new"
            label="手冊21"
            href="https://docs.google.com/spreadsheets/d/1bZ6SuThGhK8dr51nmCOE6hSAqwR_77cQm9xTqzoey4Q/edit?gid=212352960#gid=212352960"
            target="_blank"
            rel="noopener noreferrer"
          /> -->

          <q-btn label="biz 排序" color="primary" @click="alert = true" />

          <!-- 選擇區域 -->
          <div class="col-12 col-sm-auto">
            <q-btn
              icon="grid_view"
              label="選擇區域"
              color="primary"
              unelevated
              @click="showSelector = true"
            />
          </div>
          <!-- Area Selector Dialog -->
          <recentSelectDialog
            v-model="showSelector"
            :items="recentItems"
            :selected="selectedRecentItem"
            @select="onRecentSelect"
          />

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
      </div>
    </header>
  </div>
</template>

<script setup>
import { ref } from "vue";

// defineEmits(["open-notes"]);
// const alert = ref(false);
// const expanded = ref(false);

import { useRouter } from "vue-router";
// import recentSelectDialog from "../components/recentSystem/recentSelectDialog.vue";
import recentSelectDialog from "./recentSelectDialog.vue";


// defineEmits(["open-notes"]);
// Emits
const emit = defineEmits(["open-notes"]);
// Router
const router = useRouter();

// Other state
const alert = ref(false);
const expanded = ref(false);

const showSelector = ref(false);

// Recent Items
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

// Recent Select Dialog
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

pre {
  max-width: min(100%, 72ch);
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
