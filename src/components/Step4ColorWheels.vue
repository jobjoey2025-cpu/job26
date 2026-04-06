<template>
  <q-step :name="4" title="外觀與輪圈" icon="palette">
    <div class="q-gutter-md">
      <q-select
        v-model="config.color"
        label="顏色"
        :options="['白色', '黑色', '銀色', '紅色', '藍色']"
      />
      <q-select
        v-model="config.wheels"
        label="輪圈尺寸"
        :options="['2 吋', '3 吋', '4 吋', '5 吋']"
      />
    </div>

    <div class="q-pa-md row items-start q-gutter-md flex justify-center">
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <!-- <img src="./statics/Tire_a.jpg" /> -->
        <q-img
          v-for="img in tireImgs"
          :key="img"
          :src="img"
          class="thumb"
          style="width: 100%"
          @click="open(img)"
          fit="cover"
        />
        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://blog.csdn.net/sc_1313/article/details/140988712"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label
                >胎模型在滑移角 (α) 與橫向力 (Fy) 的關係</q-item-label
              >
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="tire_repair" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tire</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>圖形的意義</q-item-label>
              <q-item-label caption
                >小 α → 車子靈敏、抓地力正常。 大 α → 輪胎進入飽和區，可能
                轉向不足 或 轉向過度。 過大 α → 車子打滑，控制喪失。
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- ------------------- -->
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <!-- <img src="./statics/sticker.jpg" /> -->
        <q-img
          v-for="img in stickImgs"
          :key="img"
          :src="img"
          class="thumb"
          style="width: 100%"
          @click="open(img)"
          fit="cover"
        />

        <q-list>
          <q-item
            clickable
            tag="a"
            href="https://joey20090710.blogspot.com/2023/07/car-steaker-diy.html"
            target="_blank"
          >
            <q-item-section avatar>
              <q-icon color="primary" name="home" />
            </q-item-section>

            <q-item-section>
              <q-item-label>Sticker DIY</q-item-label>
              <q-item-label caption>Have a drink.</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="red" name="photo" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sticker</q-item-label>
              <q-item-label caption>electric_rickshaw</q-item-label>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section avatar>
              <q-icon color="amber" name="settings" />
            </q-item-section>

            <q-item-section>
              <q-item-label>圖形的意義</q-item-label>
              <q-item-label caption
                >目標：凸顯個人風格，同時兼顧賽事辨識度。
                撞色系：如螢光綠＋黑、藍＋橘，強烈視覺效果，常見於競技賽事。
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
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
defineProps({ config: Object });


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
const tireImgs = ["/img/Tire_a.jpg"];

const stickImgs = ["/img/sticker.jpg"];
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
