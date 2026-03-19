<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- Hero -->
    <div class="text-center q-mb-lg">
      <div class="text-h4">馬達工程知識系統</div>
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
        <q-img src="./statics/dhl.jpg" style="width: 100px; height: 100px" fit="cover"/>

      </q-card-section>
    </q-card>

    <!-- 馬達種類 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">馬達種類與應用</div>

        <q-list bordered>
          <q-item>
            <q-item-section>
              <b>DC 馬達</b><br />
              高起動扭矩，易控制<br />
              👉 電動工具 / 小型設備
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <b>感應馬達</b><br />
              耐用、低維護<br />
              👉 風扇 / 泵浦 / 工廠
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <b>同步馬達</b><br />
              轉速固定<br />
              👉 精密設備
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <b>伺服馬達</b><br />
              高精度控制<br />
              👉 機械手臂 / CNC
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <b>步進馬達</b><br />
              精準定位<br />
              👉 3D列印 / 攝影設備
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <b>BLDC 無刷馬達</b><br />
              高效率 / 長壽命<br />
              👉 無人機 / 電動車
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 無刷馬達 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">無刷馬達核心概念</div>

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

    <!-- RC 車參數 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">RC 馬達參數</div>

        <ul>
          <li>T數（Turns）：少 → 高速 / 多 → 高扭力</li>
          <li>電池：3S / 4S（電壓）</li>
          <li>C Rating：放電能力</li>
          <li>ESC：320A 控制器 + BEC</li>
        </ul>
      </q-card-section>
    </q-card>

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

    <!-- 計算題 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">速度計算範例</div>

        <!-- 公式 -->
        v = \frac{\pi D \cdot RPM}{gear\ ratio}

        <div class="q-mt-sm">條件：直徑 78mm / 齒比 6 / 15000 rpm</div>

        <div class="text-primary q-mt-sm">👉 約 ≈ 9.2 m/s ≈ 33 km/h</div>
      </q-card-section>
    </q-card>

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

<script>
export default {
  name: "MotorKnowledgePage",
};
</script>
