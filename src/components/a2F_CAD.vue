<template>
  <h5 style="text-align: center;">CAD</h5>
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
          <!-- <q-img src="/img/3D.png" height="80px" /> -->

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
  { name: "平面圖", icon: "flight" },
  { name: "電機圖", icon: "restaurant" },
  { name: "零件圖", icon: "public" },
  { name: "超大結構", icon: "hotel" },
];

const items = [
  {
    id: 1,
    title: "地政圖",
    location: "Tokyo",
    tag: "平面圖",
    image: "/img/20260721四筆土地_比例尺.jpg",
    url: "https://maps.nlsc.gov.tw/T09/mobilemap.action",
    describe: "說明格 test 不能超過5項",
  },
  {
    id: 2,
    title: "物件照片細節 拖曳.xlsm",
    location: "Tokyo",
    tag: "平面圖",
    image: "/img/20260724008.jpg",
    url: "https://docs.google.com/spreadsheets/d/1W7_ckWQuxEKj2Tk8KEkA16k3HitxmrLd-luMiIHnexc/edit?gid=107253224#gid=107253224",
    describe: "出發前 1 小時檢查 \ 撤退 水電門窗",
  },
  {
    id: 3,
    title: "floorPlan.xlsm",
    location: "Taipei",
    tag: "平面圖",
    image: "/img/20260724009.jpg",
    url: "https://google.com",
    describe: "Exc Region 照片 excel region >> html btn manual",
  },
  {
    id: 4,
    title: "建築圖 公文",
    location: "Tokyo",
    tag: "平面圖",
    image: "/img/20260526005.png",
    url: "https://104vtol.netlify.app/#/suao_oneDay",
    describe: "一天基本生活 安全撤退",
  },
  // 20260526005.png
  {
    id: 5,
    title: "附近環境圖 CAD",
    location: "Tokyo",
    tag: "平面圖",
    image: "/img/20260724010.jpg",
    url: "https://docs.google.com/spreadsheets/d/1Qf0kQzCAFxaow0SexTyOlAQJldgveq-eiGU70gG_8-0/edit?gid=498659891#gid=498659891",
    describe: "Z:01 - 2F Layout_2026",
  },
  // 20260724010.jpg
  {
    id: 6,
    title: "car Trip",
    location: "Tokyo",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?6",
    url: "https://app.notion.com/p/34e020032b2980d68a09f2320ca5fac6?source=copy_link",
    describe: "照片比文字快",
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
    tag: "超大結構",
    image: "https://picsum.photos/400/250?11",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 12,
    title: "阿媽基地",
    location: "改車基地",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?12",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
  },
  {
    id: 18,
    title: "阿媽漏水",
    location: "先解漏水再大規劃",
    tag: "超大結構",
    image: "https://picsum.photos/400/250?18",
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
    title: "插頭位置",
    location: "不用 設計問卷",
    tag: "電機圖",
    image: "/img/20260724012.jpg",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  // 20260724015.jpg
  {
    id: 21,
    title: "電燈 開關位置",
    location: "不用 設計問卷",
    tag: "電機圖",
    image: "/img/20260724014.jpg",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "靠 直接用 GPT 評分 \ 不用 設計問卷",
  },
  {
    id: 21,
    title: "單線圖 昇位圖",
    location: "不用 設計問卷",
    tag: "電機圖",
    image: "/img/20260724015.jpg",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "線徑 & NFB 計算",
  },
  {
    id: 21,
    title: "電箱圖",
    location: "不用 設計問卷",
    tag: "零件圖",
    image: "/img/20260724016.jpg",
    url: "https://docs.google.com/spreadsheets/d/1kDPbAsHuvjC3-TswM2AM5gJGn3yvzbSF9_bttedbbTI/edit?gid=498659891#gid=498659891",
    describe: "線徑 & NFB 計算",
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
