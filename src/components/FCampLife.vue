<template>
  <q-page class="bg-grey-2">
    <!-- Hero -->
    <section class="hero-section q-pa-lg">
      <div class="text-h3 text-weight-bold">prj : 2F Camp Life</div>

      <div class="text-subtitle1 q-mt-sm text-grey-7">
        生活方便，比賺錢重要。
      </div>

      <div class="row q-col-gutter-sm q-mt-md">
        <q-chip color="brown-3" text-color="black"> 住感 </q-chip>

        <q-chip color="green-2" text-color="black"> 有感收納 </q-chip>

        <q-chip color="amber-2" text-color="black"> 空間靈感簿 </q-chip>
      </div>
    </section>

    <!-- Core Concept -->
    <section class="q-pa-md">
      <q-card flat class="rounded-borders bg-white">
        <q-card-section>
          <div class="text-h5 text-weight-bold">App 核心理念</div>

          <div class="text-body1 q-mt-md text-grey-8">
            不是社群，不是短影音，也不是 KPI 工具。
          </div>

          <div class="text-body1 text-grey-8">它像是一個：</div>

          <div class="row q-col-gutter-md q-mt-md">
            <div class="col-6 col-md-3">
              <q-card bordered flat>
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    生活構思板
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-6 col-md-3">
              <q-card bordered flat>
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    長期收納相簿
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-6 col-md-3">
              <q-card bordered flat>
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    空間靈感簿
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-6 col-md-3">
              <q-card bordered flat>
                <q-card-section>
                  <div class="text-subtitle1 text-weight-medium">
                    實體生活計畫庫
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="q-mt-lg text-grey-7">
            有點介於 Pinterest、Notion、相簿、空間規劃筆記之間。
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Features -->
    <section class="q-pa-md">
      <div class="text-h5 text-weight-bold q-mb-md">核心功能</div>

      <div class="row q-col-gutter-lg">
        <!-- Album -->
        <div class="col-12 col-md-6">
          <q-card flat class="feature-card">
            <q-card-section>
              <div class="text-h6 text-weight-bold">1. 收納相簿</div>

              <div class="text-body2 text-grey-7 q-mt-sm">
                收藏空間照片、露營配置、家具配置、生活動線。
              </div>

              <q-separator class="q-my-md" />

              <div class="text-subtitle2 text-weight-medium">功能</div>

              <div class="row q-col-gutter-sm q-mt-sm">
                <div class="col-6">
                  <q-chip square icon="upload"> 上傳照片 </q-chip>
                </div>

                <div class="col-6">
                  <q-chip square icon="folder"> 建立分類 </q-chip>
                </div>

                <div class="col-6">
                  <q-chip square icon="drag_indicator"> 拖曳排序 </q-chip>
                </div>

                <div class="col-6">
                  <q-chip square icon="sell"> 加標籤 </q-chip>
                </div>
              </div>

              <div class="q-mt-md text-caption text-grey-6">
                「收納前後比較」會是很重要的體驗。
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Mood Board -->
        <div class="col-12 col-md-6">
          <q-card flat class="feature-card">
            <q-card-section>
              <div class="text-h6 text-weight-bold">
                2. 構思圖集（Mood Board）
              </div>

              <div class="text-body2 text-grey-7 q-mt-sm">
                像 Pinterest，但更私密、更生活化。
              </div>

              <q-separator class="q-my-md" />

              <div class="row q-col-gutter-sm">
                <div class="col-6">
                  <q-chip icon="edit_note"> 加文字 </q-chip>
                </div>
                <div class="col-6">
                  <q-chip icon="dashboard_customize"> 拼貼圖 </q-chip>
                </div>

                <div class="col-6">
                  <q-chip icon="draw"> 手繪草圖 </q-chip>
                </div>

                <div class="col-6">
                  <q-chip icon="straighten"> 尺寸規劃 </q-chip>
                </div>
              </div>

              <div class="q-mt-md text-grey-7">
                Joey 主要是： 箱子攤開照片 → save key-in 文字與時間。
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- 2F Camp -->
    <section class="q-pa-md">
      <q-card flat class="bg-brown-1 rounded-borders">
        <q-card-section>
          <div class="text-h5 text-weight-bold">3. 2F 露營區</div>

          <div class="text-body1 q-mt-md">
            把家的一部分， 變成能長久生活的露營感空間。
          </div>

          <div class="row q-col-gutter-lg q-mt-md">
            <div class="col-12 col-md-4">
              <div class="text-subtitle1 text-weight-bold">空間規劃</div>

              <q-list dense>
                <q-item>
                  <q-item-section>收納牆</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>投影區</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>生活動線</q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-4">
              <div class="text-subtitle1 text-weight-bold">氛圍元素</div>

              <q-list dense>
                <q-item>
                  <q-item-section>黃光</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>木頭</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>植物</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>帆布 / 金屬架</q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-4">
              <div class="text-subtitle1 text-weight-bold">實體感</div>
              <p>「實體比較容易長久有感」\\ 印出配置圖</p>
              <q-list dense>
                <q-item>
                  <q-item-section>實體打卡牆</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>QR 對應相簿</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>拍立得風格</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section>月份回顧</q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Timeline -->
    <section class="q-pa-md">
      <q-card flat class="rounded-borders">
        <q-card-section>
          <div class="text-h5 text-weight-bold">4. 生活演進時間軸</div>

          <div class="text-grey-7 q-mt-sm">不是社群動態，而是生活演進。<b>must 自動時間 標籤</b></div>

          <q-timeline color="brown" class="q-mt-lg">
            <q-timeline-entry title="2F 清空完成" subtitle="2026 / 05">
              建立第一階段空間。
            </q-timeline-entry>

            <q-timeline-entry title="木地板完成" subtitle="2026 / 06">
              開始有露營感。
            </q-timeline-entry>

            <q-timeline-entry title="第一次室內露營夜" subtitle="2026 / 08">
              空間真正開始有生命。
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>
    </section>

    <!-- Score -->
    <section class="q-pa-md">
      <q-card flat class="bg-green-1 rounded-borders">
        <q-card-section>
          <div class="text-h5 text-weight-bold">5. 生活方便度評分</div>

          <div class="text-grey-8 q-mt-sm">
            不看 ROI，不看成長率，不看賺多少。
            <br />
            而是今天生活有沒有更方便。維護成本 \ 放鬆感。
          </div>

          <div class="row q-col-gutter-md q-mt-md">
            <div
              v-for="item in scores"
              :key="item.label"
              class="col-6 col-md-3"
            >
              <q-card bordered flat>
                <q-card-section class="text-center">
                  <div class="text-subtitle2">
                    {{ item.label }}
                  </div>

                  <div class="text-h4 text-weight-bold q-mt-sm">
                    {{ item.score }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <p>UI 風格建議 : 無印;	北歐露營;	暖灰色; Snow Peak; 淺木色</p>
        </q-card-section>
      </q-card>
    </section>

    <!-- MVP -->
    <section class="q-pa-md q-pb-xl">
      <q-card flat class="rounded-borders">
        <q-card-section>
          <div class="text-h5 text-weight-bold">MVP 規劃</div>

          <div class="row q-col-gutter-lg q-mt-md">
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">技術</div>

              <q-list bordered separator class="rounded-borders q-mt-sm">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="code" />
                  </q-item-section>

                  <q-item-section> Quasar / Vue </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="storage" />
                  </q-item-section>

                  <q-item-section> Supabase </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="image" />
                  </q-item-section>

                  <q-item-section>
                    圖片儲存 / 登入 / 小型資料庫
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">第一版功能</div>

              <q-list bordered separator class="rounded-borders q-mt-sm">
                <q-item>
                  <q-item-section> 上傳照片 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 建立圖集 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 標籤 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 備註 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 時間軸 </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>



const scores = [
  {
    label: "好收納",
    score: 9,
  },
  {
    label: "放鬆感",
    score: 10,
  },
  {
    label: "維護成本",
    score: 6,
  },
  {
    label: "生活便利性",
    score: 9,
  },
];
</script>

<style scoped>
.hero-section {
  background: linear-gradient(180deg, #e7dfd6 0%, #f5f3ef 100%);

  min-height: 240px;

  display: flex;
  flex-direction: column;
  justify-content: center;
}

.feature-card {
  border-radius: 18px;
  background: white;
  min-height: 320px;
}

.rounded-borders {
  border-radius: 20px;
}
</style>
