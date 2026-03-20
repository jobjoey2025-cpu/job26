<template>
  <q-page class="q-pa-md">
    <q-card class="q-pa-lg">
      <div class="text-h6 text-primary q-mb-md">🚗 電動車配置模擬器 (遙控車設定展示)</div>

      <!-- 導航按鈕放這裡（頂端） -->
      <!-- <div class="row items-center q-mb-md"> -->
      <div class="row justify-end q-mb-md sticky top-0 bg-white z-top q-pa-sm">
        <div class="flex flex-center" style="height: 30px;">
          目前步驟：{{ step }}</div>    <q-space />

        <q-btn
          v-if="step > 1"
          flat
          label="上一步"
          color="grey"
          class="q-mr-sm"
          @click="prev"
        />
        <q-btn v-if="step < 5" label="下一步" color="primary" @click="next" />
      </div>

      <q-stepper v-model="step" flat animated color="primary">
        <!-- ✅ 每個步驟都要用 <q-step> 包起來 -->
        <q-step :name="1" title="品牌與系列">
          <Step1BrandModel :config="config" />
        </q-step>

        <q-step :name="2" title="車型">
          <Step2PowerSystem :config="config" />
        </q-step>

        <q-step :name="3" title="改裝動力系統與電池">
          <Step3BatteryRange :config="config" />
        </q-step>

        <q-step :name="4" title="顏色與輪圈">
          <Step4ColorWheels :config="config" />
        </q-step>

        <q-step :name="5" title="總覽">
          <Step5Summary :config="config" />
        </q-step>
      </q-stepper>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, reactive } from "vue";
import Step1BrandModel from "src/components/Step1BrandModel.vue";
import Step2PowerSystem from "src/components/Step2PowerSystem.vue";
import Step3BatteryRange from "src/components/Step3BatteryRange.vue";
import Step4ColorWheels from "src/components/Step4ColorWheels.vue";
import Step5Summary from "src/components/Step5Summary.vue";

const step = ref(1);

const config = reactive({
  brand: null,
  model: null,
  motor: null,
  drive: null,
  battery: null,
  range: null,
  color: null,
  wheels: null,
});

const next = () => {
  if (step.value < 5) step.value++;
};

const prev = () => {
  if (step.value > 1) step.value--;
};
</script>
