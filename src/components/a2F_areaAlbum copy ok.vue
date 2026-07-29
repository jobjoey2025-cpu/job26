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
              <div>
                <q-btn
                  flat
                  round
                  icon="edit"
                  color="primary"
                  @click="openEdit(area)"
                />

                <q-avatar color="grey-3">
                  <q-icon :name="area.icon" />
                </q-avatar>
              </div>
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

              <q-btn
                outline
                icon="add_a_photo"
                label="新增"
                @click="uploadPhoto(area)"
              />
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

  <q-dialog v-model="editDialog">
    <q-card style="min-width: 450px">
      <q-card-section>
        <div class="text-h6">編輯 Area</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="editArea.name" label="Area Name" />

        <q-select
          class="q-mt-md"
          v-model="editArea.status"
          :options="statusOptions"
          label="Status"
        />

        <q-input
          class="q-mt-md"
          type="number"
          v-model.number="editArea.cost"
          label="Cost"
        />

        <!-- ------------- -->
        <q-separator class="q-my-md" />

        <div class="text-subtitle1 q-mb-sm">📷 Photos</div>

        <div
          v-for="(photo, index) in editArea.photos"
          :key="index"
          class="row items-center q-col-gutter-sm q-mb-sm"
        >
          <div class="col">
            <q-input v-model="editArea.photos[index]" label="Image URL" dense />
          </div>

          <div class="col-auto">
            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="removePhoto(index)"
            />
          </div>
        </div>

        <q-btn
          outline
          color="primary"
          icon="add"
          label="新增照片"
          @click="addPhoto"
        />

        <!-- ------------- -->

        <q-input class="q-mt-md" v-model="editArea.icon" label="Icon" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" v-close-popup />

        <q-btn color="primary" label="儲存" @click="saveArea" />
      </q-card-actions>
    </q-card>
  </q-dialog>
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
    // joey debug ----
    // console.log("a=" + editArea.value.photos);
    // window.alert("彈跳視窗想要顯示的文字");
    // window.alert("a=" + areas.photos);
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

const editDialog = ref(false);

const editArea = ref({});

const statusOptions = ["整理中", "施工中", "測試中", "待施工"];

function openEdit(area) {
  editArea.value = JSON.parse(JSON.stringify(area));

  editDialog.value = true;
}

async function saveArea() {
  await update(
    dbRef(db, `areas/${editArea.value.id}`),

    {
      name: editArea.value.name,

      status: editArea.value.status,

      cost: editArea.value.cost,

      icon: editArea.value.icon,

      photos: editArea.value.photos,
    }
  );

  editDialog.value = false;
}

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

function addPhoto() {
  if (!editArea.value.photos) {
    editArea.value.photos = [];
  }

  editArea.value.photos.push("");
}

function removePhoto(index) {
  editArea.value.photos.splice(index, 1);
}

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzJ_d-j6Z_kxKvp7RNu_93yuueqZwiFoNfzm0FI_GR0SM9Av9bwwLRz0p3ZHkEYOE-j/exec";

function uploadPhoto() {
  window.open(
    GAS_URL,
    "_blank",
    // "upload",
    "width=520,height=620"
  );
}
</script>

<style scoped>
.q-card {
  border-radius: 16px;
}
</style>
