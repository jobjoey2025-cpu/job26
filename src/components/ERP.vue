<template>

  <q-page class="bg-grey-1">

  <!-- HERO -->
  <section class="bg-primary text-white text-center q-pa-xl">

  <h2>雲端智慧衣櫃與線上試衣系統</h2>

  <p class="text-subtitle1">
  ERP概念整合專題
  </p>

  <q-btn
  color="white"
  text-color="primary"
  label="查看系統模組"
  icon="expand_more"
  href="#modules"
  />

  </section>


  <!-- 專題介紹 -->
  <section class="q-pa-xl text-center">

  <h4>專題簡述</h4>

  <p class="text-body1" style="max-width:800px;margin:auto">

  設計並開發一套結合線上試衣、服裝資料管理與智慧推薦的 Web 系統。
  系統透過資料庫管理使用者衣物資料，並整合情境搭配與推薦分析，
  提供類似 ERP 商品管理與客戶資料管理的資訊整合架構。

  </p>

  </section>


  <!-- 系統模組 -->
  <section id="modules" class="bg-grey-2 q-pa-xl">

  <h4 class="text-center q-mb-lg">系統功能模組</h4>

  <div class="row q-col-gutter-md">

  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>會員管理</h6>
  <p>
  使用者註冊、登入驗證與個人資料管理
  </p>
  </q-card-section>
  </q-card>


  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>商品資料管理</h6>
  <p>
  衣服資料庫、商品分類與圖片管理
  </p>
  </q-card-section>
  </q-card>


  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>智慧衣櫃</h6>
  <p>
  使用者收藏衣物與個人衣櫃管理
  </p>
  </q-card-section>
  </q-card>


  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>線上試衣</h6>
  <p>
  透過圖層疊圖模擬衣服穿搭效果
  </p>
  </q-card-section>
  </q-card>


  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>推薦系統</h6>
  <p>
  建立服裝與情境關聯推薦
  </p>
  </q-card-section>
  </q-card>


  <q-card class="col-12 col-md-4">
  <q-card-section>
  <h6>購物車</h6>
  <p>
  商品加入購物車與購買流程
  </p>
  </q-card-section>
  </q-card>

  </div>

  </section>


  <!-- 技術架構 -->
  <section class="q-pa-xl">

  <h4 class="text-center q-mb-lg">技術架構</h4>

  <div class="row justify-center">

  <div class="col-12 col-md-8">

  <q-list bordered>

  <q-item>
  <q-item-section>
  前端：HTML / CSS / JavaScript
  </q-item-section>
  </q-item>

  <q-item>
  <q-item-section>
  RWD 響應式設計
  </q-item-section>
  </q-item>

  <q-item>
  <q-item-section>
  REST API + JSON
  </q-item-section>
  </q-item>

  <q-item>
  <q-item-section>
  資料庫管理系統
  </q-item-section>
  </q-item>

  <q-item>
  <q-item-section>
  3D 互動與資料視覺化
  </q-item-section>
  </q-item>

  </q-list>

  </div>

  </div>

  </section>


  <!-- 專案成果 -->
  <section class="bg-grey-2 q-pa-xl text-center">

  <h4>專案成果</h4>

  <p style="max-width:700px;margin:auto">

  完成一套具備線上試衣、雲端衣櫃與商品資料管理的 Web 系統，
  並整合會員管理與購物流程。系統採模組化設計，
  概念接近企業 ERP 商品與客戶資料管理架構。

  </p>

  </section>


  <!-- Footer -->
  <section class="bg-dark text-white text-center q-pa-lg">

  <p>
  Project Portfolio
  </p>

  </section>

  
  </q-page>

  </template>


  <script>

  export default {

  name: "erpPortfolio"

  }

  </script>