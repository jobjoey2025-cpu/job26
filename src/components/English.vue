<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h4 q-mb-md">英文學習：資訊擷取系統</div>

      <q-banner rounded class="bg-blue-1 text-black q-mb-md">
        <b>核心觀念：</b><br />
        英翻中是重要生存技能，重點是速度與廣度。<br />
        英文不是考試科目，而是資訊擷取系統。<br />
        重點是找到適合自己的資訊管道。每個階段 能力不同
      </q-banner>

      <!-- 核心觀念 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">核心觀念</div>

          <ul>
            <li>英文內容早已不稀缺 YT VOA，不需要狂背單字 購買空中英語。</li>
            <li>
              RCFans 評論 \ 好像 阿陸的也 長期吸引力不夠 vs LEGO \ 改 Watch TEST
            </li>
            <li>
              建立自己的 English Repeat Channel。 \ 如果有 東京情報猿 就太好了
            </li>
            <li>
              這些會比較軟 : 廣告 \ 奢侈大牌 \ 有趣的評論家 Fashion Food \
            </li>
            <li>目標是支援未來 Web 合約與工程工作。</li>
          </ul>

          <q-separator class="q-my-md" />

          <div class="text-subtitle1">AC English 觀察</div>

          <ul>
            <li>不一定每句都聽懂。</li>
            <li>但 WeChat 訊息都有跟到。</li>
            <li>重點是不漏掉關鍵資訊。</li>
          </ul>

          <div class="text-subtitle1 q-mt-md">為什麼中文比較容易？</div>

          <ul>
            <li>WeChat</li>
            <li>LINE</li>
            <li>Email</li>
            <li>同事聊天</li>
          </ul>

          <p>同樣訊息會重複很多次，所以即使第一次漏掉， 後面還有機會補回來。</p>

          <p>英文資訊通常只有一次， 因此重點不是每句都懂，而是抓到重點。</p>
        </q-card-section>
      </q-card>

      <!-- 學習目標 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">英文學習目標</div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-6">
              <q-list bordered>
                <q-item>
                  <q-item-section avatar>❌</q-item-section>
                  <q-item-section>背大量單字</q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>❌</q-item-section>
                  <q-item-section>考高分</q-item-section>
                </q-item>
              </q-list>
            </div>

            <div class="col-12 col-md-6">
              <q-list bordered>
                <q-item>
                  <q-item-section avatar>✅</q-item-section>
                  <q-item-section> Web 合約與工程工作 </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar>✅</q-item-section>
                  <q-item-section> 快速取得第一手資訊 </q-item-section>
                </q-item>
              </q-list>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <!-- 三層能力 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">三層聽力能力</div>

          <q-list bordered>
            <q-expansion-item icon="filter_1" label="Level 1：Keyword">
              <q-card>
                <q-card-section>
                  能聽出：人名、公司名、技術名詞、關鍵數字、專案名<br />
                  腦中只要得到：Deadline → Next Friday 即可。
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item icon="filter_2" label="Level 2：Action Item">
              <q-card>
                <q-card-section>
                  能知道：Who / What / When 接下來要做什麼 <br />
                  聽不懂全部沒關係 知道要做什麼最重要 Send report \ Update
                  schedule \ Check supplier
                </q-card-section>
              </q-card>
            </q-expansion-item>

            <q-expansion-item icon="filter_3" label="Level 3：Decision">
              <q-card>
                <q-card-section>
                  最終結論、決策方向、責任分工 <br />
                  Let's postpone the release. 決定延期 而不是文法。
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 學習路線 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">學習路線</div>

          <q-timeline color="primary">
            <q-timeline-entry title="第一階段：輕鬆聽">
              DW Shift : 科技 商業 *未來趨勢 (歐洲再談甚麼)<br />
              Channel Japan : 發音清楚 語速較穩<br />
              情報猿（Fashion 預測）
            </q-timeline-entry>

            <q-timeline-entry title="第二階段：工作相關">
              CNBC 訪談<br />
              用中文講出重點 \ 對市場有何影響<br />
              公司在做什麼？<br />
              CEO 想表達什麼？
            </q-timeline-entry>

            <q-timeline-entry title="第三階段：實戰">
              Apple Developer Conference<br />
              聽 Keynote \ 哪些功能可能影響工作<br />
              寫出 Action Item
            </q-timeline-entry>

            <q-timeline-entry title="第四階段：最高價值">
              客戶會議 Team Meeting 套版<br />
              TD6 單打等級的順暢度
            </q-timeline-entry>
          </q-timeline>
        </q-card-section>
      </q-card>

      <!-- Repeat Channel -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">English Repeat Channel</div>

          <q-chip color="primary" text-color="white"> Stocks 分析 </q-chip>

          <q-chip color="secondary" text-color="white"> Fashion 預測 </q-chip>

          <q-chip color="orange" text-color="white"> Apple Event </q-chip>

          <q-chip color="green" text-color="white"> Luxury Brand </q-chip>

          <q-chip color="red" text-color="white"> Watch TEST </q-chip>

          <q-chip color="teal" text-color="white"> 有趣評論家 </q-chip>

          <p class="q-mt-md">重複接觸相同主題， 比一直換教材有效。</p>
        </q-card-section>
      </q-card>

      <!-- AI 輔助 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">AI 輔助方案</div>

          <q-list bordered separator>
            <q-item>
              <q-item-section> CNBC / Podcast </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> AI Transcript </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> Summary </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> 自己重述一次 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section> 工作會議實戰 </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 5分鐘法 -->
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">5 分鐘專注收斂法</div>

          <q-banner class="bg-yellow-1">
            不追求聽 1 小時

            <br /><br />

            改成：

            <ul>
              <li>5 分鐘高度專注</li>
              <li>抓 Keyword</li>
              <li>抓 Action Item</li>
              <li>抓 Decision</li>
            </ul>

            每天多次重複。
          </q-banner>
        </q-card-section>
      </q-card>
    </div>
    <q-table
      title="英文內容來源分級"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
    />
    <h4>未來發展</h4>
    <p>方便後續再加入「推薦頻道連結」、「Apple Event 清單」、「Stocks/Fashion Watch List」等內容。</p>
    <p>ai 答案不完美 \ 但總能激發我 一點新意</p>
    <q-btn
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        icon="format_image__right"
        label="Trello 英翻中"
        href="https://trello.com/b/ATj0GjyW/英翻中sys24-05"
        target="”_blank”"
      />
      --
      <q-btn
        color="grey-4"
        text-color="purple"
        glossy
        unelevated
        icon="format_image__right"
        label="RC Plane 玩的項目？"
        href="https://www.notion.so/RC-Plane-370020032b2980fe8805f7b2c7caa62d?source=copy_link"
        target="”_blank”"
      />


  </q-page>
</template>
<script setup>
const columns = [
  {
    name: "bad",
    label: "效果較差",
    field: "bad",
    align: "left",
  },
  {
    name: "stable",
    label: "較穩定",
    field: "stable",
    align: "left",
  },
  {
    name: "new",
    label: "新測試",
    field: "new",
    align: "left",
  },
];

const rows = [
  {
    bad: "Friends weChat",
    stable: "DW Shift",
    new: "Apple 開發者大會",
  },
  {
    bad: "RC Car / Plane 評論 (RCFans)",
    stable: "Channel Japan",
    new: "美國之音 VOA",
  },
  {
    bad: "一般開箱影片",
    stable: "東京情報猿",
    new: "DIY 測試頻道 magazine",
  },
  {
    bad: "娛樂型內容",
    stable: "CNBC",
    new: "Fashion 風格預測 / Watch TEST (DIY)",
  },
  {
    bad: "",
    stable: "Stocks 分析",
    new: "龍蝦 summary email",
  },
];
</script>
