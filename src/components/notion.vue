<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">Notion Links</div>

    <div class="row q-col-gutter-md">
      <div
        v-for="item in notionList"
        :key="item.id"
        class="col-12 col-sm-4 col-md-4"
      >
        <q-card class="cursor-pointer" @click="open(item.url)">
          <!-- 封面圖 -->
          <!-- <q-img :src="item.image" ratio="16/9" /> -->
          <q-img :src="item.image" style="height: 33px; max-width: 222px"/>

          <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"> </q-img> -->
          <q-card-section>
            <div class="text-subtitle1">{{ item.title }}</div>
            <div class="text-caption text-grey">
              {{ item.desc }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
const notionList = [
  {
    id: 1,
    title: "各類 Top5 結果照片",
    desc: "空間不夠 只能留5項 (Notion)",
    url: "https://www.notion.so/343020032b2980ff9d4ed261f05528f6?v=343020032b2980f198c9000c2ea8c877&source=copy_link",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/25/5566_and_Daily_Air_B-55507_20050820.jpg",
  },
  {
    id: 3,
    title: "空間箱 檢查",
    desc: "step by step 儘量不要重複",
    url: "https://www.notion.so/34e020032b2980d68a09f2320ca5fac6?source=copy_link",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Series-N700a-Mt.Fuji.jpg/960px-Series-N700a-Mt.Fuji.jpg",
  },
  {
    id: 2,
    title: "整理 Tasks one by one",
    desc: "one by one FIXED (GDS)",
    url: "https://docs.google.com/spreadsheets/d/18E0ECyxrmXaRl0pNfpc72cxBZ8EHHRpXmHcEQe09jT0/edit?gid=498659891#gid=498659891",
    image: "https://upload.wikimedia.org/wikipedia/zh/3/3d/%E6%A5%8A%E5%8D%83%E5%AC%85_One_on_One_Collection.jpg",
  },

  {
    id: 3,
    title: "3F tin",
    desc: "每天打電話",
    url: "https://www.notion.so/3F-issue-344020032b298068ab39c1f3a021d9ac?source=copy_link",
    image: "https://blogger.googleusercontent.com/img/a/AVvXsEhP2i7e1hWGA1zDx27Y6fIFOwA1oRiK1aFxdU8OcsgqnrEOcO3vcPVplvqC2XbTdeU6NC22yl71NJwS7mcC42YC0V-FnPmCq2jXdF4iSW1Mk0zgLWWTefejn58PD84vbVI17592DBiR46dhGUCp2G1iLBBPVE-CTy0XSiMV-OPIQZVmxKkwwWqeCvFDEPMI",
  },
  {
    id: 3,
    title: "包包太大走不遠",
    desc: "外出旅行要先定義包包",
    url: "https://www.notion.so/344020032b298083ba77c7f027ba8049?source=copy_link",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/HK_CH_LV_Landmark_60421.jpg/500px-HK_CH_LV_Landmark_60421.jpg",
  },
  {
    id: 3,
    title: "DIY 第一支手錶",
    desc: "Seiko5 都不好拆",
    url: "https://www.notion.so/DIY-2d3020032b2980939c48efbfc7116622?source=copy_link",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Arabic_Dial_SEIKO5_3.jpg/1920px-Arabic_Dial_SEIKO5_3.jpg",
  },

  ];

const open = (url) => {
  window.open(url, "_blank");
};
</script>
