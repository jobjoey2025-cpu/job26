<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Header -->
    <q-card class="bg-primary text-white q-mb-md">
      <q-card-section>
        <div class="text-h5 text-bold">🦞 蘇澳 大概一天的生活 SOP</div>

        <div class="text-subtitle2 q-mt-sm">
          建立可持續的生活模式，而非追求全部完成。
        </div>
      </q-card-section>

      <p>
        * eating on time \ 累了就躺平 <br>
        * 喜互惠 \ 憨蝦 吃中飯 (test 新餐廳)  <br>
        * 可能 1730 要黑垃圾袋<br>
        * BK 服務區 1800 \ & 2100
        * 洗澡 \ 按摩 喝咖啡 <br>

      </p>

      <q-card-section class="bg-amber-8 text-white text-center text-bold">
        ⚡ 核心心法：先能動起來，累了就躺平
      </q-card-section>
    </q-card>

    <!-- KPI Dashboard -->
    <div class="row q-col-gutter-md q-mb-md">
      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <div class="text-h4 text-orange">{{ packingPercent }}%</div>

            <div class="text-grey-7">裝備完成度</div>

            <q-linear-progress
              :value="packingProgress"
              color="orange"
              rounded
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <div class="text-h4 text-purple">{{ taskPercent }}%</div>

            <div class="text-grey-7">任務完成度</div>

            <q-linear-progress
              :value="taskProgress"
              color="purple"
              rounded
              class="q-mt-sm"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-4">
        <q-card flat bordered>
          <q-card-section class="text-center">
            <div class="text-h4 text-green">MVP</div>

            <div class="text-grey-7">今日目標</div>

            <div class="text-caption q-mt-sm">開始拆裝潢</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <!-- Left -->
      <div class="col-12 col-md-7">
        <!-- Success Criteria -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-green-7 text-white">
            <div class="text-subtitle1 text-bold">🎯 今日成功標準</div>
          </q-card-section>

          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>

              <q-item-section> 裝備到位 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>

              <q-item-section> All 裝箱 Test </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="check_circle" color="green" />
              </q-item-section>

              <q-item-section> 開始拆裝潢 </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- Daily Timeline -->
        <q-card class="q-mb-md">
          <q-card-section class="bg-teal-7 text-white">
            <div class="text-subtitle1 text-bold">📅 每日生活節奏</div>
          </q-card-section>

          <q-card-section>
            <q-timeline color="teal">
              <q-timeline-entry
                title="Morning"
                subtitle="起床後"
                icon="light_mode"
              >
                早餐
                <br />
                確認今日拆除區域
              </q-timeline-entry>

              <q-timeline-entry
                title="Afternoon"
                subtitle="施工時段"
                icon="construction"
              >
                拆裝潢
                <br />
                裝箱
                <br />
                整理垃圾

                <div class="text-negative q-mt-sm">
                  ⚠ 17:30 前確認黑色垃圾袋
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="Evening"
                subtitle="收尾恢復"
                icon="nightlight"
              >
                18:00 吃飯
                <br />
                21:00 服務區洗澡、按摩、咖啡
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>

        <!-- Service Area -->
        <q-card>
          <q-card-section class="bg-indigo-7 text-white">
            <div class="text-subtitle1 text-bold">🚗 補給與服務區</div>
          </q-card-section>

          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="shopping_cart" color="indigo" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 喜互惠補給 </q-item-label>

                <q-item-label caption> 採買生活用品與食物 </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="restaurant" color="deep-orange" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 憨蝦吃飯 </q-item-label>

                <q-item-label caption> 固定時間吃飯 </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="local_cafe" color="brown" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 21:00 服務區 </q-item-label>

                <q-item-label caption> 洗澡、按摩椅、喝咖啡 </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- Right -->
      <div class="col-12 col-md-5">
        <!-- Packing -->
        <q-card class="q-mb-md">
          <q-card-section
            class="bg-orange-8 text-white row items-center justify-between"
          >
            <div class="text-subtitle1 text-bold">🎒 出發裝備</div>

            <q-badge color="white" text-color="orange"> 3 天份 </q-badge>
          </q-card-section>

          <q-tabs v-model="tab" dense align="justify" active-color="orange">
            <q-tab name="clothes" label="衣物" />

            <q-tab name="gadgets" label="數位" />
          </q-tabs>

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="clothes" class="q-pa-none">
              <q-list separator>
                <q-item v-for="item in packingList.clothes" :key="item.name">
                  <q-item-section side>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      :class="{
                        'text-grey-5 text-strike': item.done,
                      }"
                    >
                      {{ item.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <q-tab-panel name="gadgets" class="q-pa-none">
              <q-list separator>
                <q-item v-for="item in packingList.gadgets" :key="item.name">
                  <q-item-section side>
                    <q-checkbox v-model="item.done" />
                  </q-item-section>

                  <q-item-section>
                    <q-item-label
                      :class="{
                        'text-grey-5 text-strike': item.done,
                      }"
                    >
                      {{ item.name }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>

        <!-- Tasks -->
        <q-card>
          <q-card-section class="bg-purple-7 text-white">
            <div class="text-subtitle1 text-bold">📦 現場任務</div>
          </q-card-section>

          <q-list separator>
            <q-item v-for="task in siteTasks" :key="task.title">
              <q-item-section side>
                <q-checkbox v-model="task.done" color="purple" />
              </q-item-section>

              <q-item-section>
                <q-item-label
                  :class="{
                    'text-grey-5 text-strike': task.done,
                  }"
                >
                  {{ task.title }}
                </q-item-label>

                <q-item-label caption>
                  {{ task.desc }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed } from "vue";

const tab = ref("clothes");

const packingList = ref({
  clothes: [
    { name: "T-Shirt × 3", done: false },
    { name: "內褲 × 3", done: false },
    { name: "襪子 × 3", done: false },
    { name: "外套 × 1", done: false },
    { name: "毛巾 × 3", done: false },
    { name: "xx牙刷", done: false },
    { name: "xx牙膏", done: false },
  ],

  gadgets: [
    { name: "手機", done: false },
    { name: "充電器", done: false },
    { name: "行動電源", done: false },
  ],
});

const siteTasks = ref([
  {
    title: "All 裝箱 Test",
    desc: "完成紙箱分類",
    done: false,
  },
  {
    title: "搬運驗證",
    desc: "測試搬運動線",
    done: false,
  },
  {
    title: "垃圾分類",
    desc: "確認黑色垃圾袋",
    done: false,
  },
  {
    title: "開始拆裝潢",
    desc: "完成第一區拆除",
    done: false,
  },
  {
    title: "照明 Think",
    desc: "電燈 電路 照明 色溫 Think",
    done: false,
  },
  {
    title: "一些問題拍照 標示(處理不完的)",
    desc: "實地 對齊 & Think \ 目前 最好的還是 PIC文字 (cuz video 不夠快 & 容量太大 - GoPro ?) ",
    done: false,
  },
]);

const allPackingItems = computed(() => [
  ...packingList.value.clothes,
  ...packingList.value.gadgets,
]);

const packingProgress = computed(() => {
  const total = allPackingItems.value.length;

  const done = allPackingItems.value.filter((item) => item.done).length;

  return total ? done / total : 0;
});

const packingPercent = computed(() => Math.round(packingProgress.value * 100));

const taskProgress = computed(() => {
  const total = siteTasks.value.length;

  const done = siteTasks.value.filter((item) => item.done).length;

  return total ? done / total : 0;
});

const taskPercent = computed(() => Math.round(taskProgress.value * 100));
</script>
