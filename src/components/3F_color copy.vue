<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Excel Color Block</div>

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
          :props="props"
          :style="cellStyle(props.value)"
          class="text-center"
        >
          {{ props.value.text }}
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
const columns = [
  {
    name: "A",
    label: "A",
    field: "A",
    align: "center",
  },
  {
    name: "B",
    label: "B",
    field: "B",
    align: "center",
  },
  {
    name: "C",
    label: "C",
    field: "C",
    align: "center",
  },
  {
    name: "D",
    label: "D",
    field: "D",
    align: "center",
  },
  {
    name: "E",
    label: "E",
    field: "E",
    align: "center",
  },
  {
    name: "F",
    label: "F",
    field: "F",
    align: "center",
  },
  {
    name: "G",
    label: "G",
    field: "G",
    align: "center",
  },
  {
    name: "H",
    label: "H",
    field: "H",
    align: "center",
  },
];

function makeCell(color) {
  return {
    text: "",
    color,
  };
}

const rows = [
  {
    id: 1,
    A: makeCell("#D9EAD3"),
    B: makeCell("#D9EAD3"),
    C: makeCell("#B4A7D6"),
    D: makeCell("#B4A7D6"),
    E: makeCell("#8FB3BA"),
    F: makeCell("#8FB3BA"),
    G: makeCell("#0A6C22"),
    H: makeCell("#0A6C22"),
  },

  {
    id: 2,
    A: makeCell("#D9EAD3"),
    B: makeCell("#D9EAD3"),
    C: makeCell("#B4A7D6"),
    D: makeCell("#B4A7D6"),
    E: makeCell("#8FB3BA"),
    F: makeCell("#8FB3BA"),
    G: makeCell("#0A6C22"),
    H: makeCell("#0A6C22"),
  },

  {
    id: 3,
    A: makeCell("#D9EAD3"),
    B: makeCell("#D9EAD3"),
    C: makeCell("#B4A7D6"),
    D: makeCell("#B4A7D6"),
    E: makeCell("#8FB3BA"),
    F: makeCell("#8FB3BA"),
    G: makeCell("#0A6C22"),
    H: makeCell("#0A6C22"),
  },

  {
    id: 4,
    A: makeCell("#E4A428"),
    B: makeCell("#E4A428"),
    C: makeCell("#F1E4C5"),
    D: makeCell("#F1E4C5"),
    E: makeCell("#F1E4C5"),
    F: makeCell("#F1E4C5"),
    G: makeCell("#F1E4C5"),
    H: makeCell("#F1E4C5"),
  },

  {
    id: 5,
    A: makeCell("#E4A428"),
    B: makeCell("#E4A428"),
    C: makeCell("#F1E4C5"),
    D: makeCell("#F1E4C5"),
    E: makeCell("#F1E4C5"),
    F: makeCell("#F1E4C5"),
    G: makeCell("#F1E4C5"),
    H: makeCell("#F1E4C5"),
  },

  {
    id: 6,
    A: makeCell("#E4A428"),
    B: makeCell("#E4A428"),
    C: makeCell("#F1E4C5"),
    D: makeCell("#F1E4C5"),
    E: makeCell("#F1E4C5"),
    F: makeCell("#F1E4C5"),
    G: makeCell("#F1E4C5"),
    H: makeCell("#F1E4C5"),
  },

  {
    id: 7,
    A: makeCell("#E4A428"),
    B: makeCell("#E4A428"),
    C: makeCell("#F1E4C5"),
    D: makeCell("#F1E4C5"),
    E: makeCell("#F1E4C5"),
    F: makeCell("#F1E4C5"),
    G: makeCell("#F1E4C5"),
    H: makeCell("#F1E4C5"),
  },

  {
    id: 8,
    A: makeCell("#C4D79D"),
    B: makeCell("#C4D79D"),
    C: makeCell("#C4D79D"),
    D: makeCell("#C4D79D"),
    E: makeCell("#C4D79D"),
    F: makeCell("#C4D79D"),
    G: makeCell("#C4D79D"),
    H: makeCell("#C4D79D"),
  },

  {
    id: 9,
    A: makeCell("#C4D79D"),
    B: makeCell("#C4D79D"),
    C: makeCell("#C4D79D"),
    D: makeCell("#C4D79D"),
    E: makeCell("#C4D79D"),
    F: makeCell("#C4D79D"),
    G: makeCell("#C4D79D"),
    H: makeCell("#C4D79D"),
  },

  {
    id: 10,
    A: makeCell("#C4D79D"),
    B: makeCell("#C4D79D"),
    C: makeCell("#C4D79D"),
    D: makeCell("#C4D79D"),
    E: makeCell("#C4D79D"),
    F: makeCell("#C4D79D"),
    G: makeCell("#C4D79D"),
    H: makeCell("#C4D79D"),
  },

  {
    id: 11,
    A: makeCell("#C4D79D"),
    B: makeCell("#C4D79D"),
    C: makeCell("#C4D79D"),
    D: makeCell("#C4D79D"),
    E: makeCell("#C4D79D"),
    F: makeCell("#C4D79D"),
    G: makeCell("#C4D79D"),
    H: makeCell("#C4D79D"),
  },
];

function cellStyle(cell) {
  return {
    backgroundColor: cell.color,
    width: "70px",
    height: "42px",
    border: "1px solid #ccc",
  };
}
</script>

<style scoped>
.q-table td {
  padding: 0;
}
</style>
