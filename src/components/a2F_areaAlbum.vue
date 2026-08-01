<template>
  <q-page class="bg-grey-2 q-pa-md">
    <!-- Header -->
    <q-card flat bordered class="q-mb-md">
      <q-card-section
        class="bg-primary text-white row items-center justify-between"
      >
        <div>
          <div class="text-h5">🏠 2F 空間 Area 管理</div>
          <div class="text-caption">Living Lab / Construction MVP</div>
        </div>

        <!-- <q-btn
          outline
          color="white"
          :icon="viewMode === 'card' ? 'view_list' : 'grid_view'"
          :label="viewMode === 'card' ? 'List' : 'Card'"
          @click="toggleView"
        /> -->
        <q-btn-toggle
          v-model="viewMode"
          toggle-color="white"
          color="primary"
          text-color="white"
          :options="[
            { label: 'Card', value: 'card', icon: 'grid_view' },
            { label: 'List', value: 'list', icon: 'view_list' },
          ]"
        />
      </q-card-section>
    </q-card>

    <!-- 分類 -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <q-btn
        icon="grid_view"
        label="選擇區域"
        color="primary"
        @click="showSelector = true"
      />
      <div v-for="category in categories" :key="category.name">
        <q-btn
          rounded
          outline
          :color="selectedCategory === category.name ? 'primary' : 'grey-7'"
          :icon="category.icon"
          :label="category.name"
          @click="selectedCategory = category.name"
        />
      </div>
    </div>

    <!-- Area List -->
    <!-- Card View -->
    <div v-if="viewMode === 'card'" class="row q-col-gutter-md">
      <div class="row q-col-gutter-md">
        <div
          v-for="area in filteredItems"
          :key="area.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-card bordered>
            <q-card-section>
              <div class="row justify-between items-center">
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

                <q-btn
                  flat
                  round
                  icon="edit"
                  color="primary"
                  @click="openEdit(area)"
                />

                <q-avatar color="grey-3" size="56px">
                  <q-icon :name="area.icon" size="30px" />
                </q-avatar>
              </div>
            </q-card-section>
            <q-separator />

            <!-- Photo -->
            <q-card-section>
              <div class="text-subtitle2 q-mb-sm">📷 Photo</div>
              <div class="text-caption text-grey"></div>
              <div class="row q-gutter-sm">
                <!-- <q-img
                v-for="img in area.photos"
                :key="img"
                :src="img"
                style="width: 90px; height: 70px; border-radius: 8px"
              /> -->

                <q-img
                  v-for="img in area.photos"
                  :key="img"
                  :src="img"
                  style="
                    width: 90px;
                    height: 70px;
                    border-radius: 8px;
                    cursor: pointer;
                  "
                  @click="showImage(img)"
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
              <div class="text-subtitle2">🐞 Issue - {{ area.tag }}</div>

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

            <!-- <q-card-section>
            <div class="text-caption text-grey-7">ID：{{ area.id }}</div>
          </q-card-section> -->
          </q-card>
        </div>
      </div>
    </div>

    <!-- jjj---- -->
    <!-- List View -->
    <q-list v-else bordered separator class="bg-white rounded-borders">
      <!-- <q-item v-for="area in areas" :key="area.id"> -->
      <q-item v-for="area in filteredItems" :key="area.id">
        <q-item-section avatar>
          <q-img
            v-if="area.photos?.length"
            :src="area.photos[0]"
            style="width: 60px; height: 60px; border-radius: 6px"
            @click="showImage(area.photos[0])"
          />
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold">
            {{ area.name }}
          </q-item-label>

          <q-item-label caption>
            {{ area.photos?.length || 0 }} 張照片
          </q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat round icon="add_a_photo" @click="uploadPhoto(area)" />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- 無資料 -->
    <div
      v-if="filteredItems.length === 0"
      class="text-center text-grey q-mt-xl"
    >
      沒有符合的 Area
    </div>
    <!-- joey ---- -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab color="primary" icon="add" @click="addDialog = true" />
    </q-page-sticky>
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
        <q-input class="q-mt-md" v-model="editArea.icon" label="Icon" />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" v-close-popup />

        <q-btn color="primary" label="儲存" @click="saveArea" />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Image Preview -->
  <q-dialog v-model="previewDialog" maximized>
    <q-card class="bg-black flex flex-center">
      <q-btn
        icon="close"
        flat
        round
        dense
        color="white"
        class="absolute-top-right q-ma-md"
        v-close-popup
      />

      <q-img
        :src="previewImage"
        fit="contain"
        style="width: 100%; height: 100vh"
      />
    </q-card>
  </q-dialog>
  <q-dialog v-model="showSelector">
    <!-- <GridSelector @select="onSelectCategory" /> -->
    <a2F_btnLink @select="onSelectCategory" />
  </q-dialog>
  <!-- joey ---- -->
  <q-dialog v-model="addDialog">
    <q-card style="min-width: 400px">
      <q-card-section>
        <div class="text-h6">新增 Area</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="newArea.name" label="Area 名稱" outlined />
        <q-input v-model="newArea.tag" label="分類(Tag)" outlined />

        <q-input v-model="newArea.photo" label="第一張照片 URL" outlined />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="取消" v-close-popup />

        <q-btn color="primary" label="新增" @click="createArea" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, update, push } from "firebase/database"; // joey -----
