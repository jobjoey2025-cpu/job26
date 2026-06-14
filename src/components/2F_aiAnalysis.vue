<template>
  <q-page class="bg-grey-2">
    <div class="container q-pa-lg">
      <q-card flat bordered class="q-mb-lg">
  <div class="row justify-center q-pa-md">
    <q-img
      src="images\風格分析test.jpg"
      spinner-color="white"
      style="height: 140px; max-width: 150px;"
    />
  </div>
</q-card>

      <!-- Header -->
      <q-card flat bordered class="q-mb-lg">
        <q-card-section>
          <div class="text-h4 text-weight-bold">
            Living Room Design Analysis
          </div>

          <div class="text-subtitle1 text-grey-7 q-mt-sm">
            Japandi × Nordic × Industrial
          </div>

          <div class="q-mt-md">
            <q-chip color="brown-5" text-color="white"> Living Room </q-chip>

            <q-chip color="orange-6" text-color="white"> Render </q-chip>

            <q-chip outline>Japandi</q-chip>
            <q-chip outline>Nordic</q-chip>
            <q-chip outline>Industrial</q-chip>
            <q-chip outline>Warm Minimalism</q-chip>
            <q-chip outline>Wabi-Sabi</q-chip>
          </div>
        </q-card-section>
      </q-card>

      <!-- Score Overview -->
      <F_aiAnalysis_Radar />

      <!-- Analysis Sections -->
      <div class="row q-col-gutter-lg">
        <!-- Cultural -->
        <div class="col-12 col-lg-6">
          <q-card flat bordered class="full-height">
            <q-card-section>
              <div class="text-h6 text-weight-bold">🏮 文化底蘊分析</div>

              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      日本住宅文化
                    </q-item-label>

                    <q-item-label caption>
                      木質窗框、百葉窗、留白美學、自然採光
                    </q-item-label>

                    <div class="q-mt-sm">
                      侘寂（Wabi-Sabi） → 自然材質 → 時間感 → 生活感
                    </div>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      北歐生活哲學（Hygge）
                    </q-item-label>

                    <q-item-label caption>
                      柔軟布沙發、毛毯、暖色木質
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label class="text-weight-bold">
                      輕工業元素
                    </q-item-label>

                    <q-item-label caption>
                      黑色軌道燈、黑鐵層架、理性結構感
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Design Concept -->
        <div class="col-12 col-lg-6">
          <q-card flat bordered class="full-height">
            <q-card-section>
              <div class="text-h6 text-weight-bold">🎨 設計理念</div>

              <q-banner rounded class="bg-brown-1 q-mt-md">
                <div class="text-subtitle1 text-weight-bold">Urban Warmth</div>

                <div class="text-grey-8">城市中的溫暖木居</div>
              </q-banner>

              <q-list class="q-mt-md">
                <q-item>
                  <q-item-section avatar> ☀️ </q-item-section>

                  <q-item-section> 大量自然採光作為空間主角 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar> 🛋️ </q-item-section>

                  <q-item-section> 客廳作為核心交流場域 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar> 🪟 </q-item-section>

                  <q-item-section> 木質框景延伸空間層次 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Circulation -->
        <div class="col-12 col-lg-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-weight-bold">🚶 空間流線分析</div>

              <q-timeline color="primary">
                <q-timeline-entry title="入口" />
                <q-timeline-entry title="客廳" />
                <q-timeline-entry title="餐廳" />
                <q-timeline-entry title="其他空間" />
              </q-timeline>

              <q-separator />

              <div class="q-mt-md">
                <div>✅ 無阻礙動線</div>
                <div>✅ 家具比例適中</div>
                <div>✅ 走道寬度充足</div>
              </div>

              <q-chip color="green" text-color="white" class="q-mt-md">
                主動線寬度：約 90 ~ 120 cm
              </q-chip>
            </q-card-section>
          </q-card>
        </div>

        <!-- Material -->
        <div class="col-12 col-lg-6">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-weight-bold">🪵 軟裝材質分析</div>

              <q-list separator>
                <q-item>
                  <q-item-section>
                    <q-item-label> 地板 </q-item-label>

                    <q-item-label caption>
                      SPC石塑地板 / 超耐磨木地板
                    </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label> 沙發 </q-item-label>

                    <q-item-label caption> 棉麻布 / 科技布 </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label> 木作 </q-item-label>

                    <q-item-label caption> 胡桃木 / 木皮貼皮 </q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>
                    <q-item-label> 軟裝配件 </q-item-label>

                    <q-item-label caption>
                      毛毯、抱枕、花器、單椅
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Lighting -->
        <div class="col-12">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-weight-bold">💡 照明計畫分析</div>

              <div class="row q-col-gutter-md q-mt-md">
                <div class="col-12 col-md-4">
                  <q-card flat class="bg-amber-1">
                    <q-card-section>
                      <div class="text-subtitle1">☀️ 自然光</div>

                      <div>大面窗戶 + 百葉窗</div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-12 col-md-4">
                  <q-card flat class="bg-grey-3">
                    <q-card-section>
                      <div class="text-subtitle1">🎯 基礎照明</div>

                      <div>黑色軌道燈</div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-12 col-md-4">
                  <q-card flat class="bg-brown-1">
                    <q-card-section>
                      <div class="text-subtitle1">✨ 情境照明</div>

                      <div>燈槽、壁燈、落地燈</div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>

              <q-banner rounded class="bg-orange-1 q-mt-lg">
                建議色溫：
                <strong>2700K ~ 3000K</strong>
              </q-banner>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- AI Classification -->
      <q-card flat bordered class="q-mt-lg">
        <q-card-section>
          <div class="text-h6 text-weight-bold">
            🏷 AI Design OS Classification
          </div>

          <q-markup-table flat class="q-mt-md">
            <tbody>
              <tr>
                <td>Category</td>
                <td>Render</td>
              </tr>

              <tr>
                <td>Style</td>
                <td>Japandi × Nordic × Industrial</td>
              </tr>

              <tr>
                <td>Space</td>
                <td>Living Room</td>
              </tr>

              <tr>
                <td>Keywords</td>
                <td>木質、自然光、百葉窗、黑鐵、溫暖、留白</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import F_aiAnalysis_Radar from "components/F_aiAnalysis_Radar.vue";

const scores = [
  { label: "美感", score: 9 },
  { label: "溫馨感", score: 9.5 },
  { label: "採光", score: 10 },
  { label: "空間感", score: 9 },
  { label: "收納", score: 7 },
  { label: "設計一致性", score: 9 },
  { label: "可施工性", score: 9 },
];
</script>

<style scoped>
.container {
  max-width: 1400px;
  margin: auto;
}
</style>
