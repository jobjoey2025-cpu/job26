<template>
  <q-page class="si-report-page">
    <div class="page-shell">
      <header class="report-header">
        <div>
          <div class="eyebrow">訊號完整性 · 規格符合性儀表板</div>
          <h1>PCIe Gen5 M.2 訊號完整性符合性報告</h1>
          <p class="subtitle">PCI Express M.2 規格版本 · Revision 5.0 · Version 0.7</p>
        </div>
        <div class="header-actions">
          <q-badge color="blue-1" text-color="blue-9" label="32.0 GT/s" />
          <q-badge color="grey-3" text-color="grey-9" label="85 Ω 差動參考阻抗" />
          <q-btn outline color="primary" icon="file_download" label="匯出報告摘要" @click="exportSummary" />
        </div>
      </header>

      <q-banner class="notice-banner" rounded>
        <template #avatar><q-icon name="info" color="blue-8" /></template>
        <div class="text-weight-medium">報告範本／示意數值</div>
        <div class="text-caption">
          目前尚未載入 DUT 量測檔案。圖表顯示的是可編輯的範例資料，不可視為實際符合性結果。請在正式簽核前，確認 Version 0.7 的正確規格限制與客戶要求。
        </div>
      </q-banner>

      <section class="overview-grid">
        <q-card v-for="item in overview" :key="item.id" flat bordered class="overview-card">
          <q-card-section>
            <div class="overview-top">
              <span class="overview-number">{{ item.id }}</span>
              <q-icon :name="item.icon" size="22px" color="primary" />
            </div>
            <div class="overview-title">{{ item.title }}</div>
            <div class="overview-value">{{ item.value }}</div>
            <div class="overview-caption">{{ item.caption }}</div>
          </q-card-section>
        </q-card>
      </section>

      <section class="section-heading">
        <div>
          <div class="eyebrow">符合性審查</div>
          <h2>五項訊號完整性要求</h2>
        </div>
        <q-select
          v-model="selectedDut"
          dense outlined emit-value map-options
          :options="dutOptions"
          label="DUT／測試範圍"
          class="scope-select"
        />
      </section>

      <q-card flat bordered class="summary-card">
        <q-card-section class="row items-center justify-between q-pb-sm">
          <div>
            <div class="text-h6">客戶需求比對</div>
            <div class="text-caption text-grey-7">輸入客戶允收條件與 DUT 結果，以計算裕量及判定狀態。</div>
          </div>
          <q-badge color="orange-1" text-color="orange-10">等待實際數據</q-badge>
        </q-card-section>
        <q-separator />
        <q-markup-table flat separator="horizontal" class="compliance-table">
          <thead>
            <tr>
              <th class="text-left">SI 項目</th>
              <th class="text-left">參考值／規格要求</th>
              <th class="text-left">最差結果</th>
              <th class="text-left">裕量</th>
              <th class="text-left">判定</th>
              <th class="text-left">圖表</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in complianceRows" :key="row.id">
              <td>
                <div class="item-name">{{ row.name }}</div>
                <div class="text-caption text-grey-7">{{ row.parameter }}</div>
              </td>
              <td>{{ row.requirement }}</td>
              <td class="numeric">{{ row.result }}</td>
              <td class="numeric">{{ row.margin }}</td>
              <td><q-badge :color="statusColor(row.status)" :text-color="statusTextColor(row.status)">{{ statusLabel(row.status) }}</q-badge></td>
              <td><q-btn flat dense color="primary" icon="show_chart" label="查看圖表" @click="scrollTo(row.chartId)" /></td>
            </tr>
          </tbody>
        </q-markup-table>
      </q-card>

      <section class="section-heading q-mt-xl">
        <div>
          <div class="eyebrow">量測／計算數據</div>
          <h2>SI 圖表與規格限值判定</h2>
        </div>
        <q-badge color="grey-2" text-color="grey-9">示意資料</q-badge>
      </section>

      <div class="plots-grid">
        <q-card flat bordered class="plot-card" id="impedance">
          <q-card-section>
            <div class="plot-title-row">
              <div>
                <div class="plot-title">01 · 連接器差動阻抗</div>
                <div class="plot-subtitle">TDR 阻抗曲線 · Zdiff 與位置關係</div>
              </div>
              <q-badge color="blue-1" text-color="blue-9">Ω</q-badge>
            </div>
            <svg class="chart" viewBox="0 0 620 250" role="img" aria-label="差動阻抗示意圖">
              <ChartGrid :min="60" :max="100" :ticks="[60,70,80,90,100]" :labels="['0','25','50','75','100']" />
              <line x1="48" :y1="chartY(85,60,100)" x2="598" :y2="chartY(85,60,100)" class="target-line" />
              <polyline :points="polyline(impedanceData, 60, 100)" class="data-line blue-line" />
              <text x="600" :y="chartY(85,60,100)-7" text-anchor="end" class="chart-label">85 Ω 參考值</text>
              <text x="320" y="243" text-anchor="middle" class="axis-label">連接器路徑位置（示意）</text>
              <text x="12" y="16" class="axis-label">Zdiff (Ω)</text>
            </svg>
            <div class="metric-row">
              <Metric label="範例最小值" value="78 Ω" />
              <Metric label="範例最大值" value="85 Ω" />
              <Metric label="客戶允收範圍" value="TBD" />
            </div>
            <div class="plot-note">85 Ω 為相關 S 參數要求所使用的差動參考阻抗。TDR 阻抗容許範圍仍須依適用規格條文或客戶要求確認。</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="plot-card" id="insertion-loss">
          <q-card-section>
            <div class="plot-title-row">
              <div>
                <div class="plot-title">02 · 差動插入損耗</div>
                <div class="plot-subtitle">Sdd21 與頻率關係</div>
              </div>
              <q-badge color="blue-1" text-color="blue-9">dB</q-badge>
            </div>
            <svg class="chart" viewBox="0 0 620 250" role="img" aria-label="插入損耗示意圖">
              <ChartGrid :min="-5" :max="0" :ticks="[-5,-4,-3,-2,-1,0]" :labels="['0','4','8','12','16','20','24']" />
              <polyline :points="polyline(ilData, -5, 0)" class="data-line blue-line" />
              <text x="320" y="243" text-anchor="middle" class="axis-label">頻率（GHz）</text>
              <text x="12" y="16" class="axis-label">Sdd21 (dB)</text>
            </svg>
            <div class="metric-row">
              <Metric label="範例 @ 16 GHz" value="-1.4 dB" />
              <Metric label="範例 @ 24 GHz" value="-2.3 dB" />
              <Metric label="V0.7 規格限值" value="待確認" />
            </div>
            <div class="plot-note">Sdd21 以負值表示傳輸損耗。應將實測曲線與指定版本的 DDIL 限值比較，不可直接以後續版本的規格遮罩取代。</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="plot-card" id="return-loss">
          <q-card-section>
            <div class="plot-title-row">
              <div>
                <div class="plot-title">03 · 差動回波損耗（DDRL）</div>
                <div class="plot-subtitle">Sdd11／Sdd22 與頻率關係 · Figure 6-21</div>
              </div>
              <q-badge color="blue-1" text-color="blue-9">dB</q-badge>
            </div>
            <svg class="chart" viewBox="0 0 620 250" role="img" aria-label="差動回波損耗限值與示意結果">
              <ChartGrid :min="-25" :max="0" :ticks="[-25,-20,-15,-10,-5,0]" :labels="['0','4','8','12','16','20','24']" />
              <polyline :points="polyline(ddrlLimitData, -25, 0)" class="data-line red-line" />
              <polyline :points="polyline(ddrlExampleData, -25, 0)" class="data-line blue-line" />
              <text x="320" y="243" text-anchor="middle" class="axis-label">頻率（GHz）</text>
              <text x="12" y="16" class="axis-label">回波損耗（dB）</text>
            </svg>
            <div class="legend"><span class="legend-red"></span> V0.7 規格限值 <span class="legend-blue"></span> DUT 範例</div>
            <div class="metric-row">
              <Metric label="16 GHz 規格限值" value="-10 dB" />
              <Metric label="24 GHz 規格限值" value="-3 dB" />
              <Metric label="範例最差裕量" value="0.5 dB" />
            </div>
            <div class="formula-box">f ≤ 16 GHz: −20 + 0.625f dB<br>16 &lt; f ≤ 24 GHz: −24 + 0.875f dB</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="plot-card" id="next">
          <q-card-section>
            <div class="plot-title-row">
              <div>
                <div class="plot-title">04 · 差動近端串音（DDNEXT）</div>
                <div class="plot-subtitle">功率總和串音與頻率關係 · Figure 6-22</div>
              </div>
              <q-badge color="blue-1" text-color="blue-9">dB</q-badge>
            </div>
            <svg class="chart" viewBox="0 0 620 250" role="img" aria-label="差動近端串音限值與示意結果">
              <ChartGrid :min="-55" :max="-25" :ticks="[-55,-50,-45,-40,-35,-30,-25]" :labels="['0','4','8','12','16','20','24']" />
              <polyline :points="polyline(nextLimitData, -55, -25)" class="data-line red-line" />
              <polyline :points="polyline(nextExampleData, -55, -25)" class="data-line blue-line" />
              <text x="320" y="243" text-anchor="middle" class="axis-label">頻率（GHz）</text>
              <text x="12" y="16" class="axis-label">DDNEXT（dB）</text>
            </svg>
            <div class="legend"><span class="legend-red"></span> V0.7 規格限值 <span class="legend-blue"></span> 功率總和範例</div>
            <div class="metric-row">
              <Metric label="16 GHz 以下規格限值" value="&lt; −40 dB" />
              <Metric label="24 GHz 規格限值" value="−33.33 dB" />
              <Metric label="ccICNNEXT" value="≤ 250 μV" />
            </div>
            <div class="formula-box">f ≤ 16 GHz: &lt; −40 dB<br>16 &lt; f ≤ 24 GHz: (5/6)f − 53.33 dB</div>
            <div class="plot-note">功率總和須納入所有相鄰差動訊號對，包括連接器另一側的相鄰訊號對。若未符合頻率域 DDNEXT 要求，則依規格進一步評估 ccICNNEXT。</div>
          </q-card-section>
        </q-card>

        <q-card flat bordered class="plot-card plot-card-wide" id="skew">
          <q-card-section>
            <div class="plot-title-row">
              <div>
                <div class="plot-title">05 · 差動對內偏斜（差動對內偏斜）</div>
                <div class="plot-subtitle">各差動訊號對的 P／N 傳播延遲差</div>
              </div>
              <q-badge color="blue-1" text-color="blue-9">ps</q-badge>
            </div>
            <div class="skew-chart">
              <div v-for="pair in skewData" :key="pair.name" class="skew-row">
                <div class="skew-name">{{ pair.name }}</div>
                <div class="skew-track">
                  <div class="skew-bar" :style="{ width: `${Math.min(pair.skew / 3 * 100, 100)}%` }"></div>
                  <div class="skew-limit" :style="{ left: `${skewLimit / 3 * 100}%` }"></div>
                </div>
                <div class="skew-value">{{ pair.skew.toFixed(1) }} ps</div>
                <q-badge :color="pair.skew <= skewLimit ? 'green-1' : 'red-1'" :text-color="pair.skew <= skewLimit ? 'green-9' : 'red-9'">
                  {{ pair.skew <= skewLimit ? 'PASS' : 'FAIL' }}
                </q-badge>
              </div>
              <div class="skew-axis"><span>0 ps</span><span>1 ps</span><span>2 ps</span><span>3 ps</span></div>
            </div>
            <div class="metric-row">
              <Metric label="適用 BGA 安裝方式" :value="selectedBgaLabel" />
              <Metric label="最大允許值" :value="`${skewLimit} ps`" />
              <Metric label="範例最差值" value="2.5 ps" />
            </div>
            <div class="plot-note">依 Page 255：直接焊接式 BGA 最大 1 ps；安裝於 M.2 擴充卡 的 BGA 最大 2 ps。規格要求透過設計達成，無須量測。</div>
          </q-card-section>
        </q-card>
      </div>

      <section class="section-heading q-mt-xl">
        <div>
          <div class="eyebrow">專案設定</div>
          <h2>客戶／DUT 基本資料</h2>
        </div>
      </section>
      <q-card flat bordered class="setup-card">
        <q-card-section class="setup-grid">
          <q-select v-model="bgaType" outlined dense emit-value map-options label="BGA 安裝方式" :options="bgaOptions" />
          <q-select v-model="reference" outlined dense emit-value map-options label="差動參考阻抗" :options="referenceOptions" />
          <q-input v-model="customerName" outlined dense label="客戶／專案" placeholder="請輸入客戶或專案名稱" />
          <q-input v-model="dutName" outlined dense label="DUT／連接器料號" placeholder="請輸入 DUT 識別資訊" />
          <q-input v-model="boardRevision" outlined dense label="PCB 版本" placeholder="例如：Rev A" />
          <q-input v-model="testDate" outlined dense type="date" label="測試日期" />
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="notes" outlined type="textarea" autogrow label="審查備註／偏差說明" placeholder="請記錄客戶專屬限值、測試治具資訊、校正及去嵌入備註……" />
        </q-card-section>
      </q-card>

      <section class="section-heading q-mt-xl">
        <div>
          <div class="eyebrow">簽核流程</div>
          <h2>驗證檢查清單</h2>
        </div>
        <div class="text-caption text-grey-7">{{ completedChecks.length }} / {{ checks.length }} 已完成</div>
      </section>
      <q-card flat bordered class="check-card">
        <q-card-section>
          <q-linear-progress :value="completedChecks.length / checks.length" color="primary" track-color="grey-3" rounded size="8px" class="q-mb-md" />
          <q-list separator>
            <q-item v-for="(check, index) in checks" :key="index" tag="label">
              <q-item-section avatar><q-checkbox v-model="completedChecks" :val="index" color="primary" /></q-item-section>
              <q-item-section>{{ check }}</q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>

      <footer class="report-footer">
        <div>PCIe Gen5 M.2 · 訊號完整性符合性工作報告</div>
        <div>規格基準：Revision 5.0 · Version 0.7 · 32.0 GT/s</div>
      </footer>
    </div>
  </q-page>
