<template>
  <div class="q-pa-xl">
    <div class="row q-col-gutter-md">
      <!-- 左邊 -->
      <div class="col-6 col-md-6">
        <div class="text-h6 q-mb-sm">Draggable 1</div>

        <draggable
          v-model="list1"
          group="people"
          item-key="id"
          class="bg-grey-2 q-pa-sm rounded-borders"
          @change="log"
        >
          <template #item="{ element, index }">
            <q-card class="q-mb-sm q-pa-sm text-h4">
              {{ element.name }} {{ index }}
            </q-card>
          </template>
        </draggable>
      </div>

      <!-- 右邊 -->
      <div class="col-6 col-md-6">
        <div class="text-h6 q-mb-sm">Draggable 2</div>

        <draggable
          v-model="list2"
          group="people"
          item-key="id"
          class="bg-grey-2 q-pa-sm rounded-borders"
          @change="log"
        >
          <template #item="{ element, index }">
            <q-card class="q-mb-sm q-pa-sm">
              {{ element.name }} {{ index }}
            </q-card>
          </template>
        </draggable>
      </div>

      <!-- Debug 區 -->
      <div class="col-12 col-md-6">
        <q-card class="q-pa-sm">
          <div class="text-subtitle2">List 1</div>
          <pre>{{ list1 }}</pre>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="q-pa-sm">
          <div class="text-subtitle2">List 2</div>
          <pre>{{ list2 }}</pre>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import draggable from "vuedraggable";

const list1 = ref([
  { name: "逛街吃飯", id: 1 },
  { name: "花錢的氣氛", id: 2 },
  { name: "招待", id: 3 },
  { name: "百貨 / 新賣場", id: 4 },
]);

const list2 = ref([
  { name: "朋友少", id: 5 },
  { name: "Edgard", id: 6 },
  { name: "Johnson", id: 7 },
]);

const log = (evt) => {
  console.log(evt);
};
</script>
