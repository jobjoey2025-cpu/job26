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
        :options="['17 吋', '18 吋', '19 吋', '20 吋']"
      />
    </div>

    <div class="q-pa-md row items-start q-gutter-md flex justify-center">
      <q-card class="col-12 col-sm-6 col-md-3" flat bordered>
        <img src="./statics/Tire_a.jpg" />

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
        <img src="./statics/sticker.jpg" />

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
              <q-item-label
                >Sticker DIY</q-item-label
              >
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
    </div>
  </q-step>
</template>

<script setup>
defineProps({ config: Object });
</script>
