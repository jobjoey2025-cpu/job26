<template>
  <div>
    <div class="text-subtitle1 q-mb-sm">選擇品牌</div>
    <p>要先選擇 "品牌" 才能 "選擇車型"</p>
    <q-select
      filled
      v-model="config.brand"
      :options="brandOptions"
      label="品牌"
      class="q-mb-md"
      @update:model-value="config.model = ''"
    />

    <!-- 品牌參考圖 -->
    <div v-if="brandImage" class="q-mb-md flex flex-center">
      <q-img
        :src="brandImage"
        style="width: 200px; height: auto; border-radius: 8px"
        spinner-color="primary"
      />
    </div>

    <div class="text-subtitle1 q-mb-sm">選擇車型</div>
    <q-select
      filled
      v-model="config.model"
      :options="modelOptions"
      label="車型"
    />
    <br />
    <!-- 車型參考圖 -->
    <div v-if="modelImage" class="q-mt-md flex flex-center">
      <q-img
        :src="modelImage"
        style="width: 220px; height: auto; border-radius: 8px"
        spinner-color="primary"
      />
    </div>

    <!-- ----------------------- -->
    <hr />
    <h4 class="row justify-center">其他說明</h4>

    <div class="row q-col-gutter-lg">
      <!-- class="col-6 col-md-3" -->

      <!-- <div class="row justify-center"> -->
      <!-- style="height: 200px; object-fit: cover" -->

      <div class="col-12 col-md-3">
        <q-card class="my-card q-ma-md" bordered flat>
          <!-- 上方圖片 -->
          <q-img
            src="./statics/yokomo_car.jpg"
            alt="Yokomo Speed Car"
            style="width: 300px; object-fit: cover"
          >
            <div
              class="absolute-bottom text-white text-subtitle1 bg-black bg-opacity-50 q-pa-sm"
            >
              Yokomo Speed Car 系列
            </div>
          </q-img>

          <!-- 內容區 -->
          <q-card-section>
            <div class="text-h6">🏁 Team Yokomo</div>
            <div class="text-caption text-grey">
              高速度遙控賽車品牌，提供專業級比賽用車與升級零件。
            </div>
          </q-card-section>

          <!-- 操作區 -->
          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="前往官網"
              icon="launch"
              @click="openLink"
            />
          </q-card-actions>
        </q-card>
      </div>
      <!-- ------- -->
      <div class="col-12 col-md-3">
        <q-card class="my-card q-ma-md" bordered flat>
          <!-- 上方圖片 -->
          <q-img
            src="./statics/m-chassis2.jpg"
            alt="Yokomo Speed Car"
            style="width: 300px; object-fit: cover"
          >
            <div
              class="absolute-bottom text-white text-subtitle1 bg-black bg-opacity-50 q-pa-sm"
            >
              M-Chassis Body Guide
            </div>
          </q-img>

          <!-- 內容區 -->
          <q-card-section>
            <div class="text-h6">TAMIYA</div>
            <div class="text-caption text-grey">
              就是可愛。...................................................................
            </div>
          </q-card-section>

          <!-- 操作區 -->
          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="前往官網"
              icon="launch"
              type="a"
              href="https://www.thercracer.com/2025/01/tamiya-m-chassis-body-compatibility.html"
              target="_blank"
            />
          </q-card-actions>
        </q-card>
      </div>

      <!-- ------- -->
      <div class="col-12 col-md-3">
        <q-card class="my-card q-ma-md" bordered flat>
          <!-- 上方圖片 -->
          <q-img
            src="./statics/initial_D.jpg"
            alt="Mini-Z"
            style="width: 300px; object-fit: cover"
          >
            <div
              class="absolute-bottom text-white text-subtitle1 bg-black bg-opacity-50 q-pa-sm"
            >
              miniz_series
            </div>
          </q-img>

          <!-- 內容區 -->
          <q-card-section>
            <div class="text-h6">Kyosho</div>
            <div class="text-caption text-grey">
              1/28 方便蒐藏。但是要有賽道-用途（例如街跑、賽道、改裝）
            </div>
          </q-card-section>

          <!-- 操作區 -->
          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="前往官網"
              icon="launch"
              type="a"
              href="https://www.thercracer.com/2025/01/tamiya-m-chassis-body-compatibility.html"
              target="_blank"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  config: Object,
});

// 品牌列表
const brandOptions = ["ae", "TAMIYA", "Kyosho", "Yokomo"];

// 根據品牌自動顯示車型
const modelOptions = computed(() => {
  switch (props.config.brand) {
    case "ae":
      return ["RC10", "Associated", "Element"];
    case "TAMIYA":
      return [
        "房車TT-02",
        "M底盤",
        "大腳車/攀岩車/沙卡",
        "跑車",
        "越野車",
        "方程式賽車",
        "TRF",
        "Semi Assem",
        "卡車",
        "Tank",
      ];
    case "Hyundai":
      return ["bZ4X", "Prius"];
    case "Kyosho":
      return ["Mini-Z", "FAZER", "BIKE", "Plane", "BOAT"];
    case "Yokomo":
      return ["速度", "越野", "飄移"];
    default:
      return [];
  }
});

// 品牌參考圖
const brandImage = computed(() => {
  switch (props.config.brand) {
    case "ae":
      return "https://apps.associatedelectrics.com/downloads/thumbs/AE_Heritage_Logo_SQ-bw-300.png";
    case "TAMIYA":
      return "/img/tamiya.png";
    case "Hyundai":
      return new URL("./statics/rc10.jpg", import.meta.url).href;
    case "Kyosho":
      return "https://cdn.freebiesupply.com/logos/large/2x/kyosho-logo-png-transparent.png";
    case "Yokomo":
      return new URL("./statics/yokomo.png", import.meta.url).href;

    default:
      return "";
  }
});

// 車型參考圖
const modelImage = computed(() => {
  switch (props.config.model) {
    // ae_Team_A
    case "RC10":
      return new URL("./statics/rc10.jpg", import.meta.url).href;
    case "Associated":
      return new URL("./statics/B7.jpg", import.meta.url).href;
    case "Element":
      return new URL("./statics/Element.jpg", import.meta.url).href;
    // TAMIYA
    case "房車TT-02":
      return new URL("./statics/tt-02.jpg", import.meta.url).href;
    case "M底盤":
      return new URL("./statics/m-chassis.jpg", import.meta.url).href;
    case "大腳車/攀岩車/沙卡":
      return new URL("./statics/sand-car.jpg", import.meta.url).href;
    // Toyota
    case "bZ4X":
      return "https://i.imgur.com/h0VhW7R.png";
    case "Prius":
      return "https://i.imgur.com/4qM8Sk6.png";
    // Kyosho
    case "Mini-Z":
      return new URL("./statics/mini-z.jpg", import.meta.url).href;
    case "Kona EV":
      return "https://i.imgur.com/xP4TflW.jpeg";
    default:
      return "";
  }
});

// ------- ------- ------- -------
function openLink() {
  window.open("https://teamyokomo.com/speed-car/", "_blank");
}
</script>

<style scoped>
.my-card {
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}
</style>
