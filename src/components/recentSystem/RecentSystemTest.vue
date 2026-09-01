<template>
  <q-card flat bordered class="q-mt-md">
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold q-mb-sm">行動判斷</div>
      <div class="row q-col-gutter-md">
        <div
          v-for="action in actions"
          :key="action.title"
          class="col-12 col-sm-6"
        >
          <div class="text-weight-bold">{{ action.title }}</div>
          <div class="text-body2 text-grey-7" v-html="action.description"></div>
        </div>
      </div>
    </q-card-section>
  </q-card>

  <div class="q-py-md test-panel">
    <q-expansion-item
      v-model="testExpanded"
      icon="perm_identity"
      label="⏱ - 10mins Test"
      caption="觀察當下實際能力狀況"
    >
      <p>pre 預先格式化元素 for CICD speed</p>
      <pre>
<b>⏱ 10mins Test，不先自己判斷 自己想。</b>
* Shift + Tab 鍵 (可向左縮排。)
@ 先做 10 分鐘， 用實際執行結果觀察自己現在具體的狀態。
@ 判斷定位當下實際能力狀況 (6個 level)
@ 確認 Fn → Project → Task → List 是否能具體 描述能見度
@ 做 10 分鐘 體驗後重新判斷 \ 現場的訊息密度比 數位模擬 高

* 某金錢以下是情面 \ 以上是利益
      </pre>
    </q-expansion-item>
  </div>

  <div class="q-py-md test-panel">
    <q-expansion-item
      v-model="actionExpanded"
      icon="perm_identity"
      label="⚔ - 快刀亂麻"
      caption="just do it 突破"
    >
      <pre>
<b>⚔ - 快刀亂麻 - just do it 突破。</b>
* Shift + Tab 鍵 (可向左縮排。)

一定要親自做的類型 (不用浪費精力逃避) :
1. 太難的 - 別人不會做 \ 溝通也要時間 \ 除非 他有套板
2. 太重要的 - 別人不好幫你決定的 \ 財務 賭博 \ 社會潛規則 不好說
3. 緊急的 - 臨時找不到可靠的人

*事情太多時，不是熬夜 -- 而是砍掉一些事情。注意 : 收斂成果也很花時間
*必做太多 -- 必須忍痛刪掉一些事情， 否則只能犧牲睡眠， 長期對健康危險。
*AI 幫忙排序 -- GPT 分析慾望， 排出 Top 5。只做分類、去除重複位置與整理層級，盡量保留你的原句。
*BLG -- 一寫就是四小時， 104 前要減少 TD6。
*必要時收兵 : 身體不好 \ <b>一直出錯 不順</b> \ 忘東忘西 \ Bugs 2個 ⇧
*真的推不動 -- TD6 放鬆 加速轉念一下， 但不要花太久，use money 放鬆 多撐一點。

*邊做邊檢查還缺甚麼 -- 不分析太久，快速完成最低限度行動。
*批次處理時期 just do it 消耗項目就很好
*Allow Lose：允許今天沒有完成 \ 難過的事情 如果不能變好，就加速他的速度 減少存在感。

* 水／廁所 : 5mins 可到 \ 人不多 有位置
* 平躺／休息 : 空調 冷熱泉 基地 車宿 濕毛巾 暖暖包
* 現金／基本生活確認 : 711 超市 百貨 餐廳
      </pre>
    </q-expansion-item>
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  actions: {
    type: Array,
    required: true,
  },
});

const actionExpanded = ref(false);
const testExpanded = ref(false);
</script>

<style scoped>
.test-panel {
  max-width: 36rem;
}

pre {
  overflow-x: auto;
  white-space: pre-wrap;
}
</style>
