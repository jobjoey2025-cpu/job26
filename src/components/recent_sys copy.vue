<template>
  <q-page class="q-pa-lg">
    <q-list padding>
      <!-- Foundation -->
      <q-item-label header> Foundation </q-item-label>

      <q-item clickable v-ripple to="/it-system-foundation">
        <q-item-section avatar>
          <q-icon name="foundation" />
        </q-item-section>
        <q-item-section> IT System Foundation </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/system-thinking">
        <q-item-section avatar>
          <q-icon name="hub" />
        </q-item-section>
        <q-item-section>
          System Thinking
          <div class="text-caption text-grey">最好花時間想一下這個</div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/para">
        <q-item-section avatar>
          <q-icon name="folder_special" />
        </q-item-section>
        <q-item-section> PARA </q-item-section>
      </q-item>

      <!-- Thinking -->
      <q-separator spaced />

      <q-item-label header> Thinking </q-item-label>

      <q-item clickable v-ripple to="/roi-thinking">
        <q-item-section avatar>
          <q-icon name="trending_up" />
        </q-item-section>
        <q-item-section>
          ROI Thinking
          <div class="text-caption text-grey">Goal Review</div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/execution-hierarchy">
        <q-item-section avatar>
          <q-icon name="account_tree" />
        </q-item-section>
        <q-item-section>
          Execution Hierarchy
          <div class="text-caption text-grey">到要執行層級的時候</div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/fast-decision">
        <q-item-section avatar>
          <q-icon name="bolt" />
        </q-item-section>
        <q-item-section> 快刀亂麻 </q-item-section>
      </q-item>

      <!-- Personal System -->
      <q-separator spaced />

      <q-item-label header> Personal System </q-item-label>

      <q-item clickable v-ripple to="/energy-level">
        <q-item-section avatar>
          <q-icon name="battery_charging_full" />
        </q-item-section>
        <q-item-section>
          Energy Level
          <div class="text-caption text-grey">當下的能力狀況</div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/memory">
        <q-item-section avatar>
          <q-icon name="psychology" />
        </q-item-section>
        <q-item-section> 記憶仍然是重要技能 </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/learning-strategy">
        <q-item-section avatar>
          <q-icon name="school" />
        </q-item-section>
        <q-item-section> Learning Strategy </q-item-section>
      </q-item>

      <!-- Tools -->
      <q-separator spaced />

      <q-item-label header> Tools </q-item-label>

      <q-item clickable v-ripple to="/continuous-improvement">
        <q-item-section avatar>
          <q-icon name="build" />
        </q-item-section>
        <q-item-section>
          Continuous Improvement
          <div class="text-caption text-grey">2026 常用的工具</div>
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/mobile-vue">
        <q-item-section avatar>
          <q-icon name="phone_android" />
        </q-item-section>
        <q-item-section> Mobile Vue </q-item-section>
      </q-item>

      <!-- Field -->
      <q-separator spaced />

      <q-item-label header> Field </q-item-label>

      <q-item clickable v-ripple to="/field-core-principles">
        <q-item-section avatar>
          <q-icon name="location_on" />
        </q-item-section>
        <q-item-section>
          現場
          <div class="text-caption text-grey">核心原則</div>
        </q-item-section>
      </q-item>

      <!-- Final Check -->
      <q-separator spaced />

      <q-item-label header> Final Check </q-item-label>

      <q-item clickable v-ripple to="/final-confirmation">
        <q-item-section avatar>
          <q-icon name="check_circle" />
        </q-item-section>
        <q-item-section>
          最後確認
          <div class="text-caption text-grey">出發前 1 hrs</div>
        </q-item-section>
      </q-item>
    </q-list>

    <h6>以上是目錄</h6>
    <hr />

    <!-- ===================================================== -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="text-h5">
          IT System
          <q-chip color="primary" text-color="white"> Foundation </q-chip>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <p>
          IT System 並不是內容本身，
          但是會<strong>嚴重影響內容的處理能力</strong>， 所以維護 IT
          是最重要的基礎工作之一。
        </p>

        <p>After IT 多層備援之後， 才能開始安心處理真正的內容。</p>

        <q-banner rounded class="bg-red-1 text-red">
          如果 IT 崩潰， 幾乎只能退回 A4 Paper， 接近人生盡頭。
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->
    <hr />
    <br />

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5"> ROI Thinking </q-card-section>

      <q-separator />

      <q-list bordered>
        <q-item>
          <q-item-section avatar> ⭐ </q-item-section>

          <q-item-section>
            標定「現在」前後一步的位置。

            <div class="text-grey">Then 才能開始 ROI Tasks。</div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- ===================================================== -->

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5"> Goal Review </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="text-subtitle1">檢查目標排序與可行性</div>

        <q-chip outline>醫院宅</q-chip>
        <q-chip outline>車宿</q-chip>
        <q-chip outline>航空公司</q-chip>
        <q-chip outline>65y</q-chip>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5">
        System Thinking (最好花時間 想一下這個)</q-card-section
      >

      <q-separator />

      <q-card-section>
        <pre>
                這架無人機在整個作戰體系中扮演什麼角色？

                做任何事情前，
                先看整個系統。

                Before：
                我們要做哪一架無人機？

                朋友的時間 200hrs : 距離(地緣政治) \ 時機(年紀 代溝 人生階段不同) \ 頻率 (講話都很累)
        </pre>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5">
        Energy Level 當下的能力狀況</q-card-section
      >

      <q-separator />

      <q-list bordered separator>
        <q-item>
          <q-item-section avatar>1️⃣</q-item-section>
          <q-item-section>
            <strong>求生模式</strong>

            <div class="text-grey">最差狀況、生病住院，只專心活下去。</div>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>2️⃣</q-item-section>

          <q-item-section>
            <strong>恢復模式</strong>

            <div class="text-grey">Relax、TV、TD6、睡眠、等待恢復。</div>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>3️⃣</q-item-section>

          <q-item-section>
            <strong>緊急處理</strong>

            Team Work、 財產、 旅行、 104 工作。
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>xx4️⃣</q-item-section>

          <q-item-section>
            <strong>學習模式</strong>

            104 工作、 飛行保養廠、 高強度學習。
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>*5️⃣</q-item-section>

          <q-item-section>
            <strong>Hobby</strong>

            Pic、 Video、 球賽、 Hobby、 等待 Hobby Money。
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>*6️⃣</q-item-section>

          <q-item-section>
            <strong>創造價值</strong>

            賺錢、 開發、 認知提升、 Watch、 3DP、 Easy Go Life。
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-md" />

      <pre>
