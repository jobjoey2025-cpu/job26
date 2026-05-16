<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Hero -->
    <div class="row q-col-gutter-md q-mb-lg">
      <div class="col-12">
        <q-card class="rounded-borders shadow-4 bg-primary text-white">
          <q-card-section>
            <div class="text-h4 text-weight-bold">
              Python 後端 + Quasar UI App
            </div>

            <div class="text-subtitle1 q-mt-sm">
              Colab → FastAPI → Railway → Quasar 的 AI 開發流程整理
            </div>

            <div class="q-mt-md">
              <q-chip color="white" text-color="primary" icon="smart_toy">
                GPT / Claude / Gemini
              </q-chip>

              <q-chip color="white" text-color="primary" icon="api">
                FastAPI
              </q-chip>

              <q-chip color="white" text-color="primary" icon="cloud_upload">
                Railway
              </q-chip>

              <q-chip color="white" text-color="primary" icon="dashboard">
                Quasar
              </q-chip>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Main Grid -->
    <div class="row q-col-gutter-lg">

      <!-- LEFT -->
      <div class="col-12 col-lg-8">

        <!-- 技術架構 -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md">
              技術架構
            </div>

            <q-timeline color="primary">

              <q-timeline-entry
                title="Google Colab"
                subtitle="Prototype"
                icon="science"
              >
                Python 測試、AI coding、Notebook 驗證
              </q-timeline-entry>

              <q-timeline-entry
                title="FastAPI"
                subtitle="Backend API"
                icon="api"
              >
                建立股票 / 新聞 / 分析 API
              </q-timeline-entry>

              <q-timeline-entry
                title="Railway"
                subtitle="Deployment"
                icon="cloud"
              >
                雲端部署 + HTTP Logs + Build Logs
              </q-timeline-entry>

              <q-timeline-entry
                title="Quasar Framework"
                subtitle="Frontend UI"
                icon="dashboard_customize"
              >
                One-page dashboard UI
              </q-timeline-entry>

            </q-timeline>
          </q-card-section>
        </q-card>

        <!-- Domain Know How -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md">
              Domain Know How
            </div>

            <div class="flex flex-center q-mb-lg">
              <div class="column items-center">

                <q-chip color="blue-1" text-color="black" size="lg">
                  基本面
                </q-chip>

                <q-icon name="south" size="32px" color="grey-7" />

                <q-chip color="green-1" text-color="black" size="lg">
                  估值
                </q-chip>

                <q-icon name="south" size="32px" color="grey-7" />

                <q-chip color="orange-1" text-color="black" size="lg">
                  產業 Cycle
                </q-chip>

                <q-icon name="south" size="32px" color="grey-7" />

                <div class="row q-col-gutter-md">

                  <div class="col-auto">
                    <q-chip color="red-1" text-color="black">
                      資金
                    </q-chip>
                  </div>

                  <div class="col-auto">
                    <q-chip color="purple-1" text-color="black">
                      情緒
                    </q-chip>
                  </div>

                </div>

                <q-icon name="south" size="32px" color="grey-7" />

                <q-chip color="teal-1" text-color="black" size="lg">
                  籌碼
                </q-chip>

              </div>
            </div>

            <q-banner class="bg-yellow-1 text-black rounded-borders">
              核心能力：將多種資訊排版到 One-Page UI
            </q-banner>
          </q-card-section>
        </q-card>

        <!-- 成功照片 -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md">
              成功畫面 & 驗證
            </div>

            <div class="row q-col-gutter-md">

              <div class="col-12 col-md-6">
                <q-card bordered>
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">
                      Quasar 成功畫面
                    </div>

                    <div class="text-grey-7 q-mt-sm">
                      成功讀取 FastAPI API
                    </div>

                    <q-img
                      src="https://cdn.quasar.dev/img/parallax2.jpg"
                      ratio="16/9"
                      class="rounded-borders q-mt-md"
                    />
                  </q-card-section>
                </q-card>
              </div>

              <div class="col-12 col-md-6">
                <q-card bordered>
                  <q-card-section>
                    <div class="text-subtitle1 text-weight-bold">
                      Railway Logs
                    </div>

                    <q-list bordered separator class="rounded-borders q-mt-md">
                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="warning" color="orange" />
                        </q-item-section>

                        <q-item-section>
                          deployment crashed
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="bug_report" color="red" />
                        </q-item-section>

                        <q-item-section>
                          ModuleNotFoundError
                        </q-item-section>
                      </q-item>

                      <q-item>
                        <q-item-section avatar>
                          <q-icon name="schedule" color="primary" />
                        </q-item-section>

                        <q-item-section>
                          HTTP 時間監控 / 404
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-card-section>
                </q-card>
              </div>

            </div>

            <q-separator class="q-my-md" />

            <div class="text-subtitle1 text-weight-bold">
              測試 API
            </div>

            <q-banner class="bg-black text-green-4 q-mt-sm rounded-borders">
              https://web-production-b229a.up.railway.app/analyze/2330
            </q-banner>
          </q-card-section>
        </q-card>

        <!-- Coding 心得 -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h5 text-weight-bold q-mb-md">
              Coding 過程心得
            </div>

            <q-list bordered separator>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="psychology" color="primary" />
                </q-item-section>

                <q-item-section>
                  要等突然成功，要預留很多時間 & 收斂保留戰果
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="smart_toy" color="deep-purple" />
                </q-item-section>

                <q-item-section>
                  GPT & Colab AI 的使用方法需要習慣
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="terminal" color="green" />
                </q-item-section>

                <q-item-section>
                  CLI 是趨勢，不能避免
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="language" color="orange" />
                </q-item-section>

                <q-item-section>
                  好服務很多都是 English UI，要習慣英文頁面
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="save" color="red" />
                </q-item-section>

                <q-item-section>
                  改很多功能前，先保留戰果
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>

      </div>

      <!-- RIGHT -->
      <div class="col-12 col-lg-4">

        <!-- 注意事項 -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">
              注意事項
            </div>

            <q-list dense>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="vpn_key" color="red" />
                </q-item-section>

                <q-item-section>
                  .env 不要 commit 到 GitHub
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="token" color="deep-orange" />
                </q-item-section>

                <q-item-section>
                  GPT Loop 會瞬間爆 Token
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="storage" color="primary" />
                </q-item-section>

                <q-item-section>
                  Colab 工作階段 max = 3
                </q-item-section>
              </q-item>

              <q-item>
                <q-item-section avatar>
                  <q-icon name="picture_as_pdf" color="purple" />
                </q-item-section>

                <q-item-section>
                  PDF 很耗資源，先做 News
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>

        <!-- Token -->
        <q-card class="q-mb-lg shadow-2 bg-red-1">
          <q-card-section>
            <div class="text-h6 text-weight-bold">
              Token 問題
            </div>

            <div class="text-h4 text-red q-mt-md">
              444,649
            </div>

            <div class="text-subtitle2">
              total tokens
            </div>

            <q-linear-progress
              size="25px"
              :value="1"
              color="red"
              class="q-mt-md rounded-borders"
            >
              <div class="absolute-full flex flex-center">
                <q-badge color="white" text-color="red">
                  模型上限 300,000
                </q-badge>
              </div>
            </q-linear-progress>

            <q-banner class="bg-white q-mt-md rounded-borders">
              最推薦：
              <b>預測離線化</b>
              而不是 API 即時預測
            </q-banner>
          </q-card-section>
        </q-card>

        <!-- Future -->
        <q-card class="q-mb-lg shadow-2">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">
              未來發展
            </div>

            <q-stepper
              vertical
              flat
              bordered
              color="primary"
              animated
            >

              <q-step
                :name="1"
                title="GitHub Action"
                icon="settings"
                done
              >
                自動每日更新
              </q-step>

              <q-step
                :name="2"
                title="Prophet 預測"
                icon="show_chart"
                done
              >
                每天跑 Prophet
              </q-step>

              <q-step
                :name="3"
                title="產生 PNG"
                icon="image"
                done
              >
                圖表輸出
              </q-step>

              <q-step
                :name="4"
                title="Cloudflare R2 / Supabase"
                icon="cloud_upload"
              >
                儲存圖片
              </q-step>

              <q-step
                :name="5"
                title="Quasar 讀圖"
                icon="dashboard"
              >
                前端直接展示
              </q-step>

            </q-stepper>
          </q-card-section>
        </q-card>

        <!-- Hosting -->
        <q-card class="shadow-2">
          <q-card-section>
            <div class="text-h6 text-weight-bold q-mb-md">
              其他託管平台
            </div>

            <q-list bordered separator>

              <q-item v-for="item in hostingList" :key="item.name">
                <q-item-section avatar>
                  <q-icon :name="item.icon" color="primary" />
                </q-item-section>

                <q-item-section>
                  <div class="text-weight-bold">
                    {{ item.name }}
                  </div>

                  <div class="text-caption text-grey-7">
                    {{ item.desc }}
                  </div>
                </q-item-section>
              </q-item>

            </q-list>
          </q-card-section>
        </q-card>

      </div>
    </div>
  </q-page>
</template>

<script setup>
const hostingList = [
  {
    name: 'Railway',
    desc: '最推薦',
    icon: 'cloud'
  },
  {
    name: 'Render',
    desc: 'FastAPI 很熱門',
    icon: 'dns'
  },
  {
    name: 'Fly.io',
    desc: '高手愛用',
    icon: 'flight'
  },
  {
    name: 'Koyeb',
    desc: '近年熱門',
    icon: 'bolt'
  },
  {
    name: 'Deta Space',
    desc: '超簡單',
    icon: 'space_dashboard'
  },
  {
    name: 'Google Cloud Run',
    desc: '超專業',
    icon: 'cloud_queue'
  },
  {
    name: 'Oracle Cloud Free Tier',
    desc: '神級免費',
    icon: 'workspace_premium'
  }
]
</script>

<style scoped>
.rounded-borders {
  border-radius: 18px;
}
</style>