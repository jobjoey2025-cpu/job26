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
      height="300px"
      class="bg-purple text-white shadow-1 rounded-borders"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <!-- <q-icon name="style" size="56px" /> -->
        <!-- src="https://cdn.quasar.dev/img/mountains.jpg" -->
        <q-img
          src="./statics/20250923002.png"
          style="width: 150px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          電工的工作內容為：「設計、安裝、維修電氣設備與配線系統，確保安全與可靠運行。」
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <!-- <q-icon name="live_tv" size="56px" /> -->

        <q-img
          src="./statics/singleWire.png"
          style="width: 150px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          「單線圖（Single Line Diagram, SLD）」最大特性就是
          以簡單的一條線表示複雜的三相電路，藉此清晰呈現
          電氣設備的組合與配電系統架構，但不會表達安裝細節。
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <!-- <q-icon name="layers" size="56px" /> -->
        <q-img
          src="./statics/controlBOX.jpg"
          style="width: 150px; height: 150px; border-radius: 8px"
        />

        <div class="q-mt-md text-center">
          更換老舊電線、插座、開關、斷路器。\\ 馬達、控制電路的維修與保養。\\
          漏電檢測、絕緣測試、接地電阻測試。
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <!-- <q-icon name="terrain" size="56px" /> -->
        <q-img
          src="./statics/1phaseMotor.png"
          style="width: 150px; height: 150px; border-radius: 8px"
        />
        <div class="q-mt-md text-center">
          室內配線：燈具、插座、開關、配電盤。\\ 定期檢查配電系統、安全開關、保護裝置。\\
          故障排除（跳電、短路、電壓不穩、設備不啟動）。
        </div>
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
