```vue
<template>
  <q-page class="bg-grey-2">

    <div class="ready-page">

      <!-- =========================
           HEADER
      ========================== -->

      <div class="text-h5 text-weight-bold">
        🎒 住院包
      </div>

      <div class="text-grey-7 q-mb-lg">
        Ready Check
      </div>


      <!-- =========================
           🚨 EMERGENCY MODE
      ========================== -->

      <q-card
        flat
        class="emergency-card q-mb-md"
        @click="emergencyMode = true"
      >

        <q-card-section class="text-center">

          <div class="emergency-icon">
            🚨
          </div>

          <div class="text-h5 text-weight-bold">
            急診直接模式
          </div>

          <div class="text-body1 q-mt-sm">
            痛到不能想 → 只拿最重要的
          </div>

        </q-card-section>

      </q-card>


      <!-- =========================
           READY STATUS
      ========================== -->

      <q-card
        flat
        bordered
        class="status-card q-mb-md"
        :class="allReady ? 'ready' : 'not-ready'"
        @click="showMissing = true"
      >

        <q-card-section class="text-center">

          <div class="status-icon">
            {{ allReady ? '🟢' : '🟠' }}
          </div>

          <div class="text-h4 text-weight-bold">
            {{ allReady ? 'READY' : `缺 ${missingItems.length} 樣` }}
          </div>

          <div class="text-body1 q-mt-sm">
            {{ allReady
              ? '住院包已經準備完成'
              : '點一下查看目前缺少什麼'
            }}
          </div>

        </q-card-section>

      </q-card>


      <!-- =========================
           MEMORY
      ========================== -->

      <q-card
        flat
        bordered
        class="memory-card q-mb-md"
      >

        <q-card-section>

          <div class="text-subtitle1 text-weight-bold q-mb-sm">
            🧠 住院包口訣
          </div>

          <div class="memory-text">

            <span>卡</span>
            <span>藥</span>
            <span>電</span>
            <span>穿</span>
            <span>用</span>

          </div>

          <div class="text-caption text-grey-7 q-mt-sm">
            健保卡 → 藥 → 手機 → 衣物 → 盥洗
          </div>

        </q-card-section>

      </q-card>


      <!-- =========================
           MISSING
      ========================== -->

      <q-card
        v-if="missingItems.length > 0"
        flat
        bordered
        class="missing-card q-mb-md"
      >

        <q-card-section>

          <div class="row items-center justify-between q-mb-sm">

            <div class="text-subtitle1 text-weight-bold">
              ❌ 目前缺少
            </div>

            <q-badge color="negative">
              {{ missingItems.length }}
            </q-badge>

          </div>


          <q-list separator>

            <q-item
              v-for="item in missingItems"
              :key="item.id"
              clickable
              @click="toggleItem(item)"
            >

              <q-item-section avatar>

                <q-checkbox
                  :model-value="item.ready"
                  @update:model-value="toggleItem(item)"
                />

              </q-item-section>

              <q-item-section>

                <q-item-label class="text-body1">
                  {{ item.icon }} {{ item.name }}
                </q-item-label>

                <q-item-label caption>
                  {{ item.category }}
                </q-item-label>

              </q-item-section>

            </q-item>

          </q-list>

        </q-card-section>

      </q-card>


      <!-- =========================
           READY
      ========================== -->

      <q-card
        v-if="allReady"
        flat
        bordered
        class="all-ready-card q-mb-md"
      >

        <q-card-section class="text-center">

          <div class="text-h6 text-weight-bold">
            🎒 住院包完成
          </div>

          <div class="text-grey-7 q-mt-sm">
            不需要再重新檢查整份清單
          </div>

        </q-card-section>

      </q-card>


      <!-- =========================
           NORMAL ACTION
      ========================== -->

      <div class="q-gutter-sm">

        <q-btn
          v-if="missingItems.length > 0"
          unelevated
          color="primary"
          size="lg"
          class="full-width"
          label="查看全部物品"
          @click="showAll = true"
        />

        <q-btn
          outline
          color="grey-8"
          size="md"
          class="full-width"
          label="重設 Ready Check"
          @click="resetAll"
        />

      </div>


      <!-- ==================================================
           🚨 EMERGENCY DIALOG
      =================================================== -->

      <q-dialog
        v-model="emergencyMode"
        persistent
      >

        <q-card class="emergency-dialog">

          <!-- Header -->

          <q-card-section class="text-center">

            <div class="emergency-big-icon">
              🚨
            </div>

            <div class="text-h4 text-weight-bold">
              急診模式
            </div>

            <div class="text-h6 q-mt-sm">
              不用想，只照著做
            </div>

          </q-card-section>


          <!-- Core Rule -->

          <q-card-section>

            <q-banner
              rounded
              class="emergency-rule"
            >

              <div class="text-h6 text-weight-bold">
                痛到不能想
              </div>

              <div class="text-body1">
                不整理、不 Coding、不做決策
              </div>

              <div class="text-body1">
                只拿下面 4 樣
              </div>

            </q-banner>

          </q-card-section>


          <!-- =========================
               EMERGENCY 4 ITEMS
          ========================== -->

          <q-card-section>

            <div
              v-for="item in emergencyItems"
              :key="item.id"
              class="emergency-item"
              :class="{ done: item.ready }"
              @click="toggleItem(item)"
            >

              <div class="emergency-item-icon">
                {{ item.icon }}
              </div>

              <div class="emergency-item-name">
                {{ item.name }}
              </div>

              <q-checkbox
                :model-value="item.ready"
                @update:model-value="toggleItem(item)"
                size="lg"
              />

            </div>

          </q-card-section>


          <!-- =========================
               STATUS
          ========================== -->

          <q-card-section class="text-center">

            <div
              v-if="emergencyReady"
              class="text-h5 text-weight-bold"
            >
              🟢 可以出發
            </div>

            <div
              v-else
              class="text-h6 text-grey-7"
            >
              還缺 {{ emergencyMissing.length }} 樣
            </div>

          </q-card-section>


          <!-- =========================
               ACTION
          ========================== -->

          <q-card-actions
            vertical
            class="q-pa-md"
          >

            <q-btn
              unelevated
              size="lg"
              class="full-width"
              color="negative"
              label="🏥 我要去醫院"
              @click="goHospital"
            />

            <q-btn
              flat
              size="lg"
              class="full-width"
              label="關閉"
              @click="emergencyMode = false"
            />

          </q-card-actions>

        </q-card>

      </q-dialog>


      <!-- =========================
           MISSING DIALOG
      ========================== -->

      <q-dialog v-model="showMissing">

        <q-card class="dialog-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              ❌ 還缺這些
            </div>

          </q-card-section>

          <q-card-section>

            <q-list separator>

              <q-item
                v-for="item in missingItems"
                :key="item.id"
              >

                <q-item-section avatar>
                  <div class="text-h6">
                    {{ item.icon }}
                  </div>
                </q-item-section>

                <q-item-section>
                  {{ item.name }}
                </q-item-section>

              </q-item>

            </q-list>

          </q-card-section>

          <q-card-actions align="right">

            <q-btn
              flat
              label="關閉"
              v-close-popup
            />

          </q-card-actions>

        </q-card>

      </q-dialog>


      <!-- =========================
           ALL ITEMS
      ========================== -->

      <q-dialog v-model="showAll">

        <q-card class="dialog-card">

          <q-card-section>

            <div class="text-h6 text-weight-bold">
              🎒 全部住院用品
            </div>

          </q-card-section>


          <q-card-section>

            <q-list separator>

              <q-item
                v-for="item in items"
                :key="item.id"
                clickable
                @click="toggleItem(item)"
              >

                <q-item-section avatar>

                  <q-checkbox
                    :model-value="item.ready"
                    @update:model-value="toggleItem(item)"
                  />

                </q-item-section>


                <q-item-section>

                  <q-item-label>
                    {{ item.icon }} {{ item.name }}
                  </q-item-label>

                  <q-item-label caption>
                    {{ item.category }}
                  </q-item-label>

                </q-item-section>

              </q-item>

            </q-list>

          </q-card-section>


          <q-card-actions align="right">

            <q-btn
              flat
              label="完成"
              v-close-popup
            />

          </q-card-actions>

        </q-card>

      </q-dialog>

    </div>

  </q-page>
</template>


<script setup>

import {
  ref,
  computed,
  watch
} from 'vue'


/* ==================================================
   STORAGE
================================================== */

const STORAGE_KEY =
  'hospital-bag-ready-check'


/* ==================================================
   DEFAULT ITEMS
================================================== */

const defaultItems = [

  {
    id: 'id',
    name: '健保卡',
    icon: '💳',
    category: '卡',
    ready: false
  },

  {
    id: 'identity',
    name: '身分證',
    icon: '🪪',
    category: '卡',
    ready: false
  },

  {
    id: 'medicine',
    name: '目前使用的藥物',
    icon: '💊',
    category: '藥',
    ready: false
  },

  {
    id: 'medicine-list',
    name: '藥單／用藥資料',
    icon: '📋',
    category: '藥',
    ready: false
  },

  {
    id: 'phone',
    name: '手機',
    icon: '📱',
    category: '電',
    ready: false
  },

  {
    id: 'charger',
    name: '手機充電器',
    icon: '🔌',
    category: '電',
    ready: false
  },

  {
    id: 'powerbank',
    name: '行動電源',
    icon: '🔋',
    category: '電',
    ready: false
  },

  {
    id: 'underwear',
    name: '內衣褲',
    icon: '👕',
    category: '穿',
    ready: false
  },

  {
    id: 'clothes',
    name: '換洗衣物',
    icon: '👚',
    category: '穿',
    ready: false
  },

  {
    id: 'slippers',
    name: '拖鞋',
    icon: '🩴',
    category: '穿',
    ready: false
  },

  {
    id: 'toothbrush',
    name: '牙刷',
    icon: '🪥',
    category: '用',
    ready: false
  },

  {
    id: 'toothpaste',
    name: '牙膏',
    icon: '🧴',
    category: '用',
    ready: false
  },

  {
    id: 'tissue',
    name: '衛生紙',
    icon: '🧻',
    category: '用',
    ready: false
  },

  {
    id: 'towel',
    name: '毛巾',
    icon: '🧖',
    category: '用',
    ready: false
  },

  {
    id: 'water',
    name: '水杯／水壺',
    icon: '🥤',
    category: '用',
    ready: false
  }

]


/* ==================================================
   LOAD
================================================== */

function loadItems () {

  try {

    const saved =
      localStorage.getItem(STORAGE_KEY)

    if (!saved) {
      return defaultItems
    }

    const savedItems =
      JSON.parse(saved)

    return defaultItems.map(item => {

      const savedItem =
        savedItems.find(
          x => x.id === item.id
        )

      return savedItem
        ? {
            ...item,
            ready: savedItem.ready
          }
        : item

    })

  } catch (error) {

    console.warn(
      'Load hospital bag failed:',
      error
    )

    return defaultItems

  }

}


const items = ref(loadItems())


/* ==================================================
   SAVE
================================================== */

watch(
  items,
  value => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(value)
    )

  },
  {
    deep: true
  }
)


/* ==================================================
   NORMAL READY CHECK
================================================== */

const missingItems = computed(() => {

  return items.value.filter(
    item => !item.ready
  )

})


const allReady = computed(() => {

  return missingItems.value.length === 0

})


/* ==================================================
   🚨 EMERGENCY ITEMS
================================================== */

/*
  急診模式故意只有 4 樣

  卡 → 健保卡
  藥 → 目前藥物
  電 → 手機
  電 → 充電器
*/

const emergencyIds = [
  'id',
  'medicine',
  'phone',
  'charger'
]


const emergencyItems = computed(() => {

  return items.value.filter(
    item =>
      emergencyIds.includes(item.id)
  )

})


const emergencyMissing = computed(() => {

  return emergencyItems.value.filter(
    item => !item.ready
  )

})


const emergencyReady = computed(() => {

  return emergencyMissing.value.length === 0

})


/* ==================================================
   DIALOG
================================================== */

const emergencyMode =
  ref(false)

const showMissing =
  ref(false)

const showAll =
  ref(false)


/* ==================================================
   TOGGLE
================================================== */

function toggleItem (item) {

  item.ready = !item.ready

}


/* ==================================================
   RESET
================================================== */

function resetAll () {

  items.value.forEach(item => {

    item.ready = false

  })

}


/* ==================================================
   GO HOSPITAL
================================================== */

function goHospital () {

  /*
    這裡故意不做複雜流程。

    未來可以接：
    - Uber
    - 家人電話
    - 醫院地址
    - Google Maps
    - 急診 Recent Page
  */

  emergencyMode.value = false

}

</script>


<style scoped>

/* ==================================================
   PAGE
================================================== */

.ready-page {

  max-width: 650px;

  margin: 0 auto;

  padding:
    24px
    16px
    40px;

}


/* ==================================================
   🚨 EMERGENCY
================================================== */

.emergency-card {

  border-radius: 22px;

  cursor: pointer;

  background:
    rgba(255, 0, 0, 0.08);

  border:
    2px solid
    rgba(255, 0, 0, 0.25);

}


.emergency-icon {

  font-size: 56px;

  line-height: 1;

  margin-bottom: 10px;

}


/* ==================================================
   STATUS
================================================== */

.status-card {

  border-radius: 22px;

  cursor: pointer;

}


.status-card.not-ready {

  border-width: 2px;

}


.status-card.ready {

  border-width: 2px;

}


.status-icon {

  font-size: 54px;

  line-height: 1;

  margin-bottom: 10px;

}


/* ==================================================
   MEMORY
================================================== */

.memory-card {

  border-radius: 18px;

}


.memory-text {

  display: flex;

  gap: 8px;

}


.memory-text span {

  flex: 1;

  text-align: center;

  padding: 12px 4px;

  border-radius: 12px;

  background: #f5f5f5;

  font-size: 20px;

  font-weight: 700;

}


/* ==================================================
   MISSING
================================================== */

.missing-card {

  border-radius: 18px;

}


.all-ready-card {

  border-radius: 18px;

}


/* ==================================================
   🚨 EMERGENCY DIALOG
================================================== */

.emergency-dialog {

  width: 100%;

  max-width: 500px;

  border-radius: 24px;

}


.emergency-big-icon {

  font-size: 64px;

  line-height: 1;

}


.emergency-rule {

  border-radius: 16px;

}


.emergency-item {

  display: flex;

  align-items: center;

  gap: 16px;

  padding: 16px;

  margin-bottom: 10px;

  border-radius: 16px;

  background: #f5f5f5;

  cursor: pointer;

}


.emergency-item.done {

  opacity: 0.55;

}


.emergency-item-icon {

  font-size: 32px;

}


.emergency-item-name {

  flex: 1;

  font-size: 20px;

  font-weight: 700;

}


/* ==================================================
   DIALOG
================================================== */

.dialog-card {

  width: 100%;

  max-width: 500px;

  border-radius: 20px;

}


/* ==================================================
   MOBILE
================================================== */

@media (max-width: 600px) {

  .ready-page {

    padding:
      20px
      12px
      32px;

  }


  .emergency-card {

    min-height: 180px;

    display: flex;

    align-items: center;

    justify-content: center;

  }


  .status-card {

    min-height: 180px;

    display: flex;

    align-items: center;

    justify-content: center;

  }


  .memory-text span {

    font-size: 18px;

    padding:
      10px
      2px;

  }


  .emergency-item {

    min-height: 70px;

  }

}

</style>
```
