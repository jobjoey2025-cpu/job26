<template>
  <div class="q-pa-md">

    <!-- 按鈕 -->
    <div class="text-center q-pb-md">
      <q-btn class="q-mx-sm" label="All" color="primary" @click="all" />
      <q-btn class="q-mx-sm" label="None" color="grey" @click="none" />
    </div>

    <!-- Expansion -->
    <div style="text-align:left">

      <q-expansion-item
        v-model="openPanels.foo"
        label="專案目的: 更新產品、新增功能、整合系統。"
        icon="lightbulb"
      >
        <div class="q-pa-sm">
          本車前燈結合前燈、方向燈和電子控制功能，目前市場上缺乏類似產品，
          可以率先佔據市場先機。本款車燈可以滿足德國相關規定，
          同時也滿足充足亮度需求。整合前燈、方向燈與電子控制，
          提供一整套解決方案。
        </div>
      </q-expansion-item>


      <q-expansion-item
        v-model="openPanels.foo1"
        label="產品特點: 二合一車燈的優勢在於結合近光和遠光功能"
        icon="highlight"
      >
        <div class="q-pa-sm">
          二合一車燈結合近光與遠光功能，騎行者可依路況隨時切換，
          確保清晰視野。搭配貨架燈銷售策略，
          提供不同方案。

          同時強調產品與主流電動車馬達
          (BOSCH / SHIMANO / YAMAHA / Panasonic)
          的兼容性。
        </div>
      </q-expansion-item>


      <q-expansion-item
        v-model="openPanels.baz"
        label="開發方式: 以高階品牌為主要開發客戶"
        icon="engineering"
      >
        <div class="q-pa-sm">
          產品單價較高，因此會以高階品牌為主要開發客戶，
          前期先以 E-CARGO 車款為主要切入點。
          積極尋找 CARGO 車款產品經理，
          以期切入目標客戶產品。
        </div>
      </q-expansion-item>

    </div>

  </div>
</template>

<script>

export default {
  name: "ExpansionG12",

  data () {
    return {
      openPanels: {
        foo: false,
        foo1: false,
        baz: false
      }
    }
  },

  methods: {

    all () {
      Object.keys(this.openPanels).forEach(k => {
        this.openPanels[k] = true
      })
    },

    none () {
      Object.keys(this.openPanels).forEach(k => {
        this.openPanels[k] = false
      })
    }

  }

}

</script>

<style scoped>
</style>