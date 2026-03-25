<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      vertical
      transition-prev="slide-down"
      transition-next="slide-up"
      swipeable
      animated
      control-color="white"
      navigation-icon="radio_button_unchecked"
      navigation
      padding
      arrows
      height="500px"
      class="bg-purple text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <!-- <q-icon name="style" size="56px" /> -->
        <!-- src="https://cdn.quasar.dev/img/mountains.jpg" -->
        <q-img
          src="./statics/t-250shell2.png"
          style="width: 660px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          VTOL（垂直起降）飛行器的機構設計通常結合航空工程、機械結構與控制系統。
          一般設計流程：  1 任務需求定義 2 Payload 計算 3 Flight time 計算 4 推進系統選擇 5 結構設計 6 CAD 建模 7 CFD / FEA 模擬 8 Prototype 9 Flight test
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <!-- <q-icon name="live_tv" size="56px" /> -->

        <q-img
          src="./statics/droneFish.png"
          style="width: 555px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          VTOL UAV 的 Payload（酬載）設計是整個系統設計的核心之一，因為它會直接影響 重量、續航、重心、推力配置與機體尺寸。通常設計流程是 先定義 Payload → 再設計飛機。
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <!-- <q-icon name="layers" size="56px" /> -->
        <q-img
          src="./statics/rc10.jpg"
          style="width: 450px; height: 150px; border-radius: 8px"
        />

        <div class="q-mt-md text-center">
          RC（遙控模型）常見的泡殼（Blister）通常是用真空成型（Vacuum Forming）製作透明機殼，例如 RC 飛機座艙罩、車殼、或 UAV 外罩。模具設計與射出模不同，重點在 脫模角度、材料厚度、通氣孔與加熱收縮補償。
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <!-- <q-icon name="terrain" size="56px" /> -->
        <q-img
          src="./statics/controlBOX2.jpg"
          style="width: 450px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          電工的工作內容包括：設計、安裝與維修電氣設備及配線系統，確保電力系統安全且穩定運行。負責更換老舊電線、插座、開關與斷路器，並進行馬達及控制電路的維修與保養。同時執行漏電檢測、絕緣測試及接地電阻測試，以確保設備符合安全規範。依據單線圖進行電氣設備接線與配電系統的組裝與架構配置。        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      slide: ref('style'),
      lorem:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.',
    }
  },
}
</script>
