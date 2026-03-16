<template>
  <!-- <v-app> -->
  <div style="margin: 10px;">

    <!-- v-timeline0224 -->
    <br />
    <hr>
    <h1>專案排程</h1>
    <!-- https://fontawesome.com/icons/ -->
    <br />
  
    <!-- <v-timeline side="end"> -->
    <v-timeline align-top dense>
      <v-timeline-item v-for="item in items" :key="item.id" :dot-color="item.color" size="small">

        <v-row class="pt-1">
          <v-col cols="3">
            <strong>{{item.time}}</strong>
          </v-col>
          <v-col>
            <strong style="font-size:8px;">{{item.title}}</strong>
            <!-- <div class="text-caption">
              describe
            </div> -->
          </v-col>
        </v-row>

        <!-- width="30%" -->
        <!-- <v-alert :value="true" :color="item.color" :icon="item.icon" > -->
          <v-alert :value="true" :color="item.color" >
          {{item.card_subtitle}}
        </v-alert>

        <v-avatar size="100" rounded="0" class="mt-2 mr-3">
          <v-img :src="`${item.img1}`" cover></v-img>
          <!-- <v-img :src="`${item.pathIMG}`" style="float:left;width:60px;height:50px;" cover></v-img> -->
          <!-- <v-img src="{{item.img1}}"></v-img> -->
        </v-avatar>

        <v-avatar size="100" rounded="0" class="mt-2 mr-3">
          <v-img :src="`${item.img2}`" cover></v-img>
        </v-avatar>

        <v-avatar size="100" rounded="0" class="mt-2 mr-3">
          <v-img :src="`${item.img3}`" cover></v-img>
        </v-avatar>

      </v-timeline-item>
    </v-timeline>

    <!-- <footer class="bg-light text-center text-lg-start">
      <div class="text-center p-3 text-light" style="background-color: rgba(76,175,80)">
        © 2020 Copyright:
        <a class="text-light" href="https://9stepapps.blogspot.com/">9stepapps.com</a>
      </div>
    </footer> -->

  </div>
  <!-- </v-app> -->

</template>

<script>

// 記得要先 import axois
import axios from "axios";
// import axios .. 這一段範例 很難找, vuetify 是有 好範例 我那一段 才進展 比較快. 
// MDBootstrap vue 範例 也不好. + 有一些要錢, so 好的 管道 is key. 我只能突破 一點點 & cost 3hrs up/次

export default {
  name: 'timeline_g12',
  // props: { msg: String }

  data: function () {
    return {
      // data2: [] 
      items: [],
      // 搜尋
      // searchWords: '',
      // show: false,

      // items: [
      //   {
      //     id: 1,
      //     color: 'info',
      //     icon: 'mdi-information',
      //   },
      //   {
      //     id: 2,
      //     color: 'error',
      //     icon: 'mdi-alert-circle',
      //   },
      // ],
    }
  },

  mounted: function () {
    console.log("mounted");
    axios.
      get(
        // 'https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/MRTverhical?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0'
        'https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/0224v-timeline?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0'
        // sheetname 尾端不能是數字
        // GDS adress ;; / {{dashapi}} ?alt
        // https://docs.google.com/spreadsheets/d/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/edit#gid=570248478      
      )
      .then(response => {       // 使用箭頭函示 this 才不會跑掉


        // this.data2 = response.data.values
        this.items = response.data.values
        // console.log(this.items);
        // 檢查GDS 傳過來的 data



        // 產生新 array, 用 for loop 把矩陣中的矩陣 轉成物件, forEach & map 都是undefined 
        let newrr = [];
        let newb = {};
        let keyMap = {};
        let mappedData = [];



        for (let i = 0; i < this.items.length; i++) {
          // text += arr[i].push('老媽') ;	
          // console.log("joey");
          // console.log(this.data2[i]);
          newb = Object.assign({}, this.items[i]);
          // console.log(newb);



          // 置換 物件中 的 key 標籤, vue 不吃 number key
          // keyMap = { 0: "x", 1: "id", 2: "title", 3: "card_subtitle",4: "path", 5: "hyperLink", 6: "hyperLink_name",  };
          keyMap = { 0: "x", 1: "id", 2: "time", 3: "title", 4: "card_subtitle", 5: "icon", 6: "color", 7: "img1", 8: "img2", 9: "img3" };
          mappedData = Object.keys(keyMap).reduce((obj, k) => Object.assign(obj, { [keyMap[k]]: newb[k] }), {});


          // newrr[i] = newb //方法2. 利用 []： array[index] 塞入新元素
          newrr[i] = mappedData
        }

        // console.log(newrr);
        // console.log(this.data2);
        // 把 newrr 變成 this.data2, cuz newrr 一直傳不到 model, 突然想到的辦法
        this.items = newrr
        // console.log(this.items);
      })
  },





} //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
