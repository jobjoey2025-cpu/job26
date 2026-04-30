<template>
  <q-page class="q-pa-lg">
    <!-- Hero -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">Blog</div>
      <div class="text-subtitle1">Stock Articles</div>
    </div>

    <!-- Loading -->
    <q-inner-loading :showing="loading" />

    <!-- Error -->
    <div v-if="error" class="text-negative text-center q-mb-md">
      {{ error }}
    </div>

    <!-- 🔥 Blog List -->
    <q-list bordered separator>
      <q-item
        v-for="post in posts"
        :key="post.link"
        clickable
        v-ripple
        @click="open(post.link)"
        class="q-py-md"
      >
        <!-- 左圖 -->
        <q-item-section avatar>
          <q-img
            :src="post.image"
            style="width: 120px; height: 80px; border-radius: 8px"
            fit="cover"
          >
            <template v-slot:error>
              <div class="bg-grey-3 flex flex-center">No Image</div>
            </template>
          </q-img>
        </q-item-section>

        <!-- 右內容 -->
        <q-item-section>
          <q-item-label class="text-h6 ellipsis-2-lines">
            {{ post.title }}
          </q-item-label>

          <q-item-label caption class="text-grey">
            {{ formatDate(post.pubDate) }}
          </q-item-label>

          <q-item-label class="text-body2 ellipsis-2-lines q-mt-sm">
            {{ stripHtml(post.description) }}
          </q-item-label>
        </q-item-section>

        <!-- 右箭頭 -->
        <q-item-section side>
          <q-icon name="chevron_right" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

// 🚀 主流程
onMounted(async () => {
  try {
    const res = await fetch("/.netlify/functions/blog_stock");
    // 這裡要改 這個路徑的 js 檔 /.netlify/functions/blog_stock.js
    // 這一段連結 "https://stockjoey.blogspot.com/feeds/posts/default?alt=json"
    // 這樣就應該可以看得懂了

    if (!res.ok) throw new Error("API failed");

    const text = await res.text();

    // 防止拿到 HTML（CORS / routing 錯）
    if (text.startsWith("<")) {
      throw new Error("Got HTML instead of JSON");
    }

    const data = JSON.parse(text);

    posts.value = (data.feed?.entry || [])
      .map((e) => {
        const content = e.content?.$t || "";
        const thumbnail = e.media$thumbnail?.url || "";

        const rawImage = extractBestImage(content) || thumbnail;

        return {
          title: e.title.$t,
          link: e.link.find((l) => l.rel === "alternate").href,
          description: e.summary?.$t || "",
          pubDate: e.published.$t,

          image: fixBloggerImage(rawImage) || "https://picsum.photos/400/250",
        };
      })
      // 最新在前
      .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
  } catch (err) {
    error.value = "Failed to load blog posts";
    console.error(err);
  } finally {
    loading.value = false;
  }
});

// 🔥 抓最佳圖片（核心）
const extractBestImage = (html) => {
  if (!html) return null;

  // 1️⃣ 抓 <a href="大圖">
  const linkMatch = html.match(/<a[^>]+href="([^">]+\.(jpg|png|jpeg))"/i);
  if (linkMatch) return linkMatch[1];

  // 2️⃣ 抓 <img src="">
  const imgMatch = html.match(/<img[^>]+src="([^">]+)"/i);
  if (imgMatch) return imgMatch[1];

  return null;
};

// 🔥 修正 Blogger 圖片尺寸
const fixBloggerImage = (url) => {
  if (!url) return null;

  return url.replace(/=s\d+-c/, "=s1200").replace(/\/s\d+\//, "/s1200/");
};

// 開文章
const open = (url) => {
  window.open(url, "_blank");
};

// 去 HTML
const stripHtml = (html) => {
  return html.replace(/<[^>]*>?/gm, "").slice(0, 120) + "...";
};

// 日期
const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};
</script>

<style scoped>
/* Hover 動畫 */
.card-hover {
  transition: transform 0.3s, box-shadow 0.3s;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

/* 多行省略 */
/* .ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */

/*
.ellipsis-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
} */
</style>