import { db } from "boot/firebase_album";

import a2F_btnLink from "components/a2F_btnLink.vue";
// 或依你的實際路徑
// import GridSelector from "./GridSelector.vue";
const showSelector = ref(false);

// joey----
const viewMode = ref("card");
function toggleView() {
  viewMode.value = viewMode.value === "card" ? "list" : "card";
}
// joey----

const previewDialog = ref(false);
const previewImage = ref("");

const showImage = (img) => {
  previewImage.value = img;
  previewDialog.value = true;
};
// joey----

// 分類
const selectedCategory = ref("All");

// joey modify ----- Tabs 過濾項目
const categories = [
  {
    name: "All",
    icon: "apps",
  },
  {
    name: "living",
    icon: "home",
  },
  {
    name: "bath",
    icon: "shower",
  },
  {
    name: "tent",
    icon: "holiday_village",
  },
  {
    name: "car",
    icon: "no_crash",
  },
];

// Firebase Areas
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

    // window.alert("a=" + areas.photos);
  });
};

// 更新 Todo
const updateTodo = async (areaId, index, value) => {
  const area = areas.value.find((a) => a.id == areaId);

  if (!area) return;

  area.todo[index].done = value;

  // await update(dbRef(db, `areas/${areaId}`), {
  //   todo: area.todo,
  // });
  // joey -----
  // 欄位都要寫 ,不要送 undefined
  await update(dbRef(db, `areas/${area.id}`), {
    name: area.name,
    tag: area.tag,
    cost: area.cost ?? 0,
    photos: area.photos ?? [],
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

// 分類過濾
const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return areas.value;
  }

  return areas.value.filter((area) => area.tag === selectedCategory.value);
});

function onSelectCategory(tag) {
  selectedCategory.value = tag;
  showSelector.value = false;
}

// joey------
const addDialog = ref(false);

const newArea = ref({
  name: "",
  tag: "",
  photo: "",
});

function createArea() {
  if (!newArea.value.name) return;

  const areaRef = dbRef(db, "areas");

  push(areaRef, {
    name: newArea.value.name,
    tag: newArea.value.tag || "",
    photos: newArea.value.photo ? [newArea.value.photo] : [],

    createdAt: Date.now(),
  });

  newArea.value = {
    name: "",
    tag: "",
    photo: "",
  };

  addDialog.value = false;
}
</script>

<style scoped>
.q-card {
  border-radius: 16px;
  transition: all 0.25s;
}

.q-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}
</style>
