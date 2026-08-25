<template>
  <q-page class="q-pa-md">
    <div class="page-container">
      <!-- <div class="text-h5 text-weight-bold q-mb-xs">Execution System</div> -->

      <div class="col">
        <div class="text-h5 text-weight-bold">
          Recent System --
          <q-btn color="primary" label="臨時筆記" @click="dialog0 = true" />
        </div>
        <div class="text-caption text-grey-7">縮小範圍，縮小虛實之間的差距</div>
      </div>

      <div class="text-caption text-grey-7 q-mb-lg">
        問題發現 → 執行 → 能見度 → 留白 → 意志力 → 否決 → 系統
      </div>

      <q-timeline color="primary">
        <!-- 1 -->
        <q-timeline-entry heading icon="priority_high" color="negative">
          🟥 發現問題
        </q-timeline-entry>

        <q-timeline-entry
          title="先不要判斷自己"
          subtitle="Problem"
          icon="psychology"
          color="negative"
        >
          <div class="text-body1">
            思緒跑到 JPT，正要做 Su-Ao Project 沒動力， 更不要說 Room DB。
          </div>

          <q-separator class="q-my-md" />

          <div class="text-body1">不要先判斷自己，先試著問 GPT。</div>
        </q-timeline-entry>

        <!-- 2 -->
        <q-timeline-entry heading icon="flash_on" color="orange">
          🔪 執行：10mins Test／快刀亂麻
        </q-timeline-entry>

        <q-timeline-entry
          title="先做 10 分鐘"
          subtitle="Action"
          icon="timer"
          color="orange"
        >
          <div class="text-body1">10mins Test 還是快刀亂麻？</div>

          <div class="q-mt-md text-body1">先做 10 分鐘，不先判斷自己。</div>

          <q-separator class="q-my-md" />

          <div class="text-body1">
            水／廁所：5mins 可到 \ 人不多、有位置 \ 就 GO。
          </div>
        </q-timeline-entry>

        <!-- 3 -->
        <q-timeline-entry heading icon="visibility" color="primary">
          👁 執行層級能見度
        </q-timeline-entry>

        <q-timeline-entry
          title="讓下一步看得見"
          subtitle="Visibility"
          icon="visibility"
          color="primary"
        >
          <q-list separator>
            <q-item>
              <q-item-section avatar>
                <q-icon name="list_alt" />
              </q-item-section>
              <q-item-section> Fn Prj Task List </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="storage" />
              </q-item-section>
              <q-item-section> PARA 有想到的 db（img map） </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="battery_charging_full" />
              </q-item-section>
              <q-item-section> Energy Level 當下 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="phone_iphone" />
              </q-item-section>
              <q-item-section> 📱 Mobile Vue（list） </q-item-section>
            </q-item>
          </q-list>
        </q-timeline-entry>

        <!-- 4 -->
        <q-timeline-entry heading icon="space_bar" color="grey-7">
          留白／重新取得視野
        </q-timeline-entry>

        <q-timeline-entry
          title="留白"
          subtitle="Reset"
          icon="visibility"
          color="grey-7"
        >
          <div class="text-body1">留白是系統重新取得視野的時間。</div>
        </q-timeline-entry>

        <!-- 5 -->
        <q-timeline-entry heading icon="battery_alert" color="amber-8">
          🔋 意志力消耗管理
        </q-timeline-entry>

        <q-timeline-entry
          title="不要用興趣判斷工作的價值"
          subtitle="Energy"
          icon="battery_alert"
          color="amber-8"
        >
          <div class="text-body1">
            不要用興趣判斷工作的價值（醫院宅 \ ROI）。
          </div>

          <q-separator class="q-my-md" />

          <div class="text-body1">增加時間尺度。</div>
        </q-timeline-entry>

        <!-- 6 -->
        <q-timeline-entry heading icon="block" color="deep-orange">
          否決條件／決策
        </q-timeline-entry>

        <q-timeline-entry
          title="最後加一道否決條件"
          subtitle="Decision"
          icon="gavel"
          color="deep-orange"
        >
          <div class="text-body1">
            最後加一道「否決條件」， 有些事情不是平均分數可以解決的。
          </div>
        </q-timeline-entry>

        <!-- 7 -->
        <q-timeline-entry heading icon="memory" color="deep-purple">
          🧠 記憶／GPT／系統
        </q-timeline-entry>

        <q-timeline-entry
          title="記憶仍然是重要技能"
          subtitle="System"
          icon="memory"
          color="deep-purple"
        >
          <div class="text-body1">
            🧠 記憶仍然是重要技能 \ 比 GPT 快 & 30y link maybe。
          </div>

          <q-separator class="q-my-md" />

          <div class="text-body1">
            sys 最好能解決人腦的疑問， 不然快刀亂麻損失會比較多。
          </div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </q-page>
</template>

<script setup></script>

<style scoped>
.page-container {
  max-width: 900px;
  margin: 0 auto;
}

.text-body1 {
  line-height: 1.8;
}

.q-timeline {
  padding-bottom: 40px;
}
</style>
