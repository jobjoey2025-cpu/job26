<template>
  <!-- <div class="q-pa-md"> -->
    <div>
    <!-- <h1 style="text-align: center">產品開發SOP</h1> -->
     <h4 style="text-align: center">產品開發SOP</h4>

     <!-- <H1>產品開發SOP</H1> -->
    <div class="row q-col-gutter-md">

        <div
          v-for="(item, i) in data2.slice(1)"
          :key="i"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
        <!-- 手機 平板 筆電 桌機 \\ row  → 橫排  col  → 欄位  gutter → 間距-->
        <q-card style="max-width: 300px">

          <q-img
            :src="item[2]"
            height="120px"
          >
          <!-- html 空心字 https://www.twblogs.net/a/5b8ca3312b7177188334303d -->
          <div
            class="absolute-bottom text-white text-subtitle2 q-pa-sm"
            style="text-shadow: 0 0 3px black"
          >
            {{ item[3] }}
          </div>
        </q-img>
      </q-card>
    </div>
  </div>
  </div>
</template>

<script>
// 記得要先 import axois
import axios from "axios";
// import axios .. 這一段範例 很難找, vuetify 是有 好範例 我那一段 才進展 比較快.
// MDBootstrap vue 範例 也不好. + 有一些要錢, so 好的 管道 is key. 我只能突破 一點點 & cost 3hrs up/次

export default {
  name: "imageGrid",

  data: function () {
    return {
      data2: [], // Arr:[]
    };
  },
  setup() {
    console.log("setup");
  },
  created() {
    console.log("created");
  },
  mounted() {
    // console.log("mountedj");
    axios
      .get(
        // 'https://randomuser.me/api/?results=5'
        "https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/G12sopGrid?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0"
      )
      .then((response) => {
        // 使用箭頭函示 this 才不會跑掉
        console.log(response);
        // this.data = response.data.results;
        // Arr.value = response.data.results;
        this.data2 = response.data.values;
        // Arr.value = response.data.values;
        this.show = true;
      });
  },
}; //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
