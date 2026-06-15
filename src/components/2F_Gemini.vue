<template>
  <q-page class="q-pa-lg bg-grey-2">
    <!-- 頁面標題與來源 -->
    <div class="row items-center justify-between q-mb-xl">
      <div>
        <h1 class="text-h4 text-weight-bold text-grey-9 q-my-none">
          室內設計展板分析與預算書
        </h1>
        <div class="text-subtitle1 text-grey-6 q-mt-xs">
          人文工業風客廳設計案 | 參考案例：三商美福
        </div>
      </div>
      <q-chip icon="event" color="primary" text-color="white" outline>
        2026 專案規劃
      </q-chip>
    </div>
    <div class="row justify-center q-pa-md">
      <q-img
        src="images\風格分析test.jpg"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      />
      <q-space> →→ </q-space>
      <q-img
        src="images\gemini.png"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      />
    </div>
    <!-- 第一部分：設計展板分析 -->
    <div class="row q-col-gutter-lg q-mb-xl">
      <!-- 左側：設計概念與色彩 -->
      <div class="col-12 col-md-6">
        <q-card flat class="full-height q-pa-md shadow-2 rounded-borders">
          <q-card-section>
            <div
              class="text-h5 text-weight-bold text-primary q-mb-md row items-center"
            >
              <q-icon name="architecture" class="q-mr-sm" /> 1. 設計概念 & 材質
            </div>

            <q-list separator>
              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >風格定位：人文輕工業風</q-item-label
                  >
                  <q-item-label caption class="text-body2 text-grey-7">
                    擺脫傳統工業風過於冷冽、粗獷的刻板印象，注入大量暖色調木質與質感軟裝，營造悠閒的咖啡廳氛圍。
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >空間佈局：半開放式木作玻璃隔間</q-item-label
                  >
                  <q-item-label caption class="text-body2 text-grey-7">
                    沙發後方牆面採半開放設計。此舉不僅有效放大了客廳的視覺縱深，更能引導採光穿透至後方書房，維持整體的通透感與互動性。
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>
                  <q-item-label class="text-weight-bold"
                    >立面機能：客製化貓跳台</q-item-label
                  >
                  <q-item-label caption class="text-body2 text-grey-7">
                    電視牆上特殊設計了高低錯落的木層板，除了作為裝飾壁架，更具備客製化貓跳臺的實用功能。
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>

            <!-- 色彩計畫小區塊 -->
            <div class="q-mt-lg">
              <div class="text-subtitle1 text-weight-bold q-mb-sm">
                🎨 色彩計畫色彩調色盤
              </div>
              <div class="row q-gutter-sm">
                <div class="col text-center">
                  <div
                    class="rounded-borders bg-grey-4"
                    style="height: 40px"
                  ></div>
                  <span class="text-caption text-grey-7">無彩色淺灰</span>
                </div>
                <div class="col text-center">
                  <div
                    class="rounded-borders"
                    style="height: 40px; background-color: #8b5a2b"
                  ></div>
                  <span class="text-caption text-grey-7">溫潤橡木</span>
                </div>
                <div class="col text-center">
                  <div
                    class="rounded-borders bg-blue-grey-7"
                    style="height: 40px"
                  ></div>
                  <span class="text-caption text-grey-7">藍灰雙色</span>
                </div>
                <div class="col text-center">
                  <div
                    class="rounded-borders bg-dark"
                    style="height: 40px"
                  ></div>
                  <span class="text-caption text-grey-7">工業黑鐵件</span>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- 右側：照明計畫 -->
      <div class="col-12 col-md-6">
        <q-card flat class="full-height q-pa-md shadow-2 rounded-borders">
          <q-card-section>
            <div
              class="text-h5 text-weight-bold text-amber-9 q-mb-md row items-center"
            >
              <q-icon name="lightbulb" class="q-mr-sm" /> 2. 照明計畫
            </div>

            <q-timeline color="amber-9">
              <q-timeline-entry
                title="主要光源：黑色軌道燈"
                subtitle="Track Lights"
              >
                <div class="text-body2 text-grey-7">
                  裸露的黑色管線延伸了工業風語彙，並可自由調整燈頭角度，精準投射於電視牆與機能區域，創造富有層次的明暗對比。
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="自然採光：木質實木百葉窗"
                subtitle="Shutters"
              >
                <div class="text-body2 text-grey-7">
                  捨棄傳統布簾，採用大面積木百葉。能細膩調節窗外灑落的自然光，光影透過百葉投射在木地板上，增添極具戲劇張力的光影線條。
                </div>
              </q-timeline-entry>

              <q-timeline-entry
                title="氛圍營造：暖色調間接照明"
                subtitle="Ambient Lighting"
              >
                <div class="text-body2 text-grey-7">
                  預期於角落、天花板邊緣結合暖色調（2700K -
                  3000K）的間接燈帶，以軟化鐵件與灰牆的冷硬感。
                </div>
              </q-timeline-entry>
            </q-timeline>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- 第二部分：預算編列分析 -->
    <q-card flat class="q-pa-md shadow-2 rounded-borders q-mb-xl">
      <q-card-section>
        <div class="row items-center justify-between q-mb-md">
          <div class="text-h5 text-weight-bold text-teal-9 row items-center">
            <q-icon name="payments" class="q-mr-sm" /> 3. 裝潢預算編列明細 (估計
            5 - 8 坪)
          </div>
          <div class="text-subtitle2 text-grey-6">
            *費用僅供參考，實際依現場丈量與選材為準
          </div>
        </div>

        <!-- 預算明細表格 -->
        <q-table
          flat
          bordered
          :rows="budgetRows"
          :columns="budgetColumns"
          row-key="name"
          :pagination="{ rowsPerPage: 10 }"
          hide-bottom
        >
          <!-- 自訂比例顯示方式（加上進度條與顏色區分） -->
          <template v-slot:body-cell-ratio="props">
            <q-td :props="props">
              <div class="row items-center no-wrap">
                <div class="text-weight-bold q-mr-sm" style="min-width: 35px">
                  {{ props.value }}%
                </div>
                <q-linear-progress
                  :value="props.value / 100"
                  :color="getProgressColor(props.row.category)"
                  class="q-mt-none"
                  style="width: 80px"
                />
              </div>
            </q-td>
          </template>
        </q-table>

        <!-- 總預算總結區塊 -->
        <div class="row q-col-gutter-md q-mt-lg">
          <div class="col-12 col-sm-6">
            <q-banner rounded class="bg-teal-1 text-teal-10 q-pa-md">
              <template v-slot:avatar>
                <q-icon name="trending_up" color="teal-9" size="md" />
              </template>
              <div class="text-weight-bold text-subtitle1">基礎精裝型</div>
              <div class="text-h4 text-weight-bold q-my-xs">NT$ 280,000 +</div>
              <div class="text-caption">
                適合局部調整、保留原有地磚、使用替代百葉簾之小資規劃。
              </div>
            </q-banner>
          </div>
          <div class="col-12 col-sm-6">
            <q-banner rounded class="bg-blue-1 text-blue-10 q-pa-md">
              <template v-slot:avatar>
                <q-icon name="auto_awesome" color="blue-9" size="md" />
              </template>
              <div class="text-weight-bold text-subtitle1">高質感復刻型</div>
              <div class="text-h4 text-weight-bold q-my-xs">NT$ 360,000 +</div>
              <div class="text-caption">
                包含全室 SPC 地板、實木百葉窗、特殊牆面塗料、高規格木作隔間。
              </div>
            </q-banner>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// 預算表格欄位定義
