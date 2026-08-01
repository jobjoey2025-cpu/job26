<template>
  <q-page class="q-pa-md">
    <!-- Category Buttons -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div v-for="category in categories" :key="category.name">
        <q-btn
          rounded
          outline
          :color="selectedCategory === category.name ? 'primary' : 'grey-7'"
          :icon="category.icon"
          :label="category.name"
          @click="selectedCategory = category.name"
        />
      </div>
    </div>

    <!-- Card Grid -->
    <div class="row q-col-gutter-md">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="col-12 col-sm-4 col-md-3 col-lg-2"
      >
        <q-card class="full-height">
          <q-img :src="item.image" height="80px" />

          <!-- <div class="text-h6"> -->
          <q-card-section>
            <div class="text-h8">
              {{ item.title }}
              --
              {{ item.location }}

              <q-btn
                flat
                icon="open_in_new"
                label="Open"
                :href="item.url"
                target="_blank"
              />
            </div>
            <p>{{ item.describe }}</p>
            <!-- <div class="text-caption text-grey-7">
              {{ item.location }}
            </div> -->
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Floating Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" direction="up">
        <q-fab-action color="primary" icon="link" label="New Link" />

        <q-fab-action color="secondary" icon="photo" label="Photo" />

        <q-fab-action color="orange" icon="place" label="Place" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const selectedCategory = ref("All");

const categories = [
  { name: "All", icon: "apps" },
  { name: "prj < 5", icon: "rocket" },
  { name: "vehicles", icon: "flight" },
  { name: "decorate", icon: "restaurant" },
  { name: "Living", icon: "public" },
  { name: "超大結構", icon: "hotel" },
];

