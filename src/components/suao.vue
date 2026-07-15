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
        class="col-12 col-sm-6 col-md-4 col-lg-3"
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

          <!-- <q-card-section>
            <q-chip
              dense
              color="primary"
              text-color="white"
              :label="item.tag"
            />
          </q-card-section> -->

          <!-- <q-separator /> -->

          <!-- <q-card-actions align="right">
            <q-btn
              flat
              icon="open_in_new"
              label="Open"
              :href="item.url"
              target="_blank"
            />

            <q-btn flat round icon="more_vert">
              <q-menu>
                <q-list dense style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>Edit</q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-card-actions> -->
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
  { name: "打包 上車", icon: "flight" },
  { name: "Tasks任務", icon: "restaurant" },
  { name: "基本活動", icon: "public" },
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
    describe: "說明格 test",
  },
  {
    id: 2,
    title: "suao3day",
    location: "Tokyo",
    tag: "打包 上車",
    image: "https://picsum.photos/400/250?2",
    url: "https://104vtol.netlify.app/#/suao3day",
    describe: "出發前 1 小時檢查 \ 撤退 水電門窗",
  },
  {
    id: 3,
    title: "FCampLife",
    location: "Taipei",
    tag: "基本活動",
    image: "https://picsum.photos/400/250?3",
    url: "https://google.com",
    describe: "評分 new ideas",

  },
  {
    id: 4,
    title: "suao_oneDay",
    location: "Tokyo",
    tag: "基本活動",
    image: "https://picsum.photos/400/250?4",
    url: "https://104vtol.netlify.app/#/suao_oneDay",
    describe: "一天基本生活 安全撤退",
  },
  {
    id: 5,
    title: "GDS 工作 LINK",
    location: "Tokyo",
    tag: "Tasks任務",
    image: "https://picsum.photos/400/250?5",
    url: "https://docs.google.com/spreadsheets/d/1Qf0kQzCAFxaow0SexTyOlAQJldgveq-eiGU70gG_8-0/edit?gid=498659891#gid=498659891",
    describe: "長期蒐集的任務 after Fn Prj",

  },
  {
    id: 6,
    title: "Notion 車上的照片",
    location: "Tokyo",
    tag: "打包 上車",
    image: "https://picsum.photos/400/250?6",
    url: "https://app.notion.com/p/34e020032b2980d68a09f2320ca5fac6?source=copy_link",
    describe: "照片比文字快",
  },
  {
    id: 7,
    title: "Exc Region 照片",
    location: "Tokyo",
    tag: "打包 上車",
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
    tag: "Tasks任務",
    image: "https://picsum.photos/400/250?10",
    url: "https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=1573640168#gid=1573640168",
    describe: "最近新增的GDS(重新檢視 time limit)",
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
