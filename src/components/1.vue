<template>
  <q-page class="q-pa-md bg-grey-2">
    <!-- Header -->
    <div class="row items-center q-mb-md">
      <div class="col">
        <div class="text-h5 text-weight-bold">Recent System</div>
        <div class="text-caption text-grey-7">縮小範圍，縮小虛實之間的差距</div>
      </div>

      <q-btn round flat icon="refresh" @click="reset">
        <q-tooltip>重新開始判斷</q-tooltip>
      </q-btn>
    </div>

    <!-- 核心原則 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🎯 核心原則</div>

        <div class="text-body1 q-mt-sm">
          每次做不完的時候，
          <strong>先反省範圍是不是太大。</strong>
        </div>

        <q-banner class="bg-blue-1 text-blue-10 q-mt-md" rounded>
          <template #avatar>
            <q-icon name="filter_alt" />
          </template>

          把 Rules 的範圍縮小到
          <strong>Recently</strong>， 讓「虛 → 實」的距離變短。
        </q-banner>
        <div class="text-body1 q-mt-sm">
          Recent 的範疇 是比較容易 維持常用 (都是最近發生問題)
        </div>
      </q-card-section>
    </q-card>

    <!-- Issue -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🟥 1. 發現問題</div>

        <q-input
          v-model="issue"
          type="textarea"
          outlined
          autogrow
          label="ISSUE"
          class="q-mt-md"
        />

        <q-banner class="bg-red-1 text-red-10 q-mt-md" rounded>
          <template #avatar>
            <q-icon name="warning" />
          </template>
          思緒跑到 JPT，正要做 Su-Ao Project， 沒動力，更不要說 Room DB。
        </q-banner>
        <div class="text-subtitle2 q-mt-md">
          不要先判斷自己 \ 先試著問 GPT。
        </div>
      </q-card-section>
    </q-card>

    <!-- 10 mins / 快刀 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⚡ 2. 先判斷：10mins Test 還是快刀亂麻？</div>

        <div class="row q-col-gutter-md q-mt-sm">
          <div class="col-12 col-md-6">
            <q-card
              flat
              bordered
              class="cursor-pointer"
              :class="mode === '10min' ? 'bg-blue-1' : ''"
              @click="mode = '10min'"
            >
              <q-card-section>
                <div class="text-h6">⏱ 10mins Test</div>

                <div class="text-body2 text-grey-7 q-mt-sm">
                  先做 10 分鐘， 用實際執行結果判斷自己現在的狀態。
                </div>

                <q-list class="q-mt-sm">
                  <q-item
                    v-for="(item, index) in tenMinItems"
                    :key="index"
                    tag="label"
                  >
                    <q-item-section avatar>
                      <q-checkbox v-model="item.done" />
                    </q-item-section>

                    <q-item-section>
                      {{ item.text }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-12 col-md-6">
            <q-card
              flat
              bordered
              class="cursor-pointer"
              :class="mode === 'quick' ? 'bg-orange-1' : ''"
              @click="mode = 'quick'"
            >
              <q-card-section>
                <div class="text-h6">🔪 快刀亂麻</div>

                <div class="text-body2 text-grey-7 q-mt-sm">
                  不分析太久，快速完成最低限度行動。做完再檢查還缺甚麼 \ <br />
                  批次處理時期 just do it 消耗項目就很好
                </div>

                <q-list class="q-mt-sm">
                  <q-item
                    v-for="(item, index) in quickItems"
                    :key="index"
                    tag="label"
                  >
                    <q-item-section avatar>
                      <q-checkbox v-model="item.done" />
                    </q-item-section>

                    <q-item-section>
                      {{ item.text }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 執行能見度 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">👁 3. 執行層級能見度</div>

        <div class="text-caption text-grey-7 q-mb-md">
          當下不是「能力不夠」，可能只是下一層沒有被看見。
        </div>

        <q-list bordered separator>
          <q-item
            v-for="(item, index) in visibilityItems"
            :key="index"
            tag="label"
          >
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.title }}
              </q-item-label>

              <q-item-label caption>
                {{ item.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 不追求做更多 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🧭 4. 不追求「做更多」</div>

        <q-list>
          <q-item
            v-for="(item, index) in principleItems"
            :key="index"
            tag="label"
          >
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              {{ item.text }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 意志力消耗 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔋 5. 意志力消耗管理</div>

        <q-banner class="bg-yellow-1 text-dark q-mb-md" rounded>
          <template #avatar>
            <q-icon name="battery_alert" />
          </template>

          消耗很多意志力的部分， 不應該一直靠意志力解決。
          應該提高系統的閱讀品質。
        </q-banner>

        <q-list bordered separator>
          <q-item v-for="(item, index) in energyItems" :key="index">
            <q-item-section avatar>
              <q-icon :name="item.icon" color="primary" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ item.title }}
              </q-item-label>

              <q-item-label caption>
                {{ item.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 工作重要性 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">⭐ 6. 工作是否重要？</div>

        <div class="text-body2 text-grey-7 q-mb-md">
          一個工作的價值，不只由「我現在有沒有興趣」決定。
        </div>

        <div class="row q-col-gutter-sm">
          <div
            v-for="(item, index) in importanceItems"
            :key="index"
            class="col-12 col-md-4"
          >
            <q-card flat bordered class="full-height">
              <q-card-section>
                <q-icon :name="item.icon" size="32px" color="primary" />

                <div class="text-subtitle1 text-weight-bold q-mt-sm">
                  {{ item.title }}
                </div>

                <div class="text-caption text-grey-7">
                  {{ item.description }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- 批次處理 -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="text-h6">🔁 7. 批次處理</div>

        <q-list>
          <q-item v-for="(item, index) in batchItems" :key="index" tag="label">
            <q-item-section avatar>
              <q-checkbox v-model="item.done" />
            </q-item-section>

            <q-item-section>
              {{ item.text }}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>

    <!-- 留白 -->
    <q-card flat bordered class="q-mb-md bg-grey-9 text-white">
      <q-card-section>
        <div class="text-h6">⬜ 8. 留白</div>

        <div class="text-h5 q-mt-md">留白不是浪費時間。</div>

        <div class="text-body1 q-mt-sm">留白是系統重新取得視野的時間。</div>
      </q-card-section>
    </q-card>

    <!-- 最終判斷 -->
    <q-card flat bordered class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">🚦 Recent Decision</div>

        <q-separator class="q-my-md" />

        <div class="text-subtitle1">現在只問三件事：</div>

        <q-list class="q-mt-sm">
          <q-item>
            <q-item-section avatar>
              <q-icon name="filter_1" />
            </q-item-section>

            <q-item-section>
              <strong>範圍是不是太大？</strong>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="filter_2" />
            </q-item-section>

            <q-item-section>
              <strong>下一步是否足夠明確？</strong>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="filter_3" />
            </q-item-section>

            <q-item-section>
              <strong>現在應該做 10mins Test，還是直接收兵？</strong>
            </q-item-section>
          </q-item>
        </q-list>

        <q-btn
          unelevated
          color="primary"
          class="full-width q-mt-md"
          icon="play_arrow"
          label="開始 Recent Test"
          @click="startTest"
        />
      </q-card-section>
    </q-card>
    <q-btn color="primary" label="joey 的底氣 GGB" @click="dialog = true" />
    -
    <q-btn color="primary" label="減少投入 的項目" @click="dialog2 = true" />
    -
    <q-btn color="primary" label="新開發" @click="dialog3 = true" />
    -
    <q-btn color="primary" label="精神狀態 / 工作節奏" @click="dialog4 = true" />
  </q-page>

  <!-- Dialog -->
  <q-dialog v-model="dialog">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">joey 的底氣 GGB</div>
      </q-card-section>

      <q-card-section>
        <div>
          <pre>
這樣要怎可能賺錢？
60y 沒人要請 也是要準備，CNC $150w 要轉讓，表示也做不久，
如果去做3C工廠 60y 一定再也找不到

06｜自己的 Project / 工作 / 收入
自己的 prj 可以好好規劃，打工就要看主理人，儘可能配合，不然就階段性撤退
我的biz 範圍 : 數位 交易 創作 \ then 保養廠 打工 \ 採集 UberE
維修 手標，RC Drone，3DP，\\ 如果做 3C機構 60y 市場就很微了 \ 但是 60y 還有修錶 修機車的 RC的 \
打工，水電 (會多少其次，先有收入)，
臨時交易，社會補助，

07｜在地社會連結
我頭腦變差時 會接不上社會 \ need 在地里長 辦公室 help \ so 我要開始 深耕 1 2 個地方 \
健保 加保 線上 20mins \ 真的很忙 如果沒有行政小姐
如果做個家庭維修，賣個零件跟社會有點聯結
汽車材料行 好像比較好，跟客戶聊聊天，賺個轉手$200 塊。
60y 可以便宜賣庫存，時間比較多，也不划算學新太深的。

08｜醫院宅 / 住宅
可以開始Layout 醫院宅。這個 ROI 最有可能
夢到新車卡土堆裏了，所以就是 新房子也要住 5 年才會熟，
        </pre
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="關閉" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Dialog2 -->
  <q-dialog v-model="dialog2">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">減少投入 的項目 :</div>
      </q-card-section>

      <q-card-section>
        <div>
          <pre>
01｜身體、時間與生命週期
我還有多少時間？
交際時間也會變少，cuz 處理身體的時間變多，處理的速度變慢。
溫度變高變冷 24-26 都會不好勞動，
2200 後也是不能動，只能躺，
流感也是休息比較好
時間應該只夠做到這裡 \ 也算幸運 GPT

03｜ROI、購買與維護成本
我身邊的人，都把問題講到沒有錢買某東西，很少人進一步說到，買到東西以後能否學起來，或能否負擔維護費用。\ 只有車城 說情懷不能亂講
ROI 未來 1年不會用到 55 60 65 70 \ 黃山是上不去 ; 歐洲需要頭等艙 ...
10 年後這個系統還存在嗎？
可能退出點 \ 不用了怎麼退出？壞掉後怎麼辦？

09｜維修、工具與外包
做水電的一個問題 是工具會越堆越多，
自己維修會造成意外的麻煩，最好能載去外包維修
外包維修有信用問題，保險加價2倍

04｜備案與風險
不能去 中國 大公司 \ 去了只能賺錢 沒時間改 app \ 時間比想的少
GPT 可以深入預測。

11｜過去預測與修正
曾經預測 Drone 104 有點高攀，實際上效果也不好。
調整 我不是 建銘貴族 \ 也不會是菁英 \
        </pre
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="關閉" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Dialog3 -->
  <q-dialog v-model="dialog3">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">新開發</div>
      </q-card-section>

      <q-card-section>
        <div>
          <pre>
我聽過 鄉下 城市 一些老人怎麼死，可以調整一下 規劃 page，
重要的導入 生命週期 \ ex NB 10y-15y
spot $333w~55w 2030 \ 提早投入 ROI ?
如果沒有 quasar GPT 我要怎麼辦 ?


只做分類、去除重複位置與整理層級，盡量保留你的原句，不改變原本意思。
讓系統在沒有情緒時，仍然可以指出下一步。
不要要求自己記住：應該讓系統顯示。\ ** 未來發展 ** GPT help

Firebase + Archive + Digital Area + Recent System
不要要求自己記住：應該讓系統顯示。
1. 核心原則：不要靠記憶
├── 01 Memory → UI
│   ├── 不要要求自己記住
│   ├── 不是記起來，是 UI 要顯示
│   └── 即使累，也知道從哪裡開始找

2. UI / Digital System
Firedb in & 封存設計
digital area pic \ 在螢幕找 比較能推進 \
不要要求自己記住：應該讓系統顯示。PM 都很難明示 下一步。

3. Archive / 封存
├── 03 Archive
│   ├── 降低視覺負荷
│   ├── 降低認知負荷
│   ├── 不主動出現在目前工作區
│   └── 搜尋 / 標籤仍然可以找到	
        </pre
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="關閉" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <!-- Dialog4 -->
  <q-dialog v-model="dialog4">
    <q-card style="min-width: 300px">
      <q-card-section>
        <div class="text-h6">4. 精神狀態 / 工作節奏</div>
      </q-card-section>

      <q-card-section>
        <div>
          <pre>
4. 精神狀態 / 工作節奏
精神狀態好 → 批次處理
精神狀態下降 → 收斂、暫停、定點
恢復後 → 再繼續
6. 情緒 / 困難事項
觀察當下實際能力狀況 (6個 level)
確認 Fn → Project → Task → List 是否能具體 描述能見度
必要時收兵 : 身體不好 \ 一直出錯 不順 \ 忘東忘西 \ Bugs 2個 ⇧
Allow Lose：允許今天沒有完成 \ 難過的事情 如果不能變好，就加速他的速度 減少存在感。
轉移情緒 TD6 \ TD6 也沒力了 回來再衝 這個點
不要用興趣判斷工作的價值 (醫院宅 \ ROI)
搜尋一個東西時，同時取得附近的相關資訊。
讓出發時間 delay，準備屬於隨便等級 未發佈 to Team，減少意志力 等計畫更完整.
Room DB、Firebase DB、suao UI 都屬於搜尋與決策成本較高的工作。
        </pre
          >
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="關閉" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from "vue";

const dialog = ref(false);
const dialog2 = ref(false);
const dialog3 = ref(false);
const dialog4 = ref(false);

const issue = ref(
  "思緒跑到 JPT，正要做 Su-Ao Project 沒動力，更不要說 Room DB。"
);

const mode = ref(null);

const tenMinItems = ref([
  {
    text: "先做 10 分鐘，不先判斷自己",
    done: false,
  },
  {
    text: "觀察當下實際能力狀況 (6個 level)",
    done: false,
  },
  {
    text: "確認 Fn → Project → Task → List 是否能具體 描述能見度",
    done: false,
  },
  {
    text: "做 10 分鐘 體驗後重新判斷 \\ 現場訊息密度比數位高",
    done: false,
  },
]);

const quickItems = ref([
  {
    text: "水／廁所 : 5mins 可到 \\ 人不多 有位置",
    done: false,
  },
  {
    text: "平躺／休息 : 空調 \ 冷熱泉 \ 基地 \ 車宿 \ 濕毛巾 \ 暖暖包 ",
    done: false,
  },
  {
    text: "現金／基本生活確認 : 711 超市 百貨 餐廳",
    done: false,
  },
  {
    text: "必要時收兵 : 身體不好 \\ 一直出錯 不順 \\ 忘東忘西 \\ Bugs 2個 ⇧",
    done: false,
  },
  {
    text: "Allow Lose：允許今天沒有完成 \\ 難過的事情 如果不能變好，就加速他的速度 減少存在感。",
    done: false,
  },
]);

const visibilityItems = ref([
  {
    title: "Fn",
    description: "目前到底在完成哪個 Function？ \\ Fn 可長久 ROI",
    done: false,
  },
  {
    title: "Project",
    description: "這個 Function 屬於哪個 Project？ \\ prj 是有截止日的",
    done: false,
  },
  {
    title: "Task",
    description:
      "下一個實際可以執行的 Task 是什麼？ \\ 有成功的 [數值] [里程碑] ",
    done: false,
  },
  {
    title: "List",
    description: "不要一次看整個系統，檢查表 一項一項打勾。",
    done: false,
  },
]);

const principleItems = ref([
  {
    text: "先縮小範圍",
    done: false,
  },
  {
    text: "先讓下一步變清楚",
    done: false,
  },
  {
    text: "轉移情緒 TD6 \\ TD6 也沒力了 \ 回來再衝 這個點",
    done: false,
  },

  {
    text: "不要用興趣判斷工作的價值 (醫院宅 \\ ROI)",
    done: false,
  },
]);

// joey ------
const energyItems = ref([
  {
    icon: "schedule",
    title: "增加時間尺度",
    description: "消耗意志力的事情，不要一直壓縮時間。",
  },
  {
    icon: "dashboard",
    title: "提高 UI System 閱讀品質",
    description: "讓系統本身可以快速告訴我現在在哪裡。",
  },
  {
    icon: "directions",
    title: "系統指出下一步",
    description: "即使沒有情緒，也能知道下一步要做什麼。",
  },
  {
    icon: "search",
    title: "搜尋時順便分析相關區域",
    description: "搜尋一個東西時，同時取得附近的相關資訊。",
  },
]);

const importanceItems = ref([
  {
    icon: "event",
    title: "截止日期",
    description: "是否存在時間壓力？",
  },
  {
    icon: "arrow_forward",
    title: "下一步",
    description: "下一個行動是否明確？",
  },
  {
    icon: "star",
    title: "系統價值",
    description: "即使現在沒有興趣，是否仍然重要？",
  },
]);

const batchItems = ref([
  {
    text: "相關事情盡量一起處理",
    done: false,
  },
  {
    text: "減少 Context Switching 轉換成本",
    done: false,
  },
  {
    text: "批次處理增加「有賺到」的感覺",
    done: false,
  },
  {
    text: "讓出發時間 delay，準備屬於隨便等級 未發佈 to Team，減少意志力 \ 等計畫更完整.",
    done: false,
  },
]);

const completedCount = computed(() => {
  const lists = [
    tenMinItems.value,
    quickItems.value,
    visibilityItems.value,
    principleItems.value,
    batchItems.value,
  ];

  return lists.flat().filter((item) => item.done).length;
});

function startTest() {
  mode.value = "10min";

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function reset() {
  mode.value = null;

  const lists = [
    tenMinItems.value,
    quickItems.value,
    visibilityItems.value,
    principleItems.value,
    batchItems.value,
  ];

  lists.flat().forEach((item) => {
    item.done = false;
  });
}
</script>

<style scoped>
.q-card {
  border-radius: 12px;
}

.cursor-pointer {
  cursor: pointer;
}

.cursor-pointer:hover {
  transform: translateY(-1px);
  transition: 0.15s;
}

.full-height {
  height: 100%;
}
</style>