</template>

<script setup>
import { computed, defineComponent, h, ref } from 'vue'

const selectedDut = ref('m2-connector')
const dutOptions = [
  { label: 'M.2 Gen5 連接器', value: 'm2-connector' },
  { label: '完整 M.2 擴充卡', value: 'm2-card' },
  { label: 'PCB＋連接器通道', value: 'channel' }
]

const bgaType = ref('m2-bga')
const bgaOptions = [
  { label: '直接焊接式 BGA（最大 1 ps）', value: 'soldered' },
  { label: '安裝於 M.2 擴充卡的 BGA（最大 2 ps）', value: 'm2-bga' }
]
const skewLimit = computed(() => bgaType.value === 'soldered' ? 1 : 2)
const selectedBgaLabel = computed(() => bgaType.value === 'soldered' ? '直接焊接式' : 'M.2 擴充卡')
const reference = ref('85')
const referenceOptions = [{ label: '85 Ω 差動阻抗', value: '85' }]
const customerName = ref('')
const dutName = ref('')
const boardRevision = ref('')
const testDate = ref('')
const notes = ref('')

const overview = [
  { id: '01', title: '差動阻抗', value: '85 Ω', caption: '參考阻抗', icon: 'tune' },
  { id: '02', title: '插入損耗', value: 'Sdd21', caption: '訊號傳輸衰減', icon: 'trending_down' },
  { id: '03', title: '回波損耗', value: 'Sdd11 / 22', caption: '差動訊號反射', icon: 'settings_input_component' },
  { id: '04', title: 'NEXT', value: 'DDNEXT', caption: '功率總和串音', icon: 'call_split' },
  { id: '05', title: '差動對內偏斜', value: '1 / 2 ps', caption: '依 BGA 安裝方式區分的設計限值', icon: 'swap_horiz' }
]

