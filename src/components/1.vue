<template>
  <div>
    <!-- 頁面目錄：改用 @click 觸發 -->
    <ul>
      <li><a href="#" @click.prevent="scrollTo('intro')">網站介紹</a></li>
      <li><a href="#" @click.prevent="scrollTo('contact')">聯絡我們</a></li>
    </ul>
    <h1>a</h1>
    <h1>a</h1>
    <h1>a</h1>
    <h1>a</h1>
    <!-- 內容區塊 -->
    <h2 id="intro">網站介紹</h2>
    <p>這裡是網站的介紹內容...</p>
    <h1>a</h1>
    <h1>a</h1>
    <h1>a</h1>
    <h1>a</h1>
    <h2 id="contact">聯絡我們</h2>
    <p>這是聯絡方式...</p>
  </div>
</template>

<script setup>
const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth", // 平滑捲動效果
      block: "start", // 對齊頂端
    });
  }
};
</script>
