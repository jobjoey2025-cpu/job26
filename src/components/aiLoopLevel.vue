<template>
  <q-page class="bg-grey-2">
    <!-- Hero -->
    <section class="hero-section q-pa-xl">
      <div class="text-overline text-blue-grey-8">AI Evolution Roadmap</div>

      <div class="text-h3 text-weight-bold q-mt-sm">AI 使用者進化地圖</div>

      <div class="text-subtitle1 text-grey-8 q-mt-md">
        AI 正從「對話夥伴」變成「自主執行者」。
      </div>

      <div class="row q-col-gutter-sm q-mt-xl">
        <div v-for="tag in heroTags" :key="tag" class="col-auto">
          <q-chip color="blue-grey-1" text-color="black">
            {{ tag }}
          </q-chip>
        </div>
      </div>
    </section>

    <!-- Levels -->
    <section class="q-pa-md">
      <div class="text-h5 text-weight-bold q-mb-lg">AI 使用者等級</div>

      <div class="column q-gutter-lg">
        <q-card
          v-for="level in levels"
          :key="level.title"
          flat
          class="level-card"
        >
          <q-card-section>
            <div class="row items-start q-col-gutter-md">
              <div class="col-auto">
                <q-avatar
                  size="54px"
                  color="blue-grey-2"
                  text-color="black"
                  class="text-weight-bold"
                >
                  {{ level.level }}
                </q-avatar>
              </div>

              <div class="col">
                <div class="text-h6 text-weight-bold">
                  {{ level.title }}
                </div>

                <div class="text-body1 text-grey-8 q-mt-sm">
                  {{ level.description }}
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- Agent Loop -->
    <section class="q-pa-md">
      <q-card flat class="agent-card">
        <q-card-section>
          <div class="text-h5 text-weight-bold">Loop + Agent 自主循環</div>

          <div class="text-subtitle1 text-grey-8 q-mt-md">
            AI 讀取使用者回饋後， 自己修改、測試、再修正。
          </div>

          <div class="row q-col-gutter-lg q-mt-xl">
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">Workflow</div>

              <q-timeline color="blue-grey" class="q-mt-md">
                <q-timeline-entry title="讀取程式碼" subtitle="Analyze">
                  AI 自動定位問題。
                </q-timeline-entry>

                <q-timeline-entry title="修改 Bug" subtitle="Fix">
                  直接改檔案與邏輯。
                </q-timeline-entry>

                <q-timeline-entry title="執行測試" subtitle="Test">
                  跑測試並分析失敗原因。
                </q-timeline-entry>

                <q-timeline-entry title="再次修正" subtitle="Loop">
                  根據結果持續迭代。
                </q-timeline-entry>

                <q-timeline-entry title="交付結果" subtitle="Deliver">
                  最後直接產出可用結果。
                </q-timeline-entry>
              </q-timeline>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">
                <span style="color: red">測試案例</span> wait good BOOK
              </div>

              <q-list bordered separator class="rounded-borders q-mt-md">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="bug_report" />
                  </q-item-section>

                  <q-item-section>
                    股票 Alarm 測試 (先要定義 記錄輸贏)</q-item-section
                  >
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="loop" />
                  </q-item-section>

                  <q-item-section>
                    使用者回饋循環 (Link googleForm API)</q-item-section
                  >
                </q-item>

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="terminal" />
                  </q-item-section>

                  <q-item-section>
                    Claude Code / Agent 測試 <br />「幫我把這個 bug
                    修掉並跑完測試」，AI
                    就會自己讀程式碼、定位問題、修改檔案、執行測試、看到失敗再改一輪，最後直接把結果交付給你。
                  </q-item-section>
                </q-item>
              </q-list>

              <q-banner rounded class="bg-blue-grey-1 q-mt-lg">
                對非工程師而言雖然還有段距離， 但趨勢已經很明確：AI
                正從「對話夥伴」變成「自主執行者」。<br />
              </q-banner>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>

    <!-- Skills -->
    <section class="q-pa-md">
      <div class="text-h5 text-weight-bold q-mb-lg">
        Skills / Projects / MCP
      </div>

      <div class="row q-col-gutter-lg">
        <!-- Skills -->
        <div class="col-12 col-md-4">
          <q-card flat class="info-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="psychology" size="34px" color="deep-purple" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">Skills</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">
                回答： 「Claude 該怎麼做這件事？」<b><span style="color: red;">成熟 套版</span></b>
              </div>

              <q-separator class="q-my-md" />

              <div class="text-body2">
                像一位受訓員工， 執行固定流程與標準動作。
              </div>

              <q-list dense class="q-mt-md">
                <q-item>
                  <q-item-section> 重複性高 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 有固定步驟 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 格式穩定 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Projects -->
        <div class="col-12 col-md-4">
          <q-card flat class="info-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="library_books" size="34px" color="brown" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">Projects</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">
                回答： 「Claude 該知道什麼？」<b><span style="color: red;">joey HDD 的私人資料</span></b>
              </div>

              <q-separator class="q-my-md" />

              <div class="text-body2">像一座圖書館， 存放長期靜態知識。</div>

              <q-list dense class="q-mt-md">
                <q-item>
                  <q-item-section> 文件知識庫 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 長期 Context </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 固定規則 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- MCP -->
        <div class="col-12 col-md-4">
          <q-card flat class="info-card">
            <q-card-section>
              <div class="row items-center q-col-gutter-sm">
                <div class="col-auto">
                  <q-icon name="hub" size="34px" color="green" />
                </div>

                <div class="col">
                  <div class="text-h6 text-weight-bold">MCP</div>
                </div>
              </div>

              <div class="q-mt-md text-grey-8">
                回答： 「Claude 能連到什麼<b><span style="color: red;">活資料</span></b>？網路股價\ 新聞\ 期刊\ autoCAD軟體」
              </div>

              <q-separator class="q-my-md" />

              <div class="text-body2">像一支對講機， 連向外部世界。</div>

              <q-list dense class="q-mt-md">
                <q-item>
                  <q-item-section> API </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> Database </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section> 即時資料 </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>

    <!-- Skill Design -->
    <section class="q-pa-md q-pb-xl">
      <q-card flat class="skill-card">
        <q-card-section>
          <div class="text-h5 text-weight-bold">動手做第一個 Skill</div>

          <div class="text-subtitle1 text-grey-8 q-mt-md">
            挑一件： 重複性高、有固定步驟、輸出格式穩定的工作。
          </div>

          <div class="row q-col-gutter-lg q-mt-xl">
            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">Skill 設計重點 - <b><span style="color: red;">套版 公版</span></b></div>

              <q-list bordered separator class="rounded-borders q-mt-md">
                <q-item v-for="item in skillTips" :key="item">
                  <q-item-section avatar>
                    <q-icon name="check_circle" color="green" />
                  </q-item-section>

                  <q-item-section>
                    {{ item }}
                  </q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <div class="text-subtitle1 text-weight-bold">實務建議</div>

              <q-banner rounded class="bg-amber-1 text-black q-mt-md">
                ELI5（Explain Like I'm 5）：
                把複雜主題用大白話解釋給非專業讀者聽。
              </q-banner>

              <q-banner rounded class="bg-blue-1 text-black q-mt-md">
                建議精簡到 500 字內， 提高 Skill 觸發率。
              </q-banner>

              <q-banner rounded class="bg-green-1 text-black q-mt-md">
                如果觸發率太低， 可調整名稱與描述關鍵字。
              </q-banner>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </section>
  </q-page>
