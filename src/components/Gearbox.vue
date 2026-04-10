<template>
  <q-page class="q-pa-lg">
    <!-- 標題 -->
    <div class="text-h4 text-bold q-mb-md">齒輪箱修模專案</div>

    <!-- 專案背景 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案背景</div>
        <div>
          與美國客戶合作，針對齒輪箱 gear mesh 過緊問題，
          進行多輪修模與設計優化。
          <!-- （共7次迭代） -->
        </div>
        <!-- <ImageRow :imgs="bgImgs" @open="open" /> -->

        <div class="row q-gutter-sm q-mt-sm">
          <q-img
            v-for="img in bgImgs"
            :key="img"
            :src="img"
            class="thumb"
            @click="open(img)"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">核心職責</div>
        <ul>
          <li>跨國工程溝通（美國客戶 / 台灣模具廠）</li>
          <li>齒輪嚙合問題分析與修模策略制定</li>
          <li>模糊需求轉換為工程執行方案</li>
        </ul>
      </q-card-section>
    </q-card>

    <!-- Timeline -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">問題分析歷程</div>

        <q-timeline>
          <q-timeline-entry title="初期判讀 (T1)" subtitle="1st">
            客戶僅回饋 mesh 過緊，透過 Yes/No 問題確認方向，建立快速修模流程。
            確認模具廠可執行並且確認模具修改成公差上限維持原設計
            (2.5D量測公差在縮水精度內)。
            <!-- <ImageRow :imgs="t1Imgs" @open="open" /> -->

            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in t1Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="測試差異 (T2)" subtitle="2nd">
            Follow 客戶指示尺寸重新調整多個 pin 位置並與模具廠確認。
            <!-- <ImageRow :imgs="t2Imgs" @open="open" /> -->

            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in t2Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="材料問題 (T3)" subtitle="3rd">
            發現不同材料齒輪吸水膨脹，導致干涉問題，建議客戶再放寬 gear mesh。
            <!-- <ImageRow :imgs="t3Imgs" @open="open" /> -->

            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in t3Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="設計主導 (T4)" subtitle="4th">
            客戶試車感覺還是不順，部門建議修改客戶2D設計圖面(用增加齒輪崩牙的風險，減低運轉的能量損耗)，並同步放寬3D外殼。

            <!-- <ImageRow :imgs="t4Imgs" @open="open" /> -->
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in t4Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-timeline-entry>

          <q-timeline-entry title="製造極限 (T5)" subtitle="Final">
            客戶希望再增加齒輪箱順暢度，評估可能需重開模仁，進行成本與性能平衡決策，並回復客戶需要的時程與費用。
            <!-- <ImageRow :imgs="t5Imgs" @open="open" /> -->
            <div class="row q-gutter-sm q-mt-sm">
              <q-img
                v-for="img in t5Imgs"
                :key="img"
                :src="img"
                class="thumb"
                @click="open(img)"
              />
            </div>
          </q-timeline-entry>
        </q-timeline>
      </q-card-section>
    </q-card>

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案成果</div>
        <ul>
          <li>完成多次跨國修模迭代</li>
          <li>解決 gear mesh 過緊與能量損失</li>
          <li>建立跨國驗證流程</li>
        </ul>
      </q-card-section>
    </q-card>

    <q-card>
      <q-card-section>
        <div class="text-h6">工程能力</div>
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Tolerance Analysis</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Problem Solving</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Cross-team Communication</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm">DFM</q-chip>

      </q-card-section>
    </q-card>

    <!-- 共用圖片放大 -->
    <q-dialog v-model="show">
      <q-card class="viewer">
        <q-img :src="currentImg" fit="contain" class="full-img" />
      </q-card>
    </q-dialog>
  </q-page>
  <GearAnimate />
  <p>Gearbox</p>
</template>

<script setup>
import GearAnimate from "components/GearAnimate.vue";


import { ref } from "vue";

/* ========================
   🔥 共用圖片 viewer
======================== */
const show = ref(false);
const currentImg = ref("");

function open(img) {
  currentImg.value = img;
  show.value = true;
}

/* ========================
   🔥 圖片資料（public/img）
======================== */
const bgImgs = ["/img/DC10gear.png", "/img/DC10gear mesh.png"];

const t1Imgs = ["/img/B7gear-mode2.png"];

const t2Imgs = ["/img/B7gear section.png"];

const t3Imgs = ["/img/B7gear.png"];

const t4Imgs = ["/img/B7gear hole.png", "/img/B7gear.jpg"];

const t5Imgs = [
  "/img/DC10gear modify.png",
  "/img/B7gear part.png",
  "/img/B7gear big.png",
];

/* ========================
   🔥 子元件（正確寫法）
======================== */
const ImageRow = {
  props: ["imgs"],
  emits: ["open"],
  template: `
  <q-img
    v-for="img in t1Imgs"
    :key="img"
    :src="img"
    class="thumb"
    @click="open(img)"
  />
  `,
};
</script>

<!-- <q-img
v-for="img in imgs"
:key="img"
:src="img"
class="thumb"
@click="$emit('open', img)"
/> -->

<style scoped>
.thumb {
  width: 220px;
  height: 100px;
  border-radius: 12px;
  cursor: zoom-in;
}

.viewer {
  width: 90vw;
  height: 90vh;
}

.full-img {
  width: 100%;
  height: 100%;
}
</style>
