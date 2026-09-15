```vue
<template>
  <q-page class="bg-grey-2">

    <div class="surgery-page">

      <!-- ==========================================
           HEADER
      =========================================== -->

      <div class="q-mb-md">

        <div class="text-h5 text-weight-bold">
          🏥 膽結石手術
        </div>

        <div class="text-subtitle1 text-grey-7">
          手術前 → 手術 → 住院 → 傷口 → 恢復 → 出國
        </div>

      </div>


      <!-- ==========================================
           CORE RULE
      =========================================== -->

      <q-banner
        rounded
        class="core-rule q-mb-lg"
      >

        <template #avatar>
          <div class="text-h4">🧠</div>
        </template>

        <div class="text-weight-bold text-h6">
          痛的時候不能閱讀
        </div>

        <div class="text-body2">
          平時記住 5 個關鍵日期，真正需要時只看 Recent。
        </div>

      </q-banner>


      <!-- ==========================================
           IMPORTANT NOTICE
      =========================================== -->

      <q-card
        flat
        bordered
        class="notice-card q-mb-lg"
      >

        <q-card-section>

          <div class="text-subtitle1 text-weight-bold q-mb-sm">
            ⚠️ 計劃原則
          </div>

          <div class="text-body2 q-mb-sm">
            實際仍以腸胃科、外科及醫院安排為準。
          </div>

          <q-chip
            dense
            icon="medical_services"
            label="醫院確認"
          />

        </q-card-section>

      </q-card>


      <!-- ==========================================
           5 KEY DATES
      =========================================== -->

      <div class="text-h6 text-weight-bold q-mb-md">
        ⭐ 5 個關鍵日期
      </div>


      <div class="key-grid q-mb-lg">

        <!-- ① -->

        <q-card
          flat
          bordered
          class="key-card"
        >

          <q-card-section>

            <div class="key-number">
              ①
            </div>

            <div class="key-title">
              手術前
            </div>

            <div class="key-text">
              腸胃科
              →
              確認醫院
              →
              檢查
              →
              手術日期
              →
              保險／費用
            </div>

          </q-card-section>

        </q-card>


        <!-- ② -->

        <q-card
          flat
          bordered
          class="key-card surgery"
        >

          <q-card-section>

            <div class="key-number">
              ②
            </div>

            <div class="key-title">
              9/21
            </div>

            <div class="key-text">
              🔴 開刀
            </div>

          </q-card-section>

        </q-card>


        <!-- ③ -->

        <q-card
          flat
          bordered
          class="key-card hospital"
        >

          <q-card-section>

            <div class="key-number">
              ③
            </div>

            <div class="key-title">
              9/21～9/25
            </div>

            <div class="key-text">
              🏥 住院／出院
            </div>

          </q-card-section>

        </q-card>


        <!-- ④ -->

        <q-card
          flat
          bordered
          class="key-card recovery"
        >

          <q-card-section>

            <div class="key-number">
              ④
            </div>

            <div class="key-title">
              9/25～10/9
            </div>

            <div class="key-text">
              🏠 休息約 2 週
              <br>
              ＋傷口照護
            </div>

          </q-card-section>

        </q-card>


        <!-- ⑤ -->

        <q-card
          flat
          bordered
          class="key-card check"
        >

          <q-card-section>

            <div class="key-number">
              ⑤
            </div>

            <div class="key-title">
              10/12
            </div>

            <div class="key-text">
              ✅ 恢復檢查點
              <br>
              再決定旅行／正常活動
            </div>

          </q-card-section>

        </q-card>

      </div>


      <!-- ==========================================
           PRE-SURGERY
      =========================================== -->

      <div class="section-title">
        📋 手術前
      </div>


      <q-card
        flat
        bordered
        class="timeline-card q-mb-lg"
      >

        <q-list separator>

          <q-item>

            <q-item-section side>
              🏥
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                腸胃科門診
              </q-item-label>

              <q-item-label caption>
                評估膽結石
              </q-item-label>

            </q-item-section>

            <q-item-section side>

              <q-chip
                dense
                label="確認醫院"
              />

            </q-item-section>

          </q-item>


          <q-item>

            <q-item-section side>
              🔍
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                術前檢查
              </q-item-label>

              <q-item-label caption>
                抽血、影像、麻醉／術前評估等
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="確認日期"
              />
            </q-item-section>

          </q-item>


          <q-item>

            <q-item-section side>
              🔴
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                手術安排
              </q-item-label>

              <q-item-label caption>
                確認手術方式與日期
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="確認開刀日"
              />
            </q-item-section>

          </q-item>


          <q-item>

            <q-item-section side>
              💰
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                費用／保險
              </q-item-label>

              <q-item-label caption>
                勞保／健保／自費／實支實付
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="確認理賠"
              />
            </q-item-section>

          </q-item>

        </q-list>

      </q-card>


      <!-- ==========================================
           DAILY TIMELINE
      =========================================== -->

      <div class="section-title">
        📅 手術後時間軸
      </div>


      <q-card
        flat
        bordered
        class="timeline-card"
      >

        <q-list separator>

          <!-- 9/21 -->

          <q-item class="important-row">

            <q-item-section side>
              <div class="date-box">
                <div>9/21</div>
                <small>一</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-h6 text-weight-bold">
                🔴 開刀
              </q-item-label>

              <q-item-label caption>
                預計手術 Day 1
              </q-item-label>

              <q-item-label caption>
                入院、手術時間
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/22 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/22</div>
                <small>二</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏥 住院 Day 2
              </q-item-label>

              <q-item-label caption>
                疼痛、進食、排尿、排便
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/23 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/23</div>
                <small>三</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏥 住院 Day 3
              </q-item-label>

              <q-item-label caption>
                傷口、感染、活動
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/24 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/24</div>
                <small>四</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏥 住院 Day 4
              </q-item-label>

              <q-item-label caption>
                是否符合出院條件
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/25 -->

          <q-item class="important-row">

            <q-item-section side>
              <div class="date-box">
                <div>9/25</div>
                <small>五</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-h6 text-weight-bold">
                🏠 出院／休養
              </q-item-label>

              <q-item-label caption>
                預計休息 2 週
              </q-item-label>

              <q-item-label caption>
                外皮拆線／回診時間
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="醫院確認"
              />
            </q-item-section>

          </q-item>


          <!-- 9/26 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/26</div>
                <small>六</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏠 恢復
              </q-item-label>

              <q-item-label caption>
                休息、避免過度活動
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/27 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/27</div>
                <small>日</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏠 恢復
              </q-item-label>

              <q-item-label caption>
                原計劃：不能洗澡，只能擦澡
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="醫院確認"
              />
            </q-item-section>

          </q-item>


          <!-- 9/28 -->

          <q-item class="warning-row">

            <q-item-section side>
              <div class="date-box">
                <div>9/28</div>
                <small>一</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                ⚠️ 傷口觀察
              </q-item-label>

              <q-item-label caption>
                注意感染
              </q-item-label>

              <q-item-label caption>
                紅、腫、熱、痛、分泌物
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/29 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>9/29</div>
                <small>二</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏠 恢復
              </q-item-label>

              <q-item-label caption>
                逐漸恢復日常活動
              </q-item-label>

              <q-item-label caption>
                注意身體狀況
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 9/30 -->

          <q-item class="travel-row">

            <q-item-section side>
              <div class="date-box">
                <div>9/30</div>
                <small>三</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                ✈️ 出國判斷
              </q-item-label>

              <q-item-label caption>
                手術前：膽結石未處理前不出國
              </q-item-label>

              <q-item-label caption>
                手術後：重新評估是否適合出國
              </q-item-label>

            </q-item-section>

            <q-item-section side>
              <q-chip
                dense
                label="醫師確認"
              />
            </q-item-section>

          </q-item>


          <!-- 10/1 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/1</div>
                <small>四</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
              <q-item-label caption>繼續恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/2 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/2</div>
                <small>五</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/3 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/3</div>
                <small>六</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/4 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/4</div>
                <small>日</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/5 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/5</div>
                <small>一</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-weight-bold">
                🏠 恢復
              </q-item-label>

              <q-item-label caption>
                約術後第 15 天
              </q-item-label>

              <q-item-label caption>
                是否恢復工作
              </q-item-label>

            </q-item-section>

          </q-item>


          <!-- 10/6 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/6</div>
                <small>二</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/7 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/7</div>
                <small>三</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/8 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/8</div>
                <small>四</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/9 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/9</div>
                <small>五</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/10 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/10</div>
                <small>六</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/11 -->

          <q-item>

            <q-item-section side>
              <div class="date-box">
                <div>10/11</div>
                <small>日</small>
              </div>
            </q-item-section>

            <q-item-section>
              <q-item-label>🏠 恢復</q-item-label>
            </q-item-section>

          </q-item>


          <!-- 10/12 -->

          <q-item class="final-row">

            <q-item-section side>
              <div class="date-box final">
                <div>10/12</div>
                <small>一</small>
              </div>
            </q-item-section>

            <q-item-section>

              <q-item-label class="text-h6 text-weight-bold">
                ✅ 恢復檢查點
              </q-item-label>

              <q-item-label caption>
                約術後 3 週
              </q-item-label>

              <q-item-label caption>
                評估是否恢復正常生活／旅行
              </q-item-label>

            </q-item-section>

            <q-item-section side>

              <q-chip
                dense
                label="醫師確認"
              />

            </q-item-section>

          </q-item>

        </q-list>

      </q-card>


      <!-- ==========================================
           TRAVEL RULE
      =========================================== -->

      <q-card
        flat
        bordered
        class="travel-rule q-mt-lg"
      >

        <q-card-section>

          <div class="text-subtitle1 text-weight-bold q-mb-sm">
            ✈️ 出國判斷要分兩件事
          </div>

          <div class="rule-item">
            <b>手術前：</b>
            膽結石尚未處理 → 原計劃不出國
          </div>

          <div class="rule-item">
            <b>手術後：</b>
            是否可以出國 → 重新由醫師評估
          </div>

        </q-card-section>

      </q-card>


      <!-- ==========================================
           FINAL MEMORY
      =========================================== -->

      <q-banner
        rounded
        class="final-memory q-mt-md"
      >

        <div class="text-h6 text-weight-bold">
          🧠 只記 5 個
        </div>

        <div class="memory-line">
          手術前 → 9/21 → 9/21～9/25 → 9/25～10/9 → 10/12
        </div>

      </q-banner>

    </div>

  </q-page>
</template>


<script setup>
// 此頁目前為「計劃 Recent」
// 不使用 Firebase。
// 日期與內容直接依目前計劃固定顯示。
</script>


<style scoped>

/* ==========================================
   PAGE
========================================== */

.surgery-page {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px 14px 40px;
}


/* ==========================================
   CORE
========================================== */

.core-rule {
  border-radius: 18px;
}


/* ==========================================
   NOTICE
========================================== */

.notice-card {
  border-radius: 18px;
}


/* ==========================================
   SECTION
========================================== */

.section-title {
  font-size: 20px;
  font-weight: 700;
  margin: 22px 0 12px;
}


/* ==========================================
   5 KEY DATES
========================================== */

.key-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}


.key-card {
  border-radius: 18px;
  min-height: 145px;
}


.key-card:last-child {
  grid-column: span 2;
}


.key-number {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 5px;
}


.key-title {
  font-size: 19px;
  font-weight: 700;
  margin-bottom: 8px;
}


.key-text {
  font-size: 15px;
  line-height: 1.6;
}


/* ==========================================
   TIMELINE
========================================== */

.timeline-card {
  border-radius: 18px;
  overflow: hidden;
}


.date-box {
  min-width: 58px;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
}


.date-box small {
  display: block;
  font-size: 12px;
  font-weight: 400;
}


.important-row {
  min-height: 88px;
}


.warning-row {
  min-height: 88px;
}


.travel-row {
  min-height: 95px;
}


.final-row {
  min-height: 100px;
}


.date-box.final {
  font-size: 17px;
}


/* ==========================================
   TRAVEL
========================================== */

.travel-rule {
  border-radius: 18px;
}


.rule-item {
  padding: 7px 0;
  line-height: 1.6;
}


/* ==========================================
   FINAL MEMORY
========================================== */

.final-memory {
  border-radius: 18px;
}


.memory-line {
  margin-top: 6px;
  line-height: 1.8;
}


/* ==========================================
   MOBILE
========================================== */

@media (max-width: 600px) {

  .surgery-page {
    padding:
      16px
      10px
      32px;
  }


  .key-grid {
    grid-template-columns: 1fr;
  }


  .key-card:last-child {
    grid-column: auto;
  }


  .key-card {
    min-height: auto;
  }


  .timeline-card .q-item {
    padding-left: 8px;
    padding-right: 8px;
  }


  .date-box {
    min-width: 50px;
  }

}

</style>
```