const complianceRows = computed(() => [
  { id: 1, name: '連接器差動阻抗', parameter: 'Zdiff · TDR', requirement: '85 Ω 參考值；容許範圍待確認', result: '範例：78–85 Ω', margin: '待確認', status: 'Pending', chartId: 'impedance' },
  { id: 2, name: '插入損耗', parameter: 'Sdd21 · VNA', requirement: '待核對 Version 0.7 DDIL 規格遮罩', result: '範例：−2.3 dB', margin: '待確認', status: 'Pending', chartId: 'insertion-loss' },
  { id: 3, name: '回波損耗（DDRL）', parameter: 'Sdd11 / Sdd22 · VNA', requirement: 'Figure 6-21', result: '範例：20 GHz 時 −7.2 dB', margin: '0.5 dB*', status: 'Example', chartId: 'return-loss' },
  { id: 4, name: '近端串音（DDNEXT）', parameter: '功率總和 · VNA', requirement: 'Figure 6-22；必要時採用 ccICNNEXT', result: '範例：20 GHz 時 −39 dB', margin: '2.33 dB*', status: 'Example', chartId: 'next' },
  { id: 5, name: '差動對內偏斜', parameter: 'P／N 延遲 · CAD', requirement: `${skewLimit.value} ps 最大值`, result: '範例：2.5 ps', margin: `${(skewLimit.value - 2.5).toFixed(1)} ps`, status: 'Example', chartId: 'skew' }
])

