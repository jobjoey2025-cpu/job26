<template>
  <div>
    <div class="row no-wrap justify-around q-px-md q-pt-md">
      <!-- 左容器 -->
      <div
        v-mutation="handler1"
        class="drop-target rounded-borders overflow-hidden"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent
        @drop="onDrop"
      >
        <div
          v-for="box in boxes"
          :key="box.id"
          :id="box.id"
          draggable="true"
          @dragstart="onDragStart"
          :class="['box', box.color]"
        />
      </div>

      <!-- 右容器 -->
      <div
        v-mutation="handler2"
        class="drop-target rounded-borders overflow-hidden"
        @dragenter="onDragEnter"
        @dragleave="onDragLeave"
        @dragover.prevent
        @drop="onDrop"
      />
    </div>

    <!-- Mutation 顯示 -->
    <div class="row justify-around items-start">
      <div class="col row justify-center q-pa-md">
        <div class="text-subtitle1">Mutation Info</div>
        <div v-for="(status, i) in status1" :key="i">
          {{ status }}
        </div>
      </div>

      <div class="col row justify-center q-pa-md">
        <div class="text-subtitle1">Mutation Info</div>
        <div v-for="(status, i) in status2" :key="i">
          {{ status }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

// 狀態
const status1 = ref([]);
const status2 = ref([]);

// box 資料（Vue3 建議用資料驅動）
const boxes = ref([
  { id: "box1", color: "navy" },
  { id: "box2", color: "red" },
  { id: "box3", color: "green" },
  { id: "box4", color: "orange" },
  { id: "box5", color: "navy" },
  { id: "box6", color: "red" },
  { id: "box7", color: "green" },
  { id: "box8", color: "orange" },
]);

// Mutation handlers
const handler1 = (records) => {
  status1.value = records.map(
    (record) =>
      `type: ${record.type}, added: ${record.addedNodes.length > 0}, removed: ${
        record.removedNodes.length > 0
      }`
  );
};

const handler2 = (records) => {
  status2.value = records.map(
    (record) =>
      `type: ${record.type}, added: ${record.addedNodes.length > 0}, removed: ${
        record.removedNodes.length > 0
      }`
  );
};

// Drag logic
const onDragStart = (e) => {
  e.dataTransfer.setData("text/plain", e.target.id);
};

const onDragEnter = (e) => {
  if (!e.target.draggable) {
    e.target.classList.add("drag-enter");
  }
};

const onDragLeave = (e) => {
  e.target.classList.remove("drag-enter");
};

const onDrop = (e) => {
  const draggedId = e.dataTransfer.getData("text/plain");
  const draggedEl = document.getElementById(draggedId);

  if (!draggedEl || e.target.draggable) return;

  if (draggedEl.parentNode !== e.target) {
    draggedEl.parentNode.removeChild(draggedEl);
    e.target.appendChild(draggedEl);
  }

  e.target.classList.remove("drag-enter");
};
</script>

<style scoped lang="sass">
.drop-target
  height: 400px
  width: 200px
  min-width: 200px
  background-color: gainsboro

.drag-enter
  outline: 2px dashed #333

.box
  width: 100px
  height: 100px
  float: left
  cursor: grab

@media only screen and (max-width: 500px)
  .drop-target
    height: 200px
    width: 100px

  .box
    width: 50px
    height: 50px

.box:nth-child(3)
  clear: both

.navy
  background-color: navy

.red
  background-color: firebrick

.green
  background-color: darkgreen

.orange
  background-color: orange
</style>
