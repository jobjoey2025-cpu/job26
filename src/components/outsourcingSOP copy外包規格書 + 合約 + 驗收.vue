<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">外包用人評估 + 合約生成系統</div>

    <!-- 基本輸入 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">專案基本資訊</div>
        <q-input v-model="project.name" label="專案名稱" />
        <q-input v-model="project.scope" label="工作內容（例：3F鐵皮施工）" />
        <q-input v-model="project.deadline" label="完工時間" />
        <q-input v-model="project.budget" label="預算" />
      </q-card-section>
    </q-card>

    <!-- 規格書 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">規格書（自動生成）</div>
        <q-input type="textarea" v-model="specDoc" autogrow />
      </q-card-section>
    </q-card>

    <!-- 合約 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">合約條款（自動生成）</div>
        <q-input type="textarea" v-model="contract" autogrow />
      </q-card-section>
    </q-card>

    <!-- 驗收 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">驗收標準（自動生成）</div>
        <q-input type="textarea" v-model="acceptance" autogrow />
      </q-card-section>
    </q-card>

    <!-- 按鈕 -->
    <q-btn color="primary" label="一鍵生成" @click="generateAll" />
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";

const project = reactive({
  name: "",
  scope: "",
  deadline: "",
  budget: "",
});

const specDoc = ref("");
const contract = ref("");
const acceptance = ref("");

const generateAll = () => {
  specDoc.value = `【專案名稱】${project.name}\n【工作內容】${project.scope}\n【時間】${project.deadline}\n【預算】${project.budget}\n\n【細節】\n1. 材料由誰提供\n2. 施工方式\n3. 變更流程需提前確認`;

  contract.value = `【付款方式】\n- 開工30%\n- 中期40%\n- 完工驗收30%\n\n【違約】\n- 延期每日扣款\n- 品質不符需重做\n\n【終止條款】\n- 可隨時終止並按完成比例結算`;

  acceptance.value = `【驗收標準】\n- 是否依圖施工\n- 是否完成所有項目\n- 無明顯瑕疵\n\n【驗收方式】\n- 現場確認\n- 拍照存證\n- 問題限期修正`;
};
</script>

<style scoped></style>
