<template>
  <q-page class="q-pa-md bg-grey-2">
    <h6 style="text-align: center;">suao 之後再改結構 \ 現在先改內容 用看看</h6>
    <div class="row justify-center">
      <div class="col-12 col-md-8">
        <!-- Header -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h5">🛠️ 工作 To-Do List</div>

            <div class="text-caption text-grey">
              {{ completedCount }} / {{ totalCount }} 已完成
            </div>

            <q-linear-progress
              class="q-mt-sm"
              :value="progress"
              rounded
              size="10px"
              color="positive"
            />
          </q-card-section>
        </q-card>

        <!-- Loading -->
        <div v-if="loading" class="row justify-center q-pa-lg">
          <q-spinner color="primary" size="50px" />
        </div>

        <!-- Todo Categories -->

        <q-card
          v-for="(category, categoryIndex) in categories"
          :key="category.id"
          class="q-mb-md"
        >
          <q-card-section class="row items-center">
            <div class="text-h6 col">
              {{ category.icon }} {{ category.name }}
            </div>

            <q-btn
              flat
              round
              dense
              icon="keyboard_arrow_up"
              :disable="categoryIndex === 0"
              @click="moveCategory(category, 'up')"
            >
              <q-tooltip> 往上移動 </q-tooltip>
            </q-btn>

            <q-btn
              flat
              round
              dense
              icon="keyboard_arrow_down"
              :disable="categoryIndex === categories.length - 1"
              @click="moveCategory(category, 'down')"
            >
              <q-tooltip> 往下移動 </q-tooltip>
            </q-btn>
          </q-card-section>
          <q-separator />

          <q-list separator>
            <q-item
              v-for="task in category.tasks"
              :key="task.id"
              clickable
              @click="toggleTask(category, task)"
            >
              <q-item-section avatar>
                <q-checkbox
                  :model-value="task.done"
                  @click.stop
                  @update:model-value="toggleTask(category, task)"
                />
              </q-item-section>

              <q-item-section>
                <q-item-label
                  :class="{
                    'text-strike text-grey': task.done,
                    'text-weight-bold': task.priority,
                  }"
                >
                  {{ task.title }}
                </q-item-label>

                <q-item-label v-if="task.note" caption>
                  {{ task.note }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge v-if="task.priority" color="red" label="優先" />

                <q-icon
                  v-if="task.done"
                  name="check_circle"
                  color="positive"
                  size="sm"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>

        <!-- Add Task -->
        <q-card>
          <q-card-section>
            <div class="text-h6">➕ 新增工作</div>

            <div class="row q-col-gutter-sm q-mt-sm">
              <div class="col-12 col-sm-7">
                <q-input
                  v-model="newTask"
                  outlined
                  label="輸入工作內容"
                  @keyup.enter="addTask"
                />
              </div>

              <div class="col-12 col-sm-3">
                <q-select
                  v-model="selectedCategory"
                  outlined
                  label="分類"
                  :options="categoryOptions"
                  emit-value
                  map-options
                />
              </div>

              <div class="col-12 col-sm-2">
                <q-btn
                  color="primary"
                  label="新增"
                  class="full-width"
                  size="lg"
                  :loading="addingTask"
                  @click="addTask"
                />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";

import { onValue, push, ref as dbRef, update } from "firebase/database";

import { useQuasar } from "quasar";
import { db } from "boot/firebase_todolist";

const $q = useQuasar();

const loading = ref(true);
const addingTask = ref(false);

const newTask = ref("");

/*
  categories 結構：

  [
    {
      id: 'firebase-category-id',
      name: '建立／工具',
      icon: '🧪',
      tasks: [
        {
          id: 'firebase-task-id',
          title: '建立化學箱',
          done: false
        }
      ]
    }
  ]
*/
const categories = ref([]);

const selectedCategory = ref(null);

let unsubscribe = null;

/*
|--------------------------------------------------------------------------
| Firebase Reference
|--------------------------------------------------------------------------
*/

const categoriesRef = dbRef(db, "todoCategories");

/*
|--------------------------------------------------------------------------
| 即時抓取 Firebase Realtime Database
|--------------------------------------------------------------------------
*/

// joey ---
const loadCategories = () => {
  unsubscribe = onValue(
    categoriesRef,
    (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        categories.value = [];
        loading.value = false;
        return;
      }

      categories.value = Object.entries(data)
        .map(([categoryId, category]) => {
          const tasks = category.tasks
            ? Object.entries(category.tasks).map(([taskId, task]) => ({
                id: taskId,
                title: task.title || "",
                note: task.note || "",
                done: task.done || false,
                priority: task.priority || false,
              }))
            : [];

          return {
            id: categoryId,
            name: category.name || "",
            icon: category.icon || "📁",

            // ⭐ 從 Firebase 取得排序值
            order: category.order ?? 999,

            tasks,
          };
        })

        // ⭐⭐⭐ 這裡就是你問的 .sort()
        .sort((a, b) => a.order - b.order);

      // 如果目前沒有選擇分類
      // 自動選第一個
      if (!selectedCategory.value && categories.value.length > 0) {
        selectedCategory.value = categories.value[0].id;
      }

      loading.value = false;
    },

    (error) => {
      console.error("Firebase load error:", error);

      $q.notify({
        type: "negative",
        message: "讀取 Firebase 資料失敗",
      });

      loading.value = false;
    }
  );
};
// joey ------
/*
|--------------------------------------------------------------------------
| Category Options
|--------------------------------------------------------------------------
*/