</template>

<script setup>
const heroTags = [
  "Prompt",
  "Workflow",
  "Skills",
  "Projects",
  "MCP",
  "Claude Code",
  "Agent",
];

const levels = [
  {
    level: "L1",
    title: "對話使用者",
    description: "打開免費 AI 聊天視窗，問什麼答什麼。",
  },
  {
    level: "L2",
    title: "進階對話使用者",
    description: "使用付費模型與長 Prompt 進行深度思考。",
  },
  {
    level: "L3",
    title: "Workflow 建構者",
    description: "透過 Skills 或 Projects 自動化重複工作。",
  },
  {
    level: "L4",
    title: "檔案協作者",
    description: "開始讓 AI **讀取電腦內**的檔案與知識（Cowork）。",
  },
  {
    level: "L5",
    title: "自主 Agent 操作者",
    description: "讓 AI 自主執行完整任務與循環測試(自己測試的範例)。",
  },
];

const skillTips = [
  "挑重複性高的工作",
  "固定步驟流程",
  "輸出格式盡量穩定",
  "避免 Prompt 過長",
  "先做小型 Workflow",
  "從自己每天會用到的事情開始",
];
</script>

<style scoped>
.hero-section {
  min-height: 320px;

  background: linear-gradient(180deg, #e7ecef 0%, #f6f7f8 100%);

  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
}

.level-card {
  border-radius: 22px;

  background: white;
}

.agent-card {
  border-radius: 24px;

  background: linear-gradient(180deg, #f6f8fa 0%, #eceff1 100%);
}

.info-card {
  min-height: 220px;

  border-radius: 22px;

  background: white;
}

.skill-card {
  border-radius: 24px;

  background: linear-gradient(180deg, #ffffff 0%, #f3f5f7 100%);
}

.rounded-borders {
  border-radius: 18px;
}
</style>