const impedanceData = [85, 82, 78, 80, 83, 85]
const ilData = [-0.3, -0.5, -0.8, -1.1, -1.4, -1.7, -2.3]
const ddrlLimitData = [-20, -17.5, -15, -12.5, -10, -6.5, -3]
const ddrlExampleData = [-25, -22, -19, -15, -12, -7.2, -4]
const nextLimitData = [-40, -40, -40, -40, -40, -36.67, -33.33]
const nextExampleData = [-48, -47, -45, -43, -42, -39, -36]
const skewData = [
  { name: 'TX0', skew: 1.0 },
  { name: 'TX1', skew: 1.2 },
  { name: 'TX2', skew: 2.5 },
  { name: 'RX0', skew: 0.8 },
  { name: 'RX1', skew: 1.6 }
]

const checks = [
  '確認客戶需求及適用的規格版本',
  '確認 DUT 範圍、連接器料號及 PCB 版本',
  '確認 85 Ω 差動參考阻抗及測試治具要求',
  '完成 TDR 差動阻抗檢查',
  '完成 VNA 校正、S 參數量測及去嵌入',
  '依 Version 0.7 正確限值檢查 Sdd21 插入損耗',
  '依 Figure 6-21 DDRL 規格遮罩檢查 Sdd11／Sdd22',
  '計算 DDNEXT 功率總和，納入連接器另一側的相鄰訊號對',
  '若頻率域 DDNEXT 未符合要求，進一步評估 ccICNNEXT',
  '依適用的 1 ps／2 ps 設計限值檢查 P／N 延遲偏斜',
  '歸檔圖表、原始數據、校正紀錄及最終符合性摘要'
]
const completedChecks = ref([])

