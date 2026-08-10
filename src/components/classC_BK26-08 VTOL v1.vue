<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      animated
      swipeable
      navigation
      infinite
      height="420px"
      class="bg-grey-10 text-white rounded-borders"
    >
      <!-- Payload -->
      <q-carousel-slide name="tv" class="q-pa-md">
        <div class="carousel-content">
          <q-img src="./statics/droneFish.png" class="carousel-image" />
          <div class="info-card">
            <div class="text-h6 text-weight-bold">VTOL UAV Payload 設計</div>
            <div class="text-caption text-grey-4 q-mt-xs">
              酬載系統｜飛行性能｜機體配置
            </div>
            <div class="text-body2 text-grey-3 q-mt-md">
              VTOL UAV 的 Payload（酬載）設計是整個系統設計的核心之一，
              會直接影響重量、續航、重心、推力配置與機體尺寸。
              通常設計流程是「先定義 Payload，再設計飛機」。
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <!-- Vacuum Forming -->
      <q-carousel-slide name="layers" class="q-pa-md">
        <div class="carousel-content">
          <q-img src="./statics/rc10.jpg" class="carousel-image" />
          <div class="info-card">
            <div class="text-h6 text-weight-bold">RC 泡殼與真空成型</div>
            <div class="text-caption text-grey-4 q-mt-xs">
              Blister｜Vacuum Forming｜模具設計
            </div>
            <div class="text-body2 text-grey-3 q-mt-md">
              RC（遙控模型）常見的泡殼（Blister）通常採用真空成型 （Vacuum
              Forming）製作透明機殼，例如 RC 飛機座艙罩、 車殼或 UAV 外罩。
            </div>
            <div class="text-caption text-grey-5 q-mt-sm">
              重點：脫模角度・材料厚度・通氣孔・加熱收縮補償
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <!-- Electrical -->
      <q-carousel-slide name="map" class="q-pa-md">
        <div class="carousel-content">
          <q-img src="./statics/controlBOX2.jpg" class="carousel-image" />
          <div class="info-card">
            <div class="text-h6 text-weight-bold">電氣控制與配線</div>
            <div class="text-caption text-grey-4 q-mt-xs">
              配電｜控制電路｜安全檢測
            </div>
            <div class="text-body2 text-grey-3 q-mt-md">
              電工工作涵蓋電氣設備設計、安裝、維修與配線，
              確保電力系統安全且穩定運行。
            </div>
            <div class="text-caption text-grey-5 q-mt-sm">
              配線・馬達控制・漏電檢測・絕緣測試・接地測試
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
    };
  },
};
</script>
<style>

</style>
