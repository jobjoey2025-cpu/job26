<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <!-- 左邊 Tree -->
    <div class="col-12 col-sm-12">
      <h6 class="text-center">
        tree input 沒有 Table 快, 但是比較好閱讀 <br />
        為什麼 不用 mindMap → mobile 不順
      </h6>

      <q-tree
        :nodes="simple"
        node-key="id"
        v-model:ticked="ticked"
        v-model:expanded="expanded"
        v-model:selected="selected"
        :tick-strategy="tickStrategy"
        @update:selected="openLink"
      />
      <!-- default-expand-all -->
    </div>

    <!-- 右邊控制 + 顯示 -->
    <div class="col-12 col-sm-12">
      <q-option-group v-model="tickStrategy" :options="tickStrategies" />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div v-for="tick in ticked" :key="tick">
        {{ tick }}
      </div>

      <!-- 面板 -->
      <q-tab-panels v-model="selected" animated>
        <q-tab-panel name="1">
          <div class="text-h5">這是臨時筆記 的 DIV</div>
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

/* ✅ 建議：每個 node 一定要有 id */
const simple = [
  {
    id: "ggb",
    label: "GGB Google",
    link: "https://www.google.com/?hl=zh_TW",
    children: [
      {
        id: "1",
        label: "🎯 1範本 children",
        children: [
          {
            id: "2",
            label: "🎯 2範本",
            children: [
              {
                id: "3",
                label: "🎯 3範本",
              },
            ],
          },
        ],
      },
      {
        id: "judge",
        label: "軍機處 司法檢察 income",
        link: "https://104vtol.netlify.app/#/",
        children: [
          {
            id: "104 Quasar",
            label: "104 Quasar",
            link: "https://104vtol.netlify.app/#/",
            icon: "restaurant_menu",
          },
          {
            id: "ez QC",
            label: "簡單品保",
            link: "https://104vtol.netlify.app/#/",
            icon: "",
            children: [
              {
                id: "government",
                label: "* 💰 通知管道 維護 規費 check List - job21",
                link: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=344002451#gid=344002451",
              },
              {
                id: "biz network",
                label: "biz 關係 通訊錄 - job21",
                link: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1682307598#gid=1682307598",
              },
            ],
          },
          {
            id: "cia",
            label: "國安局 CIA",
            link: "NA",
            children: [
              {
                id: "Peeple",
                label: "👨‍👩‍👧‍👦 Peeple",
                link: "https://quasar-peeple.netlify.app/#/googleForm",
              },
              {
                id: "key",
                label: "鑰 G1",
                link: "NA",
              },
              {
                id: "3Fissue",
                label: "3F 鐵皮屋問題",
                link: "NA",
              },
            ],
          },
        ],
      },
      {
        id: "publish",
        label: "中書省 立法院 宣傳部",
        link: "https://joey20090710.blogspot.com/2022/03/22-03_15.html",
        children: [
          {
            id: "doc db",
            label: "文件系統 資訊管道",
            link: "https://joey20090710.blogspot.com/2022/03/22-03_15.html",
          },
          {
            id: "GDS SKDL",
            label: "GDS SKDL",
            link: "https://www.google.com/",
          },
          {
            id: "fashion relex",
            label: "精神部門  聲光 流行 Fashion",
            link: "https://www.google.com/",
          },
        ],
      },
      {
        id: "outsourcing",
        label: "尚書省 行政院 外包",
        children: [
          {
            id: "buy",
            label: "🎯 (BuySell) joey APP Gallery - job2021 可以買到套坂的",
            link: "https://www.notion.so/26c020032b2980b3870bec7de5255a20?v=26c020032b298055a9a2000c15bf07ee&source=copy_link",
          },
          {
            id: "biz",
            label: "🔥 業務 SuAo 出租",
            link: "https://docs.google.com/spreadsheets/d/1aaeqbB_JvA0jPL8sQ-tGHsxiskSWaObXwOEHZ2UvuI4/edit?gid=498659891#gid=498659891",
          },
          {
            id: "google",
            label: "google",
            link: "https://www.google.com/?hl=zh_TW",
          },
          {
            id: "accounting",
            label: "財政部 戶部 審計部",
            children: [
              {
                id: "sell list",
                label: "🎯 價格監控  可以賣出去的",
                link: "https://docs.google.com/spreadsheets/d/1C1RSidaykDLHDeB_VBolaRMdgswh4LFBRfgWuzYjVaM/edit?gid=721285171#gid=721285171",
              },
              {
                id: "finance",
                label: "🎯 帳目check",
                link: "https://docs.google.com/spreadsheets/d/16m74N8UmlNPZ8RDFNEWVhJ9Epv47wqqbF_wYi5mK-6U/edit?gid=2104269897#gid=2104269897                    ",
              },
              {
                id: "emergency cash flow",
                label: "2026 現金取得順序 推演 - G1 Keep",
              },
            ],
          },
        ],
      },
    ],
  },
];

const selected = ref(null);
const ticked = ref([]);
const expanded = ref([
  "ggb",
  "income",
  "1",
  // ❌ 不放 "1" → 就不會展開 joey
]);
const tickStrategy = ref("strict");

const tickStrategies = [
  { value: "none", label: "None" },
  { value: "strict", label: "Strict" },
  { value: "leaf", label: "Leaf" },
  { value: "leaf-filtered", label: "Leaf Filtered" },
];

/* ✅ 用 id 找 node（比 label 安全） */
const openLink = (key) => {
  const findNode = (nodes) => {
    for (const node of nodes) {
      if (node.id === key) return node;
      if (node.children) {
        const found = findNode(node.children);
        if (found) return found;
      }
    }
  };

  const node = findNode(simple);

  if (node?.link && node.link !== "NA") {
    window.open(node.link, "_blank");
  }
};
</script>
