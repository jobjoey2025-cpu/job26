<template>
  <q-page padding>
    <div class="row items-center q-mb-md">
      <q-btn label="更新新聞" color="primary" @click="fetchNews" />
    </div>

    <q-list bordered separator>
      <q-item v-for="n in news" :key="n.link" clickable @click="open(n.link)">
        <q-item-section>
          <q-item-label>{{ n.title }}</q-item-label>
          <q-item-label caption>{{ n.pubDate }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import Parser from 'rss-parser'

const news = ref([])
const parser = new Parser()

const fetchNews = async () => {
  const feed = await parser.parseURL(
    'https://news.google.com/rss/search?q=台股&hl=zh-TW&gl=TW&ceid=TW:zh-Hant'
  )

  news.value = feed.items.map(i => ({
    title: i.title,
    link: i.link,
    pubDate: new Date(i.pubDate).toLocaleString()
  }))
}

const open = (url) => {
  window.open(url, '_blank')
}
</script>