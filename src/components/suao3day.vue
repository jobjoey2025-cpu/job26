<template>
  <q-page padding class="bg-grey-2">
    <div class="q-mx-auto" style="max-width: 900px">
      <!-- Title -->
      <div class="text-h4 text-bold q-mb-lg">
        SuAo 3Day 搬遷 / 出發 Checklist
      </div>
      <p>* 應該就是這樣 \ 先能拆裝潢 再說</p>
      <p>* 6/5 Leave - computex (ai 補見識差距) \ 早早就出發</p>

      <p>車子 裝備補滿 -- 這個 GPT 想不到 但可以排版 check list</p>
      <p>補買 : 再買 5箱 花錢買保險</p>

      <!-- 出發前 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">出發前 1 小時檢查</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-list bordered rounded>
                <q-item
                  v-for="item in carryItems"
                  :key="item.label"
                  tag="label"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <q-list bordered rounded>
                <q-item
                  v-for="item in routeItems"
                  :key="item.label"
                  tag="label"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 6/5 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">6/5 Leave</div>

          <div class="text-grey">非假日、上課時撤退</div>
        </q-card-section>
      </q-card>

      <hr />
      <hr />
      <br />
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">院子停車後 1st Action</div>
        </q-card-section>

        <q-list bordered>
          <q-item
            v-for="item in prepareItems"
            :key="item.label"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- 防蚊 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">防蚊 / 居住設備 (躺平設定)</div>
        </q-card-section>

        <q-list bordered>
          <q-item
            v-for="item in livingItems"
            :key="item.label"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <hr />
      <hr />
      <br />
      <!-- 安全確認 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">撤退前安全確認（拍照安心）</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div
              class="col-12 col-md-6"
              v-for="section in safetySections"
              :key="section.title"
            >
              <q-card bordered flat>
                <q-card-section class="bg-grey-3">
                  <div class="text-subtitle1 text-bold">
                    {{ section.title }}
                  </div>
                </q-card-section>

                <q-list>
                  <q-item
                    v-for="item in section.items"
                    :key="item.label"
                    tag="label"
                    v-ripple
                  >
                    <q-item-section avatar>
                      <q-checkbox v-model="item.done" />
                    </q-item-section>

                    <q-item-section>
                      {{ item.label }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <hr />
      <hr />
      <br />
      <!-- 6/3 -->
      <!-- 服務區 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">服務區計畫</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 q-mb-sm">基本需求</div>

              <q-list bordered>
                <q-item
                  v-for="item in serviceItems"
                  :key="item.label"
                  tag="label"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-subtitle1 q-mb-sm">補給</div>

              <q-list bordered>
                <q-item
                  v-for="item in supplyItems"
                  :key="item.label"
                  tag="label"
                  v-ripple
                >
                  <q-item-section avatar>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    {{ item.label }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 裝箱 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">裝箱工作 推進</div>
        </q-card-section>

        <q-list bordered>
          <q-item
            v-for="item in packingItems"
            :key="item.label"
            tag="label"
            v-ripple
          >
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              {{ item.label }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- 冷泉 -->
      <q-card class="q-mb-xl">
        <q-card-section>
          <div class="text-h6">宜蘭 / 冷泉行程</div>
        </q-card-section>

        <q-separator />

        <q-list bordered separator>
          <q-item>
            <q-item-section>
              <q-item-label class="text-bold"> 礁溪 </q-item-label>

              <q-item-label caption> 公共溫泉 </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="text-bold"> 蘇澳冷泉 </q-item-label>

              <q-item-label caption> 約 $300 </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label class="text-bold"> 東澳冷泉 </q-item-label>

              <q-item-label caption>
                夏季限定（6月中下旬～10月中旬）
              </q-item-label>

              <q-item-label caption> 水溫約 14C～16C </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const carryItems = ref([
  { label: "iPad", done: false },
  { label: "cellphone", done: false },
  { label: "鑰匙 ×2", done: false },
  { label: "藥盒子", done: false },
  { label: "刮鬍用品", done: false },
]);

const routeItems = ref([
  { label: "1000 GO", done: false },
  { label: "休息區吃飯 Lunch Dinner 1830 2300", done: false },
  { label: "check 鐵工廠 ??", done: false },
  { label: "去喝魚湯 看海", done: false },
]);

const prepareItems = ref([
  { label: "先搬東西到大廳 \ 可以短暫休息 喝水", done: false },
  { label: "Ready 平躺床 \ 回去先鋪床", done: false },
  { label: "防蚊用品 & 冷氣 電扇", done: false },
]);

const livingItems = ref([
  { label: "防蚊用品", done: false },
  { label: "電蚊拍", done: false },
  { label: "蚊香", done: false },
  { label: "冷氣確認", done: false },
  { label: "冷氣 遙控器電池", done: false },
  { label: "搭帳篷 - 應該不用收了", done: false },
]);

const serviceItems = ref([
  { label: "吹冷氣", done: false },
  { label: "吃飯", done: false },
  { label: "洗澡", done: false },
  { label: "NB 插電 TD6", done: false },
  { label: "游泳池 泡水 花錢增加體力", done: false },
]);

const supplyItems = ref([
  { label: "五金行", done: false },
  { label: "喜互惠 - 麵包 烤物", done: false },
  { label: "憨蝦", done: false },
  { label: "魚雜", done: false },
  { label: "看海 吹風", done: false },
]);

const packingItems = ref([
  { label: "裝箱 inference 2F 一天的生活", done: false },
  { label: "eating on time \ 喜互惠 \ 憨蝦 吃飯", done: false },
  { label: "累了就躺平", done: false },
  { label: "BK 服務區 1800 \ & 2100 洗澡 \ ", done: false },
  { label: "拍箱子照片 - 有空的話", done: false },
  { label: "標號 db - 有空的話", done: false },
  { label: "*** Target all 裝箱 test", done: false },
  { label: "** 可能 1730 要黑垃圾袋", done: false },
  { label: "* 約拆裝璜時間 - 外包 sop", done: false },
]);

const safetySections = ref([
  {
    title: "後門",
    items: [
      // { label: "門窗", done: false },
      // { label: "水電", done: false },
    ],
  },
  {
    title: "2F 廁所",
    items: [
      { label: "門窗", done: false },
      { label: "水電", done: false },
    ],
  },
  {
    title: "Room 3",
    items: [
      { label: "門窗", done: false },
      { label: "水電", done: false },
    ],
  },
  {
    title: "Room 2",
    items: [
      { label: "門窗", done: false },
      { label: "水電", done: false },
    ],
  },
  {
    title: "Room 1",
    items: [
      { label: "門窗", done: false },
      { label: "水電", done: false },
    ],
  },

  {
    title: "2F 客廳 / 公共區",
    items: [
      { label: "門窗", done: false },
      { label: "水電", done: false },
      { label: "樓梯走廊燈", done: false },
      { label: "撤退樓梯還原", done: false },
    ],
  },
  {
    title: "1F 廚房",
    items: [{ label: "水電", done: false }],
  },

  {
    title: "1F / 戶外 view",
    items: [
      { label: "1F 電燈", done: false },
      { label: "1F 大門", done: false },
      { label: "2F 百葉窗", done: false },
      { label: "2F 鋁窗", done: false },
    ],
  },
]);
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
