<template>
  <q-page class="q-pa-md flex flex-center">

    <div class="container">

      <!-- AUTO BLOCK RENDER -->
      <q-btn
        v-for="block in blocks"
        :key="block.id"
        class="block"
        :style="blockStyle(block)"
        @mouseenter="active = block"
      >
        {{ block.id }}

        <q-tooltip>
          Area: {{ block.area }}<br />
          Color: {{ block.color }}
        </q-tooltip>

      </q-btn>

    </div>

  </q-page>
</template>

<script setup>
import { ref } from 'vue'

/**
 * ===== INPUT GRID (Excel) =====
 */
const grid = [
  ['#D9EAD3','#D9EAD3','#B4A7D6','#B4A7D6','#8FB3BA','#8FB3BA','#0A6C22','#0A6C22'],
  ['#D9EAD3','#D9EAD3','#B4A7D6','#B4A7D6','#8FB3BA','#8FB3BA','#0A6C22','#0A6C22'],
  ['#D9EAD3','#D9EAD3','#B4A7D6','#B4A7D6','#8FB3BA','#8FB3BA','#0A6C22','#0A6C22'],

  ['#E4A428','#E4A428','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5'],
  ['#E4A428','#E4A428','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5'],
  ['#E4A428','#E4A428','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5'],
  ['#E4A428','#E4A428','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5','#F1E4C5'],

  ['#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D'],
  ['#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D'],
  ['#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D'],
  ['#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D','#C4D79D']
]

const rows = grid.length
const cols = grid[0].length

/**
 * ===== AUTO BLOCK ENGINE (FLOOD FILL) =====
 */

const visited = Array.from({ length: rows }, () =>
  Array(cols).fill(false)
)

const dirs = [[1,0],[-1,0],[0,1],[0,-1]]

const blocks = []

function inBounds(r,c){
  return r>=0 && c>=0 && r<rows && c<cols
}

function floodFill(sr, sc){

  const color = grid[sr][sc]
  const stack = [[sr,sc]]

  const block = {
    id: `region_${blocks.length+1}`,
    color,
    cells: [],
    minR: sr, maxR: sr,
    minC: sc, maxC: sc
  }

  visited[sr][sc] = true

  while(stack.length){
    const [r,c] = stack.pop()

    block.cells.push([r,c])

    block.minR = Math.min(block.minR, r)
    block.maxR = Math.max(block.maxR, r)
    block.minC = Math.min(block.minC, c)
    block.maxC = Math.max(block.maxC, c)

    for(const [dr,dc] of dirs){
      const nr = r + dr
      const nc = c + dc

      if(!inBounds(nr,nc)) continue
      if(visited[nr][nc]) continue
      if(grid[nr][nc] !== color) continue

      visited[nr][nc] = true
      stack.push([nr,nc])
    }
  }

  block.area = block.cells.length

  // convert bbox → CSS grid
  block.startRow = block.minR + 1
  block.endRow   = block.maxR + 2

  block.startCol = block.minC + 1
  block.endCol   = block.maxC + 2

  blocks.push(block)
}

/**
 * build all blocks
 */
for(let r=0;r<rows;r++){
  for(let c=0;c<cols;c++){
    if(!visited[r][c]){
      floodFill(r,c)
    }
  }
}

/**
 * ===== UI STATE =====
 */
const active = ref(null)

/**
 * ===== STYLE =====
 */
function blockStyle(b){
  return {
    backgroundColor: b.color,
    gridRow: `${b.startRow} / ${b.endRow}`,
    gridColumn: `${b.startCol} / ${b.endCol}`,
    border: '1px solid rgba(0,0,0,0.2)',
    color: '#333',
    fontSize: '12px'
  }
}

</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: repeat(8, 50px);
  grid-template-rows: repeat(11, 50px);
  gap: 2px;
  background: #f5f5f5;
  padding: 8px;
}

.block {
  width: 100%;
  height: 100%;
  min-height: unset;
  padding: 0;
}
</style>