function chartY(value, min, max) {
  const top = 18
  const height = 190
  return top + ((max - value) / (max - min)) * height
}
function polyline(values, min, max) {
  const left = 48
  const width = 550
  return values.map((value, index) => {
    const x = left + (index / (values.length - 1)) * width
    const y = chartY(value, min, max)
    return `${x},${y}`
  }).join(' ')
}
function statusLabel(status) {
  return ({ PASS: '合格', FAIL: '不合格', Pending: '待確認', Example: '範例' })[status] || status
}
function statusColor(status) {
  return status === 'PASS' ? 'green-1' : status === 'FAIL' ? 'red-1' : status === 'Example' ? 'blue-1' : 'orange-1'
}
function statusTextColor(status) {
  return status === 'PASS' ? 'green-9' : status === 'FAIL' ? 'red-9' : status === 'Example' ? 'blue-9' : 'orange-10'
}
function scrollTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
function exportSummary() {
  const rows = [
    ['PCIe Gen5 M.2 訊號完整性符合性報告'],
    ['規格版本', 'Revision 5.0 Version 0.7'],
    ['客戶／專案', customerName.value],
    ['DUT', dutName.value || (dutOptions.find(x => x.value === selectedDut.value)?.label ?? selectedDut.value)],
    ['PCB 版本', boardRevision.value],
    ['測試日期', testDate.value],
    ['BGA 安裝方式', selectedBgaLabel.value],
    ['差動參考阻抗', `${reference.value} Ω`],
    [],
    ['項目', '規格要求', '範例／目前結果', '裕量', '判定'],
    ...complianceRows.value.map(row => [row.name, row.requirement, row.result, row.margin, statusLabel(row.status)]),
    [],
    ['備註', notes.value],
    ['聲明', '所有範例數值僅供示意。正式簽核前請載入 DUT 實際數據，並確認 Version 0.7 的正確規格限值。']
  ]
  const csv = rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'PCIe_Gen5_M2_SI符合性報告摘要.csv'
  link.click()
  URL.revokeObjectURL(url)
}

