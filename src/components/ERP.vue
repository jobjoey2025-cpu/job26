<template>
  <q-page class="bg-grey-1">
    <!-- HERO -->
    <section class="bg-green text-white text-center q-pa-xl">
      <h2>工程資料管理流程</h2>
      <p class="text-subtitle1">從 CAD 檔案管理 → ERP 系統整合</p>
      <p>工程資料流 : CAD → BOM → DB → ERP</p>

      <!-- <q-btn color="primary" label="查看流程" icon="expand_more" href="#flow" /> -->
    </section>

    <!-- 流程 Timeline -->
    <section id="flow" class="q-pa-xl">
      <h4 class="text-center q-mb-xl">系統進化階段</h4>

      <q-timeline color="primary">
        <!-- STEP 1 -->
        <q-timeline-entry
          title="檔案管理初期"
          subtitle="2D / 3D CAD 管理"
          icon="folder"
        >
          <q-card>
            <q-card-section>
              <ul>
                <li>2D / 3D CAD 檔案管理</li>
                <li>照片檔整理</li>
                <li>工程圖 PDF 歸檔</li>
                <!-- <li></li> -->
                <li>
                  <div>
                    <q-img
                      v-for="img in cadImgs"
                      :key="img"
                      :src="img"
                      class="thumb"
                      style="width: 28%"
                      @click="open(img)"
                      fit="cover"
                    />
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-timeline-entry>

        <!-- STEP 2 -->
        <q-timeline-entry
          title="Excel BOM 管理"
          subtitle="基礎資料結構"
          icon="table_chart"
        >
          <q-card>
            <q-card-section>
              <ul>
                <li>建立 BOM 表</li>
                <li>簡易料號管理</li>
                <li>手動維護資料</li>
                <li>
                  <div>
                    <!-- <q-img
                      src="./statics/excel.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    /> -->
                    <q-img
                      v-for="img in sheetImgs"
                      :key="img"
                      :src="img"
                      class="thumb"
                      @click="open(img)"
                      fit="cover"
                    />
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-timeline-entry>

        <!-- STEP 3 -->
        <q-timeline-entry
          title="Access 資料庫"
          subtitle="進階資料管理"
          icon="storage"
        >
          <q-card>
            <q-card-section>
              <ul>
                <li>建立資料表</li>
                <li>SQL 查詢</li>
                <li>表單輸入介面</li>
                <li>報表輸出（含照片）</li>
                <li>
                  <div>
                    <!-- accessImgs access form.jpg access report.jpg access sql.jpg -->
                    <q-img
                      v-for="img in accessImgs"
                      :key="img"
                      :src="img"
                      class="thumb"
                      style="width: 25%"
                      @click="open(img)"
                      fit="cover"
                    />
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-timeline-entry>

        <!-- STEP 4 -->
        <q-timeline-entry
          title="CAD API 整合"
          subtitle="自動化資料產出"
          icon="precision_manufacturing"
        >
          <q-card>
            <q-card-section>
              <ul>
                <li>串接 SolidWorks API</li>
                <li>自動產出 BOM</li>
                <li>模型樹狀結構解析</li>
                <li>
                  <div>
                    <!-- <q-img
                      src="./statics/sw tree.png"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    /> -->
                    <q-img
                      v-for="img in apiImgs"
                      :key="img"
                      :src="img"
                      class="thumb"
                      @click="open(img)"
                      fit="cover"
                    />
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-timeline-entry>

        <!-- STEP 5 -->
        <q-timeline-entry title="ERP 整合" subtitle="企業級系統" icon="hub">
          <q-card class="bg-primary text-white">
            <q-card-section>
              <ul>
                <li>建立 ERP 資料庫</li>
                <li>串接生產系統</li>
                <li>資料同步與流程整合</li>
                <li>
                  <div>
                    <!-- <q-img
                      src="./statics/eep form.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    /> -->
                    <!-- style="width: 11%" -->
                    <q-img
                      v-for="img in erpImgs"
                      :key="img"
                      :src="img"
                      class="thumb"
                      @click="open(img)"
                      fit="cover"
                    />
                  </div>
                </li>
              </ul>
            </q-card-section>
          </q-card>
        </q-timeline-entry>
      </q-timeline>
    </section>

    <!-- 架構說明 -->
    <section class="bg-grey-2 q-pa-xl">
      <h4 class="text-center q-mb-lg">系統重點</h4>

      <div class="row q-col-gutter-md">
        <q-card class="col-12 col-md-4">
          <q-card-section>
            <li><b>資料集中化</b></li>
            <p>
              由分散檔案轉為資料庫統一管理<br />
              分散檔案（Excel / CAD / 手動）➡️ 統一進入資料庫（DB）
            </p>
            <p>
              👉 目的：<br />
              避免版本混亂<br />
              工程 + IT + ERP 跨領域 整合<br />
              單一資料來源（Single Source of Truth）
            </p>
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-md-4">
          <q-card-section>
            <li><b>自動化（升級）</b></li>
            <p>
              透過 API 一鍵啟動（One-click）自動產出 BOM 與結構資料<br />
              👉 包含：表格（BOM） Tree（結構） Flow（流程）<br />
              API 層 接 CAD（SolidWorks） 提供前端 / ERP 使用<br />
              DB 層 SQL（結構化資料） BOM / Tree / Flow <br />
              ERP 層 訂單 生產排程 成本管理
            </p>
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-md-4">
          <q-card-section>
            <li><b>跨系統整合</b></li>
            <p>
              最終整合至 ERP 與生產流程<br />
              👉 核心能力：系統之間「可對話」不再人工轉資料<br />
              API（可接 SolidWorks） DB（可接 SQL） ERP（可延伸）<br />
              資料一致性 ↑; 人工錯誤 ↓; 生產效率 ↑; 決策速度 ↑
            </p>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <h4 class="text-center">ERP 對應價值</h4>
    <section class="bg-green text-white text-center q-pa-md">
      <p>
        流程將工程資料從單純檔案管理，
        逐步進化為具備結構化資料、查詢能力與自動化產出的系統， 最終整合至 ERP
        與製造流程，提升資料一致性與生產效率。
        讓工程資料能被系統理解、運算、並直接驅動生產
      </p>
    </section>
    <!-- joey 共用圖片放大 -->
    <q-dialog v-model="show">
      <q-card class="viewer">
        <q-img :src="currentImg" fit="contain" class="full-img" />
      </q-card>
    </q-dialog>
  </q-page>
  <p>ERP</p>
