<template>
  <q-page class="q-pa-lg">
    <!-- Hero Section -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">Drift Car Engineering Portfolio</div>
      <div class="text-subtitle1">
        Mechanical Design | Manufacturing Integration | Cross-functional
        Communication
      </div>
    </div>
    <!-- Project Section -->
    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Project Overview</div>
        <p>
          *Project Background
          客戶希望在既有車系平台上，延伸開發「甩尾車型（Drift
          Variant）」，以符合市場趨勢並建立產品差異化。
          <br />
          *車台設計師就市面上的機種優化增加功能並加入客戶品牌風格。
          <br />
          *我幫助彌合了概念設計與可製造產品之間的差距，確保漂移平台既具備功能性又可以投入生產。
          <!-- 你設計了什麼?  -->
        </p>
      </q-card-section>
      <!-- 1️⃣ 整機照片 DC10 web -->

      <q-img
        v-for="img in bgImgs"
        :key="img"
        :src="img"
        class="thumb"
        @click="open(img)"
      />
    </q-card>
    <!-- KPI Section -->
    <div class="row q-col-gutter-md q-mb-xl">
      <!-- <div class="col-4"> -->
      <div class="col-12 col-md-6 col-lg-4">
        <q-card class="q-pa-md">
          <div class="text-h7">
            <li>協助設計師進行設計與開模規劃（DFM）</li>
            <li>作為工程窗口支援 PM 與客戶之技術溝通</li>
            <li>主導 3D列印樣品組裝成整車與測試</li>
          </div>
          <div class="text-center">🎯 Role & Responsibility</div>

          <div class="row q-gutter-sm q-mt-sm"></div>
        </q-card>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <q-card class="q-pa-md">
          <div class="text-h7">
            <li>DFM 與開模協調（回饋設計問題並推動修正）</li>
            <li>原型驗證（3D 列印快速製作關鍵零件）</li>
            <li>跨部門 / 客戶溝通（將工程語言轉換為客戶可理解資訊）</li>
          </div>
          <div class="text-center">⚙️ Engineering Contribution</div>
        </q-card>
      </div>
      <div class="col-12 col-md-6 col-lg-4">
        <q-card class="q-pa-md">
          <div class="text-h7">
            <li>成功將既有平台延伸為甩尾車型</li>
            <li>建立從設計 → 原型 → 驗證的快速開發流程</li>
            <li>降低開模風險，提升設計成熟度</li>
            <li>強化產品市場競爭力</li>
          </div>
          <div class="text-center">🚀 Outcome / Impact</div>
        </q-card>
      </div>
    </div>

    <Drift />

    <!-- Engineering Process -->
    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Engineering Iteration</div>

        <q-timeline>
          <q-timeline-entry
            title="Problem (需求功能開發)"
            subtitle="🎯 客戶回饋設計"
          >
            <li>專業的遙控漂移車手，就車輛的設定和設計偏好提供回饋。</li>
            <li>前輪輪距</li>
            <li>主銷後傾角</li>
            <li>馬達位置</li>
            <!-- 2️⃣ CAD airframe \ motor mount -->
            <!-- 你做了哪些零件? -->
            <!-- 6️⃣ 系統架構圖 GPT RCcar -->

            <q-img
              v-for="img in problem_Imgs"
              :key="img"
              :src="img"
              class="thumb"
              @click="open(img)"
            />
          </q-timeline-entry>
          <!-- 1️⃣ 整機照片 -->

          <q-timeline-entry
            title="⚙️系統架構（System Architecture）"
            subtitle="🎯 功能整合設計"
          >
            <li>傳動系統（Gearbox / Spur / Pinion）</li>
            <li>懸吊系統（Suspension Geometry）</li>
            <li>轉向系統（Steering Ackermann） 車架（Chassis Flex）</li>
            <q-img
              v-for="img in sys_Imgs"
              :key="img"
              :src="img"
              class="thumb"
              @click="open(img)"
            />
          </q-timeline-entry>
          <!-- 子系統拆解： -->
          <!-- 👉 建議你畫圖（很加分 -->
          <!-- 3D 放前面比較吸睛 -->
          <!-- DC10 TreeView  -->
          <!-- BOM excel img \\ (Bomb) \ composite structures-->
          <!-- 航太面試官最愛看 6 種圖： -->
          <!-- 2️⃣ CAD airframe 3️⃣ 爆炸圖 \ CAD爆炸圖怎麼展示  4️⃣ 內部電子配置 -->

          <q-timeline-entry
            title="👉 開模協調與工程圖定義"
            subtitle="🎯 製程設計"
          >
            <li>Tolerance stack-up & material expansion</li>
            <li>BOM report & 各零件對齊</li>
            <li>開模時間排程</li>
            <q-img
              v-for="img in mode_Imgs"
              :key="img"
              :src="img"
              class="thumb"
              @click="open(img)"
            />
          </q-timeline-entry>
          <!-- 👉 建議你畫圖（很加分）2D pdf-->

          <q-timeline-entry title="🚀 Prototype 驗證" subtitle="🎯 模具IQC驗證">
            <li>IQC 檢驗尺寸 配合件 硬度 顏色</li>
            <li>客戶試模 IQC 檢驗尺寸 與 車手試車</li>
            <li>Kit 組裝測試</li>

            <!-- 你測試了什麼? -->
            <q-img
              v-for="img in iqc_Imgs"
              :key="img"
              :src="img"
              class="thumb"
              @click="open(img)"
            />
          </q-timeline-entry>
          <!-- 3DP pic \ transition test-->
          <!-- 5️⃣ 飛行測試照片 \ YT DC10 video -->

          <q-timeline-entry title="🔥 Result" subtitle="🎯 銷售反饋與社群">
            <li>參加 sema show</li>
            <li>T2 修改事項</li>
            <li>彩盒與組裝說明書</li>
            <li>社群反應與對策</li>
            <q-img
              v-for="img in sell_Imgs"
              :key="img"
              :src="img"
              class="thumb"
              @click="open(img)"
            />
          </q-timeline-entry>
        </q-timeline>
        <!-- 開模品 \ 行銷 link img YT \ sema Show sells -->
      </q-card-section>
    </q-card>

    <!-- Skills -->
    <!-- 設計重點：面試官 30 秒就能看懂你的工程能力。 -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Engineering Skills</div>
        <q-chip color="primary" text-color="white"
          >能把問題收斂到可製造設計</q-chip
        >
        <q-chip color="primary" text-color="white"
          >設計 → 製造轉換（DFM）</q-chip
        >
        <q-chip color="primary" text-color="white">Tolerance Analysis</q-chip>

        <q-chip color="primary" text-color="white">Prototype 驗證與 IQC</q-chip>
      </q-card-section>
    </q-card>

    <!-- 共用圖片放大 -->
    <q-dialog v-model="show">
      <q-card class="viewer">
        <q-img :src="currentImg" fit="contain" class="full-img" />
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
// import { ref, onMounted } from "vue";

