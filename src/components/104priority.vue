<template>

  <p>
    📌 投遞策略 : 先投「遠的」→ 練面試 + 增加機會 \\ 近的公司 →
    留作後手（成功率高）
  </p>

  <div class="q-pa-md" style="max-width: 666px">
    <q-list bordered class="rounded-borders">
      <!-- caption="John Doe" -->
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="0426"
      >
        <q-card>
          <q-card-section>
            *## New ideas : 如果公司 只是要便宜的人力，那技術 也不會太多值得學的，就是五鼠技窮，steam 沾醬油，
            責任制，青木年假畫圖，變形工時，
          </q-card-section>
        </q-card>
      </q-expansion-item>

      <q-expansion-item
        expand-separator
        icon="signal_wifi_off"
        label="next day"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>

    </q-list>
  </div>






  <h6 style="text-align: center">chrome find text search table link BLG</h6>

  <div class="q-pa-md">
    <q-table
      grid
      grid-header
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <!-- 🔍 搜尋 -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- 🔥 正確位置：q-table 裡 -->
      <template v-slot:item="props">
        <div class="q-pa-sm col-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ props.row.name }}</div>
              <div>優先 : {{ props.row.level }}</div>
              <div>職稱: {{ props.row.position }}</div>
              <div>地點 通勤: {{ props.row.location }}</div>
              <div>RFQ: {{ props.row.RFQ }}</div>
              <div>KEY: {{ props.row.KEY }}</div>

              <div>Calories: {{ props.row.calories }}</div>
              <!-- <div>Fat (g): {{ props.row.fat }}</div> -->
              <a
                :href="formatLink(props.row.hyperlink)"
                target="_blank"
                style="color: #1976d2"
              >
                <!-- 前往連結 {{ props.row.hyperlink }} -->
                前往連結 {{ props.row.name }}
              </a>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "hyperlink", label: "Link", field: "hyperlink" },
];

const rows = [
  {
    level: "🥈 第二梯隊（備用）",
    name: "Google",
    position: "機機構工程師",
    location: "去看看 \\ 大溪區",
    RFQ: "「過去有沒有中止的專案？」",
    KEY: "補助型公司 \\ 無人機不一定是主力",
    other: "技術發展 - 新想法 🥇（雖然比較累）",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥈 第二梯隊（備用）",
    name: "華冠通訊",
    position: "(大溪廠)無人機機構工程師",
    location: "去看看 \\ 桃園市大溪區",
    RFQ: "「無人機產品現在有實際客戶嗎？」「過去有沒有中止的專案？」",
    KEY: "接案 / demo / 補助型公司 \\ 無人機不一定是主力",
    calories: 237,
    fat: 9.0,
    hyperlink: "https://joey20090710.blogspot.com/2026/04/tokyo-ape.html",
  },
  {
    level: "🥉 第三梯隊（跳板用）",
    name: "義美食品",
    position:
      "培訓無人機/機器人/機器狗設計/測試/組裝硬體/軟體工程師【金鞍機械龍潭廠】",
    location: "宿舍 \\ 桃園市龍潭區",
    RFQ: "「機器狗是商業產品還是展示用途？」「這個部門是長期投資嗎？」",
    KEY: "👉 很容易是「玩具部門」\ 有宿舍 \ 👉 高機率進去：畫圖 + 改圖 + 雜事 \「娛樂消費 → 撐不起 long term」",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥈 第二梯隊（備用）",
    name: "聯德電子",
    position: "無人機機構工程師",
    location: "林口 \\ 桃園市龜山區",
    RFQ: "👉 怕變成「配角工程師」「無人機是主力產品還是其中一個項目？」👉 很重要\\「機構是做整機還是單一零件？」👉 決定成長幅度",
    KEY: "比較像電子公司跨無人機 ",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥈 第二梯隊（備用）",
    name: "錦明集團",
    position: "研發部-無人機機構工程師",
    location: "大有路 \\ 桃園市蘆竹區經國路",
    RFQ: "「無人機部門成立多久？目前營收占比？」👉 判斷是不是玩票\\ 「未來一年會擴編還是縮編？」",
    KEY: "👉 傳產轉型風險 \\ 一人多工爆炸 \\ 很吃主管",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥇 第一梯隊（主攻）",
    name: "張量科技",
    position: "機機構工程師",
    location: "土城 MRT \\ 新北市土城區承天路33號10樓 (距捷運永寧站約230公尺)",
    RFQ: "👉 技術公司，要確認你不是只畫圖 \\ 「機構分析在專案中占比大概多少？」👉 看你能不能學到分析\\「新人有機會碰分析嗎？」👉 避免只做CAD",
    KEY: "Tensor Tech 機構組目前有四位成員（三位偏機構設計、一位偏機構分析）高速轉動件設計\\?? 高速轉動件（技術門檻）",
    other: "技術發展 - 新想法 🥇（雖然比較累 要CAE）",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🟩 低風險（相對值得投）",
    name: "富田電機（銅鑼）— 機構工程師",
    position: "機機構工程師",
    location: "地點遠",
    RFQ: "",
    KEY: "電機 + 機構整合 \\ 系統會越做越大",
    other: "技術發展 - 新想法 🥇（雖然比較累 要CAE）",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥉 第三梯隊（跳板用）",
    name: "台灣晉陞太空",
    position:
      "【無人機】機構工程師 \ 【無人機】電機工程師(苗栗市) \ PC端 或 微處理器之軟、硬體測試治具，程式之開發。",
    location: "竹南廣源科技園區",
    RFQ: "「目前公司主要收入來源是什麼？」👉 如果答不出來 → 危\\ 「一個工程師大概負責幾個領域？」👉 聽到「很多」=爆炸",
    KEY: "👉 小公司高風險",
    other: "很像「人不夠 → 一人多用」",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥇 第一梯隊（主攻）",
    name: "銘旺科技",
    position: "【航太機械工程師 (無人機領域) \ 無人機馬達動力工程師",
    location: "[遠] 桃園市中壢區高鐵站前",
    RFQ: "「👉 你要確認「是不是玩真的航太」\\ 「馬達目前是用在哪些產品？無人機還是其他？」👉 看是不是核心產品 \\ 「有沒有自己設計動力系統，還是代工？」👉 核心 vs 打工",
    KEY: "有「馬達 / 動力」→ 核心技術",
    other: "中壢 住哪裡 ?",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "❌ 直接排除 \ 但是真的很近",
    name: "中華航太工業",
    position: "無人機工程師\ 中華航太已取得ROTAX引擎維修站授權",
    location: "新北市樹林區西圳街",
    RFQ: "「這個職位的成長路徑是什麼？」如果講不出來 → 直接放棄\\技術含量低或公司本身沒賺錢",
    KEY: "月薪34,000~40,000元❌ 2. 薪資明顯偏低（<40K）",
    other:
      "什麼都要你做\\偏維修 / 授權（不是研發核心）\\想混經驗 不適合你（你要成長）",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    level: "🥉 第三梯隊（跳板用）",
    name: "🔴 軸能科技",
    position: "👉 專案型公司",
    location: "新北市新莊區",
    RFQ: "無人機專案工程師 「專案工程師」= 很模糊",
    KEY: "高機率接案型",
    other:
      "什麼都要你做\\偏維修 / 授權（不是研發核心）\\想混經驗 不適合你（你要成長）",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
];

export default {
  setup() {
    return {
      filter: ref(""),
      columns,
      rows,
      formatLink,
    };
  },
};

function formatLink(url) {
  // 自動補 https://
  if (!url.startsWith("http")) {
    return "https://" + url;
  }
  return url;
}
</script>
