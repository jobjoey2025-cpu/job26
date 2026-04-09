<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <h6 style="text-align: center">
      tree input 沒有 Table 快, 但是比較好閱讀 <br />
      為什麼 不用 mindMap --> cuz mobile 跨平台不順 <br />
      BK GDS \ gitHub
    </h6>
    <q-tree
      class="col-12 col-sm-12"
      :nodes="simple"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
      v-model:selected="selected"
      node-key="label"
      :tick-strategy="tickStrategy"
      default-expand-all
      @update:selected="openLink"
    />
    <div class="col-12 col-sm-6">
      <q-option-group v-model="tickStrategy" :options="tickStrategies" />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    const selected = ref(null);
    // https://jsoneditoronline.org/
    // @ 提昇閱讀性 use json tree + vsc sync in GitHub。這樣才能突顯 joey issue。
    // @ joey system tree - 顯示 實體收納一直有問題的部份。
    // node-key 不建議用 label（會重複）;改用 id 比較安全 \\ { id: 1, label: "...", link: "..." }
    const simple = [
      {
        label: "GGB Google",
        link: "https://www.google.com/?hl=zh_TW",
        children: [
          {


            label: "income 軍機處 司法檢察",
            link: "https://104vtol.netlify.app/#/",
            children: [
              {
                label: "children 範本",
                children: [
                  {
                    label: "🎯 1範本",
                    children: [
                      {
                        label: "🎯 2範本",
                      },
                    ],
                  },
                ],
              },
              {
                label: "104 Quasar",
                link: "https://104vtol.netlify.app/#/",
                icon: "restaurant_menu",
              },
              {
                label: "* 通知管道 維護 List - job21",
                link: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=344002451#gid=344002451",
              },
              {
                label: "biz 關係 通訊錄 - job21",
                link: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1682307598#gid=1682307598",
              },
              {
                label: "國安局",
                link: "NA",
                children: [
                  {
                    label: "🎯 Peeple",
                    link: "https://quasar-peeple.netlify.app/#/googleForm",
                  },
                  {
                    label: "鑰 G1",
                    link: "NA",
                  },
                  {
                    label: "3",
                    link: "a",
                  },
                ],
              },
            ],
          },
          {
            label: "中書省 立法院 宣傳部",
            link: "https://joey20090710.blogspot.com/2022/03/22-03_15.html",
            children: [
              {
                label: "文件系統 資訊管道",
                link: "https://joey20090710.blogspot.com/2022/03/22-03_15.html",
              },
              {
                label: "GDS SKDL",
                link: "https://www.google.com/",
              },
            ],
          },
          {
            label: "尚書省 行政院 外包",
            children: [
              {
                label: "🎯 (BuySell) joey APP Gallery - job2021",
                link: "https://www.notion.so/26c020032b2980b3870bec7de5255a20?v=26c020032b298055a9a2000c15bf07ee&source=copy_link",
              },
              {
                label: "🔥 業務 SuAo 出租",
                link: "https://docs.google.com/spreadsheets/d/1aaeqbB_JvA0jPL8sQ-tGHsxiskSWaObXwOEHZ2UvuI4/edit?gid=498659891#gid=498659891",
              },
              {
                label: "google",
                link: "https://www.google.com/?hl=zh_TW",
              },
              {
                label: "財政部 (價格監控 \ 可以賣出去的)",
                link: "https://docs.google.com/spreadsheets/d/1C1RSidaykDLHDeB_VBolaRMdgswh4LFBRfgWuzYjVaM/edit?gid=721285171#gid=721285171",
              },
            ],
          },
        ],
      },
    ];

    const openLink = (key) => {
      const findNode = (nodes) => {
        for (const node of nodes) {
          if (node.label === key) return node;
          if (node.children) {
            const found = findNode(node.children);
            if (found) return found;
          }
        }
      };

      const node = findNode(simple);
      if (node?.link) {
        window.open(node.link, "_blank");
      }
    };

    return {
      selected,
      simple,
      openLink,
      ticked: ref([]),
      expanded: ref([]),
      tickStrategy: ref("strict"),
      tickStrategies: [
        { value: "none", label: "None" },
        { value: "strict", label: "Strict" },
        { value: "leaf", label: "Leaf" },
        { value: "leaf-filtered", label: "Leaf Filtered" },
      ],
    };
  },
};
</script>
