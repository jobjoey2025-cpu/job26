```vue
<template>
  <q-page padding>

    <!-- Header -->
    <div class="text-h4 q-mb-md">
      🎨 AI Design Gallery
    </div>

    <div class="text-subtitle2 text-grey-7 q-mb-md">
      共 {{ filteredImages.length }} 張圖片
    </div>

    <!-- Category Tabs -->
    <q-tabs
      v-model="category"
      dense
      inline-label
      class="text-primary q-mb-md"
      active-color="primary"
      indicator-color="primary"
    >
      <q-tab name="ALL" label="全部" />
      <q-tab name="Concept" label="Concept" />
      <q-tab name="Analysis" label="Analysis" />
      <q-tab name="Render" label="Render" />
      <q-tab name="AI Edit" label="AI Edit" />
      <q-tab name="BIM" label="BIM" />
    </q-tabs>

    <q-separator class="q-mb-md" />

    <!-- Gallery -->
    <div class="row q-col-gutter-md">

      <div
        v-for="(img, index) in filteredImages"
        :key="img.file"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card
          flat
          bordered
          class="cursor-pointer hover-shadow"
          @click="openImage(index)"
        >

          <q-img
            :src="`/images/${img.file}`"
            :ratio="16/9"
            fit="cover"
            no-native-menu
          >

            <div class="absolute-bottom">

              <div class="text-subtitle2">
                {{ getCaption(img.file) }}
              </div>

              <q-chip
                dense
                color="primary"
                text-color="white"
                size="sm"
              >
                {{ img.category }}
              </q-chip>

            </div>

          </q-img>

        </q-card>
      </div>

    </div>

    <!-- Lightbox -->
    <q-dialog
      v-model="showDialog"
      maximized
      transition-show="fade"
      transition-hide="fade"
    >
      <q-card class="bg-black text-white">

        <q-toolbar>

          <q-btn
            flat
            round
            dense
            icon="close"
            v-close-popup
          />

          <q-toolbar-title>
            {{ currentCaption }}
          </q-toolbar-title>

          <div>
            {{ currentIndex + 1 }}
            /
            {{ filteredImages.length }}
          </div>

        </q-toolbar>

        <q-card-section
          class="row flex-center"
          style="height: calc(100vh - 64px)"
        >

          <!-- Previous -->
          <q-btn
            flat
            round
            icon="chevron_left"
            size="xl"
            class="absolute-left z-top"
            @click="prevImage"
          />

          <q-img
            :src="currentImage"
            fit="contain"
            style="
              width: 100%;
              height: 100%;
              max-width: 90vw;
              max-height: 90vh;
            "
            no-spinner
          />

          <!-- Next -->
          <q-btn
            flat
            round
            icon="chevron_right"
            size="xl"
            class="absolute-right z-top"
            @click="nextImage"
          />

        </q-card-section>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'

const category = ref('ALL')
const showDialog = ref(false)
const currentIndex = ref(0)

const imageList = [

  // AI Edit
  {
    file: 'banana 對話智能修改.png',
    category: 'AI Edit'
  },
  {
    file: 'banana 對話智能修改2.png',
    category: 'AI Edit'
  },
  {
    file: 'banana 對話智能修改3.png',
    category: 'AI Edit'
  },

  // Concept
  {
    file: '一張圖 靈感延伸.png',
    category: 'Concept'
  },
  {
    file: '手繪線搞 轉 效果圖.png',
    category: 'Concept'
  },
  {
    file: '手繪線搞 轉 效果圖2.png',
    category: 'Concept'
  },
  {
    file: '出圖智能描述.png',
    category: 'Concept'
  },
  {
    file: '設計概念封面 文化底蘊分析.png',
    category: 'Concept'
  },
  {
    file: '風格遷移.png',
    category: 'Concept'
  },
  {
    file: '風格遷移2.png',
    category: 'Concept'
  },

  // BIM
  {
    file: '平面 轉 SU模型.png',
    category: 'BIM'
  },

  // Analysis
  {
    file: '全齡化智能分析.png',
    category: 'Analysis'
  },
  {
    file: '各類分析圖.png',
    category: 'Analysis'
  },
  {
    file: '空間流線分析圖.png',
    category: 'Analysis'
  },
  {
    file: '家具搭配分析.png',
    category: 'Analysis'
  },
  {
    file: '軟裝材質分析.png',
    category: 'Analysis'
  },

  // Render
  {
    file: '白模解鎖.png',
    category: 'Render'
  },
  {
    file: '立面效果圖.png',
    category: 'Render'
  },
  {
    file: '細分效果圖.png',
    category: 'Render'
  },
  {
    file: '精細白模渲染 多種風格.png',
    category: 'Render'
  },
  {
    file: '光影質感直接拉滿.png',
    category: 'Render'
  },
  {
    file: '光影質感直接拉滿2.png',
    category: 'Render'
  },
  {
    file: '燈光氛圍微調不用返工.png',
    category: 'Render'
  },
  {
    file: '燈光氛圍微調不用返工2.png',
    category: 'Render'
  }

]

const filteredImages = computed(() => {
  if (category.value === 'ALL') {
    return imageList
  }

  return imageList.filter(
    img => img.category === category.value
  )
})

const currentImage = computed(() => {
  if (!filteredImages.value.length) return ''

  return `/images/${
    filteredImages.value[currentIndex.value].file
  }`
})

const currentCaption = computed(() => {
  if (!filteredImages.value.length) return ''

  return getCaption(
    filteredImages.value[currentIndex.value].file
  )
})

function getCaption(filename) {
  return filename.replace('.png', '')
}

function openImage(index) {
  currentIndex.value = index
  showDialog.value = true
}

function prevImage() {
  currentIndex.value =
    currentIndex.value === 0
      ? filteredImages.value.length - 1
      : currentIndex.value - 1
}

function nextImage() {
  currentIndex.value =
    currentIndex.value === filteredImages.value.length - 1
      ? 0
      : currentIndex.value + 1
}
</script>

<style scoped>
.hover-shadow {
  transition: all 0.2s ease;
}

.hover-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.2);
}
</style>
```
