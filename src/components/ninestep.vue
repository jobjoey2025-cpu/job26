<template>
  <q-page class="q-pa-lg">
    <!-- Hero -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">9StepApps Blog</div>
      <div class="text-subtitle1">Engineering × AI × Design Articles</div>
    </div>

    <!-- Loading -->
    <q-inner-loading :showing="loading" />

    <!-- Error -->
    <div v-if="error" class="text-negative text-center q-mb-md">
      {{ error }}
    </div>

    <!-- Blog Grid -->
    <div class="row q-col-gutter-lg">
      <div
        v-for="post in posts"
        :key="post.link"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card class="cursor-pointer card-hover" @click="open(post.link)">
          <!-- 🔥 封面圖片 -->
          <q-img :src="post.image" ratio="16/9" fit="cover">
            <!-- 防破圖 -->
            <template v-slot:error>
              <div class="bg-grey-3 flex flex-center">No Image</div>
            </template>
          </q-img>

          <q-card-section>
            <div class="text-h6 ellipsis-2-lines">
              {{ post.title }}
            </div>

            <div class="text-caption q-mt-sm text-grey">
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

// 🚀 主流程
onMounted(async () => {
  try {
    const res = await fetch("/.netlify/functions/blog");

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
.ellipsis-2-lines {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ellipsis-3-lines {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
