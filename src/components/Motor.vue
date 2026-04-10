<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Hero -->
    <div class="text-center q-mb-lg">
      <div class="text-h4">馬達工程知識</div>
      <div class="text-subtitle2 text-grey-7">
        Electric → Mechanical Energy Conversion
      </div>
    </div>

    <!-- 基本概念 -->
    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">電能轉機械能</div>
        <p>
          馬達是一種將電能轉換為機械能的裝置，
          廣泛應用於風扇、洗衣機、電動車與工業設備，
          是自動化與機械化的核心元件。
        </p>
      </q-card-section>
      <!-- 1️⃣ 整機照片 DC10 web -->
      <div style="text-align: center">
        <q-img
          v-for="img in bgImgs"
          :key="img"
          :src="img"
          class="thumb"
          @click="open(img)"
          fit="cover"
        />
      </div>
    </q-card>

    <!-- 馬達種類 -->
    <div class="row q-col-gutter-md">
      <div
        class="col-12 col-sm-6 col-md-4"
        v-for="item in motors"
        :key="item.title"
      >
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">{{ item.title }}</div>
            <div v-html="item.desc"></div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">無刷馬達應用概念</div>

        <ul>
          <li>KV 值：每 Volt 對應轉速（RPM）</li>
          <li>轉速 = KV × 電壓</li>
          <li>ESC 必須匹配電壓 / 電流 / 極數</li>
          <li>實務需搭配電池與測試（避免燒毀）</li>
        </ul>

        <q-banner class="bg-grey-3 q-mt-sm">
          範例：7.4V × 3300KV ≈ 24420 RPM
        </q-banner>
      </q-card-section>
    </q-card>
    <!-- ------- -->
    <div class="row q-col-gutter-md">
      <!-- 無刷馬達 -->

      <!-- RC 車參數 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">RC 有刷馬達搭配元件</div>

            <ul>
              <li>馬達 T數（Turns）：少 → 高速 / 多 → 高扭力</li>
              <li>電池：3S / 4S（電壓）</li>
              <li>C Rating：電池放電能力</li>
              <li>ESC：320A 控制器 + BEC</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <!-- 功率 -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">馬達功率相關</div>

            <ul>
              <li>功率 = 電壓 × 電流 × 效率</li>
              <li>轉速（RPM）</li>
              <li>扭力（Torque）</li>
              <li>TN 曲線（性能曲線）</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <!-- <div class="text-h6">速度計算對照表</div> -->

            <q-img
              v-for="img in horseImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 350px; height: 200px"
              @click="open(img)"
              fit="cover"
            />
            <div
              class="absolute-bottom text-white text-subtitle2 q-pa-sm"
              style="text-shadow: 0 0 3px black; font-size: 33px"
            >
              {{ "馬力計算" }}
            </div>
            <!-- </q-img> -->
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-img
              v-for="img in horseRelationImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 350px; height: 200px"
              @click="open(img)"
              fit="cover"
            />
            <div
              class="absolute-bottom text-white text-subtitle2 q-pa-sm"
              style="text-shadow: 0 0 3px black; font-size: 33px"
            >
              {{ "馬力關係圖" }}
            </div>
            <!-- </q-img> -->
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h6">速度計算範例</div>

            <!-- 公式 -->
            v (速度)= 直徑 * pi * RPM(馬達轉速) / 齒輪比

            <div class="q-mt-sm">
              車輪直徑 78mm / 齒輪比 6 / 馬達轉速15000 rpm > 車速
            </div>

            <div class="text-primary q-mt-sm">👉 約 ≈ 10.2 m/s ≈ 36.7 km/h</div>
            <q-img
              class="q-mx-md"
              src="./statics/B7.jpg"
              style="width: 250px; height: 90px"
              fit="cover"
            />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <q-img
              v-for="img in gearImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 250px; height: 200px"
              @click="open(img)"
              fit="cover"
            />

            <div
              class="absolute-bottom text-white text-subtitle2 q-pa-sm"
              style="text-shadow: 0 0 3px black; font-size: 33px"
            >
              {{ "齒輪比 車速 轉換表" }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- ----------------- -->
    <br />
    <hr />
    <br />
    <!-- 感應馬達 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">單相感應馬達</div>
        <p>
          單相感應馬達（Single-phase Induction Motor）
          是最常見的家用馬達之一，幾乎所有插在 110V / 220V
          的設備都可能用到它。使用電容產生相位差，形成旋轉磁場，
          使馬達能自行啟動並提升效率。
        </p>
      </q-card-section>
    </q-card>

    <!-- 配電 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">配電箱 × 馬達應用</div>

        <p>
          在實務上，例如無人機基地或工廠設備， 配電箱會先做電力分配，
          再透過控制元件去控制馬達啟停與轉速， 像水泵、風扇或輸送設備，
          都會依照感測器或邏輯自動運作。
        </p>
      </q-card-section>
    </q-card>

    <!-- ------------------- -->

    <div class="q-pa-md row items-start q-gutter-md">
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="my-card" flat bordered style="height: 250px">
          <q-card-section horizontal>
            <q-card-section>
              <!-- {{ lorem }} -->
              🔹單線圖（單一線路圖 Single-line diagram）<br />用一條線與符號表示三相或單相配電系統的主要電力流向、配電設備與保護元件。<br /><br />
              重點是「簡潔呈現主幹結構」：電源 → 主開關／斷路器 → 配電盤 →
              分路保護 → 負載。
            </q-card-section>

            <q-img
              v-for="img in singleLineDiagramImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 200px; height: 200px"
              @click="open(img)"
              fit="cover"
            />


          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="my-card" flat bordered style="height: 250px">
          <q-card-section horizontal>
            <q-card-section>
              🔹單線圖常見層級（由上到下）<br />
              1.市電 / 變電所進線（含開關箱、戶外電表） 主開關 <br />
              2.主斷路器（MCCB）（含主接地）<br />
              3.主母線 / 分配母線（Bus）<br />
            </q-card-section>

            <q-separator vertical />

            <q-card-section>
              4.分路斷路器（RCBO/MCB）與漏電保護（照明、插座、動力迴路）<br />
              5.各迴路負載與接地符號<br />
              6.保護與偵測元件（過電流、漏電、過熱、短路保護）<br />
              7.附註：線徑、額定電流、備援供電（若有）<br />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="my-card" flat bordered style="height: 250px">
          <!-- <q-card-section horizontal class="items-center justify-between"> -->
          <q-card-section horizontal>
            <q-card-section>
              <!-- {{ lorem }} -->
              🔹單相感應電動機<br />中加電容，是為了
              讓副繞組電流產生相位差，創造類似「兩相電源」的旋轉磁場，使電機能夠自行啟動，並在某些設計裡改善運行效率。
            </q-card-section>

            <!-- <q-img
              class="col-5 q-ml-auto"
              style="width: 100px; height: 200px"
              src="./statics/1MotorAmp.png"
            /> -->


            <q-img
              v-for="img in onemotorImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 300px; height: 200px"
              @click="open(img)"
              fit="cover"
            />


          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="my-card" flat bordered style="height: 250px">
          <!-- <q-card-section horizontal class="items-center justify-between"> -->
          <q-card-section horizontal>
            <q-card-section>
              <!-- {{ lorem }} -->
              🔹「配電盤/配電箱/控制箱」<br />主要用來分配、控制和保護電能。
              從電力公司進線 → 經主斷路器 →
              分配到各個迴路（照明、插座、空調、動力）。<br />
              戶外防水型: IP54 / IP65 等防塵防水等級，應用於施工現場或戶外設備。
            </q-card-section>


            <!-- <q-img
              class="col-5 q-ml-auto"
              style="width: 100px; height: 200px"
              src="./statics/controlBox.png"
            /> -->

            <q-img
              v-for="img in controlboxImgs"
              :key="img"
              :src="img"
              class="thumb"
              style="width: 250px; height: 200px"
              @click="open(img)"
              fit="cover"
            />


          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- ------------------------ -->

    <classCtimeLine />
    <classCtree />

    <div class="flex flex-center q-my-lg">
      <a href="https://www.johnfon.com/WebCube/iWiringG3/" target="_blank">
        <q-img
          src="../components/statics/iWiringG3.png"
          alt="Quasar Logo"
          style="width: 330px; border-radius: 12px"
        />
      </a>
    </div>

    <h5 class="text-center q-my-md">
      https://www.johnfon.com/WebCube/iWiringG3
    </h5>
    <h5 class="text-center q-my-md">線上接線模擬APP</h5>
    <!-- 技術脈絡 -->
    <q-card class="bg-black text-white">
      <q-card-section>
        <div class="text-h6">技術脈絡</div>

        <p>
          工程設計本質是「做工 + 經驗 + 系統整合」， 多數產業會沿用成熟架構，
          在既有技術上優化，而非重新發明。
        </p>
      </q-card-section>
    </q-card>
    <!-- joey 共用圖片放大 -->
    <q-dialog v-model="show">
      <q-card class="viewer">
        <q-img :src="currentImg" fit="contain" class="full-img" />
      </q-card>
    </q-dialog>
  </q-page>
  <p>Motor</p>
</template>

<script setup>
import classCtree from "components/classCtree.vue";
import classCtimeLine from "components/classCtimeLine.vue";

import { ref } from "vue";

/* ========================
   🔥 共用圖片 viewer
======================== */
const show = ref(false);
const currentImg = ref("");

function open(img) {
  currentImg.value = img;
  show.value = true;
}

/* ========================
   🔥 圖片資料（public/img）
======================== */
const bgImgs = [
  "/img/shopee-CZQOGGCn.png",
  "/img/brushMotor-GrhOnz2-.png",
  "/img/ESC-BVqpSlT6.png",
  "/img/CAR電裝.png",
];
// hoursePower-BSHlZRZZ.png
const horseImgs = ["/img/hoursePower-BSHlZRZZ-BSHlZRZZ.png"];
const horseRelationImgs = ["/img/TN 曲線.png"];
const gearImgs = ["/img/gear-speed-BcVXBs7g-BcVXBs7g.png"];
const singleLineDiagramImgs = ["/img/singleWire-GlzRfPLN.png"];

const onemotorImgs = ["/img/1MotorAmp-Dh2xu9BK.png"];

const controlboxImgs = ["/img/controlBox-BsHczrZh.png"];



const motors = [
  {
    title: "DC 馬達",
    desc: "高起動扭矩，易控制<br/>👉 電動工具 / 小型設備",
  },
  {
    title: "感應馬達",
    desc: "耐用、低維護<br/>👉 風扇 / 泵浦 / 工廠",
  },
  {
    title: "同步馬達",
    desc: "轉速固定<br/>👉 精密設備",
  },
  {
    title: "伺服馬達",
    desc: "高精度控制<br/>👉 機械手臂 / CNC",
  },
  {
    title: "步進馬達",
    desc: "精準定位<br/>👉 3D列印 / 攝影設備",
  },
  {
    title: "BLDC 無刷馬達",
    desc: "高效率 / 長壽命<br/>👉 無人機 / 電動車",
  },
];
</script>

<style scoped>
body {
  background: #f5f5f5;
}
.thumb {
  /* width: 120px; */
  width: 99px;
  height: 10%;
  border: 1px solid #f6c3c3; /* 粗細、樣式、顏色 */
  box-sizing: border-box; /* 確保邊框計入 width，不跑版 */
  border-radius: 12px;
  margin :4px;
  cursor: zoom-in;
}
/* display: block; 避免圖片下方出現空白間隙 */

.viewer {
  width: 90vw;
  height: 90vh;
}

.full-img {
  width: 100%;
  height: 100%;
}
</style>
