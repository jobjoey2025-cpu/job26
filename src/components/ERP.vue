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
                      src="./statics/img.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    />
                    <q-img
                      src="./statics/pdf.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    />
                    <q-img
                      src="./statics/3D.png"
                      style="width: 100px; height: 80px"
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
                    <q-img
                      src="./statics/excel.jpg"
                      style="width: 100px; height: 80px"
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
                    <q-img
                      src="./statics/access form.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    />
                    <q-img
                      src="./statics/access report.jpg"
                      style="width: 100px; height: 80px"
                      fit="cover"
                    />
                    <q-img
                      src="./statics/access sql.jpg"
                      style="width: 100px; height: 80px"
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
                    <q-img
                      src="./statics/sw tree.png"
                      style="width: 100px; height: 80px"
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
                    <q-img
                      src="./statics/eep form.jpg"
                      style="width: 100px; height: 80px"
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
            <h6>資料集中化</h6>
            <p>由分散檔案轉為資料庫統一管理</p>
            <p>工程 + IT + ERP 跨領域 整合</p>
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-md-4">
          <q-card-section>
            <h6>自動化 (一鍵啟動)</h6>
            <p>透過 API 自動產出 BOM 與結構資料</p>
            <p>表格（BOM） Tree（結構） Flow（流程）</p>
          </q-card-section>
        </q-card>

        <q-card class="col-12 col-md-4">
          <q-card-section>
            <h6>系統整合</h6>
            <p>最終整合至 ERP 與生產流程</p>
            <p>API（可接 SolidWorks） DB（可接 SQL） ERP（可延伸）</p>
          </q-card-section>
        </q-card>
      </div>
    </section>

    <!-- ERP 對應 -->
    <!-- <section class="q-pa-xl text-center">
      <h4>ERP 對應價值</h4> -->

      <!-- <p style="max-width: 700px; margin: auto">
        流程將工程資料從單純檔案管理，
        逐步進化為具備結構化資料、查詢能力與自動化產出的系統， 最終整合至 ERP
        與製造流程，提升資料一致性與生產效率。
      </p> -->
    <!-- </section> -->

    <!-- FOOTER -->
    <!-- <section class="bg-dark text-white text-center q-pa-md">
      <p>Engineering Data → ERP Integration</p>
    </section> -->
        <!-- FOOTER -->
        <h4 class="text-center">ERP 對應價值</h4>
    <section class="bg-green text-white text-center q-pa-md">
      <p>流程將工程資料從單純檔案管理，
        逐步進化為具備結構化資料、查詢能力與自動化產出的系統， 最終整合至 ERP
        與製造流程，提升資料一致性與生產效率。</p>
    </section>
  </q-page>
</template>

<script>
export default {
  name: "erpFlowPage",
};
</script>
