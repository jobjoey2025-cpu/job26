<template>
  <q-page class="q-pa-lg">
    <!-- Hero -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">Blog</div>
      <div class="text-subtitle1">Engineering × AI × Design Articles</div>
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
