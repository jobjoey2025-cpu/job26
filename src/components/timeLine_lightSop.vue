<template>
  <div>
    <!-- Takes an ordered list and renders a responsive timeline try resizing the viewport -->
    <h1>產品設計SOP</h1>
    <ol>
      <li v-for="n in items.slice(1)" :key="n.id">
        <!-- <v-img :src="`${n.pathIMG}`" style="float:left;width:100px;height:80px;" cover></v-img> -->
        <q-img
          :src="n.pathIMG"
          style="width: 100px; height: 80px"
          fit="cover"
        />
        <!-- <p class="event-date">October 1993</p> -->
        <h5 style="font-size: 1em">{{ n.title }}</h5>
        <h6 style="font-size: 0.5em">{{ n.card_subtitle }}</h6>
      </li>
    </ol>
  </div>
</template>

<script>
// 記得要先 import axois
import axios from "axios";
// import axios .. 這一段範例 很難找, vuetify 是有 好範例 我那一段 才進展 比較快.
export default {
  name: "timeLine_lightSop",

  data: function () {
    return {
      items: [],
      // 搜尋
      // searchWords: '',
    };
  },
  mounted: function () {
    console.log("mounted");
    axios
      .get(
        "https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/G12sopTimeline2a?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0"

        // GDS adress ;; / {{dashapi}} ?alt
        // https://docs.google.com/spreadsheets/d/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/edit#gid=570248478
      )
      .then((response) => {
        // 使用箭頭函示 this 才不會跑掉

        // this.data2 = response.data.values
        this.items = response.data.values;
        console.log(this.items);
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
          // keyMap = { 0: "x", 1: "id", 2: "title", 3: "path", 4: "hyperLink", 5: "hyperLink_name", 6: "card_subtitle" };
          keyMap = {
            0: "x",
            1: "id",
            2: "title",
            3: "pathIMG",
            4: "hyperLink",
            5: "hyperLink_name",
            6: "card_subtitle",
            7: "query",
          };
          mappedData = Object.keys(keyMap).reduce(
            (obj, k) => Object.assign(obj, { [keyMap[k]]: newb[k] }),
            {}
          );

          // newrr[i] = newb //方法2. 利用 []： array[index] 塞入新元素
          newrr[i] = mappedData;
        }
        // console.log(newrr);
        // console.log(this.data2);
        // 把 newrr 變成 this.data2, cuz newrr 一直傳不到 model, 突然想到的辦法
        this.items = newrr;
        // console.log(this.items);
      });
  },
}; //export default
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* html {
  font-size: 10px;
} */

/* h1 {
  font-size: 10px;
} */
:root {
  font-family: sans-serif;
  /* font-size: 10px; */
}

ol {
  margin: 0;
  list-style: none;
  padding: 0;
  --hue: 1;
  --unit: 1rem;
}

h1 {
  text-align: center;
}

p {
  line-height: 1.3;
}

.event-date {
  margin: 0 0 0.25rem;
  font-weight: bold;
}

.event-description {
  margin: 0;
}

li {
  --height: 7rem;
  position: relative;
  display: block;
  background-color: hsl(calc(var(--hue) * 360 / 20), 90%, 65%);
  border-color: hsl(calc(var(--hue) * 360 / 20), 90%, 65%);
  padding: 1rem;
  margin: 2rem 0;
}

li::before {
  content: "";
  background-color: inherit;
  position: absolute;
  display: block;
  width: var(--unit);
  height: var(--unit);
  top: 100%;
  left: calc(50% - (var(--unit) / 2));
}

li::after {
  content: "";
  position: absolute;
  display: block;
  top: calc(100% + var(--unit));
  left: calc(50% - (var(--unit)));
  border: var(--unit) solid transparent;
  border-top-color: inherit;
}

li:last-child::before,
li:last-child::after {
  content: none;
}

li:nth-child(20n + 1) {
  --hue: 1;
}

li:nth-child(20n + 2) {
  --hue: 2;
}

li:nth-child(20n + 3) {
  --hue: 3;
}

li:nth-child(20n + 4) {
  --hue: 4;
}

li:nth-child(20n + 5) {
  --hue: 5;
}

li:nth-child(20n + 6) {
  --hue: 6;
}