// import Drift from "components/Drift.vue";

import { ref } from "vue";

/* ========================
   🔥 共用圖片 viewer
======================== */
const show = ref(false);
const currentImg = ref("");

function open(img) {
  currentImg.value = img;
  show.value = true;
}

/* ========================
   🔥 圖片資料（public/img）
======================== */
const bgImgs = [
  "/img/dc10Chassis.jpg",
  "/img/dc10.jpg",
  "/img/Team-Associated-DC10-RWD-Drift-Car-11.jpg",
];

const problem_Imgs = [
  "/img/motor-mount.png",
  "/img/spacer.png",
  "/img/ackerman.png",
];

const sys_Imgs = [
  "/img/mst.jpg",
  "/img/dc10Tr.png",
  "/img/shocks.png",
  "/img/KPI.png",
  "/img/gear-mesh.png",
  "/img/tree.png",
];

const mode_Imgs = [
  "/img/mode.png",
  "/img/report.png",
  "/img/spring cup.png",
  "/img/2d.png",
];

const iqc_Imgs = [
  "/img/iqc.png",
  "/img/iqc_report.png",
  "/img/gear_mesh_dc10.png",
  "/img/mode_ca.png",
  "/img/mode懸吊.png",
  "/img/懸吊.jpg",
];

const sell_Imgs = [
  "/img/SEMA-Show-23.jpg",
  "/img/20260329015.jpg",
  "/img/Spur gear.png",
  "/img/20260329014.jpg",
  "/img/20260329016.jpg",
  // "/img/20260329013.jpg",

  "/img/2026032921.jpg",
];
</script>

<style scoped>
body {
  background: #f5f5f5;
}
.thumb {
  /* width: 120px; */
  width: 222px;
  height: 99px;
  border-radius: 12px;
  cursor: zoom-in;
}

.viewer {
  width: 90vw;
  height: 90vh;
}

.full-img {
  width: 100%;
  height: 100%;
}
</style>