const budgetColumns = [
  {
    name: "category",
    label: "工程類別",
    align: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "ratio",
    label: "預算佔比",
    align: "left",
    field: "ratio",
    sortable: true,
  },
  { name: "range", label: "預估金額 (NTD)", align: "right", field: "range" },
  { name: "details", label: "主要施作項目", align: "left", field: "details" },
];

// 預算表格資料
const budgetRows = ref([
  {
    category: "1. 拆除與水電工程",
    ratio: 15,
    range: "$35,000 – $60,000",
    details:
      "天花板裸露管線整理、黑色明管線槽 (EMT管) 配置、軌道燈出線與插座移位。",
  },
  {
    category: "2. 木作與玻璃隔間工程",
    ratio: 30,
    range: "$80,000 – $130,000",
    details:
      "沙發後方半開放式木作清玻璃窗框隔間（含實木貼皮）、客製化貓跳臺木作層板結構加強。",
  },
  {
    category: "3. 油漆與特殊塗料工程",
    ratio: 10,
    range: "$25,000 – $45,000",
    details:
      "全室牆面基礎批土研磨、電視主牆局部施作仿清水模特殊塗料（樂土漆）營造手刮質感。",
  },
  {
    category: "4. 地坪與軟裝窗簾工程",
    ratio: 20,
    range: "$55,000 – $90,000",
    details:
      "防潑水防刮 SPC 超耐磨木紋地板（連工帶料）、大面積木質實木百葉窗（Shutters）。",
  },
  {
    category: "5. 燈具與軌道燈工程",
    ratio: 5,
    range: "$15,000 – $25,000",
    details:
      "黑色工業風軌道條、高演色性 LED 軌道燈頭（3000K）、隔間牆或電視櫃下方隱藏式間接燈帶。",
  },
  {
    category: "6. 移動式家具與鐵件軟裝",
    ratio: 20,
    range: "$60,000 – $110,000",
    details:
      "北歐風跳色拼接布沙發、工業風復古鐵網電視矮櫃、金屬皮革拼接圓茶几、設計師單椅。",
  },
]);

// 依據類別回傳進度條顏色
const getProgressColor = (category) => {
  if (category.includes("木作") || category.includes("地坪")) return "negative"; // 佔比較高用深色系
  if (category.includes("拆除") || category.includes("家具")) return "primary";
  return "amber";
};
</script>

<style scoped>
.rounded-borders {
  border-radius: 12px;
}
.full-height {
  height: 100%;
}
</style>