</template>

<script>
import { ref } from "vue";

export default {
  name: "erpFlowPage",
  setup() {
    const show = ref(false);
    const currentImg = ref("");

    function open(img) {
      currentImg.value = img;
      show.value = true;
    }

    const cadImgs = ["/img/pdf.jpg", "/img/img.jpg", "/img/3D.png"];

    const sheetImgs = ["/img/excel.jpg"];

    const accessImgs = [
      "/img/access_form.jpg",
      "/img/access_report.jpg",
      "/img/access_sql.jpg",
    ];

    const apiImgs = ["/img/sw tree.png"];

    const erpImgs = ["/img/eep form.jpg"];

    // access_report.jpg access_sql.jpg

    return {
      show,
      currentImg,
      open,
      cadImgs,
      sheetImgs,
      accessImgs,
      apiImgs,
      erpImgs,
    };
  },
};
</script>

<style scoped>
body {
  background: #f5f5f5;
}
.thumb {
  /* width: 120px; */
  width: 222px;
  /* height: 55%; */
  border: 1px solid #f6c3c3; /* 粗細、樣式、顏色 */
  box-sizing: border-box; /* 確保邊框計入 width，不跑版 */
  border-radius: 12px;
  margin: 4px;
  cursor: zoom-in;
}
/* display: block; 避免圖片下方出現空白間隙 */

.viewer {
  width: 90vw;
  height: 90vh;
}

.full-img {
  width: 100%;
  height: 100%;
}
</style>
