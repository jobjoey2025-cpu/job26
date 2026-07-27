<template>
  <q-page class="bg-grey-2 q-pa-lg">
    <!-- Header -->
    <q-card flat bordered class="q-mb-lg">
      <q-card-section class="bg-primary text-white">
        <div class="text-h4">🏗 預計目標 看板</div>

        <div class="text-subtitle2 q-mt-sm">2F 空間整修 / 露營宅 MVP</div>
      </q-card-section>

      <q-card-section>
        <q-banner rounded class="bg-blue-1 text-primary">
          目標： 建立一個可居住、可維護、可逐步改善的露營宅， 採 MVP
          方式逐步推進，不一次做到最好，而是不斷改善。
        </q-banner>
      </q-card-section>
    </q-card>

    <!-- Main -->
    <div class="row q-col-gutter-lg">
      <!-- Left -->
      <div class="col-12 col-md-7">
        <!-- 合作模式 -->
        <q-card bordered class="q-mb-lg">
          <q-card-section class="bg-orange-2">
            <div class="text-h6">🤝 預計模式</div>
          </q-card-section>

          <q-separator />

          <q-list bordered separator>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="construction" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 前期維修費用 </q-item-label>

                <q-item-label caption>
                  整理、維修等費用， 原則上雙方各負擔一半，項目比較大的可以討論。
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="green" name="payments" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 費用回收方式 </q-item-label>

                <q-item-label caption>
                  可由我先支付工程費， 再從房租慢慢扣回， 降低一次性支出。
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="deep-orange" name="meeting_room" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 前半區空間 </q-item-label>

                <q-item-label caption>
                  約 10 坪 + 廁所， 可先提供協會使用， 暫不收租。
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="purple" name="camping" />
              </q-item-section>

              <q-item-section>
                <q-item-label> 後半區 </q-item-label>

                <q-item-label caption>
                  我先搭帳篷， 應該是偶而住 2~3天， 其他以後再決定。
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- Discussion -->
        <q-card bordered>
          <q-card-section class="bg-green-2">
            <div class="text-h6">💬 討論事項</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <q-banner rounded class="bg-grey-2">
              有任何施工建議， 都可以直接提出。

              <br /><br />

              ✔ 哪裡可以先做？

              <br />

              ✔ 哪裡可以省？

              <br />

              ✔ 哪種施工方式比較好？

              <br />

              ✔ 有沒有更耐用的做法？
            </q-banner>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right -->
      <div class="col-12 col-md-5">
        <!-- 第一階段 -->
        <q-card bordered class="q-mb-lg">
          <q-card-section class="bg-blue-2">
            <div class="text-h6">📅 第一階段</div>
          </q-card-section>

          <q-card-section>
            <q-checkbox
              v-for="item in phase1"
              :key="item.name"
              v-model="item.done"
              :label="item.name"
              class="full-width"
            />
          </q-card-section>
        </q-card>

        <!-- 第二階段 -->
        <q-card bordered class="q-mb-lg">
          <q-card-section class="bg-purple-2">
            <div class="text-h6">🚀 第二階段</div>
          </q-card-section>

          <q-card-section>
            <q-timeline color="primary">
              <q-timeline-entry title="帳篷進場" />

              <q-timeline-entry title="生活測試" />

              <q-timeline-entry title="收納系統" />

              <q-timeline-entry title="家具配置" />

              <q-timeline-entry title="冷氣 / 照明" />

              <q-timeline-entry title="持續改善" />
            </q-timeline>
          </q-card-section>
        </q-card>

        <!-- Status -->
        <q-card bordered>
          <q-card-section class="bg-teal-2">
            <div class="text-h6">📌 專案狀態</div>
          </q-card-section>

          <q-card-section>
            <q-chip color="orange" text-color="white" icon="schedule">
              等待報價
            </q-chip>

            <q-chip color="primary" text-color="white" icon="forum">
              工班討論中
            </q-chip>

            <q-chip color="green" text-color="white" icon="camping">
              MVP 規劃
            </q-chip>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const phase1 = ref([
  {
    name: "木作拆除",
    done: true,
  },
  {
    name: "廢棄物清運",
    done: true,
  },
  {
    name: "基本整理",
    done: true,
  },
  {
    name: "地面修補",
    done: false,
  },
  {
    name: "電路 照明確認",
    done: false,
  },
  {
    name: "安全可使用",
    done: false,
  },
]);
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
