```vue
<template>
  <q-page padding>
    <div class="text-h4 q-mb-md">🎨 AI Design Gallery</div>

    <div class="text-subtitle2 text-grey-7 q-mb-lg">
      共 {{ imageList.length }} 張圖片
    </div>

    <!-- Gallery -->
    <div class="row q-col-gutter-md">
      <div
        v-for="(img, index) in imageList"
        :key="img"
        class="col-xs-12 col-sm-3"
      >
        <q-card
          flat
          bordered
          class="cursor-pointer hover-shadow"
          @click="openImage(index)"
        >
          <q-img
            :src="`/images/${img}`"
            :ratio="16 / 9"
            fit="cover"
            no-native-menu
          >
            <div class="absolute-bottom text-center">
              {{ getCaption(img) }}
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
        <!-- Toolbar -->
        <q-toolbar>
          <q-btn flat round dense icon="close" v-close-popup />

          <q-toolbar-title>
            {{ currentCaption }}
          </q-toolbar-title>

          <div>
            {{ currentIndex + 1 }}
            /
            {{ imageList.length }}
          </div>
        </q-toolbar>

        <!-- Image -->
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
            style="width: 100%; height: 100%; max-width: 90vw; max-height: 90vh"
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
import { ref, computed } from "vue";

const imageList = [
  "banana 對話智能修改.png",
  "banana 對話智能修改2.png",
  "banana 對話智能修改3.png",

  "一張圖 靈感延伸.png",

  "手繪線搞 轉 效果圖.png",
  "手繪線搞 轉 效果圖2.png",

  "出圖智能描述.png",

  "平面 轉 SU模型.png",

  "白模解鎖.png",

  "立面效果圖.png",

  "光影質感直接拉滿.png",
  "光影質感直接拉滿2.png",

  "全齡化智能分析.png",

  "各類分析圖.png",

  "空間流線分析圖.png",

  "風格遷移.png",
  "風格遷移2.png",

  "家具搭配分析.png",

  "細分效果圖.png",

  "設計概念封面 文化底蘊分析.png",

  "軟裝材質分析.png",

  "精細白模渲染 多種風格.png",

  "燈光氛圍微調不用返工.png",
  "燈光氛圍微調不用返工2.png",
];

const showDialog = ref(false);

const currentIndex = ref(0);

const currentImage = computed(() => {
  return `/images/${imageList[currentIndex.value]}`;
});

const currentCaption = computed(() => {
  return getCaption(imageList[currentIndex.value]);
});

function getCaption(filename) {
  return filename.replace(".png", "");
}

function openImage(index) {
  currentIndex.value = index;
  showDialog.value = true;
}

function prevImage() {
  currentIndex.value =
    currentIndex.value === 0 ? imageList.length - 1 : currentIndex.value - 1;
}

function nextImage() {
  currentIndex.value =
    currentIndex.value === imageList.length - 1 ? 0 : currentIndex.value + 1;
}
</script>

<style scoped>
.hover-shadow {
  transition: all 0.2s ease;
}

.hover-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}
</style>
```
