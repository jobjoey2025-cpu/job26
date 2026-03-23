<template>
  <q-page class="q-pa-lg">
    <!-- Hero -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">9StepApps Blog</div>
      <div class="text-subtitle1">Engineering × AI × Design Articles</div>
    </div>

    <!-- Blog Grid -->
    <div class="row q-col-gutter-lg">
      <div v-for="post in posts" :key="post.link" class="col-12 col-md-4">
        <q-card class="cursor-pointer" @click="open(post.link)">
          <q-card-section>
            <div class="text-h6">{{ post.title }}</div>
            <div class="text-caption q-mt-sm">
              {{ formatDate(post.pubDate) }}
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-body2 ellipsis-3-lines">
              {{ stripHtml(post.description) }}
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Read More" color="primary" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// 從 Netlify function 拿資料（解 CORS）
onMounted(async () => {
  try {
    const res = await fetch("/.netlify/functions/blog");
    const data = await res.json();

    posts.value = data.feed.entry.map((e) => ({
      title: e.title.$t,
      link: e.link.find((l) => l.rel === "alternate").href,
      description: e.summary?.$t || "",
      pubDate: e.published.$t,
    }));
  } catch (err) {
    error.value = "Failed to load blog posts";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// 開啟文章
const open = (url) => {
  window.open(url, "_blank");
};

// 去 HTML
const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
};

// 日期格式
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style>
.ellipsis-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
