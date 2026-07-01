<template>
  <q-page class="q-pa-lg">
    <h6>軟體定義收納 work flow</h6>
    <p>UHF RFID DIY 10年 失敗後 \ 用相機 & UI Cover Test</p>
    <p>*先用 Excel區塊 模擬 floor plan <b>></b> *轉為 quasar UI <b>></b> *Link 表單紀錄 時空 <b>></b>
      配合圖面 ID Link Notion 用快照紀錄 (cuz 時間不多) <b>></b> *然後就能 mobile Think CICD &
      <b>></b> *切割下次的小對齊 Task (Fn Prj Task List)
    </p>
    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="primary"
          icon="assignment"
          label="G表單 + Edit"
          @click="
            open(
              'https://docs.google.com/forms/d/1T6GR230ft61ktk8aAB0PStiPV9bqd1NSp75yDkKXYMc/edit#responses'
            )
          "
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="green"
          icon="table_view"
          label="GDS 表單結果"
          @click="
            open(
              'https://docs.google.com/spreadsheets/d/1QuRvJqvSmJ0SrbsyneWv4OpFfvP7B_FB0YZRlLNBSaA/edit?resourcekey=&gid=675298238#gid=675298238'
            )
          "
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="orange"
          icon="article"
          label="BLG 開發紀錄"
          @click="
            open(
              'https://joey20090710.blogspot.com/2026/06/ai-coding-history-26-0629.html'
            )
          "
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="deep-purple"
          icon="photo_library"
          label="照片層 - 細節 Notion 照片歷史"
          @click="
            open(
              'https://www.notion.so/34e020032b2980d68a09f2320ca5fac6?source=copy_link'
            )
          "
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="cyan"
          text-color="white"
          icon="place"
          label="現場對齊 - 時空 quasar UI"
          @click="open('https://104vtol.netlify.app/#/a3F_floorPlan')"
        />
      </div>

      <div class="col-12 col-sm-6 col-md-4">
        <q-btn
          class="full-width"
          color="red"
          icon="architecture"
          label="CAD (2F) Notion CAD db"
          @click="
            open(
              'https://app.notion.com/p/2F-CAD-36d020032b29804d8c26ddeda99198e0?source=copy_link'
            )
          "
        />
      </div>
    </div>
    <!-- ------ -->

    <p>26-0701 的 收納整理 \ 軟體定義建築 \ 最接近的軟體是 REVIT</p>

    <p><b>* 現場對齊層（時空）</b></p>
    <p>
      以 Quasar (excel 簡圖 floor plan)作為現場記錄工具，核心是
      時間與位置的對齊。每次到場時，確認紀錄的時間、空間與實際現況一致，建立可靠的現場履歷。
    </p>
    <p><b>* 照片層（細節）</b></p>
    <p>
      以 Notion 空間箱 作為照片檢查與 speed shot 的管理中心。現場拍攝後，優先依
      Quasar 命名規則
      整理，並直接在對應卡片下方新增照片，讓同一空間的紀錄能持續累積。
    </p>
    <p>
      有些關鍵區域 就要多次 改方法來 突破 \\ cuz 沒辦法突破 \
      表示有我不知道的困難 \ ex Notion 壞掉了 \ 只能先做其他的
    </p>
    <p><b>* 抽象層（系統）</b></p>
    <p>
      Tree
      用於整理長期存在的概念與架構，目前先不急著建立複雜樹狀系統。等到使用模式穩定後，再選擇適合長期保存的平台與結構，避免過早投入維護成本。
    </p>

    <p><b>* CAD 啟動條件（規模）</b></p>
    <p>
      CAD 不在初期就投入。先用 Excel / Quasar
      完成功能、照片與現場資料的整理；當專案規模擴大到 2F
      等級、需要處理整體配置與量體關係時，再正式啟動 CAD 作業。
    </p>

    <div class="text-h4 q-mb-lg">🏠 Housing Function Architecture</div>
    <q-card flat bordered>
      <q-card-section>
        <q-input outlined dense v-model="filter" label="Search" clearable />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-tree
          :nodes="treeData"
          node-key="id"
          label-key="label"
          children-key="children"
          :filter="filter"
          default-expand-all
          selected-color="primary"
          v-model:selected="selected"
          v-model:expanded="expanded"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon name="folder" class="q-mr-sm" color="primary" />

              <div>
                <div class="text-weight-medium">
                  {{ prop.node.label }}
                </div>

                <div
                  v-if="prop.node.description"
                  class="text-grey text-caption"
                >
                  {{ prop.node.description }}
                </div>
              </div>
            </div>
          </template>
        </q-tree>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import treeData from "../data/housing-function.js";

const filter = ref("");

const selected = ref(null);

const expanded = ref([]);

function open(url) {
  window.open(url, "_blank")
}
</script>
