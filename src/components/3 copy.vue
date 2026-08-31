```vue
<template>
  <div>
    <header class="q-mb-lg">
      <div class="row items-start justify-between q-col-gutter-md">
        <div class="col-12 col-sm-auto">
          <div class="text-overline text-primary text-weight-bold">
            Execution System
          </div>

          <p class="text-body2 text-grey-7 q-my-none">
            縮小範圍、縮小實驗、縮小差距，讓下一步清楚可執行。
          </p>
        </div>

        <!-- 選擇區域 -->
        <div class="col-12 col-sm-auto">
          <q-btn
            icon="grid_view"
            label="選擇區域"
            color="primary"
            unelevated
            @click="showSelector = true"
          />
        </div>

        <div class="col-12 col-sm-auto row q-gutter-sm">
          <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="快速筆記"
            @click="$emit('open-notes')"
          />

          <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="3☏ FCards"
            :to="{ name: 'AreaManager' }"
          />

          <q-btn
            color="primary"
            unelevated
            icon="sticky_note_2"
            label="4☏ ToDo"
            :to="{ name: 'Firedb_Todolist' }"
          />

          <q-btn label="biz 排序" color="primary" @click="alert = true" />

          <q-btn
            color="primary"
            outline
            icon-right="open_in_new"
            label="2☏ Gskld"
            href="https://docs.google.com/spreadsheets/d/1EzmKCAbNmE5hW3eHsr2sKJAFDMcuJJbN4dEv3vWekEk/edit?gid=56163573#gid=56163573"
            target="_blank"
            rel="noopener noreferrer"
          />
        </div>
      </div>
    </header>

    <!-- Dialog -->
    <recentSelectDialog
      v-model="showSelector"
      :categories="categories"
      :selected="selectedCategory"
      @select="onSelectCategory"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import recentSelectDialog from "../components/recentSystem/recentSelectDialog.vue";

defineEmits(["open-notes"]);

const alert = ref(false);
const expanded = ref(false);

/**
 * Dialog 開關
 */
const showSelector = ref(false);

/**
 * 目前選擇的區域
 */
const selectedCategory = ref("All");

/**
 * 區域資料
 * Dialog 直接從這裡取得
 */
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
  {
    name: "doc",
    icon: "document_scanner",
  },
];

/**
 * 選擇區域
 */
function onSelectCategory(category) {
  selectedCategory.value = category.name;

  showSelector.value = false;
}
</script>
```
