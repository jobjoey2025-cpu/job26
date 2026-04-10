<template>
  <!-- https://xrtechgroup.com/top-10-drone-in-a-box-solution/ -->
  <q-page class="q-pa-md bg-grey-1">
    <!-- 標題 -->
    <div class="text-h4 q-mb-md">無人機 與 地面站基地管理</div>

    <div class="text-subtitle2 text-grey-7 q-mb-lg">
      Automated & Intelligent Drone Base
    </div>

    <!-- ----- -->
    -
    <div class="row q-col-gutter-md">
      <!-- 功能介紹 -->
      <q-card class="col-6 q-mx-md shadow-2">
        <!-- 標題 -->
        <q-card-section>
          <div class="text-h6 text-weight-bold" style="text-align: center;">Drone 任務閉環系統</div>
          <div class="text-subtitle2 text-grey" style="text-align: center;">
            任務 → 飛行 → 數據 → 維修 → 優化
          </div>
        </q-card-section>
        <p style="text-align: center;"> 任務 → Input <br>飛行 → Process <br> 數據 → Feedback <br>維修 → Correction <br>優化 →
          Learning </p>

        <q-separator />

        <!-- 流程 -->
        <q-card-section>
          <div class="row items-center justify-between flow-wrap">
            <!-- 任務 -->
            <div class="col-auto text-center">
              <q-icon name="assignment" size="40px" color="primary" />
              <div class="q-mt-sm">任務</div>
            </div>

            <q-icon name="arrow_forward" />

            <!-- 飛行 -->
            <div class="col-auto text-center">
              <q-icon name="flight" size="40px" color="primary" />
              <div class="q-mt-sm">飛行</div>
            </div>

            <q-icon name="arrow_forward" />

            <!-- 數據 -->
            <div class="col-auto text-center">
              <q-icon name="analytics" size="40px" color="primary" />
              <div class="q-mt-sm">回傳數據</div>
            </div>

            <q-icon name="arrow_forward" />

            <!-- 維修 -->
            <div class="col-auto text-center">
              <q-icon name="build" size="40px" color="primary" />
              <div class="q-mt-sm">維修判斷</div>
            </div>

            <q-icon name="arrow_forward" />

            <!-- 優化 -->
            <div class="col-auto text-center">
              <q-icon name="trending_up" size="40px" color="primary" />
              <div class="q-mt-sm">任務優化</div>
            </div>
          </div>
        </q-card-section>
        <!-- <q-card class="q-mb-md shadow-2"> -->
        <q-card-section>
          <q-separator />
          <br>
          <div class="text-h6 q-mb-sm" style="text-align: center;">系統功能</div>

          <q-list dense style="text-align: center;">
            <q-item>
              <q-item-section>基地自動化保養</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>無人機維修紀錄管理</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>套版任務（農藥噴灑 / 橋梁巡檢）</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Pix4Dcapture / Litchi 任務整合 OS</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>最後一公里配送應用</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-4 q-mx-md shadow-2">
        <!-- <q-card class="q-mb-md"> -->
        <!-- <q-card class="col-6 q-mx-md shadow-2"> -->

        <!-- <q-img
          src="./statics/dhl.jpg"
          style="width: 200px; height: 200px"
          fit="cover"
        /> -->

        <div class="row q-gutter-sm q-mt-sm">
          <q-img
            v-for="img in bgImgs"
            :key="img"
            :src="img"
            class="thumb"
            @click="open(img)"
          />
        </div>
      </q-card>
    </div>
    <br />

    <!-- ----- -->
    <!-- 系統流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">運作流程</div>

        <div class="row items-center justify-around">
          <q-chip color="grey-7" text-color="white">任務設定</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="blue">無人機執行</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="green">資料回傳</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="orange">飛行日誌紀錄</q-chip>
          <!-- <q-icon name="arrow_forward" /> -->

          <q-chip color="purple">基地保養維護</q-chip>
        </div>
      </q-card-section>
    </q-card>
    <br />

    <!-- 機電保養 -->
    <div class="row q-col-gutter-md">
      <!-- 電力 -->
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6">電力系統</div>

          <q-list dense>
            <q-item
              ><q-item-section>ATS 自動切換測試 (台電)</q-item-section></q-item
            >
            <q-item><q-item-section>發電機測試</q-item-section></q-item>
            <q-item
              ><q-item-section>停電 Timer 校正 / 復歸</q-item-section></q-item
            >
            <!-- <q-item><q-item-section>影像紀錄（GoPro / 手機）</q-item-section></q-item> -->

            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in ee_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>

            <!-- <q-img
              src="./statics/generator.jpg"
              style="width: 100px; height: 100px"
              fit="cover"
            />
            <q-img
              src="./statics/generator2.jpg"
              style="width: 100px; height: 100px"
              fit="cover"
            />
            <q-img
              src="./statics/generator3.png"
              style="width: 100px; height: 100px"
              fit="cover"
            />
            <q-img
              src="./statics/clock.jpg"
              style="width: 100px; height: 100px"
              fit="cover"
            /> -->
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 水系統 -->
      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6">給排水系統</div>

          <q-list dense>
            <q-item><q-item-section>AB 泵交換測試</q-item-section></q-item>
            <q-item><q-item-section>高低水位浮球測試</q-item-section></q-item>
            <q-item
              ><q-item-section
                >管路清潔與阻塞檢查 ;; 排水 / 積水 / 漏水檢查</q-item-section
              ></q-item
            >
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in water_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 弱電 + 安全 -->
    <div class="row q-col-gutter-md q-mt-md">
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6">弱電系統</div>

          <q-list dense>
            <q-item><q-item-section>電信系統檢查</q-item-section></q-item>
            <q-item
              ><q-item-section>紅外線警報器 / 監控調閱</q-item-section></q-item
            >
            <q-item><q-item-section>照明控制</q-item-section></q-item>
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in monitor_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6">安全系統</div>

          <q-list dense>
            <q-item><q-item-section>瓦斯 / 地震監測</q-item-section></q-item>
            <q-item><q-item-section>火警消防系統</q-item-section></q-item>
            <q-item><q-item-section>受信總機測試</q-item-section></q-item>
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in fire_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 維運 -->
    <div class="row q-col-gutter-md q-mt-md">
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6 q-mb-sm">維運與管理</div>

          <q-list dense>
            <q-item><q-item-section>抄表 / 巡場</q-item-section></q-item>
            <q-item
              ><q-item-section
                >設備清潔與潤滑 / 功能測試 / 放樣</q-item-section
              ></q-item
            >
            <q-item
              ><q-item-section>年度保養 / 發電機測試</q-item-section></q-item
            >
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in maintain_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 文書與系統 -->
      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6 q-mb-sm">文書與數位化</div>

          <q-list dense>
            <q-item><q-item-section>任務提示 / 日報</q-item-section></q-item>
            <q-item
              ><q-item-section
                >保養紀錄表 / 維修建議回報</q-item-section
              ></q-item
            >
            <q-item
              ><q-item-section
                >工單系統 / 佈告欄 / LINE 通知 / 收尾檢查表</q-item-section
              ></q-item
            >
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in doc_Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <!-- 願景 -->
    <q-card class="q-mt-md bg-black text-white">
      <q-card-section>
        <div class="text-h6">系統願景</div>

        <div class="q-mt-sm">
          建立無人機基地自動化管理平台，整合機電保養、任務派遣與資料回傳，
          解決城市最後一公里配送與巡檢問題。
        </div>
      </q-card-section>
    </q-card>

    <!-- 共用圖片放大 -->
    <q-dialog v-model="show">
      <q-card class="viewer">
        <q-img :src="currentImg" fit="contain" class="full-img" />
      </q-card>
    </q-dialog>
  </q-page>
  <p>DroneBox</p>
