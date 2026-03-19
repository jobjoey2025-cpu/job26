<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <q-tree class="col-12 col-sm-6"
      :nodes="simple"
      v-model:ticked="ticked"
      v-model:expanded="expanded"
      node-key="label"
      :tick-strategy="tickStrategy"
      default-expand-all
    />
    <div class="col-12 col-sm-6">
      <q-option-group
        v-model="tickStrategy"
        :options="tickStrategies"
      />

      <div class="text-h6 q-mt-md">Ticked</div>
      <div>
        <div v-for="tick in ticked" :key="`ticked-${tick}`">
          {{ tick }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      ticked: ref(['==技能標住== :']),
      expanded: ref(['Good service (disabled node)']),
      tickStrategy: ref('strict'),

      tickStrategies: [
        { value: 'none', label: 'None' },
        { value: 'strict', label: 'Strict' },
        { value: 'leaf', label: 'Leaf' },
        { value: 'leaf-filtered', label: 'Leaf Filtered' }
      ],

      simple: [
        {
          label: '電工技能樹',
          children: [
            {
              label: '主線路',
              children: [
                { label: '廚房專插' },
                { label: '單相感應電動機' },
                { label: '動作檢查' },
                { label: '單線圖' },
                { label: '拉線' },
                { label: '三路開關' }
              ]
            },
            {
              label: '配管',
              // disabled: true,
              children: [
                { label: 'PVC管' },
                { label: '電纜' },
                { label: 'EMT管' }
              ]
            },
            {
              label: '屋內線路與電機控制',
              children: [
                { label: '自動液位控制電路' },
                { label: '單相感應電動機正逆轉控制' },
                { label: '電動機故障警報控制電路' },
                { label: '兩部電動機自動交替運轉控制' },
                { label: '簡易升降機控制' },
                { label: '近接開關控制電動機交替運轉與停止控制' },
                { label: '常用電源與備用電源自動切換控制' },
                { label: '單相感應電動機機械停車場控制' },
                { label: '單相感應電動機瞬間停電再啟動控制' },
                { label: '單相感應電動機手動正逆轉兩處控制' }
              ]
            }
          ]
        }
      ]
    }
  }
}
</script>
