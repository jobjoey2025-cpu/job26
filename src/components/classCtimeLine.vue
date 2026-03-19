<template>
  <div class="q-pa-lg">
    <div class="row q-gutter-md q-mb-lg">
      <q-option-group
        type="radio"
        dense
        v-model="layout"
        :options="[
          { label: 'Dense layout', value: 'dense' },
          { label: 'Comfortable layout', value: 'comfortable' },
          { label: 'Loose layout', value: 'loose' },
        ]"
      />
      <q-option-group
        type="radio"
        dense
        v-model="side"
        :disable="layout === 'loose'"
        :options="[
          { label: 'Content on right', value: 'right' },
          { label: 'Content on left', value: 'left' },
        ]"
      />
    </div>

    <q-timeline :layout="layout" :side="side" color="secondary">
      <q-timeline-entry heading>規劃時序</q-timeline-entry>

      <q-timeline-entry title="閱讀單線圖" subtitle="5 mins" side="left" icon="article">
        <div>
          單線圖常用符號速查;; 母線 / Bus：粗線或標示 BUS。;; 斷路器（MCCB / MCB）：方塊 +
          電流值（例：3P 100A）。;; 漏電開關（RCD/ELCB）：LR 或 RCD 標示。;; 變壓器：雙線圈符號或
          TR。;; 接地：⏚（地符號）或 PE。;; 馬達：M（並標功率 kW / kW / 電流）。;; 過門 /
          穿牆點（常用自訂符號）：圓圈 + 箭頭或「過門編號」。;;
        </div>
      </q-timeline-entry>

      <q-timeline-entry title="編號過門線" subtitle="5 mins" side="right" icon="edit_note">
        <div>
          簡單、好維護的編號規則，易於在 cable schedule 與圖面互相對照。;;
          編號格式建議（可依公司規格調整）;; [來源代碼]-[目的代碼]-[序號] ;;例： DB1-R101-01 DB1
          表示來源配電盤（Distribution Board 1）;; R101 表示目的房間/房型（Room 101）;; 01
          表示該盤到該房的第一條過門線（同盤到同房若有多條就 02、03…）;;
        </div>
      </q-timeline-entry>

      <q-timeline-entry heading>實做</q-timeline-entry>

      <!-- avatar="https://cdn.quasar.dev/img/avatar3.jpg" -->

      <q-timeline-entry title="控制箱" subtitle="30 mins" side="left" icon="settings">
        <div>
          控制箱接線時，最重要的步驟是「接一條線就畫掉一條線」，雖然麻煩，但可避免漏接或接錯，省去回頭檢查的時間，避免保險絲燒毀。接線完成後一定要靜態測試，用歐姆檔量測兩顆保險絲是否短路，確認無誤再送電。送電前先量測側是否有電源，避免總開關未開造成失誤。若MC未動作，先量測線圈是否有電，如有電則可能為MC內部接點斷開，可手動或工具測試過電。若仍不通，需檢查端子台及考場已固定線路，接好線後拉動所有螺絲端子，包括自己與他人固定的線路，以確保接觸良好，省去查線麻煩，確保控制箱操作順利。
        </div>
      </q-timeline-entry>

      <q-timeline-entry title="EMT 管" subtitle="10 mins" side="right" color="white" avatar="./statics/EMT.png">
        <div>
          彎管要訣：先準備蠟筆記號，EMT管插入盒內約3cm。先彎大S，再彎小S，完成後插入盒邊緣畫線，切管留外1cm。先裝下方護管套，再裝上方，最後用護管鐵固定。
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="PVC 管"
        subtitle="15 mins"
        side="left"
        color="white"
        avatar="./statics/PVC.png"
      >
        <div>
          彎管口訣：先做2顆喇叭頭(長2.54cm)，再彎大S。PVC管插入盒內預留1.3cm後裁切，再擴管並彎小S，注意方向。烤管見表面光滑即軟化可彎，避免燒焦以免扣分。
        </div>
      </q-timeline-entry>



      <q-timeline-entry title="電纜線" subtitle="10 mins" side="right" avatar="./statics/電纜結構.jpg">
        <div>
          電纜線配法由下往上進行，下端進燈具盒時需預留約12公分長度剝線，進盒後2cm先剝除外兩層保護皮，再退1cm剝最外層保護皮。上端進分電盤時方法相同：進2cm剝兩層，退1cm剝一層。注意紅線代替地線時必須貼綠色膠帶，以免遺漏造成錯誤。口訣：由下往上配，進盒、進盤後「進2剝2層，退1剝1層」。
        </div>
      </q-timeline-entry>

      <q-timeline-entry title="拉線" subtitle="15 mins" side="left" icon="mic_external_on">
        <div>
          拉線器穿管後，先將電線整平避免絞線，以減小阻力。第一條火線掛入拉線器拉環，每條電線間距約1cm，用電工膠帶固定避免糾結。拉線時由上往下，EMT管下方出口護管套易卡線，可先拆除，拉出後再裝回。建議在線頭塗拉線膏或滑石粉，再拉完用乾布擦淨，能省力且順暢。
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    return {
      layout: ref('dense'),
      side: ref('right'),
    }
  },
}
</script>
