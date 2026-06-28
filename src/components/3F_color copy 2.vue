<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Excel Color Block (Safe Merge Version)</div>

    <q-table
      flat
      bordered
      :rows="rows"
      :columns="columns"
      row-key="id"
      hide-pagination
      :rows-per-page-options="[0]"
    >
      <template
        v-for="col in columns"
        :key="col.name"
        v-slot:[`body-cell-${col.name}`]="props"
      >
        <q-td
          v-if="!isHidden(props.row.id, col.name)"
          :colspan="getSpan(props.row.id, col.name).colspan"
          :rowspan="getSpan(props.row.id, col.name).rowspan"
          :style="cellStyle(props.row.id, col.name)"
        />
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { reactive } from "vue";

const columns = ["A", "B", "C", "D", "E", "F", "G", "H"].map((c) => ({
  name: c,
  label: c,
  field: c,
}));

/**
 * ===== 原始資料 =====
 */
function makeRow(id, map) {
  return { id, ...map };
}

const rows = [
  makeRow(1, {
    A: "#D9EAD3",
    B: "#D9EAD3",
    C: "#B4A7D6",
    D: "#B4A7D6",
    E: "#8FB3BA",
    F: "#8FB3BA",
    G: "#0A6C22",
    H: "#0A6C22",
  }),
  makeRow(2, {
    A: "#D9EAD3",
    B: "#D9EAD3",
    C: "#B4A7D6",
    D: "#B4A7D6",
    E: "#8FB3BA",
    F: "#8FB3BA",
    G: "#0A6C22",
    H: "#0A6C22",
  }),
  makeRow(3, {
    A: "#D9EAD3",
    B: "#D9EAD3",
    C: "#B4A7D6",
    D: "#B4A7D6",
    E: "#8FB3BA",
    F: "#8FB3BA",
    G: "#0A6C22",
    H: "#0A6C22",
  }),
  makeRow(4, {
    A: "#E4A428",
    B: "#E4A428",
    C: "#F1E4C5",
    D: "#F1E4C5",
    E: "#F1E4C5",
    F: "#F1E4C5",
    G: "#F1E4C5",
    H: "#F1E4C5",
  }),
  makeRow(5, {
    A: "#E4A428",
    B: "#E4A428",
    C: "#F1E4C5",
    D: "#F1E4C5",
    E: "#F1E4C5",
    F: "#F1E4C5",
    G: "#F1E4C5",
    H: "#F1E4C5",
  }),
  makeRow(6, {
    A: "#E4A428",
    B: "#E4A428",
    C: "#F1E4C5",
    D: "#F1E4C5",
    E: "#F1E4C5",
    F: "#F1E4C5",
    G: "#F1E4C5",
    H: "#F1E4C5",
  }),
  makeRow(7, {
    A: "#E4A428",
    B: "#E4A428",
    C: "#F1E4C5",
    D: "#F1E4C5",
    E: "#F1E4C5",
    F: "#F1E4C5",
    G: "#F1E4C5",
    H: "#F1E4C5",
  }),
  makeRow(8, {
    A: "#C4D79D",
    B: "#C4D79D",
    C: "#C4D79D",
    D: "#C4D79D",
    E: "#C4D79D",
    F: "#C4D79D",
    G: "#C4D79D",
    H: "#C4D79D",
  }),
  makeRow(9, {
    A: "#C4D79D",
    B: "#C4D79D",
    C: "#C4D79D",
    D: "#C4D79D",
    E: "#C4D79D",
    F: "#C4D79D",
    G: "#C4D79D",
    H: "#C4D79D",
  }),
  makeRow(10, {
    A: "#C4D79D",
    B: "#C4D79D",
    C: "#C4D79D",
    D: "#C4D79D",
    E: "#C4D79D",
    F: "#C4D79D",
    G: "#C4D79D",
    H: "#C4D79D",
  }),
  makeRow(11, {
    A: "#C4D79D",
    B: "#C4D79D",
    C: "#C4D79D",
    D: "#C4D79D",
    E: "#C4D79D",
    F: "#C4D79D",
    G: "#C4D79D",
    H: "#C4D79D",
  }),
];

/**
 * ===== MERGE ENGINE (SAFE VERSION) =====
 */

const spanMap = reactive({});
const hiddenMap = reactive({});

function ensure(key, color) {
  if (!spanMap[key]) {
    spanMap[key] = {
      colspan: 1,
      rowspan: 1,
      color,
    };
  }
}

/**
 * horizontal merge
 */
function buildHorizontal() {
  const cols = columns.map((c) => c.name);

  for (const row of rows) {
    let i = 0;

    while (i < cols.length) {
      const col = cols[i];
      const color = row[col];

      let j = i + 1;
      while (j < cols.length && row[cols[j]] === color) {
        j++;
      }

      const span = j - i;
      const key = `${row.id}-${col}`;

      ensure(key, color);
      spanMap[key].colspan = span;

      for (let k = i + 1; k < j; k++) {
        hiddenMap[`${row.id}-${cols[k]}`] = true;
      }

      i = j;
    }
  }
}

/**
 * vertical merge (SAFE FIX)
 */
function buildVertical() {
  const cols = columns.map((c) => c.name);

  for (const col of cols) {
    let i = 0;

    while (i < rows.length) {
      const color = rows[i][col];

      let j = i + 1;
      while (j < rows.length && rows[j][col] === color) {
        j++;
      }

      const span = j - i;
      const key = `${rows[i].id}-${col}`;

      ensure(key, color);
      spanMap[key].rowspan = span;

      for (let r = i + 1; r < j; r++) {
        hiddenMap[`${rows[r].id}-${col}`] = true;
      }

      i = j;
    }
  }
}

buildHorizontal();
buildVertical();

/**
 * ===== API =====
 */

function getSpan(rowId, col) {
  return (
    spanMap[`${rowId}-${col}`] || {
      colspan: 1,
      rowspan: 1,
    }
  );
}

function isHidden(rowId, col) {
  return !!hiddenMap[`${rowId}-${col}`];
}

function cellStyle(rowId, col) {
  const key = `${rowId}-${col}`;
  const color = spanMap[key]?.color || "#fff";

  return {
    backgroundColor: color,
    border: "1px solid #ccc",
    width: "70px",
    height: "42px",
  };
}
</script>

<style scoped>
.q-table td {
  padding: 0;
}
</style>