const categoryOptions = computed(() =>
  categories.value.map((category) => ({
    label: `${category.icon} ${category.name}`,
    value: category.id,
  }))
);

/*
|--------------------------------------------------------------------------
| Progress
|--------------------------------------------------------------------------
*/

const totalCount = computed(() =>
  categories.value.reduce((total, category) => total + category.tasks.length, 0)
);

const completedCount = computed(() =>
  categories.value.reduce(
    (total, category) =>
      total + category.tasks.filter((task) => task.done).length,
    0
  )
);

const progress = computed(() => {
  if (totalCount.value === 0) {
    return 0;
  }

  return completedCount.value / totalCount.value;
});

/*
|--------------------------------------------------------------------------
| Toggle Task
|--------------------------------------------------------------------------
*/

const toggleTask = async (category, task) => {
  try {
    const newDoneValue = !task.done;

    /*
      Firebase Path:
      todoCategories/
        {categoryId}/
          tasks/
            {taskId}/
              done
    */

    const taskRef = dbRef(db, `todoCategories/${category.id}/tasks/${task.id}`);

    await update(taskRef, {
      done: newDoneValue,
    });
  } catch (error) {
    console.error("Update task error:", error);

    $q.notify({
      type: "negative",
      message: "更新工作狀態失敗",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Add Task
|--------------------------------------------------------------------------
*/

const addTask = async () => {
  if (!newTask.value.trim()) {
    return;
  }

  if (!selectedCategory.value) {
    $q.notify({
      type: "warning",
      message: "請先選擇分類",
    });

    return;
  }

  try {
    addingTask.value = true;

    /*
      Firebase Path:
      todoCategories/
        {categoryId}/
          tasks/
    */

    const tasksRef = dbRef(
      db,
      `todoCategories/${selectedCategory.value}/tasks`
    );

    await push(tasksRef, {
      title: newTask.value.trim(),
      note: "",
      done: false,
      priority: false,
      createdAt: Date.now(),
    });

    newTask.value = "";

    $q.notify({
      type: "positive",
      message: "工作已新增",
    });
  } catch (error) {
    console.error("Add task error:", error);

    $q.notify({
      type: "negative",
      message: "新增工作失敗",
    });
  } finally {
    addingTask.value = false;
  }
};

const moveCategory = async (category, direction) => {
  const currentIndex = categories.value.findIndex(
    (item) => item.id === category.id
  );

  const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

  if (
    currentIndex === -1 ||
    targetIndex < 0 ||
    targetIndex >= categories.value.length
  ) {
    return;
  }

  const targetCategory = categories.value[targetIndex];

  try {
    const updates = {
      [`todoCategories/${category.id}/order`]: targetCategory.order,

      [`todoCategories/${targetCategory.id}/order`]: category.order,
    };

    await update(dbRef(db), updates);

    $q.notify({
      type: "positive",
      message: "分類排序已更新",
    });
  } catch (error) {
    console.error("Category order update error:", error);

    $q.notify({
      type: "negative",
      message: "分類排序更新失敗",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Lifecycle
|--------------------------------------------------------------------------
*/

onMounted(() => {
  loadCategories();
});

onUnmounted(() => {
  /*
    Firebase onValue 會回傳 unsubscribe function
  */
  if (unsubscribe) {
    unsubscribe();
  }
});
</script>
