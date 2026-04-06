<template>
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
      <!-- 🔥 自訂 hyperlink 欄位 -->

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
          <!-- 🔥 自訂 hyperlink 欄位 -->
          <template v-slot:body-cell-hyperlink="props">
            <q-td :props="props">
              <a
                :href="formatLink(props.row.hyperlink)"
                target="_blank"
                style="color: #1976d2; text-decoration: underline"
              >
                <!-- 前往連結 {{ props.row.hyperlink }} -->
                前往連結
              </a>
            </q-td>
          </template>
        </q-input>
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
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    hyperlink: "https://www.google.com",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    hyperlink: "https://www.google2.com",
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
