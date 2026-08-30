<template>
  <q-dialog
    :model-value="modelValue"
    maximized
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <q-card class="bg-black flex flex-center">
      <!-- 關閉 -->
      <q-btn
        icon="close"
        flat
        round
        dense
        color="white"
        class="absolute-top-right preview-close"
        aria-label="關閉預覽"
        @click="$emit('update:modelValue', false)"
      />

      <!-- 上一張 -->
      <q-btn
        v-if="photos.length > 1"
        icon="chevron_left"
        flat
        round
        size="lg"
        color="white"
        class="absolute-left preview-nav"
        aria-label="上一張"
        :disable="currentIndex === 0"
        @click="prevImage"
      />

      <!-- 照片 -->
      <q-img
        :src="currentImage"
        fit="contain"
        class="full-width preview-image"
      />

      <!-- 下一張 -->
      <q-btn
        v-if="photos.length > 1"
        icon="chevron_right"
        flat
        round
        size="lg"
        color="white"
        class="absolute-right preview-nav"
        aria-label="下一張"
        :disable="currentIndex === photos.length - 1"
        @click="nextImage"
      />

      <!-- 照片張數 -->
      <div v-if="photos.length > 1" class="preview-counter text-white">
        {{ currentIndex + 1 }} / {{ photos.length }}
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  // 所有照片
  photos: {
    type: Array,
    default: () => [],
  },

  // 開啟時指定顯示哪一張
  image: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);

// 目前照片 index
const currentIndex = ref(0);

// 目前照片
const currentImage = computed(() => {
  return props.photos[currentIndex.value] || props.image || "";
});

// ==============================
// 開啟預覽時，定位到被點擊的照片
// ==============================

watch(
  () => props.modelValue,
  (visible) => {
    if (!visible) return;

    const index = props.photos.indexOf(props.image);

    if (index >= 0) {
      currentIndex.value = index;
    } else {
      currentIndex.value = 0;
    }
  }
);

// ==============================
// 上一張
// ==============================

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

// ==============================
// 下一張
// ==============================

function nextImage() {
  if (currentIndex.value < props.photos.length - 1) {
    currentIndex.value++;
  }
}

// ==============================
// 鍵盤 ← →
// ==============================

function handleKeydown(event) {
  if (!props.modelValue) return;

  if (event.key === "ArrowLeft") {
    prevImage();
  }

  if (event.key === "ArrowRight") {
    nextImage();
  }

  if (event.key === "Escape") {
    // QDialog 自己會處理 Escape
  }
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<style scoped>
.preview-close {
  z-index: 10;
  top: 12px;
  right: 12px;
}

.preview-nav {
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
}

.preview-image {
  height: 100vh;
}

/* 1 / 5 */
.preview-counter {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);

  padding: 5px 12px;

  background: rgba(0, 0, 0, 0.55);
  border-radius: 12px;

  font-size: 14px;
}
</style>
