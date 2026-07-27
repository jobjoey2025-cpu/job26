<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <h4>🏠 2F 空間 Area 管理</h4>
    <!-- Area List -->
    <div class="row q-col-gutter-md">
      <div v-for="area in areas" :key="area.id" class="col-12 col-md-4">
        <q-card bordered>
          <!-- Header -->
          <p>dummy</p>
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
