<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section class="bg-primary text-white">
        <div class="text-h5">🏠 2F 空間 Area 管理</div>
        <div class="text-caption">Living Lab / Construction MVP</div>
      </q-card-section>
    </q-card>

    <!-- Area List -->
    <div class="row q-col-gutter-md">
      <div v-for="area in areas" :key="area.id" class="col-12 col-md-4">
        <q-card bordered>
          <!-- Header -->
          <q-card-section>
            <div class="row justify-between items-center">
              <div>
                <div class="text-h6">
                  {{ area.name }}
                </div>

                <q-chip
                  dense
                  :color="statusColor(area.status)"
                  text-color="white"
                >
                  {{ area.status }}
                </q-chip>
              </div>

              <q-avatar color="grey-3">
                <q-icon :name="area.icon" />
              </q-avatar>
            </div>
          </q-card-section>

          <q-separator />

          <!-- Photo -->
          <q-card-section>
            <div class="text-subtitle2 q-mb-sm">📷 Photo</div>

            <div class="row q-gutter-sm">
              <q-img
                v-for="img in area.photos"
                :key="img"
                :src="img"
                style="width: 90px; height: 70px; border-radius: 8px"
              />

              <q-btn outline icon="add_a_photo" label="新增" />
            </div>
          </q-card-section>

          <!-- Issue -->
          <q-card-section>
            <div class="text-subtitle2">🐞 Issue</div>

            <q-list separator>
              <q-item v-for="issue in area.issues" :key="issue">
                <q-item-section>
                  {{ issue }}
                </q-item-section>

                <q-item-section side>
                  <q-icon color="negative" name="warning" />
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>

          <!-- Todo -->
          <q-card-section>
            <div class="text-subtitle2">🔧 Todo</div>

            <q-checkbox
              v-for="(todo, index) in area.todo"
              :key="todo.name"
              :model-value="todo.done"
              :label="todo.name"
              @update:model-value="updateTodo(area.id, index, $event)"
            />
          </q-card-section>

          <!-- Cost -->
          <q-card-section>
            <q-banner rounded class="bg-green-1">
              💰 預估成本
              <strong>{{ area.cost }} 元</strong>
            </q-banner>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";

import { ref as dbRef, onValue, update } from "firebase/database";

import { db } from "boot/firebase_album";

const areas = ref([]);

// 載入 Firebase 資料
const loadAreas = () => {
  const areaRef = dbRef(db, "areas");

  onValue(areaRef, (snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();

      areas.value = Object.entries(data).map(([id, value]) => ({
        id,
        ...value,
      }));
    } else {
      areas.value = [];
    }
  });
};

// 更新 Todo
const updateTodo = async (areaId, index, value) => {
  const area = areas.value.find((a) => a.id == areaId);

  if (!area) return;

  area.todo[index].done = value;

  await update(dbRef(db, `areas/${areaId}`), {
    todo: area.todo,
  });
};

onMounted(() => {
  loadAreas();
});

// 狀態顏色
function statusColor(status) {
  switch (status) {
    case "整理中":
      return "orange";

    case "施工中":
      return "blue";

    case "測試中":
      return "green";

    case "待施工":
      return "grey";

    default:
      return "grey";
  }
}
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
