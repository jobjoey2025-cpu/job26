<template>
  <q-page class="q-pa-lg">
    <!-- Title -->
    <!-- <div class="text-h4 text-bold q-mb-lg">經歷與證書</div> -->
    <h3 style="text-align: center">經歷與證書</h3>

    <!-- Grid -->
    <div class="row q-col-gutter-lg">
      <div
        v-for="(item, index) in messages"
        :key="index"
        class="col-6 col-md-3"
      >
        <q-card class="card-hover">
          <!-- 圖片 -->
          <q-img :src="getImg(item.img)" height="150px" fit="cover" />

          <!-- 標題 -->
          <q-card-section>
            <div class="text-h6">{{ item.title }}</div>
            <div class="text-caption text-grey">
              {{ item.time }}
            </div>
          </q-card-section>

          <!-- Actions -->
          <q-card-actions align="between">
            <q-btn flat color="orange" label="Explore" />

            <q-btn
              flat
              round
              dense
              :icon="expanded[index] ? 'expand_less' : 'expand_more'"
              @click="toggle(index)"
            />
          </q-card-actions>

          <!-- 展開內容 -->
          <q-slide-transition>
            <div v-show="expanded[index]">
              <q-separator />
              <q-card-section>
                <div class="text-body2">
                  {{ item.text }}
                </div>
              </q-card-section>
            </div>
          </q-slide-transition>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// 🔥 展開控制（每張卡片獨立）
const expanded = ref([]);

// toggle
const toggle = (index) => {
  expanded.value[index] = !expanded.value[index];
};

// 🔥 圖片載入（vite / quasar 正確寫法）
const getImg = (name) => {
  return new URL(`../assets/img/${name}`, import.meta.url).href;
};

// 資料
const messages = ref([
  {
    title: "丙級室內配線技術士",
    time: "",
    text: `
富民機電技術訓練中心
丙級室內配線技術士班
    `,
    img: "CertificateC.png",
  },

  {
    title: "team associated",
    time: "",
    text: `
南崁
機械工程師
電動遙控車工程師
    `,
    img: "DC10_BOX.jpg",
  },

  {
    title: "迷你無人機研習營",
    time: "",
    text: `
FPV 無人機 組裝 設定 與 飛行操作
Betaflight PID 設定
https://www.facebook.com/share/v/16bSxwa2Kp/
    `,
    img: "robot.jpg",
  },
  {
    title: "蘇澳國中",
    time: "",
    text: `
蘇澳港
南方澳
    `,
    img: "junior.png",
  },
  {
    title: "羅東高中",
    time: "",
    text: `
1991年9月～ 1994年6月
羅東夜市
    `,
    img: "senior.png",
  },
  {
    title: "文化大學",
    time: "",
    text: `
機械工程學系
1994年9月～1998年6月
陽明山
    `,
    img: "college.png",
  },
  {
    title: "台灣海洋大學",
    time: "",
    text: `
機械與輪機工程研究所熱流組
1998年9月～ 2000年6月
基隆港
    `,
    img: "master.png",
  },

  {
    title: "南亞科技",
    time: "",
    text: `
南崁
    `,
    img: "semiconduoctor.png",
  },

  {
    title: "鼎沛科技",
    time: "",
    text: `
龜山
    `,
    img: "thermal sink.png",
  },

  {
    title: "中華映管(八德)",
    time: "",
    text: `
八德
    `,
    img: "dictionary.png",
  },
  {
    title: "中華映管(龍潭)",
    time: "",
    text: `
龍潭
    `,
    img: "touchShow.png",
  },

  {
    title: "經濟部紡織研究所",
    time: "",
    text: `
土城
ERP
    `,
    img: "ttri.jpg",
  },

  {
    title: "DOSUN",
    time: "",
    text: `
龜山工業區
    `,
    img: "bikeLight.jpg",
  },

  {
    title: "統領百貨",
    time: "",
    text: `
桃園
    `,
    img: "tonlin.jpg",
  },

  {
    title: "PTC 原廠授權教育訓練",
    time: "",
    text: `
進階建模 (Advanced Modeling)
細節出圖(工程圖)
鈑金設計(Sheetmetal)
進階組件(AAX-Advanced Assembly)
高階曲面建模設計 (Surface)
自由曲面設計 (ISDX)
分析結構和熱特性
    `,
    img: "ProE證書.jpg",
  },
  {
    title: "單晶片控制系統班",
    time: "",
    text: `
C程式設計
數位電路
嵌入式韌體開發
專題實作
    `,
    img: "單晶片證書.jpg",
  },
  {
    title: "跨平台網頁程式設計班",
    time: "",
    text: `
系統分析與設計
MS-SQL資料庫
HTML / JS / CSS3 / jQuery / RWD
C# + ASP.NET MVC
PHP + Laravel
Git / SourceTree
    `,
    img: "網頁程式證書.jpg",
  },

  {
    title: "新型專利",
    time: "",
    text: `
    `,
    img: "newIP.png",
  },
  {
    title: "發明專利",
    time: "",
    text: `
    顯示模組組裝方法及顯示模組組裝站
    發明第 I 507774 號
    `,
    img: "inventIP.png",
  },
  {
    title: "中國專利",
    time: "",
    text: `
    背光模塊
    2006101216263
    `,
    img: "chinaIP.png",
  },
]);
</script>

<style scoped>
/* Hover 動畫（作品集等級） */
.card-hover {
  transition: transform 0.3s, box-shadow 0.3s;
}
.card-hover:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}
</style>
