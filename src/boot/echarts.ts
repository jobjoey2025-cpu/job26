import { boot } from 'quasar/wrappers'
import VChart from 'vue-echarts'

import { use } from 'echarts/core'

import { CanvasRenderer } from 'echarts/renderers'

import { RadarChart } from 'echarts/charts'

import {
  TooltipComponent,
  LegendComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  RadarChart,
  TooltipComponent,
  LegendComponent
])

export default boot(({ app }) => {
  app.component('VChart', VChart)
})