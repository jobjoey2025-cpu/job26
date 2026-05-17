<template>
  <q-page class="bg-grey-2">
    <!-- Hero -->
    <section class="hero-section q-pa-xl">
      <div class="text-overline text-brown-8">Future Vision</div>

      <div class="text-h3 text-weight-bold q-mt-sm">生活感資料庫</div>

      <!-- <div class="text-subtitle1 text-grey-8 q-mt-md">
        不做社群、不做打卡平台、不追流量。
      </div> -->
<!--
      <div class="text-h6 text-weight-medium q-mt-lg text-green-9">
        長期累積空間、氛圍、收納、回憶與生活便利性。
      </div> -->

      <div class="row q-col-gutter-sm q-mt-xl">
        <div class="col-auto">
          <q-chip color="amber-2" text-color="black" icon="auto_awesome">
            AI 空間建議
          </q-chip>
        </div>

        <div class="col-auto">
          <q-chip color="brown-2" text-color="black" icon="grid_view">
            平面配置圖
          </q-chip>
        </div>

        <div class="col-auto">
          <q-chip color="green-2" text-color="black" icon="inventory_2">
            拖拉收納箱
          </q-chip>
        </div>

        <div class="col-auto">
          <q-chip color="grey-4" text-color="black" icon="psychology">
            Codex Loop
          </q-chip>
        </div>
      </div>
    </section>

    <!-- Evolution -->
    <section class="q-pa-md">
      <div class="text-h5 text-weight-bold q-mb-lg">未來進化方向</div>

      <div class="row q-col-gutter-lg">
        <!-- AI Suggestion -->
        <div class="col-12 col-md-4">
          <q-card flat class="feature-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="auto_awesome" size="34px" color="amber-8" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">AI 空間建議</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">
                AI 分析空間照片， 提供生活動線與收納建議。
              </div>

              <q-list dense class="q-mt-md">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="green" />
                  </q-item-section>

                  <q-item-section> 木作配置 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="green" />
                  </q-item-section>

                  <q-item-section> 黃光與氛圍 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="green" />
                  </q-item-section>

                  <q-item-section> 收納最佳位置 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Layout -->
        <div class="col-12 col-md-4">
          <q-card flat class="feature-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="space_dashboard" size="34px" color="brown" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">平面配置圖</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">可直接拖拉空間元件。</div>

              <div class="row q-col-gutter-sm q-mt-lg">
                <div v-for="item in layoutItems" :key="item" class="col-6">
                  <q-card bordered flat>
                    <q-card-section class="text-center">
                      <q-icon name="inventory_2" size="28px" color="grey-7" />

                      <div class="q-mt-sm">
                        {{ item }}
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <!-- Print -->
        <div class="col-12 col-md-4">
          <q-card flat class="feature-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="print" size="34px" color="green-8" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">實體列印模式</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">實體比較容易長久有感。</div>

              <q-list dense class="q-mt-lg">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="description" />
                  </q-item-section>

                  <q-item-section> A4 配置圖 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="badge" />
                  </q-item-section>

                  <q-item-section> 空間說明卡 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="photo_camera" />
                  </q-item-section>

                  <q-item-section> 拍立得風格 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="q-pa-md">
      <q-card flat class="philosophy-card">
        <q-card-section>
          <div class="text-h5 text-weight-bold">不要做成</div>

          <div class="row q-col-gutter-md q-mt-lg">
            <div class="col-12 col-md-4">
              <q-banner rounded class="bg-red-1 text-red-9">
                社群平台
              </q-banner>
            </div>

            <div class="col-12 col-md-4">
              <q-banner rounded class="bg-red-1 text-red-9">
                打卡平台
              </q-banner>
            </div>

            <div class="col-12 col-md-4">
              <q-banner rounded class="bg-red-1 text-red-9">
                賺流量工具
              </q-banner>
            </div>
          </div>

          <q-separator class="q-my-xl" />

          <div class="text-h5 text-weight-bold text-green-9">
            而是：生活感資料庫
          </div>

          <div class="row q-col-gutter-md q-mt-lg">
            <div v-for="item in lifeData" :key="item" class="col-6 col-md-2">
              <q-card bordered flat class="bg-white">
                <q-card-section class="text-center">
                  <q-icon name="bookmark" size="26px" color="brown" />

                  <div class="q-mt-sm text-subtitle2">
                    {{ item }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="q-mt-xl text-body1 text-grey-8">
            這個方向其實很少人做， 但會很耐用。
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Codex -->
    <section class="q-pa-md q-pb-xl">
      <q-card flat class="codex-card">
        <q-card-section>
          <div class="text-h5 text-weight-bold">Codex Loop Folder</div>

          <div class="text-subtitle2 text-grey-7 q-mt-sm">
            可以當成長期自學與測試系統。
          </div>

          <div class="row q-col-gutter-xl q-mt-lg">
            <!-- Folder -->
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">
                Folder Structure
              </div>

              <q-list bordered separator class="rounded-borders q-mt-md">
                <q-item v-for="folder in folders" :key="folder">
                  <q-item-section avatar>
                    <q-icon name="folder" color="amber-8" />
                  </q-item-section>

                  <q-item-section>
                    {{ folder }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <!-- Timeline -->
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">長期自學策略</div>

              <q-timeline color="brown" class="q-mt-md">
                <q-timeline-entry title="現在" subtitle="自學 + 測試">
                  建立自己的生活空間資料庫。
                </q-timeline-entry>

                <q-timeline-entry title="1 年" subtitle="AI 整合">
                  開始測試 AI 空間分析與配置。
                </q-timeline-entry>

                <q-timeline-entry title="2 年" subtitle="小公司也不一定會教">
                  花時間自學， 反而可能更划算。
                </q-timeline-entry>
              </q-timeline>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
const layoutItems = ["收納箱", "桌子", "植物", "投影區"];

const lifeData = ["空間", "氛圍", "生活便利性", "收納", "回憶"];

const folders = [
  "/space-photo",
  "/mood-board",
  "/layout-test",
  "/ai-prompt",
  "/print-layout",
  "/timeline-memory",
];
</script>

<style scoped>
.hero-section {
  min-height: 320px;

  background: linear-gradient(180deg, #ece4d9 0%, #f5f3ef 100%);

  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}

.feature-card {
  min-height: 220px;

  border-radius: 24px;

  background: white;
}

.philosophy-card {
  border-radius: 24px;

  background: linear-gradient(180deg, #ffffff 0%, #f7f7f7 100%);
}

.codex-card {
  border-radius: 24px;

  background: linear-gradient(180deg, #f6f5f2 0%, #ece8e1 100%);
}

.rounded-borders {
  border-radius: 18px;
}
</style>