</template>

<!-- <script>
export default {
  name: "DroneBaseDashboard",
};
</script> -->

<script setup>
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
  "/img/dhl.jpg",
  "/img/20260329010.jpg",
  "/img/20260329009.jpg",
  "/img/20260329008.jpg",
  "/img/20260329005.jpg",
  "/img/The-design-of-the-drones-base-in-Tinkercad.png",
  "/img/20260329011.jpg",
];

const ee_Imgs = [
  "/img/generator.jpg",
  "/img/generator2.jpg",
  "/img/generator3.png",
  "/img/clock.jpg",
];

const water_Imgs = ["/img/water.jpg", "/img/water2.jpg", "/img/water3.png"];

const monitor_Imgs = [
  "/img/monitor.jpg",
  "/img/monitor2.jpg",
  "/img/monitor3.jpg",
];

const fire_Imgs = [
  "/img/fire.png",
  "/img/fire2.png",
  "/img/fire3.png",
  "/img/fire4.png",
];

const maintain_Imgs = [
  "/img/maintain.jpg",
  "/img/maintain2.png",
  "/img/maintain3.jpg",
  "/img/maintain4.jpg",
];

const doc_Imgs = ["/img/generator2.jpg", "/img/water2.jpg", "/img/doc.jpg"];
</script>

<style scoped>
.thumb {
  width: 120px;
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

.flow-wrap {
  flex-wrap: wrap;
  gap: 12px;
}
</style>
