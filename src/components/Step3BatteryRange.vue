<template>
  <q-step :name="3" title="電池與續航" icon="battery_charging_full">
    <h5 style="text-align: center">以下選擇電池串聯數目 :</h5>
    <div class="q-gutter-md">
      <q-select
        v-model="config.battery"
        label="電池 串聯（Series）"
        :options="['1S', '2S', '3S', '4S']"
      />

      <br />
      <br />
      <h5 style="text-align: center">以下選擇電池放電倍率 :</h5>

      <div>電池 放電倍率 (ex 35C)：{{ config.range }} C</div>
      <p>
        馬達電流需求 ≦ 電池最大放電能力 (馬達最大 60A 👉 電池至少： → 60 × 1.5 =
        90A)
      </p>
      <div class="q-pa-md bg-grey-5 text-white">
        <!-- 左箭頭 -->
        <!-- <q-btn icon="chevron_left" round flat @click="decrease" /> -->
        <!-- label-always -->
        <!-- label -->
        <q-slider
          v-model="config.range"
          :min="20"
          :max="150"
          :inner-min="35"
          :inner-max="140"
          label
          label-always
          color="light-green"
        />
        <!-- 右箭頭 -->
        <!-- <q-btn icon="chevron_right" round flat @click="increase" /> -->
        <!-- 👉 label 不出現 = 99% 是初始值沒設好 -->
      </div>
    </div>

    <br /><br />
    <hr />
    <div class="q-pa-md row q-col-gutter-md justify-center">
      <!-- 卡片 1 -->
      <q-card class="col-12 col-sm-6 col-md-4" flat bordered>
        <!-- <q-img src="./statics/motor.jpg" /> -->
        <q-img
          v-for="img in bgImgs"
          :key="img"
          :src="img"
          class="thumb"
          style="width: 100%"
          @click="open(img)"
          fit="cover"
        />

        <q-card-section>
          <div class="text-h6">馬達與電池簡介</div>
          <div class="text-caption text-grey">Have a drink.</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center q-gutter-sm">
            <q-icon name="home" color="primary" />
            <span>Motor 基礎介紹</span>
          </div>

          <div class="row items-center q-gutter-sm q-mt-sm">
            <q-icon name="settings" color="amber" />
            <span class="text-caption">
              RC10 改裝重點：無刷馬達＋高容量電變
            </span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            label="前往"
            href="https://electric104.netlify.app/#/RCmotor"
            target="_blank"
          />
        </q-card-actions>
      </q-card>

      <!-- 卡片 2 -->
      <q-card class="col-12 col-sm-6 col-md-4" flat bordered>
        <!-- <q-img src="./statics/CFD.png" /> -->
        <q-img
          v-for="img in cfdImgs"
          :key="img"
          :src="img"
          class="thumb"
          style="width: 100%"
          @click="open(img)"
          fit="cover"
        />
        <q-card-section>
          <div class="text-h6">CFD 流場</div>
          <div class="text-caption text-grey">空氣動力分析</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center q-gutter-sm">
            <q-icon name="air" color="red" />
            <span>車體流場</span>
          </div>

          <div class="row items-center q-gutter-sm q-mt-sm">
            <q-icon name="settings" color="amber" />
            <span class="text-caption">
              空力套件升級（Xtreme Aerodynamics）
            </span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            label="查看"
            href="https://joey20090710.blogspot.com/2025/02/cfd-in-colab-2d-car-silhouette.html"
            target="_blank"
          />
        </q-card-actions>
      </q-card>

      <!-- 卡片 3 -->
      <q-card class="col-12 col-sm-6 col-md-4" flat bordered>
        <!-- <q-img src="./statics/RACE Software.png" /> -->
        <q-img
          v-for="img in softwareImgs"
          :key="img"
          :src="img"
          class="thumb"
          style="width: 100%"
          @click="open(img)"
          fit="cover"
        />

        <q-card-section>
          <div class="text-h6">底盤 / 懸吊 / 定位</div>
          <div class="text-caption text-grey">車輛結構核心</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row items-center q-gutter-sm">
            <q-icon name="car_repair" color="red" />
            <span>零件商店</span>
          </div>

          <div class="row items-center q-gutter-sm q-mt-sm">
            <q-icon name="settings" color="amber" />
            <span class="text-caption">
              底盤＋傳動＝性能核心，懸吊＝操控調整
            </span>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="primary"
            label="學習"
            href="https://race.software/academy/design-with-race-guide/"
            target="_blank"
          />
        </q-card-actions>
      </q-card>

      <q-card class="col-12 col-sm-6 col-md-4" flat bordered>
        <!-- 標題 -->
        <q-card-section>
          <div class="text-h6 text-primary">
            Q：後輪直徑 78mm / 齒輪比 6 / 轉速 15000 rpm 👉 求車速？
          </div>
        </q-card-section>

        <q-separator />

        <!-- 圖片 -->
        <q-card-section class="flex flex-center">
          <!-- <q-img
            src="./statics/speed_counter.jpg"
            spinner-color="white"
            style="width: 100%; max-width: 500px"
          /> -->
          <q-img
            v-for="img in gearImgs"
            :key="img"
            :src="img"
            class="thumb"
            style="width: 100%"
            @click="open(img)"
            fit="cover"
          />
        </q-card-section>

        <q-separator />

        <!-- 操作區（可選） -->
        <q-card-actions align="right">
          <q-btn flat color="primary" label="顯示解答" />
        </q-card-actions>
      </q-card>

      <div class="row justify-center q-pa-md">
        <q-card class="col-12 col-sm-10 col-md-8" flat bordered>
          <!-- 標題 -->
          <q-card-section>
            <div class="text-h6 text-primary">Q：如何從手冊找到零件資料？</div>
          </q-card-section>

          <q-separator />

          <!-- 內容 -->
          <q-card-section>
            <div class="row q-col-gutter-md">
              <!-- Team Associated -->
              <div class="col-12 col-md-6 text-center">
                <div class="text-subtitle1 q-mb-sm">Team Associated</div>
                <q-img
                  src="./statics/ae_part.jpg"
                  spinner-color="white"
                  style="width: 100%; max-width: 350px"
                />
              </div>

              <!-- Tamiya -->
              <div class="col-12 col-md-6 text-center">
                <div class="text-subtitle1 q-mb-sm">Tamiya</div>
                <q-img
                  src="./statics/tamiya_part.jpg"
                  spinner-color="white"
                  style="width: 100%; max-width: 350px"
                />
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <!-- 說明（可選） -->
          <q-card-section class="text-body2 text-grey-7">
            透過手冊中的 exploded view（爆炸圖），可以快速對應零件編號與名稱，
            是維修與改裝最重要的查詢方式。
          </q-card-section>
        </q-card>
      </div>
      <!-- joey 共用圖片放大 -->
      <q-dialog v-model="show">
        <q-card class="viewer">
          <q-img :src="currentImg" fit="contain" class="full-img" />
        </q-card>
      </q-dialog>
    </div>
  </q-step>
</template>

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
const bgImgs = ["/img/motor-DD2zCfe0.jpg"];

const cfdImgs = ["/img/CFD.png"];

const softwareImgs = ["/img/RACE Software.png"];

const gearImgs = ["/img/speed_counter.jpg"];

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      range: 60, // ✅ 預設值
    }),
  },
});
</script>
<style scoped>
body {
  background: #f5f5f5;
}
.thumb {
  /* width: 120px; */
  width: 99px;
  height: 30%;
  border: 1px solid #f6c3c3; /* 粗細、樣式、顏色 */
  box-sizing: border-box; /* 確保邊框計入 width，不跑版 */
  border-radius: 12px;
  margin: 4px;
  cursor: zoom-in;
}
/* display: block; 避免圖片下方出現空白間隙 */

.viewer {
  width: 90vw;
  height: 90vh;
}

.full-img {
  width: 100%;
  height: 100%;
}
</style>
