<template>
  <div class="q-pa-md">
    <q-separator />

    <h4 class="text-center q-my-lg">專案排程</h4>

    <!-- <q-timeline color="primary"> -->
      <q-timeline>

      <q-timeline-entry
        v-for="item in items"
        :key="item.id"
        :title="item.title"
        :subtitle="item.time"
        :color="item.color"
      >
        <!-- 說明 -->
        <q-banner
          dense
          rounded
          :class="'bg-' + item.color + ' text-white q-mb-sm'"
        >
          {{ item.card_subtitle }}
        </q-banner>

        <!-- 圖片 -->
        <div class="row q-gutter-sm">
          <q-img
            v-if="item.img1"
            :src="item.img1"
            style="width: 100px; height: 100px"
            fit="cover"
          />

          <q-img
            v-if="item.img2"
            :src="item.img2"
            style="width: 100px; height: 100px"
            fit="cover"
          />

          <q-img
            v-if="item.img3"
            :src="item.img3"
            style="width: 100px; height: 100px"
            fit="cover"
          />
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "timeline_g12",

  data() {
    return {
      items: [],
    };
  },

  mounted() {
    // 'https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/MRTverhical?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0'
    // sheetname 尾端不能是數字
    // GDS adress ;; / {{dashapi}} ?alt // G1 sheet_name:0224v-timeline
    // https://docs.google.com/spreadsheets/d/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/edit#gid=570248478

    axios
      .get(
        "https://sheets.googleapis.com/v4/spreadsheets/1EVEFyU56QLxzh4jzs4MPrRuXa3KAKkPFrZ80V6kKv9s/values/0224v-timeline?alt=json&key=AIzaSyDQJnRmuvThGNBt3Z3SLRliA4crPBg6BX0"
      )
      .then((response) => {
        let rows = response.data.values;

        const keyMap = {
          0: "x",
          1: "id",
          2: "time",
          3: "title",
          4: "card_subtitle",
          5: "icon",
          6: "color",
          7: "img1",
          8: "img2",
          9: "img3",
        };

        const mapped = rows.map((r) => {
          const obj = {};
          Object.keys(keyMap).forEach((k) => {
            obj[keyMap[k]] = r[k];
          });
          return obj;
        });

        this.items = mapped;
      });
  },
};
</script>

<style scoped></style>