li:nth-child(20n + 7) {
  --hue: 7;
}

li:nth-child(20n + 8) {
  --hue: 8;
}

li:nth-child(20n + 9) {
  --hue: 9;
}

li:nth-child(20n + 10) {
  --hue: 10;
}

li:nth-child(20n + 11) {
  --hue: 11;
}

li:nth-child(20n + 12) {
  --hue: 12;
}

li:nth-child(20n + 13) {
  --hue: 13;
}

li:nth-child(20n + 14) {
  --hue: 14;
}

li:nth-child(20n + 15) {
  --hue: 15;
}

li:nth-child(20n + 16) {
  --hue: 16;
}

li:nth-child(20n + 17) {
  --hue: 17;
}

li:nth-child(20n + 18) {
  --hue: 18;
}

li:nth-child(20n + 19) {
  --hue: 19;
}

li:nth-child(20n + 20) {
  --hue: 20;
}

@media (min-width: 550px) and (max-width: 899px) {
  li {
    /* margin: 1rem; */
    /* 修改 margin fixed block 不對齊 */
    margin: 2rem;
    width: calc(50% - 4rem);
    float: left;
    min-height: var(--height);
  }

  li:nth-child(4n + 3),
  li:nth-child(4n + 4) {
    float: right;
  }

  li:nth-child(4n + 1)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: 100%;
  }

  li:nth-child(4n + 1)::after {
    top: calc(var(--height) / 2);
    left: calc(100% + (var(--unit)));
    border: var(--unit) solid transparent;
    border-left-color: inherit;
  }

  li:nth-child(4n + 3)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: -1rem;
  }

  li:nth-child(4n + 3)::after {
    top: calc(var(--height) / 2);
    left: -3rem;
    border: var(--unit) solid transparent;
    border-right-color: inherit;
  }
}

@media (min-width: 900px) and (max-width: 1199px) {
  li {
    /* margin: 1rem; */
    margin: 2rem;
    width: calc(33.33% - 4rem);
    float: left;
    min-height: 7rem;
  }

  li:nth-child(6n + 4),
  li:nth-child(6n + 5),
  li:nth-child(6n + 6) {
    float: right;
  }

  li:nth-child(6n + 1)::before,
  li:nth-child(6n + 2)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: 100%;
  }

  li:nth-child(6n + 1)::after,
  li:nth-child(6n + 2)::after {
    top: 3.5rem;
    left: calc(100% + (var(--unit)));
    border: var(--unit) solid transparent;
    border-left-color: inherit;
  }

  li:nth-child(6n + 4)::before,
  li:nth-child(6n + 5)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: -1rem;
  }

  li:nth-child(6n + 4)::after,
  li:nth-child(6n + 5)::after {
    top: calc(var(--height) / 2);
    left: -3rem;
    border: var(--unit) solid transparent;
    border-right-color: inherit;
  }
}

@media (min-width: 1200px) {
  ol {
    max-width: 1600px;
    margin: 0 auto;
  }

  li {
    /* margin: 1rem; */
    margin: 2rem;
    width: calc(25% - 4rem);
    float: left;
    min-height: 7rem;
  }

  li:nth-child(8n + 5),
  li:nth-child(8n + 6),
  li:nth-child(8n + 7),
  li:nth-child(8n + 8) {
    float: right;
  }

  li:nth-child(8n + 1)::before,
  li:nth-child(8n + 2)::before,
  li:nth-child(8n + 3)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: 100%;
  }

  li:nth-child(8n + 1)::after,
  li:nth-child(8n + 2)::after,
  li:nth-child(8n + 3)::after {
    top: calc(var(--height) / 2);
    left: calc(100% + (var(--unit)));
    border: var(--unit) solid transparent;
    border-left-color: inherit;
  }

  li:nth-child(8n + 5)::before,
  li:nth-child(8n + 6)::before,
  li:nth-child(8n + 7)::before {
    top: calc(var(--height) / 2 + var(--unit) / 2);
    left: -1rem;
  }

  li:nth-child(8n + 5)::after,
  li:nth-child(8n + 6)::after,
  li:nth-child(8n + 7)::after {
    top: calc(var(--height) / 2);
    left: -3rem;
    border: var(--unit) solid transparent;
    border-right-color: inherit;
  }
}
</style>
