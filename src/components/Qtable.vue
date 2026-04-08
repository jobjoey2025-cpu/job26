<template>
  <h6 style="text-align: center">用drage 排優先 then 用 chrome text search table link BLG \\ 0406 要連 GDS ? 先觀察</h6>

  <div class="q-pa-md">
    <q-table
      grid
      grid-header
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      :filter="filter"
      hide-header
    >
      <!-- 🔍 搜尋 -->
      <template v-slot:top-right>
        <q-input
          borderless
          dense
          debounce="300"
          v-model="filter"
          placeholder="Search"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <!-- 🔥 正確位置：q-table 裡 -->
      <template v-slot:item="props">
        <div class="q-pa-sm col-12 col-sm-6 col-md-4">
          <q-card>
            <q-card-section>
              <div class="text-h6">{{ props.row.name }}</div>
              <div>Calories: {{ props.row.calories }}</div>
              <div>Fat (g): {{ props.row.fat }}</div>
              <a
                :href="formatLink(props.row.hyperlink)"
                target="_blank"
                style="color: #1976d2"
              >
                前往連結 {{ props.row.hyperlink }}
              </a>
            </q-card-section>
          </q-card>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref } from "vue";

const columns = [
  {
    name: "desc",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "hyperlink", label: "Link", field: "hyperlink" },
];

const rows = [
  {
    name: "Google",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    name: "追流行來放鬆",
    calories: 237,
    fat: 9.0,
    hyperlink: "https://joey20090710.blogspot.com/2026/04/tokyo-ape.html",
  },
  {
    name: "*沒螢幕時間",
    calories: 237,
    fat: 9.0,
    hyperlink: "https://docs.google.com/spreadsheets/d/1MpGxS3X4QMiQtAptCs1BWkiB8HvHeaXgdgbIgrfrmLk/edit?gid=498659891#gid=498659891",
  },
];

export default {
  setup() {
    return {
      filter: ref(""),
      columns,
      rows,
      formatLink,
    };
  },
};

function formatLink(url) {
  // 自動補 https://
  if (!url.startsWith("http")) {
    return "https://" + url;
  }
  return url;
}
</script>
