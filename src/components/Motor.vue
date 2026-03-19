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
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">電能轉機械能</div>
        <p>
          馬達是一種將電能轉換為機械能的裝置，
          廣泛應用於風扇、洗衣機、電動車與工業設備，
          是自動化與機械化的核心元件。
        </p>
        <q-img
          class="q-mx-md"
          src="./statics/shopee-CZQOGGCn.png"
          style="width: 100px; height: 200px"
          fit="cover"
        />
        <q-img
          class="q-mx-md"
          src="./statics/ESC-BVqpSlT6.png"
          style="width: 200px; height: 200px"
          fit="cover"
        />
        <q-img
          class="q-mx-md"
          src="./statics/bettery-D6dlTMAi.png"
          style="width: 130px; height: 200px"
          fit="cover"
        />
        <q-img
          class="q-mx-md"
          src="./statics/brushMotor-GrhOnz2-.png"
          style="width: 150px; height: 200px"
          fit="cover"
        />
      </q-card-section>
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
    <!-- ------- -->
    <div class="row q-col-gutter-md">
      <!-- 無刷馬達 -->
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
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
      </div>

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
            <div class="text-h6">馬達功率</div>

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
              class="q-mx-md"
              src="./statics/hoursePower-BSHlZRZZ.png"
              style="width: 350px; height: 200px"
              fit="cover"
            >
              <div
                class="absolute-bottom text-white text-subtitle2 q-pa-sm"
                style="text-shadow: 0 0 3px black"
              >
                {{ "馬力計算" }}
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-mb-md">
          <q-card-section>
            <!-- <div class="text-h6">速度計算對照表</div> -->
            <q-img
              class="q-mx-md"
              src="./statics/TN 曲線.png"
              style="width: 350px; height: 200px"
              fit="cover"
            >
              <div
                class="absolute-bottom text-white text-subtitle2 q-pa-sm"
                style="text-shadow: 0 0 3px black"
              >
                {{ "馬力關係圖" }}
              </div>
            </q-img>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <br />
    <hr />
    <br />
    <!-- 計算題 -->

    <div class="row q-col-gutter-md">
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
            <!-- <div class="text-h6">速度計算對照表</div> -->
            <q-img
              class="q-mx-md"
              src="./statics/gear-speed-BcVXBs7g.png"
              style="width: 250px; height: 200px"
              fit="cover"
            >
              <div
                class="absolute-bottom text-white text-subtitle2 q-pa-sm"
                style="text-shadow: 0 0 3px black"
              >
                {{ "遙控模型車 齒輪比 車速 轉換表" }}
              </div>
            </q-img>
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
        <p>使用電容產生相位差，形成旋轉磁場， 使馬達能自行啟動並提升效率。</p>
      </q-card-section>
    </q-card>

    <!-- 配電 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">配電系統</div>

        <ul>
          <li>主斷路器 → 分配迴路</li>
          <li>照明 / 插座 / 動力</li>
          <li>戶外設備：IP54 / IP65 防護</li>
        </ul>
      </q-card-section>
    </q-card>

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
  </q-page>
</template>

<script setup>
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
