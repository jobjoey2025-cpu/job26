<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="row justify-center">
      <div class="col-12 col-md-8">

        <!-- Header -->
        <q-card class="q-mb-md">
          <q-card-section>
            <div class="text-h5">
              🛠️ 工作 To-Do List
            </div>

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

        <!-- Todo Categories -->
        <q-card
          v-for="category in categories"
          :key="category.name"
          class="q-mb-md"
        >
          <q-card-section>
            <div class="text-h6">
              {{ category.icon }} {{ category.name }}
            </div>
          </q-card-section>

          <q-separator />

          <q-list separator>

            <q-item
              v-for="task in category.tasks"
              :key="task.id"
              clickable
              @click="task.done = !task.done"
            >
              <q-item-section avatar>
                <q-checkbox
                  v-model="task.done"
                  @click.stop
                />
              </q-item-section>

              <q-item-section>
                <q-item-label
                  :class="{
                    'text-strike text-grey': task.done,
                    'text-weight-bold': task.priority
                  }"
                >
                  {{ task.title }}
                </q-item-label>

                <q-item-label
                  v-if="task.note"
                  caption
                >
                  {{ task.note }}
                </q-item-label>
              </q-item-section>

              <q-item-section side>
                <q-badge
                  v-if="task.priority"
                  color="red"
                  label="優先"
                />

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
            <div class="text-h6">
              ➕ 新增工作
            </div>

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
                />
              </div>

              <div class="col-12 col-sm-2">
                <q-btn
                  color="primary"
                  label="新增"
                  class="full-width"
                  size="lg"
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
import { ref, computed } from 'vue'

const newTask = ref('')
const selectedCategory = ref('建立／工具')

const categories = ref([
  {
    name: '建立／工具',
    icon: '🧪',
    tasks: [
      {
        id: 1,
        title: '建立化學箱',
        done: false
      },
      {
        id: 2,
        title: 'Test 矽酸板工具',
        note: '電鑽 × 2',
        done: false,
        priority: true
      },
      {
        id: 3,
        title: '牆壁高張力螺絲',
        done: false
      }
    ]
  },

  {
    name: '油漆／材料',
    icon: '🎨',
    tasks: [
      {
        id: 4,
        title: '油漆／繡變漆',
        done: false
      },
      {
        id: 5,
        title: '購買大刷子',
        done: false
      }
    ]
  },

  {
    name: '2F 修理',
    icon: '🚰',
    tasks: [
      {
        id: 6,
        title: '修理 2F 落水頭',
        note: '需要購買材料',
        done: false,
        priority: true
      }
    ]
  },

  {
    name: '材料確認',
    icon: '🔧',
    tasks: [
      {
        id: 7,
        title: '水泥',
        done: true
      },
      {
        id: 8,
        title: 'Silicon',
        done: true
      },
      {
        id: 9,
        title: '鐵鎚',
        done: true
      },
      {
        id: 10,
        title: '石頭',
        done: true
      },
      {
        id: 11,
        title: '刷子',
        done: true
      }
    ]
  },

  {
    name: '泥作',
    icon: '🧱',
    tasks: [
      {
        id: 12,
        title: '填平 2F 院子',
        done: false,
        priority: true
      },
      {
        id: 13,
        title: '修理地磚',
        note: '看情況決定',
        done: false
      }
    ]
  },

  {
    name: '洗滌／晾曬',
    icon: '🧺',
    tasks: [
      {
        id: 14,
        title: '地毯清洗',
        done: false
      },
      {
        id: 15,
        title: '曬棉被',
        done: false
      },
      {
        id: 16,
        title: '洗被單',
        done: false
      },
      {
        id: 17,
        title: '曬被單',
        done: false
      }
    ]
  }
])

const categoryOptions = computed(() =>
  categories.value.map(category => category.name)
)

const totalCount = computed(() =>
  categories.value.reduce(
    (total, category) => total + category.tasks.length,
    0
  )
)

const completedCount = computed(() =>
  categories.value.reduce(
    (total, category) =>
      total + category.tasks.filter(task => task.done).length,
    0
  )
)

const progress = computed(() => {
  if (totalCount.value === 0) return 0

  return completedCount.value / totalCount.value
})

const addTask = () => {
  if (!newTask.value.trim()) return

  const category = categories.value.find(
    category => category.name === selectedCategory.value
  )

  if (category) {
    category.tasks.push({
      id: Date.now(),
      title: newTask.value,
      done: false
    })
  }

  newTask.value = ''
}
</script>