const Metric = defineComponent({
  props: { label: String, value: String },
  setup(props) {
    return () => h('div', { class: 'metric' }, [
      h('div', { class: 'metric-label' }, props.label),
      h('div', { class: 'metric-value' }, props.value)
    ])
  }
})

const ChartGrid = defineComponent({
  props: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
    ticks: { type: Array, required: true },
    labels: { type: Array, required: true }
  },
  setup(props) {
    return () => {
      const top = 18
      const left = 48
      const width = 550
      const height = 190
      return h('g', {}, [
        ...props.ticks.map(tick => {
          const y = top + ((props.max - tick) / (props.max - props.min)) * height
          return h('g', {}, [
            h('line', { x1: left, y1: y, x2: left + width, y2: y, class: 'grid-line' }),
            h('text', { x: left - 9, y: y + 4, 'text-anchor': 'end', class: 'tick-label' }, String(tick))
          ])
        }),
        ...props.labels.map((label, index) => {
          const x = left + (index / (props.labels.length - 1)) * width
          return h('g', {}, [
            h('line', { x1: x, y1: top, x2: x, y2: top + height, class: 'grid-line vertical' }),
            h('text', { x, y: top + height + 17, 'text-anchor': 'middle', class: 'tick-label' }, label)
          ])
        })
      ])
    }
  }
})
</script>

