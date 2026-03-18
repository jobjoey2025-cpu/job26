<template>
  <q-layout view="lHh Lpr lFf">

    <!-- Header -->
    <q-header elevated class="bg-black text-white">
      <q-toolbar>
        <q-toolbar-title>
          智慧工程作品集系統
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- 主頁 -->
    <q-page-container>

      <q-page class="q-pa-md bg-grey-1">

        <!-- Hero -->
        <div class="text-h4 q-mb-md">
          Drone Base + ERP Integration
        </div>

        <div class="text-subtitle1 q-mb-lg text-grey-7">
          CAD / BOM / IoT / 維修系統整合平台
        </div>

        <!-- 模組入口 -->
        <div class="row q-col-gutter-md">

          <q-card class="col-3 cursor-pointer" @click="tab='dashboard'">
            <q-card-section>
              <div class="text-h6">無人機基地</div>
              <div class="text-caption">維運 Dashboard</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 cursor-pointer" @click="tab='bom'">
            <q-card-section>
              <div class="text-h6">工程資料</div>
              <div class="text-caption">BOM / CAD</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 cursor-pointer" @click="tab='workorder'">
            <q-card-section>
              <div class="text-h6">維修工單</div>
              <div class="text-caption">ERP流程</div>
            </q-card-section>
          </q-card>

          <q-card class="col-3 cursor-pointer" @click="tab='system'">
            <q-card-section>
              <div class="text-h6">系統架構</div>
              <div class="text-caption">整合能力</div>
            </q-card-section>
          </q-card>

        </div>

        <!-- 動態內容 -->
        <div class="q-mt-lg">

          <!-- Dashboard -->
          <div v-if="tab==='dashboard'">
            <q-banner class="bg-grey-3">
              無人機基地狀態（電力 / 水系統 / 安全）
            </q-banner>

            <div class="row q-col-gutter-md q-mt-md">

              <q-card class="col-3 text-center">
                <q-card-section>
                  <div>電力</div>
                  <div class="text-green text-h5">正常</div>
                </q-card-section>
              </q-card>

              <q-card class="col-3 text-center">
                <q-card-section>
                  <div>水位</div>
                  <div class="text-green text-h5">正常</div>
                </q-card-section>
              </q-card>

              <q-card class="col-3 text-center">
                <q-card-section>
                  <div>消防</div>
                  <div class="text-red text-h5">異常</div>
                </q-card-section>
              </q-card>

            </div>
          </div>


          <!-- BOM -->
          <div v-if="tab==='bom'">
            <q-table :rows="bom" :columns="columns" row-key="id" />
          </div>


          <!-- 工單 -->
          <div v-if="tab==='workorder'">

            <q-btn label="新增工單" color="primary" @click="addWork" />

            <q-list bordered class="q-mt-md">
              <q-item v-for="w in workorders" :key="w.id">
                <q-item-section>
                  {{ w.title }}
                </q-item-section>
                <q-item-section side>
                  {{ w.status }}
                </q-item-section>
              </q-item>
            </q-list>

          </div>


          <!-- 系統架構 -->
          <div v-if="tab==='system'">

            <div class="row items-center justify-around">

              <q-chip>SolidWorks</q-chip>
              <q-icon name="arrow_forward"/>
              <q-chip>API</q-chip>
              <q-icon name="arrow_forward"/>
              <q-chip>Database</q-chip>
              <q-icon name="arrow_forward"/>
              <q-chip>ERP</q-chip>

            </div>

          </div>

        </div>

      </q-page>

    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      tab: 'dashboard',

      columns: [
        { name: 'name', label: '品名', field: 'name' },
        { name: 'qty', label: '數量', field: 'qty' }
      ],

      bom: [
        { id: 1, name: '外殼', qty: 1 },
        { id: 2, name: 'LED', qty: 4 }
      ],

      workorders: [
        { id: 1, title: '發電機測試', status: '完成' },
        { id: 2, title: '水泵檢查', status: '進行中' }
      ]
    }
  },

  methods: {
    addWork () {
      this.workorders.push({
        id: Date.now(),
        title: '新工單',
        status: '待處理'
      })
    }
  }
}
</script>