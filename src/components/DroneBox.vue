<template>
  <q-page class="q-pa-md bg-grey-1">
    <!-- 標題 -->
    <div class="text-h4 q-mb-md">無人機 與 地面站基地管理</div>

    <div class="text-subtitle2 text-grey-7 q-mb-lg">
      Automated & Intelligent Drone Base
    </div>

    <!-- ----- -->
    -
    <div class="row q-col-gutter-md">
      <!-- 功能介紹 -->
      <q-card class="col-6 q-mx-md shadow-2">
        <!-- <q-card class="q-mb-md shadow-2"> -->
        <q-card-section>
          <div class="text-h6 q-mb-sm">系統功能</div>

          <q-list dense>
            <q-item>
              <q-item-section>自動化基地保養</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>無人機維修管理</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>套版任務（農藥噴灑 / 橋梁巡檢）</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>Pix4Dcapture / Litchi 任務整合</q-item-section>
            </q-item>

            <q-item>
              <q-item-section>最後一公里配送應用</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
      <q-card class="col-4 q-mx-md shadow-2">
        <!-- <q-card class="q-mb-md"> -->
        <!-- <q-card class="col-6 q-mx-md shadow-2"> -->

        <q-img
          src="./statics/dhl.jpg"
          style="width: 200px; height: 200px"
          fit="cover"
        />
      </q-card>
    </div>
    <br />

    <!-- ----- -->
    <!-- 系統流程 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-md">運作流程</div>

        <div class="row items-center justify-around">
          <q-chip color="grey-7" text-color="white">任務設定</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="blue">無人機執行</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="green">資料回傳</q-chip>
          <q-icon name="arrow_forward" />

          <q-chip color="orange">飛行日誌紀錄</q-chip>
          <!-- <q-icon name="arrow_forward" /> -->

          <q-chip color="purple">基地保養維護</q-chip>
        </div>
      </q-card-section>
    </q-card>
    <br />

    <!-- 機電保養 -->
    <div class="row q-col-gutter-md">
      <!-- 電力 -->
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6">電力系統</div>

          <q-list dense>
            <q-item
              ><q-item-section>ATS 自動切換測試 (台電)</q-item-section></q-item
            >
            <q-item><q-item-section>發電機測試</q-item-section></q-item>
            <q-item
              ><q-item-section>停電 Timer 校正 / 復歸</q-item-section></q-item
            >
            <!-- <q-item><q-item-section>影像紀錄（GoPro / 手機）</q-item-section></q-item> -->
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 水系統 -->
      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6">給排水系統</div>

          <q-list dense>
            <q-item><q-item-section>AB 泵交換測試</q-item-section></q-item>
            <q-item><q-item-section>高低水位浮球測試</q-item-section></q-item>
            <q-item
              ><q-item-section>排水 / 積水 / 漏水檢查</q-item-section></q-item
            >
            <q-item><q-item-section>管路清潔與阻塞檢查</q-item-section></q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 弱電 + 安全 -->
    <div class="row q-col-gutter-md q-mt-md">
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6">弱電系統</div>

          <q-list dense>
            <q-item><q-item-section>電信系統檢查</q-item-section></q-item>
            <q-item><q-item-section>紅外線警報器</q-item-section></q-item>
            <q-item><q-item-section>監控調閱</q-item-section></q-item>
            <q-item><q-item-section>照明控制</q-item-section></q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6">安全系統</div>

          <q-list dense>
            <q-item><q-item-section>瓦斯 / 地震監測</q-item-section></q-item>
            <q-item><q-item-section>火警消防系統</q-item-section></q-item>
            <q-item><q-item-section>受信總機測試</q-item-section></q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- 維運 -->
    <div class="row q-col-gutter-md q-mt-md">
      <q-card class="q-mx-md col-5">
        <q-card-section>
          <div class="text-h6 q-mb-sm">維運與管理</div>

          <q-list dense>
            <q-item><q-item-section>抄表 / 巡場</q-item-section></q-item>
            <q-item><q-item-section>設備清潔與潤滑</q-item-section></q-item>
            <q-item><q-item-section>功能測試</q-item-section></q-item>
            <q-item
              ><q-item-section>年度保養 / 發電機大保養</q-item-section></q-item
            >
          </q-list>
        </q-card-section>
      </q-card>

      <!-- 文書與系統 -->
      <q-card class="col-6">
        <q-card-section>
          <div class="text-h6 q-mb-sm">文書與數位化</div>

          <q-list dense>
            <q-item><q-item-section>任務提示 / 日報</q-item-section></q-item>
            <q-item><q-item-section>保養紀錄表</q-item-section></q-item>
            <q-item><q-item-section>維修建議回報</q-item-section></q-item>
            <q-item><q-item-section>工單系統 / 佈告欄</q-item-section></q-item>
            <q-item
              ><q-item-section>LINE 通知 / 收尾檢查表</q-item-section></q-item
            >
          </q-list>
        </q-card-section>
      </q-card>
    </div>
    <!-- 願景 -->
    <q-card class="q-mt-md bg-black text-white">
      <q-card-section>
        <div class="text-h6">系統願景</div>

        <div class="q-mt-sm">
          建立無人機基地自動化管理平台，整合機電保養、任務派遣與資料回傳，
          解決城市最後一公里配送與巡檢問題。
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "DroneBaseDashboard",
};
</script>
