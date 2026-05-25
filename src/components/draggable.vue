<template>
  <p style="text-align: center">draggable</p>
  <h3 class="q-pl-xl" style="text-align: center">朋友少 優招待的 Ideas</h3>

  <!-- ----- -->
  <div style="text-align: center">
    <q-btn
      color="grey-4"
      text-color="purple"
      glossy
      unelevated
      icon="format_image__right"
      label="Draggable Sample"
      href="https://sortablejs.github.io/vue.draggable.next/#/third-party"
      target="”_blank”"
    />
    _
    <q-btn
      color="grey-4"
      text-color="purple"
      glossy
      unelevated
      icon="format_image__right"
      label="Notion"
      href="https://www.notion.so/list-327020032b2980bf9456c23e32011b9f?source=copy_link"
      target="”_blank”"
    />
  </div>
  <br />

  <!-- ------ -->
  <div class="row q-col-gutter-md items-stretch">
    <!-- 左邊 -->
    <div class="col-12 col-sm-6">
      <div class="text-h6 q-mb-sm">Draggable 1</div>

      <draggable
        v-model="list1"
        group="people"
        item-key="id"
        class="drag-area bg-grey-2 q-pa-sm rounded-borders"
        @change="log"
      >
        <template #item="{ element, index }">
          <q-card class="q-mb-sm q-pa-sm text-h6">
            {{ element.name }} {{ index }}
          </q-card>
        </template>
      </draggable>
    </div>

    <!-- 右邊 -->
    <div class="col-12 col-sm-6">
      <div class="text-h6 q-mb-sm">Draggable 2</div>

      <draggable
        v-model="list2"
        group="people"
        item-key="id"
        class="drag-area bg-grey-2 q-pa-sm rounded-borders"
        @change="log"
      >
        <template #item="{ element, index }">
          <q-card class="q-mb-sm q-pa-sm">
            {{ element.name }} {{ index }}
          </q-card>
        </template>
      </draggable>
    </div>
  </div>

  <!-- --------- -->
  <div class="row q-col-gutter-md items-stretch">

  <!-- <div class="q-pl-xl"> -->
    <!-- <div class="row q-col-gutter-sm"> -->
      <!-- @change="log" -->

      <!-- Debug 區 -->
      <div class="col-6 col-sm-6">
        <q-card class="q-pa-sm">
          <div class="text-subtitle2">List 1</div>
          <pre>{{ list1 }}</pre>
        </q-card>
      </div>

      <div class="col-6 col-sm-6">
        <q-card class="q-pa-sm">
          <div class="text-subtitle2">List 2</div>
          <pre>{{ list2 }}</pre>
        </q-card>
      </div>
    <!-- </div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const list1 = ref([
  { name: "--- BUY List --- ", id: 39 },
  { name: "帳篷 行軍床 tent,", id: 41 },
  { name: "@ 薄木板 B&Q: 44cm * 119mm,", id: 41 },
  { name: "--- 招待 ---", id: 1 },
  { name: "加 爬山 重訓,", id: 2 },
  { name: "逛街吃飯,", id: 2 },
  { name: "百貨 / 新賣場,", id: 3 },
  { name: "夜市 2300 後,", id: 4 },
  { name: "西門,", id: 5 },
  { name: "24hr Donki,", id: 6 },
  { name: "海底撈,", id: 7 },
  { name: "--- show 嗜好 --- ", id: 8 },
  { name: "花錢的氣氛,", id: 9 },
  { name: "真空管（貴 & 少）,", id: 10 },
  { name: "手錶,", id: 11 },
  { name: "**沒螢幕 運動 生活時間", id: 11 },
  { name: "--- 俱樂部 活動 --- ", id: 12 },
  { name: "RC Car,", id: 13 },
  { name: "釣蝦唱歌,", id: 14 },
  { name: "TV Game,", id: 15 },
  { name: "露營,", id: 16 },
  { name: "高貴的自然活動,", id: 17 },
  { name: "無人機 / 3DP,", id: 18 },
  { name: "--- 文創 --- ", id: 19 },
  { name: "BLG,", id: 20 },
  { name: "流量,", id: 21 },
  { name: "插圖,", id: 22 },
  { name: "作詩,", id: 23 },
  { name: "包包 DIY,", id: 24 },
  { name: "Revit 構思圖集,", id: 25 },
  { name: "--- 優質情報 --- ", id: 26 },
  { name: "市集國貿,", id: 27 },
  { name: "展覽聊天,", id: 28 },
  { name: "English,", id: 29 },
  { name: "Bookstore / Library,", id: 30 },
  { name: "晶礦,", id: 31 },
  { name: "LEGO,", id: 32 },
  { name: "--- 工程專案 --- ", id: 33 },
  { name: "CAD / CAE / CNC / 3DP / VTOL-income,", id: 34 },
  { name: "做工的人,", id: 35 },
  { name: "小心危險（專業）,", id: 36 },
  { name: "5大管線,", id: 37 },
  { name: "電工丙", id: 38 },
  { name: "--- 攻城掠地 --- ", id: 39 },
  { name: "特朗普做的事,", id: 40 },
  { name: "股票,", id: 41 },
]);

const list2 = ref([
  { name: "--- 健康 爬山 重訓 ---", id: 1 },
  { name: "--- 招待 ---", id: 1 },
  { name: "--- show 嗜好 --- ", id: 2 },
  { name: "--- 俱樂部 活動 --- ", id: 3 },
  { name: "--- 文創 --- ", id: 4 },
  { name: "--- 優質情報 --- ", id: 5 },
  { name: "--- 工程專案 --- ", id: 6 },
  { name: "--- 攻城掠地 --- ", id: 7 },
]);

const log = (evt) => {
  console.log(evt);
};
</script>

<style scoped>
.drag-area {
  min-height: 400px;
  height: 100%;
}
</style>
