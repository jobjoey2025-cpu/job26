<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <div class="col-12 col-sm-12">
      <p class="text-center">sysTree</p>
      <p>
        * (閱讀品質)q-mb-md Tree input 沒有 Table 快, 但是比較好閱讀 <br />
        * 為什麼 不用 mindMap → cuz mobile 不順 (VSC 變化比較多) <br />
        * (use 資料結構 "捨棄")-- 不值得的 就不花時間加入 sysTree (cuz 新融入
        Tree UI 也要花2hrs時間)<br />
        * (2screen)-- VSC(好寫) + Quasar(好看) \ need 4hrs 連續時間
      </p>
    </div>
    <!-- 左邊 Tree -->
    <div class="col-12 col-sm-6">
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
    <div class="col-12 col-sm-6">
      <q-option-group v-model="tickStrategy" :options="tickStrategies" />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div v-for="tick in ticked" :key="tick">
        {{ tick }}
      </div>

      <!-- 面板 -->
      <q-tab-panels v-model="selected" animated>
        <q-tab-panel name="1">
          <div class="text-h5">這是臨時筆記 的 DIV joey</div>
        </q-tab-panel>
        <q-tab-panel name="fashion">
          <p>
            fashion English 訊息比較多，公仔模型都日文的 \\ $$
            分出精神部門，聲光 流行 Fashion \\有足夠的 育樂 \ 才有辦法 pass
            大專案 \ 不一是放鬆用 是一種資源等級指標
          </p>
        </q-tab-panel>
        <q-tab-panel name="3Fissue">
          <p>
            做不好 反錢 ?? sop 滾動調整 \ 不是我的問題 但是搞到我了 \ 集中資訊
            截圖 Notion
          </p>
        </q-tab-panel>
        <q-tab-panel name="podcast">
          <p>
            情報猿 \\ 日本大特搜 \\ 蔣勳 \\ 瓦基 \ 下一本讀甚麼 \\ 股癌 \\
            每日雙語新聞 \\
          </p>
        </q-tab-panel>
        <q-tab-panel name="104 Quasar">
          <p>
            check 104quasar next step \\ 專案頁 : \\ betaFlight Books\\ CFD ??\\
            CAD 疊圖 ?\\ $$ Fortran 轉 python use GPT，then run in colab。\\
          </p>
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
    avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
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
          {
            id: "structure",
            label: "資料結構 工具 (評估 priority)",
            children: [
              {
                id: "3",
                label: "隨手寫 超過一頁，就是overload (估)",
              },
              {
                id: "3",
                label: "GDS - main品牌choose (評估 priority)",
              },

              {
                id: "3",
                label: "Screen Shoot + Moment NAS",
              },
              {
                id: "3",
                label: "Tree + VSC == 雲端 Netlify",
              },
              {
                id: "Trello",
                label: "news GDS Gkeep Notion Trello",
                children: [
                  {
                    id: "3",
                    label:
                      "其實 都是靠 機率，訊息密度高 品質好時，問題就容易解。",
                  },
                  {
                    id: "3",
                    label: "10年技術滾動更新 2000-www 2008-app 2020-LLM",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "judge",
        label: "軍機處 司法檢察 income judge",
        link: "https://104vtol.netlify.app/#/",
        children: [
          {
            id: "104 Quasar",
            label: "🔥 104 Quasar (GDS)",
            link: "https://docs.google.com/spreadsheets/d/13FjdQ1Fw4ln1BwmHOEqH14ZDRq1okHsBVAt7pNXXmb4/edit?gid=1608668419#gid=1608668419",
            // icon: "restaurant_menu",
            // https://104vtol.netlify.app/#/
          },
          {
            id: "storageUSA",
            label: "收納30年",
            link: "https://joey20090710.blogspot.com/2026/04/storage-30years.html",
            children: [
              {
                id: "one by one",
                label: "@ ✅ 倉庫整理 Tasks 2 one by one",
                link: "https://docs.google.com/spreadsheets/d/18E0ECyxrmXaRl0pNfpc72cxBZ8EHHRpXmHcEQe09jT0/edit?gid=498659891#gid=498659891",
              },
              {
                id: "Notion pic speed",
                label: "@ 📸 Notion 至少結果紀錄 pic \ job21",
                link: "https://www.notion.so/Top5-25-08-263020032b298089ab04f81869627adb?source=copy_link",
              },
              {
                id: "auto alarm",
                label: "📡📻🎙️ auto alarm",
                link: "https://www.notion.so/26c020032b2980d7955fe6e82d8839c1?source=copy_link",
              },
            ],
          },
          {
            id: "ez QC",
            label: "🛡️📋⚙️✅簡單具體品保 健康指數 List GDS",
            link: "https://docs.google.com/spreadsheets/d/1FvQO1HPH-iGJJ-Uab9dgoIyhrGMzzwrgS1IP8Yh0VEE/edit?gid=498659891#gid=498659891",
            // icon: "",
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
              {
                id: "invoice",
                label: "所有載具「綁在一起」Notion",
                link: "https://www.notion.so/4hrs-up-34f020032b2980a69185e1dc60449e63?source=copy_link",
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
                label: "@ 👨‍👩‍👧‍👦 Peeple",
                link: "https://quasar-peeple.netlify.app/#/googleForm",
                children: [
                  {
                    id: "peeple GPT",
                    label: "Peeple GDT分析GDS",
                    link: "https://docs.google.com/spreadsheets/d/1X1y6eUohTduzYnqjfDzYqsp1qHvxP3GmSwfer_vpD5Q/edit?gid=498659891#gid=498659891",
                  },
                ],
              },
              {
                id: "key",
                label: "鑰 G1",
                link: "NA",
              },
              {
                id: "3Fissue",
                label: "3F 鐵皮屋問題 GDS",
                // link: "/lock",
                // link: "/outsourcingSOP",
                link: "https://104vtol.netlify.app/#/outsourcingSOP",
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
            id: "fashion",
            label: "精神部門  聲光 流行 Fashion relex 情報猿",
            link: "https://docs.google.com/spreadsheets/d/1MpGxS3X4QMiQtAptCs1BWkiB8HvHeaXgdgbIgrfrmLk/edit?gid=498659891#gid=498659891",

            children: [
              {
                id: "podcast",
                label: "🎯 Podcast",
                link: "https://docs.google.com/spreadsheets/d/1MpGxS3X4QMiQtAptCs1BWkiB8HvHeaXgdgbIgrfrmLk/edit?gid=1288694375#gid=1288694375",
              },
            ],
          },
        ],
      },
      {
        id: "outsourcing",
        label: "尚書省 行政院 外包",
        children: [
          {
            id: "TTS skill sets",
            label: "TTS skill sets",
            link: "https://trello.com/b/qOwlJo86/tts-skill-sets",
          },
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
  "judge",
  // "1",
  "publish",
  "storageUSA",
  "cia",
  "structure",
  // ❌ 不放 "1" → 就不會展開 @joey
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