<style>
.si-report-page {
  min-height: 100vh;
  background: #f5f7fb;
  color: #172033;
}
.page-shell {
  max-width: 1440px;
  margin: 0 auto;
  padding: 30px 34px 50px;
}
.report-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 24px;
}
.eyebrow {
  color: #58708f;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: .13em;
  margin-bottom: 8px;
}
h1 {
  margin: 0;
  font-size: clamp(25px, 3vw, 36px);
  line-height: 1.2;
  font-weight: 800;
  letter-spacing: -.035em;
}
.subtitle {
  color: #64748b;
  margin: 9px 0 0;
  font-size: 14px;
}
.header-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 9px;
}
.notice-banner {
  background: #eaf2ff;
  color: #1e3a5f;
  margin-bottom: 22px;
}
.overview-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 34px;
}
.overview-card, .summary-card, .plot-card, .setup-card, .check-card {
  border-radius: 13px;
  background: #fff;
  border-color: #e1e7f0;
}
.overview-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.overview-number {
  font-size: 11px;
  font-weight: 800;
  color: #8da0b8;
}
.overview-title {
  margin-top: 17px;
  font-size: 13px;
  color: #607089;
  font-weight: 650;
}
.overview-value {
  margin-top: 5px;
  font-size: 25px;
  line-height: 1.2;
  font-weight: 800;
  color: #14233b;
}
.overview-caption {
  margin-top: 5px;
  color: #8a97aa;
  font-size: 11px;
}
.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin: 12px 0 16px;
}
.section-heading h2 {
  margin: 0;
  font-size: 23px;
  font-weight: 800;
  letter-spacing: -.025em;
}
.scope-select {
  min-width: 245px;
}
.compliance-table th {
  color: #65758c;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .06em;
  font-weight: 800;
}
.compliance-table td {
  padding-top: 14px;
  padding-bottom: 14px;
  font-size: 12px;
}
.item-name {
  font-weight: 750;
  color: #1d2b42;
}
.numeric {
  font-variant-numeric: tabular-nums;
  font-weight: 700;
}
.plots-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}
.plot-card {
  scroll-margin-top: 24px;
}
.plot-card-wide {
  grid-column: 1 / -1;
}
.plot-title-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}
.plot-title {
  font-size: 15px;
  font-weight: 800;
  color: #1d2b42;
}
.plot-subtitle {
  color: #8290a4;
  font-size: 11px;
  margin-top: 4px;
}
.chart {
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
}
.grid-line {
  stroke: #e7ecf3;
  stroke-width: 1;
}
.grid-line.vertical {
  stroke-dasharray: 3 4;
}
.tick-label, .axis-label, .chart-label {
  fill: #7d8ba0;
  font-size: 10px;
}
.chart-label {
  fill: #b45309;
  font-weight: 700;
}
.target-line {
  stroke: #e59b35;
  stroke-width: 1.5;
  stroke-dasharray: 6 4;
}
.data-line {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.blue-line { stroke: #2878d0; }
.red-line { stroke: #d94b4b; }
.legend {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 11px;
  margin-top: 6px;
}
.legend-red, .legend-blue {
  display: inline-block;
  width: 18px;
  height: 3px;
  border-radius: 3px;
  background: #d94b4b;
}
.legend-blue { background: #2878d0; margin-left: 10px; }
.metric-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 13px;
}
.metric {
  background: #f6f8fb;
  border-radius: 8px;
  padding: 9px 10px;
  min-width: 0;
}
.metric-label {
  color: #8290a4;
  font-size: 10px;
  margin-bottom: 4px;
}
.metric-value {
  color: #23334c;
  font-size: 13px;
  font-weight: 800;
  overflow-wrap: anywhere;
}
.plot-note {
  margin-top: 12px;
  color: #6d7b90;
  font-size: 11px;
  line-height: 1.55;
}
.formula-box {
  margin-top: 11px;
  padding: 9px 11px;
  background: #f7f9fc;
  border-left: 3px solid #d94b4b;
  border-radius: 5px;
  color: #42536b;
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  line-height: 1.7;
}
.skew-chart {
  padding: 10px 4px 0;
}
.skew-row {
  display: grid;
  grid-template-columns: 55px minmax(100px, 1fr) 65px 65px;
  align-items: center;
  gap: 12px;
  margin: 14px 0;
}
.skew-name, .skew-value {
  font-size: 12px;
  font-weight: 750;
  color: #34445d;
}
.skew-track {
  height: 12px;
  border-radius: 20px;
  background: #edf1f6;
  position: relative;
  overflow: visible;
}
.skew-bar {
  height: 100%;
  border-radius: 20px;
  background: #4b91d7;
}
.skew-limit {
  position: absolute;
  top: -5px;
  bottom: -5px;
  border-left: 2px dashed #df8a35;
  z-index: 2;
}
.skew-axis {
  display: flex;
  justify-content: space-between;
  margin-left: 67px;
  margin-right: 145px;
  color: #8a97aa;
  font-size: 10px;
}
.setup-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}
.check-card .q-item {
  min-height: 43px;
  font-size: 13px;
}
.report-footer {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid #e1e7f0;
  margin-top: 34px;
  padding-top: 17px;
  color: #8794a7;
  font-size: 10px;
}
@media (max-width: 1000px) {
  .overview-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .plots-grid { grid-template-columns: 1fr; }
  .plot-card-wide { grid-column: auto; }
}
@media (max-width: 650px) {
  .page-shell { padding: 20px 14px 35px; }
  .report-header, .section-heading, .report-footer { flex-direction: column; align-items: stretch; }
  .header-actions { justify-content: flex-start; }
  .overview-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .setup-grid { grid-template-columns: 1fr; }
  .compliance-table { min-width: 760px; }
  .summary-card { overflow-x: auto; }
  .metric-row { grid-template-columns: 1fr; }
}
</style>