4 以下難過就不用說了。

如果 4 以上還很難過：

• 長期疼痛
• 沒有新的熱血知識
• Fashion 跟不上

標定 Joey 在 AIK 的位置：
中點 = 基本 Coding 經驗
</pre
      >
    </q-card>

    <!-- ===================================================== -->

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5">
        Continuous Improvement 2026 常用的工具</q-card-section
      >

      <q-separator />

      <q-list>
        <q-item>
          <q-item-section avatar>✅</q-item-section>
          <q-item-section> 開始使用各種 Checklist 評分 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>✅</q-item-section>
          <q-item-section> GDS 拖曳分類 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>✅</q-item-section>
          <q-item-section> GPT 分類 </q-item-section>
        </q-item>

        <q-item>
          <q-item-section avatar>✅</q-item-section>
          <q-item-section> Quasar + Firebase 提升閱讀品質 </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- ===================================================== -->

    <q-card class="q-mb-lg">
      <q-card-section class="text-h5"> PARA </q-card-section>

      <q-separator />

      <q-card-section>
        <q-chip color="primary" text-color="white"
          >Project 具有明確截止日期 (Deadline)</q-chip
        >

        <q-chip color="secondary" text-color="white"
          >Area 持續維護的領域，沒有截止日</q-chip
        >

        <q-chip color="orange" text-color="white"
          >Resource 備用知識、研究資料</q-chip
        >

        <q-chip color="grey-7" text-color="white"
          >Archive 封存，未來可再參考</q-chip
        >

        <div class="q-mt-md">
          • 知識管理

          <br />

          • 專案管理
        </div>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card>
      <q-card-section class="text-h5">
        Execution Hierarchy 到要執行層級的時候
      </q-card-section>

      <q-separator />

      <q-card-section>
        <pre>
Function
└── Project
    └── Task
        └── Checklist
