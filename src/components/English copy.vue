<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="text-h4 q-mb-md">英文學習：資訊擷取系統</div>

      <q-banner rounded class="bg-blue-1 text-black q-mb-md">
        <b>核心觀念：</b><br />
        英翻中是重要生存技能，重點是速度與廣度。<br />
        英文不是考試科目，而是資訊擷取系統。<br>
        重點是找到適合自己的資訊管道。每個階段 能力不同
      </q-banner>

      <!-- 核心觀念 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">核心觀念</div>

          <ul>
            <li>英文內容早已不稀缺 YT VOA，不需要狂背單字 購買空中英語。</li>
            <li>RCFans 評論 \ 好像 阿陸的也 長期吸引力不夠 vs LEGO \ 改 Watch TEST</li>
            <li>建立自己的 English Repeat Channel。 \ 如果有 東京情報猿 就太好了 </li>
            <li>這些會比較軟 : 廣告 \ 奢侈大牌 \ 有趣的評論家 Fashion Food \ </li>
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

          <q-stepper flat bordered vertical color="primary">
            <q-step :name="1" title="Level 1：Keyword" done>
              <ul>
                <li>人名</li>
                <li>專案名</li>
                <li>公司名</li>
                <li>技術名詞</li>
                <li>關鍵數字</li>
              </ul>

              <q-banner class="bg-grey-2"> Deadline → Next Friday </q-banner>
            </q-step>

            <q-step :name="2" title="Level 2：Action Item" done>
              <p>聽不懂全部沒關係， 知道要做什麼最重要。</p>

              <ul>
                <li>Who</li>
                <li>What</li>
                <li>When</li>
              </ul>

              <ul>
                <li>Send Report</li>
                <li>Update Schedule</li>
                <li>Check Supplier</li>
              </ul>
            </q-step>

            <q-step :name="3" title="Level 3：Decision" done>
              <ul>
                <li>最終結論</li>
                <li>決策方向</li>
                <li>責任分工</li>
              </ul>

              <q-banner class="bg-green-1">
                Let's postpone the release.<br />
                重點是知道「延期」， 不是研究文法。
              </q-banner>
            </q-step>
          </q-stepper>
        </q-card-section>
      </q-card>

      <!-- 學習路線 -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="text-h6">學習路線</div>

          <q-timeline color="primary">
            <q-timeline-entry title="第一階段：輕鬆聽">
              DW Shift<br />
              Channel Japan<br />
              情報猿（Fashion 預測）
            </q-timeline-entry>

            <q-timeline-entry title="第二階段：工作相關">
              CNBC 訪談<br />
              用中文講出重點<br />
              公司在做什麼？<br />
              CEO 想表達什麼？
            </q-timeline-entry>

            <q-timeline-entry title="第三階段：實戰">
              Apple Developer Conference<br />
              聽 Keynote<br />
              寫出 Action Item
            </q-timeline-entry>

            <q-timeline-entry title="第四階段：最高價值">
              客戶會議<br />
              Team Meeting<br />
              TD6 單打等級順暢度
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
  </q-page>
</template>
