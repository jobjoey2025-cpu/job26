<template>
  <div>

    <div class="text-center d-flex pb-4">
      <v-btn class="ma-2" @click="all">
        All
      </v-btn>
      <v-btn class="ma-2" @click="none">
        None
      </v-btn>
    </div>

    <!-- <div class="pb-4">v-model {{ panel }}</div> -->
    <!-- <div class="pb-4" style="visibility:hidden">v-model {{ panel }}</div> -->

    <!-- <v-col cols="6" md="3" v-for="item in messages" :key="item.id"> -->
    <v-expansion-panels v-model="panel" multiple style="text-align:left">
      <!-- <v-expansion-panels v-model="panel" multiple v-for="item in panel" :key="item.id"> -->

      <!-- <v-expansion-panel title={{ item.title }} text="
        g12 機構設計 : 熟悉 產品機構設計 電腦輔助設計軟體操作 提供樣品圖樣 專利申請之事前調查分析.品質工程 : 品質工程也經過 半導體, 電子散熱, TFTLCD 等產品的學習, 做過 可靠度分析報告撰寫與彙整 執行產品可靠度測試與問題分析 新產品導入的材料評核與確認
        " value="foo2"></v-expansion-panel> -->

      <v-expansion-panel title="專案目的: 更新產品、新增功能、整合系統。" text="
        本車前燈結合前燈、方向燈和電子控制功能，目前市場上缺乏類似的產品，因此可以率先佔據市場先機。本款車燈可以滿足德國的相關規定，同時也滿足充足亮度的需求。整合前燈、方向燈和電子控制，提供一整套解決方案。    
        " value=" foo"></v-expansion-panel>

      <v-expansion-panel title="產品特點: 二合一車燈的優勢在於結合了近光和遠光功能。" text="
        二合一車燈的優勢在於結合了近光和遠光功能，方便騎行者根據路況隨時切換光源，確保清晰的視野。此外，搭配貨架燈的銷售策略，為客戶提供不同的選擇方案。因應生產時間過長問題，提供模組化的產品行銷，客戶可以直接使用現有模組，而不需要花費更多時間修改產品ID。同時，強調產品與各種主要的電動車馬達 (如BOSCH / SHIMANO / YAMANA / Panasonic) 的良好兼容性。
        " value=" foo1"></v-expansion-panel>

      <v-expansion-panel title="開發方式: 以相對高階品牌為主要開發客戶。" text="
      由於產品單價較高，因此會以相對高階品牌為主要開發客戶，前期先以E-CARGO車款為主要切入點。積極尋找CARGO車款產品經理，以期能夠切入目標客戶的產品車款。對於其他客戶，會以小量訂單為目標。        " value="baz">
      </v-expansion-panel>


    </v-expansion-panels>

  </div>
</template>

<script>
export default {
  name: 'ExpansionG12',

  // data() {
  //   return {
  //     panel: [],
  //   }
  // },

  data: () => ({
    show: false,
    panel: [
      {
        title: 'PTC 原廠授權教育訓練',
        text: `
        進階建模 (Advanced Modeling) ; 細節出圖(工程圖) ; 鈑金設計(Sheetmetal) ; 進階組件(AAX-Advanced Assembly) ; 高階曲面建模設計 (Surface) ; 自由曲面設計 (ISDX) ; 分析結構和熱特性 ;
        `,
        // img: 'ProE證書.jpg',
        // color: 'deep-purple-lighten-1',
      },
    ],
  }),


  methods: {
    all() {
      this.panel = ['foo', 'foo1',
        'bar',
        'baz']
    },
    none() {
      this.panel = []
    },
  },
} //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
