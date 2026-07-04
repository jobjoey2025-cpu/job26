```vue
<template>
  <q-page class="bg-grey-2">
    <!-- Hero -->
    <section class="bg-primary text-white q-py-xl">
      <div class="container q-px-lg">
        <div class="text-overline">Lesson 06</div>

        <div class="text-h3 text-weight-bold q-mt-sm">
          MOSCOW | Kano Model | RICE <br />模型 優先排序法
        </div>
        <p>
          1.快速分類--如果只需要快速篩掉低優先級需求，MOSCOW 是你的首選。<br />
          2.戶體驗導向--想打造讓用戶拍手叫好的產品？ 選擇 Kano
          Model，傾聽用戶心聲。 想做一個<br />
          x3.量化工具--精算師，幫需求排隊，資源花得超值？非 RICE 莫屬。
        </p>
        <div class="text-subtitle1 q-mt-md">
          從使用者滿意度出發，打造真正讓人驚艷的產品。<br />
          一、为用户故事排优先级<br />
          二、为产品 Bug 排优先级<br />
          比賽資源有限，賽道也不可能讓所有人同時衝刺，因此我們需要決定：誰先跑？誰在中間？誰暫時留在替補席？
        </div>

        <div class="q-mt-lg">
          <q-chip color="white" text-color="primary" icon="psychology">
            User Experience
          </q-chip>

          <q-chip color="white" text-color="primary" icon="favorite">
            Customer Satisfaction
          </q-chip>

          <q-chip color="white" text-color="primary" icon="insights">
            Product Strategy
          </q-chip>
        </div>
      </div>
    </section>

    <!-- <q-img :src="url" style="height: 140px; max-width: 150px">
      <template v-slot:loading>
        <q-spinner-gears color="white" />
      </template>
    </q-img> -->
    <q-img
      v-for="img in cadImgs"
      :key="img"
      :src="img"
      class="thumb"
      style="width: 28%"
      @click="open(img)"
      fit="cover"
    />

    <div class="container q-pa-lg">
      <!-- Learning Objectives -->

      <q-card flat bordered class="q-mb-xl">
        <q-card-section>
          <div class="text-h5 text-weight-bold">本章學習目標</div>

          <div class="text-grey-7 q-mt-sm">
            完成本章後，你將了解 Kano Model
            的核心概念，以及如何利用需求分類提升產品決策品質。
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="check_circle" />
              </q-item-section>

              <q-item-section> 了解 Kano Model 的設計理念 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="check_circle" />
              </q-item-section>

              <q-item-section> 學會辨識五種需求類型 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="check_circle" />
              </q-item-section>

              <q-item-section> 理解需求與滿意度之間的關係 </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon color="primary" name="check_circle" />
              </q-item-section>

              <q-item-section>
                為後續問卷分析與需求排序建立基礎
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <!-- Introduction -->

      <q-card flat bordered class="q-mb-xl">
        <q-card-section>
          <div class="text-h5 text-weight-bold">
            MOSCOW | Kano Model | RICE 是什麼？
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="text-body1">
          <p>為什麼 MoSCoW 好用？</p>
          <p>
            眾多的 User Story
            按照「最小可行產品」（MVP）的概念分成三類：Must、Should、Could，這就是
            MoSCoW 在實務中的應用！<br />專案管理者，重要的不是說「不」，而是要善於說「暫時不」，它們被分類到「以後再說」的區塊。<br />
            這是專案的<b>「界外球」</b>，也就是明確不在當前範圍內的需求。<br />
            設計數據庫結構 \ 確保每個用戶學習時間能准去紀錄<br />
            儀錶板UI 長條圖樣式顏色 顯示過去30天的學習數據<br />
            優化圖形顯示效果 \ 減少api的延遲<br />
          </p>
          <p>
            Kano
            Model（狩野模型）由日本東京工業大學教授提出。並非所有需求都值得花一樣的精力對待。「二維品質模型」
          </p>

          <p>
            與傳統認為「功能越多、品質越高、使用者越滿意」不同， Kano
            Model認為不同功能對滿意度的影響並不相同。<br />
            基本需求（M）|期望需求（O）|魅力需求（A）|無差異需求（I）|反向需求（R）<br />
            滿意度——來自用戶主觀感受，反映需求被滿足的程度。<br />
            實現程度——功能提供、產品品質的客觀表現，描述需求是否被具體實現。
            💡 例子： 手機可以打電話、登入功能、付款功能。
            💡 例子： App 越快、續航越久、搜尋越精準。
            💡 例子： AI 助手、自動摘要、夜景拍照。
            💡 例子： 20 種鬧鐘聲音、 過多動畫效果。
            💡 例子： 預裝大量 App、 自動播放影片、 自動更新。(某些使用者喜歡， 另一群使用者卻討厭。 產品通常需要提供開關或自訂選項。)
          </p>

          <p>
            RICE 優先排序模型 是一種專門為產品經理設計的需求評估方法，由
            Intercom 團隊提出。
          </p>
          <p>
            Reach（影響範圍）|Impact（影響力）|Confidence（信心指數）|Effort（實現成本）<br />
            RICE 分數 = (Reach × Impact × Confidence) ÷ Effort
          </p>
          <p>
            儘量做成 是非題 \ Not 選擇題 \ cuz 時間比你想的少 (除非是大專案 &
            Good Team)
          </p>
        </q-card-section>
      </q-card>

      <!-- Core Concept -->

      <q-banner rounded class="bg-blue-1 text-primary q-mb-xl">
        <template #avatar>
          <q-icon name="lightbulb" color="amber" />
        </template>

        Kano Model 的核心精神不是「功能越多越好」，而是找出
        <strong>哪些功能真正影響使用者滿意度</strong>。
      </q-banner>




    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

// const url = ref("https://picsum.photos/500/300");

const cadImgs = [
  "/img/Kano Model.png",
  "/img/Kano Model sense.png",
  // "/img/Kano Model seperate.png",
  "/img/Kano Model statistics.png",
];
</script>

<style scoped>
.container {
  max-width: 1100px;
  margin: auto;
}

p {
  line-height: 1.8;
}
</style>
```