</pre
        >

        <q-banner rounded class="bg-blue-1">
          每天真正能完成的 Checklist：
          <strong>3～5 個</strong>
        </q-banner>

        <div class="q-mt-lg">
          遇到新想法時：

          <ol>
            <li>先問：屬於哪個 Function？</li>
            <li>再放入： Function → Project → Task → Checklist</li>
            <li>
              <span style="color: red"
                >文字最穩定的實踐 must be "<b>Table</b> (人月神話)"</span
              >
            </li>
          </ol>
        </div>

        <q-banner rounded class="bg-yellow-1">
          觀察自己的筆記品質。 如果開始混亂、沒有層級， 通常代表已經累了。
        </q-banner>
      </q-card-section>
    </q-card>
    <br />
    <hr />
    <br />
    <!-- ===================================================== -->
    <!-- 記憶 -->
    <!-- ===================================================== -->

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h5 text-weight-bold">🧠 記憶仍然是重要技能</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-banner rounded class="bg-orange-1 text-black q-mb-md">
          即使 AI 很強，
          <b>記憶能力仍然是核心能力。</b>
        </q-banner>

        <q-list bordered separator>
          <q-item>
            <q-item-section avatar>📷</q-item-section>
            <q-item-section> 很多地方不能拍照 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>🙈</q-item-section>
            <q-item-section> 有些情境不好意思拍照 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>🔍</q-item-section>
            <q-item-section> 照片細節不足，無法完整還原資訊 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>💤</q-item-section>
            <q-item-section> 睡覺、作夢只能依靠記憶材料 </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card>
      <q-card-section>
        <div class="text-h5">🔄 Input → Output</div>
      </q-card-section>
    </q-card>
    <q-card class="my-card" flat bordered>
      <q-card-section horizontal>
        <q-card-section>
          <div>
            <div class="text-subtitle1 text-weight-bold q-mb-sm">
              IN（紀錄）
            </div>

            <q-chip color="primary" text-color="white"> 速度 </q-chip>

            <q-chip color="primary" text-color="white"> 品質 </q-chip>
            <q-chip><b style="visibility: hidden">xxxx</b></q-chip>
            <q-list dense>
              <q-item>
                <q-item-section> 大規模 ~> 短時 : </q-item-section>
              </q-item>
              <q-item>
                <q-item-section> BLG </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Netlify </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> GDS </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Notion </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Trello </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> G Keep </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> G Album</q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Screenshot </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Voice Record?? ai2text</q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Eagle </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> NAS </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>

        <q-separator vertical />

        <q-card-section>
          <div>
            <div class="text-subtitle1 text-weight-bold q-mb-sm">
              OUT（取出）DB Report
            </div>

            <q-chip color="green" text-color="white"> 品質 </q-chip>

            <q-chip color="green" text-color="white"> 速度 </q-chip>

            <q-list dense>
              <q-item>
                <q-item-section> 取出 - 靈感 \ save time :</q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Netlify - Quasar </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> BLG </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> GDS GPT 官宣 News</q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Notion GKeep </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Line Man / WeChat </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> SQL Sort Firebase </q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Line Man </q-item-section>
              </q-item>

              <q-item>
                <q-item-section>提高 閱讀的品質</q-item-section>
              </q-item>

              <q-item>
                <q-item-section> Travel / 娛樂 / 靈感 </q-item-section>
              </q-item>
            </q-list>
          </div>
        </q-card-section>
      </q-card-section>
    </q-card>

    <hr />

    <!-- ===================================================== -->

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h5">⚔ 快刀亂麻</div>
      </q-card-section>

      <q-separator />
      <q-card-section>
        <li><b>一定要親自做的類型 :</b></li>
        <li>1. 太難的 - 別人不會做 \ 溝通也要時間 \ 除非 他有套板</li>
        <li>
          2. 太重要的 - 別人不好幫你決定的 \ 財務 賭博 \ 社會潛規則 不好說
        </li>
        <li>3. 緊急的 - 臨時找不到可靠的人</li>
      </q-card-section>
      <q-card-section>
        <q-banner class="bg-red-1 text-black rounded q-mb-md">
          <b>事情太多時，不是熬夜，而是砍掉一些事情。</b>
        </q-banner>

        <q-timeline color="primary">
          <q-timeline-entry title="必做太多" subtitle="Priority">
            必須忍痛刪掉一些事情， 否則只能犧牲睡眠， 長期對健康危險。
          </q-timeline-entry>

          <q-timeline-entry title="真的推不動">
            TD6 放鬆一下， 但不要花太久。
          </q-timeline-entry>

          <q-timeline-entry title="AI 幫忙排序">
            GPT 分析慾望， 排出 Top 5。
          </q-timeline-entry>

          <q-timeline-entry title="104 Quasar 後">
            事情會開始變複雜， 收納等問題累積幾十年， 要提前處理。
          </q-timeline-entry>

          <q-timeline-entry title="BLG">
            一寫就是四小時， 104 前要減少 TD6。
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h5">📱 Mobile Vue</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-list separator>
          <q-item>
            <q-item-section>
              <q-item-label> Stock List </q-item-label>

              <q-item-label caption> Focus 手機閱讀速度 </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> a2F_album_combine \ IMG map</q-item-label>

              <q-item-label caption> Cards + 照片過濾 & hot spot</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> One Button </q-item-label>

              <q-item-label caption>
                充電、剪髮紀錄 \ 每個月都會發生</q-item-label
              >
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> Hobby </q-item-label>

              <q-item-label caption>
                Only View cuz 能深入的沒幾樣 \ 有機會改 Fdb img??
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label> ROI Text \ projectdashboard</q-item-label>

              <q-item-label caption>
                Mobile 不適合大量文字， GPT 自動評分比較適合。
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- ===================================================== -->

    <q-card flat bordered>
      <q-card-section>
        <div class="text-h5">🎯 ROI 思考</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-banner class="bg-blue-1 rounded">
          <div class="text-body1">
            修改內容超過 4 小時， 如果目標不夠強， ROI 很低。

            <br /><br />

            蒐集資料 ≠ 準備開始做。

            <br />

            真正目的應該是：

            <ul>
              <li>估算 ROI</li>
              <li>值得做多久？</li>
              <li>完成後可以撐多久？</li>
            </ul>
          </div>
        </q-banner>
      </q-card-section>
    </q-card>

    <hr />
    <hr />
    <br />
    <!-- ================================================= -->
    <!-- Core -->
    <!-- ================================================= -->

    <q-card flat bordered class="q-mb-lg">
      <q-card-section>
        <div class="text-h4 text-weight-bold">🧠 Learning Strategy</div>

        <div class="text-grey">在資訊爆炸下，提高學習與解題命中率</div>
      </q-card-section>
    </q-card>

    <!-- ================================================= -->

    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">🎯 核心原則</div>
          </q-card-section>

          <q-list separator>
            <q-item>
              <q-item-section avatar> 📍 </q-item-section>

              <q-item-section>
                <q-item-label> 現場優先 </q-item-label>

                <q-item-label caption>
                  現場資訊密度最高， AI、照片只能輔助。
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar> 🧠 </q-item-section>

              <q-item-section>
                <q-item-label> 承認認知限制 </q-item-label>

                <q-item-label caption>
                  超過一頁、 超過一個畫面， 就開始 overload。
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar> 🔄 </q-item-section>

              <q-item-section>
                <q-item-label> 重複 > 記憶 </q-item-label>

                <q-item-label caption> 記不起來， 就重新做。 </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar> 💰 </q-item-section>

              <q-item-section>
                <q-item-label> ROI </q-item-label>

                <q-item-label caption>
                  工具是降低複習成本， 不是保存所有資訊。
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>

      <!-- ====================================== -->

      <div class="col-12 col-md-6">
        <q-card bordered>
          <q-card-section>
            <div class="text-h6">🚫 Overload Rule</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-banner class="bg-red-1 text-black rounded">
              <div class="text-subtitle1">$$ 隨手寫超過一頁</div>

              <div>= Overload</div>
            </q-banner>

            <br />

            <q-banner class="bg-orange-1 rounded">
              GDS 超過一頁 View

              <br />

              Brian Limit
            </q-banner>

            <br />

            <q-banner class="bg-green-1 rounded">
              Fashion 熱度

              <br />

              約 3 個月
            </q-banner>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- ================================================= -->

    <q-card bordered class="q-mt-lg">
      <q-card-section>
        <div class="text-h6">🔧 Tool Philosophy</div>
      </q-card-section>

      <q-separator />

      <q-list separator>
        <q-item>
          <q-item-section>
            <q-item-label> TD6 </q-item-label>

            <q-item-label caption> 最小成本複習弱點 </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> GDS </q-item-label>

            <q-item-label caption> 一頁內完成閱讀 </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> Firebase Album </q-item-label>

            <q-item-label caption> 專題碎片知識 </q-item-label>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label> AI </q-item-label>

            <q-item-label caption> 降低搜尋成本 </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- ================================================= -->

    <q-card bordered class="q-mt-lg">
      <q-card-section>
        <div class="text-h6">📈 Success Formula</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col">
            <q-banner class="bg-blue-1"> 接觸次數 ↑ </q-banner>
          </div>

          <div class="col-auto">➜</div>

          <div class="col">
            <q-banner class="bg-blue-1"> 理解深度 ↑ </q-banner>
          </div>

          <div class="col-auto">➜</div>

          <div class="col">
            <q-banner class="bg-green-1"> 解題命中率 ↑ </q-banner>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- ================================================= -->

    <q-card bordered class="q-mt-lg">
      <q-card-section>
        <div class="text-h6">⚙ Engineering Thinking</div>
      </q-card-section>

      <q-separator />

      <q-timeline color="primary">
        <q-timeline-entry title="① 定義需求">
          系統真正要解決什麼問題？
        </q-timeline-entry>

        <q-timeline-entry title="② 設置約束">
          負載、材料、成本、邊界條件。
        </q-timeline-entry>

        <q-timeline-entry title="③ 系統權衡">
          性能 × 成本 × 可維護性。
        </q-timeline-entry>

        <q-timeline-entry title="④ 判斷風險">
          GPT 找不到的現實變數。
        </q-timeline-entry>

        <q-timeline-entry title="⑤ 最終驗證">
          Prototype → Test → 認證 → 封存。
        </q-timeline-entry>
      </q-timeline>
    </q-card>

    <!-- ================================================= -->

    <q-card bordered class="q-mt-lg bg-grey-1">
      <q-card-section>
        <div class="text-h6">❤️ 真正影響決策</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col">
            <q-banner class="bg-red-1">
              防守

              <br />

              恐懼

              <br />

              $$
            </q-banner>
          </div>

          <div class="col">
            <q-banner class="bg-green-1">
              希望

              <br />

              未來發展

              <br />

              Trend
            </q-banner>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <hr />
    <hr />
    <br />

    <!-- Header -->
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold">
          One Page、快速掃描、30 秒完成檢查
        </div>
        <div class="text-caption text-grey-7">
          避免資訊 Overload，維持現場、工具、學習與 ROI 的有效性
        </div>
      </div>

      <q-btn flat round icon="refresh" @click="resetAll">
        <q-tooltip>重新檢查</q-tooltip>
      </q-btn>
    </div>

    <!-- Progress -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div>
            <div class="text-subtitle1 text-weight-bold">Check Progress</div>
            <div class="text-caption text-grey-7">
              {{ completedCount }} / {{ totalCount }} completed
            </div>
          </div>

          <div class="text-h6">{{ progress }}%</div>
        </div>

        <q-linear-progress
          :value="progress / 100"
          rounded
          size="10px"
          class="q-mt-sm"
        />
      </q-card-section>
    </q-card>

    <!-- Checklist -->
    <div class="row q-col-gutter-md">
      <div
        v-for="section in sections"
        :key="section.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card
          flat
          bordered
          class="check-card"
          :class="{
            'check-card-done': isSectionComplete(section),
          }"
        >
          <!-- Section Header -->
          <q-card-section class="row items-center">
            <q-avatar
              size="40px"
              class="q-mr-sm"
              :color="section.color"
              text-color="white"
            >
              <q-icon :name="section.icon" />
            </q-avatar>

            <div class="col">
              <div class="text-subtitle1 text-weight-bold">
                {{ section.title }}
              </div>

              <div class="text-caption text-grey-7">
                {{ sectionCompleted(section) }} /
                {{ section.items.length }}
              </div>
            </div>

            <q-icon
              v-if="isSectionComplete(section)"
              name="check_circle"
              color="positive"
              size="24px"
            />
          </q-card-section>

          <q-separator />

          <!-- Items -->
          <q-card-section class="q-pa-sm">
            <q-list separator>
              <q-item
                v-for="item in section.items"
                :key="item.id"
                clickable
                @click="item.checked = !item.checked"
              >
                <q-item-section avatar>
                  <q-checkbox v-model="item.checked" @click.stop />
                </q-item-section>

                <q-item-section>
                  <q-item-label
                    :class="{
                      'text-strike text-grey-6': item.checked,
                    }"
                  >
                    {{ item.text }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Bottom Summary -->
    <q-card flat bordered class="q-mt-md">
      <q-card-section>
        <div class="row items-center">
          <q-icon
            :name="progress === 100 ? 'verified' : 'fact_check'"
            size="32px"
            class="q-mr-md"
            :color="progress === 100 ? 'positive' : 'primary'"
          />

          <div class="col">
            <div class="text-subtitle1 text-weight-bold">
              {{ summaryTitle }}
            </div>

            <div class="text-caption text-grey-7">
              {{ summaryText }}
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card bordered class="bg-blue-1">
      <q-card-section>
        <div class="text-h6">🎯 最後確認</div>

        <q-list dense>
          <q-item>
            <q-item-section avatar>✅</q-item-section>

            <q-item-section>
              不要保存全部資訊，只保存未來會複習的資訊。
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>✅</q-item-section>

            <q-item-section> One Page 原則。 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>✅</q-item-section>

            <q-item-section> 降低成本 > 增加資料。 </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>✅</q-item-section>

            <q-item-section>
              重複 + 組織 + 篩選， 讓成功不再依賴運氣。
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script setup>
import { computed, ref } from "vue";

const sections = ref([
  {
    id: "cognition",
    title: "🧠 認知",
    icon: "psychology",
    color: "deep-purple",
    items: [
      {
        id: "c1",
        text: "隨手寫 超過一頁，就是overload",
        checked: false,
      },
      {
        id: "c2",
        text: "超過 GDS 1page view 也沒辦法 \ Brian Limit.",
        checked: false,
      },
      {
        id: "c3",
        text: "是否開始 Overload？",
        checked: false,
      },
    ],
  },

  {
    id: "field",
    title: "📍 現場",
    icon: "location_on",
    color: "blue",
    items: [
      {
        id: "f1",
        text: "是否真的需要親自看？",
        checked: false,
      },
      {
        id: "f2",
        text: "Checklist 是否已抓到重點？出發前 1hr",
        checked: false,
      },
    ],
  },

  {
    id: "tools",
    title: "🛠 工具",
    icon: "build",
    color: "orange",
    items: [
      {
        id: "t1",
        text: "TD6 就是要 最小成本 複習弱點",
        checked: false,
      },
      {
        id: "t2",
        text: "GDS 是否維持 One Page？",
        checked: false,
      },
      {
        id: "t3",
        text: "AI 是否能降低搜尋成本？Token $",
        checked: false,
      },
    ],
  },

  {
    id: "learning",
    title: "🔁 學習",
    icon: "school",
    color: "green",
    items: [
      {
        id: "l1",
        text: " 是否重做就能回復？",
        checked: false,
      },
      {
        id: "l2",
        text: "joey 記不起來\有機會增加接觸次數？$",
        checked: false,
      },
      {
        id: "l3",
        text: "能否提高資訊密度？$",
        checked: false,
      },
    ],
  },

  {
    id: "roi",
    title: "💰 ROI",
    icon: "payments",
    color: "red",
    items: [
      {
        id: "r1",
        text: "三個月後還有價值嗎？",
        checked: false,
      },
      {
        id: "r2",
        text: "ROI 是否大於維護成本？",
        checked: false,
      },
      {
        id: "r3",
        text: "Fashion 3個月 比較容易現實",
        checked: false,
      },
    ],
  },
]);

// -------------------------
// Computed
// -------------------------

const totalCount = computed(() => {
  return sections.value.reduce(
    (total, section) => total + section.items.length,
    0
  );
});

const completedCount = computed(() => {
  return sections.value.reduce(
    (total, section) =>
      total + section.items.filter((item) => item.checked).length,
    0
  );
});

const progress = computed(() => {
  if (totalCount.value === 0) return 0;

  return Math.round((completedCount.value / totalCount.value) * 100);
});

// -------------------------
// Section helpers
// -------------------------

function sectionCompleted(section) {
  return section.items.filter((item) => item.checked).length;
}

function isSectionComplete(section) {
  return (
    section.items.length > 0 && section.items.every((item) => item.checked)
  );
}

// -------------------------
// Summary
// -------------------------

const summaryTitle = computed(() => {
  if (progress.value === 100) {
    return "✓ 系統檢查完成";
  }

  if (progress.value >= 70) {
    return "接近完成";
  }

  if (progress.value >= 30) {
    return "持續檢查中";
  }

  return "開始你的檢查";
});

const summaryText = computed(() => {
  if (progress.value === 100) {
    return "目前所有檢查項目都已確認。";
  }

  return `還有 ${totalCount.value - completedCount.value} 個項目需要確認。`;
});

// -------------------------
// Reset
// -------------------------

function resetAll() {
  sections.value.forEach((section) => {
    section.items.forEach((item) => {
      item.checked = false;
    });
  });
}
</script>

<style scoped>
.check-card {
  height: 100%;
  transition: all 0.2s ease;
}

.check-card:hover {
  transform: translateY(-2px);
}

.check-card-done {
  border-color: #21ba45;
}

.q-item {
  min-height: 52px;
}
</style>
