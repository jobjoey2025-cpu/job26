<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold q-mb-md">齒輪箱修模專案</div>
    <!-- （RC10B7） -->

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案背景</div>
        <div>
          與美國客戶合作，針對齒輪箱 gear mesh
          過緊問題，進行多輪修模與設計優化。
          <!-- （共7次迭代） -->
          <br />
          <q-img
            src="../components/statics/DC10gear.png"
            alt="Quasar Logo"
            style="width: 155px; border-radius: 12px"
          />
          <q-img
            src="../components/statics/DC10gear mesh.png"
            alt="Quasar Logo"
            style="width: 133px; border-radius: 12px"
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

    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">問題分析歷程</div>

        <q-timeline>
          <q-timeline-entry title="初期判讀 (T1)" subtitle="1st">
            客戶僅回饋 mesh 過緊，透過 Yes/No 問題確認方向，建立快速修模流程。
            確認模具廠可執行並且確認模具修改成公差上限維持原設計
            (2.5D量測公差在縮水精度內)
            <br />
            <q-img
              src="../components/statics/B7gear mode2.png"
              alt="Quasar Logo"
              style="width: 133px; border-radius: 12px"
            />
          </q-timeline-entry>




          <q-timeline-entry title="測試差異(T2)" subtitle="2nd">
            Follow 客戶指示尺寸重新調整多個 pin 位置並與模具廠確認。
            <br />
            <q-img
              src="../components/statics/B7gear section.png"
              alt="Quasar Logo"
              style="width: 133px; border-radius: 12px; cursor: zoom-in"
              @click="show = true"
            />

            <!-- 放大 -->
            <q-dialog v-model="show">
              <q-card style="width: 90vw; height: 90vh">
                <q-img
                  src="/img/B7gear section.png"
                  fit="contain"
                  style="width: 100%; height: 100%"
                />
              </q-card>
            </q-dialog>
            <!-- 美國實測 vs 台灣量測差異 -->
          </q-timeline-entry>



          <!-- ----- -->
          <q-timeline-entry title="材料問題(T3)" subtitle="3rd">
            發現不同材料齒輪吸水膨脹，導致干涉問題，建議客戶再放寬 gear mesh。
            <br />

            <!-- 小圖 -->
            <q-img
              src="../components/statics/B7gear.png"
              style="width: 133px; border-radius: 12px; cursor: zoom-in"
              @click="show = true"
            />
            <!-- src="/img/B7gear.png" -->
            <!-- 放大 -->
            <q-dialog v-model="show">
              <q-card style="width: 90vw; height: 90vh">
                <q-img
                  src=" /img/B7gear.png"
                  fit="contain"
                  style="width: 100%; height: 100%"
                />
              </q-card>
            </q-dialog>
          </q-timeline-entry>
          <!-- ---- -->

          <q-timeline-entry title="設計主導(T4)" subtitle="4th">
            客戶試車感覺還是不順，部門建議修改客戶2D設計圖面(用增加齒輪崩牙的風險，減低運轉的能量損耗)，並同步放寬3D外殼。
            <br />
            <q-img
              src="../components/statics/B7gear hole.png"
              alt="Quasar Logo"
              style="width: 155px; border-radius: 12px"
            />
            <q-img
              src="../components/statics/B7gear.jpg"
              alt="Quasar Logo"
              style="width: 133px; border-radius: 12px"
            />
          </q-timeline-entry>

          <q-timeline-entry title="製造極限(T5)" subtitle="Final">
            客戶希望再增加齒輪箱順暢度，評估可能需重開模仁，進行成本與性能平衡決策，並回復客戶需要的時程與費用。
            <br />
            <q-img
              src="../components/statics/DC10gear modify.png"
              alt="Quasar Logo"
              style="width: 155px; border-radius: 12px"
            />
            <q-img
              src="../components/statics/B7gear part.png"
              alt="Quasar Logo"
              style="width: 133px; border-radius: 12px"
            />
            <q-img
              src="../components/statics/B7gear big.png"
              alt="Quasar Logo"
              style="width: 99px; border-radius: 12px"
            />
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
        <q-chip color="primary" text-color="white" class="q-mr-sm">DFM</q-chip>
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Problem Solving</q-chip
        >
        <q-chip color="primary" text-color="white" class="q-mr-sm"
          >Cross-team Communication</q-chip
        >
      </q-card-section>
    </q-card>
  </q-page>
  <GearAnimate />
</template>

<script setup>
import GearAnimate from "components/GearAnimate.vue";

import { ref } from "vue";
// import imgB7 from "src/assets/B7gear.png"; // ✅ 關鍵

const show = ref(false);
</script>

<style></style>