const items = [
  {
    id: 1,
    title: "Senso-ji",
    location: "Tokyo",
    tag: "打包 上車",
    image: "https://picsum.photos/400/250?1",
    url: "https://google.com",
    describe: "說明格 test 不能超過5項",
  },
  {
    id: 2,
    title: "Drone",
    location: "Tokyo",
    tag: "prj < 5",
    image: "https://picsum.photos/400/250?2",
    url: "https://docs.google.com/spreadsheets/d/1W7_ckWQuxEKj2Tk8KEkA16k3HitxmrLd-luMiIHnexc/edit?gid=107253224#gid=107253224",
    describe: "出發前 1 小時檢查 \ 撤退 水電門窗",
  },
  {
    id: 3,
    title: "2FCampLife",
    location: "Taipei",
    tag: "prj < 5",
    image: "https://picsum.photos/400/250?3",
    url: "https://google.com",
    describe: "I Lan 有 Team 所以 2F CampLife > 車宿",
  },
  {
    id: 4,
    title: "suao_oneDay",
    location: "Tokyo",
    tag: "Living",
    image: "https://picsum.photos/400/250?4",
    url: "https://104vtol.netlify.app/#/suao_oneDay",
    describe: "一天基本生活 安全撤退",
  },
  {
    id: 5,
    title: "RC car ",
    location: "Tokyo",
    tag: "vehicles",
    image: "https://picsum.photos/400/250?5",
    url: "https://docs.google.com/spreadsheets/d/1Qf0kQzCAFxaow0SexTyOlAQJldgveq-eiGU70gG_8-0/edit?gid=498659891#gid=498659891",
    describe: "長期蒐集的任務 after Fn Prj",
  },
  {
    id: 6,
    title: "car Trip",
    location: "Tokyo",
    tag: "vehicles",
    image: "https://picsum.photos/400/250?6",
    url: "https://app.notion.com/p/34e020032b2980d68a09f2320ca5fac6?source=copy_link",
    describe: "照片比文字快",
  },
  {
    id: 7,
    title: "Exc Region 照片",
    location: "Tokyo",
    tag: "Living",
    image: "https://picsum.photos/400/250?7",
    url: "https://104vtol.netlify.app/#/a3F_floorPlan",
    describe: "抽象化 稍微 excel region >> html btn manual",
  },
  {
    id: 8,
    title: "Tree View",
    location: "Tokyo",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?8",
    url: "https://104vtol.netlify.app/#/test",
    describe: "抽象化 稍微 excel region >> html btn manual",
  },
  {
    id: 9,
    title: "projectdashboard",
    location: "Tokyo",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?9",
    url: "https://104vtol.netlify.app/#/projectdashboard",
    describe: "抽象化 稍微 excel region >> html btn manual",
  },
  {
    id: 10,
    title: "Recently",
    location: "Tokyo",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?10",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 11,
    title: "車宿",
    location: "Tokyo",
    tag: "vehicles",
    image: "https://picsum.photos/400/250?11",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 12,
    title: "阿媽基地",
    location: "改車基地",
    tag: "vehicles",
    image: "https://picsum.photos/400/250?12",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 13,
    title: "縫紉",
    location: "Fashion",
    tag: "decorate",
    image: "https://picsum.photos/400/250?13",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 14,
    title: "picture",
    location: "cellPhone carmera",
    tag: "decorate",
    image: "https://picsum.photos/400/250?14",
    url: "https://docs.google.com/spreadsheets/d/1ZSW0LW029pU3QyTDeXVNachpthDYFhCxeSsoPVLnB7w/edit?gid=498659891#gid=498659891",
    describe: "使用 NAS 留存 \ 至少是個人的記憶 \ Galbum 雲端 手機都太貴",
  },
  {
    id: 15,
    title: "video",
    location: "goPro FFmpeg 剪映",
    tag: "decorate",
    image: "https://picsum.photos/400/250?15",
    url: "https://docs.google.com/spreadsheets/d/1ZSW0LW029pU3QyTDeXVNachpthDYFhCxeSsoPVLnB7w/edit?gid=1036555660#gid=1036555660",
    describe: "真的很好的 upload \ 可能要家硬碟",
  },
  {
    id: 16,
    title: "蝶古巴特",
    location: "goPro",
    tag: "decorate",
    image: "https://picsum.photos/400/250?16",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 17,
    title: "俄羅斯刺繡",
    location: "goPro",
    tag: "decorate",
    image: "https://picsum.photos/400/250?17",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 18,
    title: "阿媽漏水",
    location: "先解漏水再大規劃",
    tag: "Living",
    image: "https://picsum.photos/400/250?18",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 19,
    title: "Watch",
    location: "賣得出去 level",
    tag: "prj < 5",
    image: "https://picsum.photos/400/250?19",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 20,
    title: "hobby score",
    location: "不用 設計問卷",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?20",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 21,
    title: "JP Trip",
    location: "不用 設計問卷",
    tag: "Living",
    image: "https://picsum.photos/400/250?21",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 22,
    title: "3DP",
    location: "不用 設計問卷",
    tag: "prj < 5",
    image: "https://picsum.photos/400/250?22",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 23,
    title: "程式設計",
    location: "不用 設計問卷",
    tag: "decorate",
    image: "https://picsum.photos/400/250?23",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 24,
    title: "程式設計",
    location: "不用 設計問卷",
    tag: "decorate",
    image: "https://picsum.photos/400/250?24",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 25,
    title: "群輝 NAS",
    location: "檔案最後防線",
    tag: "超大結構",
    image: "/img/20260726005.jpg",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "比 DVD 還好用 \ 與 ai 大數據區別",
  },
  {
    id: 26,
    title: "香水 \ 擴箱",
    location: "奢侈 短時",
    tag: "decorate",
    image: "https://picsum.photos/400/250?26",
    url: "url",
    describe: "no time no money 短暫見面禮貌 use",
  },
];

const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return items;
  }

  return items.filter((item) => item.tag === selectedCategory.value);
});
</script>

<style scoped>
.q-card {
  transition: 0.25s;
}

.q-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
