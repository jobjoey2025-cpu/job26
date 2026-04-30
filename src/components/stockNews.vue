<template>
  <q-page padding>
    <h4>STOCK NEWS 新聞</h4>
    <!-- 工具列 -->
    <div class="row items-center q-mb-md">
      <q-btn label="更新新聞" color="primary" @click="fetchNews" />
      <q-space />
      <q-input
        v-model="keyword"
        placeholder="搜尋關鍵字（例如 台積電）"
        dense
        outlined
        class="q-ml-md"
      />
    </div>

    <!-- Loading -->
    <q-inner-loading :showing="loading" />

    <!-- 新聞列表 -->
    <q-list bordered separator>
      <q-item
        v-for="n in filteredNews"
        :key="n.link"
        clickable
        @click="open(n.link)"
      >
        <q-item-section>
          <q-item-label class="text-weight-medium">
            {{ n.title }}
          </q-item-label>

          <q-item-label caption>
            {{ formatDate(n.pubDate) }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <!-- 無資料 -->
    <div v-if="!loading && filteredNews.length === 0" class="text-grey q-mt-md">
      沒有符合的新聞
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const news = ref([]);
const loading = ref(false);
const keyword = ref("");

// 🔄 抓新聞（呼叫 Netlify Function）
const fetchNews = async () => {
  loading.value = true;

  try {
    const res = await fetch("/.netlify/functions/news");

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    news.value = data.map((i) => ({
      title: i.title,
      link: i.link,
      pubDate: i.pubDate,
    }));
  } catch (err) {
    console.error("抓新聞失敗:", err);
  }

  loading.value = false;
};

// 🔍 搜尋過濾
const filteredNews = computed(() => {
  if (!keyword.value) return news.value;

  return news.value.filter((n) => n.title.includes(keyword.value));
});

// 🕒 日期格式
const formatDate = (d) => {
  return new Date(d).toLocaleString();
};

// 🔗 開新頁
const open = (url) => {
  window.open(url, "_blank");
};

// 初始化
onMounted(fetchNews);

const res = await fetch("/.netlify/functions/news");
const text = await res.text();

console.log(text);
</script>
