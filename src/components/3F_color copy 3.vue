<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-md">Excel → Spatial Topology Engine (Level 2)</div>

    <div class="row q-col-gutter-md">
      <!-- GRID VIEW -->
      <div class="col-8">
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
              :style="cellStyle(props.row.id, col.name)"
              @mouseenter="highlightRegion(props.row.id, col.name)"
            />
          </template>
        </q-table>
      </div>

      <!-- REGION INFO PANEL -->
      <div class="col-4">
        <q-card class="q-pa-md">
          <div class="text-h6">Region Inspector</div>

          <div v-if="activeRegion">
            <div>Color: {{ activeRegion.color }}</div>
            <div>Area: {{ activeRegion.area }}</div>
            <div>Cells: {{ activeRegion.cells.length }}</div>

            <q-separator class="q-my-md" />

            <div class="text-subtitle2">Bounding Box</div>
            <div>{{ activeRegion.bbox }}</div>
          </div>

          <div v-else class="text-grey">Hover a block</div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { reactive, ref } from "vue";

const columns = ["A", "B", "C", "D", "E", "F", "G", "H"].map((c) => ({
  name: c,
  label: c,
  field: c,
}));

function makeRow(id, map) {
  return { id, ...map };
}

/**
 * ===== RAW EXCEL GRID =====
 */
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
 * ===== LEVEL 2: FLOOD FILL ENGINE =====
 */

const visited = new Set();
const regions = [];
const cellToRegion = {};

const dirs = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function key(r, c) {
  return `${r}-${c}`;
}

function inBounds(r, c) {
  return r >= 0 && r < rows.length && c >= 0 && c < columns.length;
}

function getColor(r, c) {
  return rows[r][columns[c].name];
}

/**
 * Flood Fill → Region Builder
 */
function buildRegions() {
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < columns.length; c++) {
      const k = key(r, c);
      if (visited.has(k)) continue;

      const color = getColor(r, c);
      const region = {
        id: `region_${regions.length + 1}`,
        color,
        cells: [],
        bbox: {
          minR: r,
          maxR: r,
          minC: c,
          maxC: c,
        },
      };

      const stack = [[r, c]];
      visited.add(k);

      while (stack.length) {
        const [cr, cc] = stack.pop();

        region.cells.push([cr, cc]);
        cellToRegion[key(cr, cc)] = region.id;

        region.bbox.minR = Math.min(region.bbox.minR, cr);
        region.bbox.maxR = Math.max(region.bbox.maxR, cr);
        region.bbox.minC = Math.min(region.bbox.minC, cc);
        region.bbox.maxC = Math.max(region.bbox.maxC, cc);

        for (const [dr, dc] of dirs) {
          const nr = cr + dr;
          const nc = cc + dc;

          if (!inBounds(nr, nc)) continue;
          if (visited.has(key(nr, nc))) continue;
          if (getColor(nr, nc) !== color) continue;

          visited.add(key(nr, nc));
          stack.push([nr, nc]);
        }
      }

      region.area = region.cells.length;
      regions.push(region);
    }
  }
}

buildRegions();

/**
 * ===== UI STATE =====
 */

const activeRegion = ref(null);

function highlightRegion(rowId, colName) {
  const r = rows.findIndex((x) => x.id === rowId);
  const c = columns.findIndex((x) => x.name === colName);

  const regionId = cellToRegion[key(r, c)];
  activeRegion.value = regions.find((x) => x.id === regionId);
}

function cellStyle(rowId, colName) {
  const r = rows.findIndex((x) => x.id === rowId);
  const c = columns.findIndex((x) => x.name === colName);

  const regionId = cellToRegion[key(r, c)];
  const region = regions.find((x) => x.id === regionId);

  return {
    backgroundColor: region?.color || "#fff",
    border: "1px solid #ccc",
    transition: "0.2s",
  };
}
</script>

<style scoped>
.q-table td {
  padding: 0;
  width: 70px;
  height: 42px;
}
</style>
