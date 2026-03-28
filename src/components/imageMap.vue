<template>
  <q-page class="q-pa-xl" >
    <div class="text-h5 q-mb-md" style="text-align: center">
      車燈 結構互動圖
    </div>
    <div class="row justify-center">
      <!-- 🔥 圖片容器 -->
      <div class="img-wrapper">
        <!-- 主圖 -->
        <img src="/img/G1200light.png" class="main-img" />

        <!-- 🔥 Hotspots -->
        <div
          v-for="item in hotspots"
          :key="item.id"
          class="hotspot"
          :style="{
            left: item.x + 'px',
            top: item.y + 'px',
          }"
          @mouseenter="hover(item)"
          @mouseleave="leave"
          @click="open(item)"
        >
          <div class="pulse"></div>
        </div>

        <!-- 🔥 Tooltip -->
        <div
          v-if="active"
          class="tooltip-box"
          :style="{
            left: active.x + 20 + 'px',
            top: active.y + 20 + 'px',
          }"
        >
          <div class="text-bold">{{ active.title }}</div>
          <div class="text-caption">{{ active.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 🔥 點擊詳細 -->
    <q-dialog v-model="dialog">
      <q-card style="width: 400px">
        <q-card-section>
          <div class="text-h6">{{ selected?.title }}</div>
          <div class="q-mt-sm">{{ selected?.desc }}</div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="關閉" v-close-popup />
          <q-btn
            color="primary"
            label="查看細節"
            :href="selected?.link"
            target="_blank"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

/* 🔥 hotspot 資料（可擴充） */
const hotspots = [
  {
    id: 1,
    x: 30,
    y: 30,
    title: "萬用扣具",
    desc: "扣具設計 / snap fit",
    link: "/heat_sink.html#buckle",
  },
  {
    id: 2,
    x: 120,
    y: 120,
    title: "造形設計",
    desc: "ID 設計",
    link: "/heat_sink.html#idd",
  },
  {
    id: 3,
    x: 200,
    y: 40,
    title: "散熱管理",
    desc: "熱模擬 / CFD",
    link: "/heat_sink.html#heat_sink",
  },
  {
    id: 4,
    x: 250,
    y: 200,
    title: "光形設計",
    desc: "光學設計",
    link: "/heat_sink.html#light",
  },
  {
    id: 5,
    x: 50,
    y: 250,
    title: "防水設計",
    desc: "IP 等級",
    link: "/heat_sink.html#waterproof",
  },
];

/* 🔥 tooltip */
const active = ref(null);

function hover(item) {
  active.value = item;
}

function leave() {
  active.value = null;
}

/* 🔥 dialog */
const dialog = ref(false);
const selected = ref(null);

function open(item) {
  selected.value = item;
  dialog.value = true;
}
</script>

<style scoped>
.img-wrapper {
  position: relative;
  width: 400px;
}

/* 主圖 */
.main-img {
  width: 100%;
  display: block;
  border-radius: 12px;
}

/* 🔥 hotspot */
.hotspot {
  position: absolute;
  width: 16px;
  height: 16px;
  cursor: pointer;
}

/* 發光動畫 */
.pulse {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: red;
  animation: pulse 1s infinite;
}

/* tooltip */
.tooltip-box {
  position: absolute;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  pointer-events: none;
}

/* 動畫 */
@keyframes pulse {
  0% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(0.8);
    opacity: 0;
  }
}
</style>
