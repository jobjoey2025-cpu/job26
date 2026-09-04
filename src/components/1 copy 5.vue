```vue
<template>
  <div class="q-pa-md tech-section">
    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      navigation
      autoplay="6000"
      height="460px"
      class="tech-carousel"
    >
      <!-- =====================================================
           01 / LAM
      ====================================================== -->
      <q-carousel-slide name="tv" class="tech-slide">
        <div class="tech-card">
          <!-- IMAGE -->
          <div class="tech-visual">
            <q-img src="./statics/LAM2.jpg" class="tech-image" fit="cover" />

            <div class="image-overlay"></div>

            <!-- top technical line -->
            <div class="scan-line"></div>

            <!-- image label -->
            <div class="tech-label">
              <span class="label-dot"></span>
              PLASMA ETCHING / LAM / APPLIED
            </div>

            <!-- image number -->
            <div class="image-number">01 <span>/</span> 03</div>

            <!-- corner decoration -->
            <div class="corner corner-tl"></div>
            <div class="corner corner-br"></div>
          </div>

          <!-- CONTENT -->
          <div class="tech-content">
            <div class="content-index">
              <span>01</span>
              <i></i>
              SEMICONDUCTOR EQUIPMENT
            </div>

            <div class="tech-category">半導體設備</div>

            <div class="tech-title">AGV 無人搬運車</div>

            <div class="tech-line"></div>

            <div class="tech-highlight">潔淨室相容</div>

            <div class="tech-description">
              半導體設備工程師（Equipment Engineer, EE）
              主要負責半導體製程機台的安裝、校驗、日常監測、
              維修與效能優化，確保產線穩定運行並提升產品良率。
            </div>

            <div class="tech-keywords">
              <span>PAYLOAD</span>
              <span>WEIGHT</span>
              <span>CG</span>
              <span>THRUST</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!-- =====================================================
           02 / VACUUM FORMING
      ====================================================== -->
      <q-carousel-slide name="layers" class="tech-slide">
        <div class="tech-card">
          <div class="tech-visual">
            <q-img src="./statics/rc10.jpg" class="tech-image" fit="cover" />

            <div class="image-overlay"></div>
            <div class="scan-line"></div>

            <div class="tech-label">
              <span class="label-dot"></span>
              RC / VACUUM FORMING
            </div>

            <div class="image-number">02 <span>/</span> 03</div>

            <div class="corner corner-tl"></div>
            <div class="corner corner-br"></div>
          </div>

          <div class="tech-content">
            <div class="content-index">
              <span>02</span>
              <i></i>
              MANUFACTURING PROCESS
            </div>

            <div class="tech-category">製造工藝</div>

            <div class="tech-title">RC 車架懸吊與泡殼真空成型</div>

            <div class="tech-line"></div>

            <div class="tech-highlight">VACUUM FORMING</div>

            <div class="tech-description">
              RC 模型常見的透明泡殼通常採用真空成型製作，
              可應用於飛機座艙罩、車殼及 UAV 外罩等 輕量化結構件。
            </div>

            <div class="tech-keywords">
              <span>BLISTER</span>
              <span>VACUUM</span>
              <span>MOLD</span>
              <span>ABS</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>

      <!-- =====================================================
           03 / ELECTRICAL
      ====================================================== -->
      <q-carousel-slide name="map" class="tech-slide">
        <div class="tech-card">
          <div class="tech-visual">
            <q-img
              src="./statics/controlBOX2.jpg"
              class="tech-image"
              fit="cover"
            />

            <div class="image-overlay"></div>
            <div class="scan-line"></div>

            <div class="tech-label">
              <span class="label-dot"></span>
              ELECTRICAL / CONTROL
            </div>

            <div class="image-number">03 <span>/</span> 03</div>

            <div class="corner corner-tl"></div>
            <div class="corner corner-br"></div>
          </div>

          <div class="tech-content">
            <div class="content-index">
              <span>03</span>
              <i></i>
              ELECTRICAL SYSTEM
            </div>

            <div class="tech-category">電氣控制</div>

            <div class="tech-title">電氣控制與配線</div>

            <div class="tech-line"></div>

            <div class="tech-highlight">CONTROL SYSTEM</div>

            <div class="tech-description">
              電氣系統涵蓋設備配線、馬達控制、控制電路、
              漏電檢測、絕緣測試及接地系統， 確保設備安全與穩定運作。
            </div>

            <div class="tech-keywords">
              <span>CONTROL</span>
              <span>WIRING</span>
              <span>MOTOR</span>
              <span>SAFETY</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slide: "tv",
    };
  },
};
</script>

<style scoped>
/* =========================================================
   TECH SECTION
========================================================= */

.tech-section {
  width: 100%;
}

/* =========================================================
   CAROUSEL
========================================================= */

.tech-carousel {
  position: relative;
  overflow: hidden;

  border-radius: 18px;

  background: radial-gradient(
      circle at 15% 0%,
      rgba(0, 170, 255, 0.13),
      transparent 35%
    ),
    radial-gradient(
      circle at 90% 100%,
      rgba(0, 100, 255, 0.08),
      transparent 35%
    ),
    #040a12;

  border: 1px solid rgba(0, 150, 255, 0.16);

  box-shadow: inset 0 0 50px rgba(0, 120, 255, 0.04),
    0 20px 60px rgba(0, 0, 0, 0.45);
}

/* =========================================================
   SLIDE
========================================================= */

.tech-slide {
  padding: 22px 60px 48px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    rgba(7, 18, 32, 0.98),
    rgba(2, 7, 14, 0.99)
  );
}

/* =========================================================
   MAIN CARD
========================================================= */

.tech-card {
  position: relative;

  display: grid;
  grid-template-columns: 55% 45%;

  width: min(1080px, 94vw);
  min-height: 360px;

  overflow: hidden;

  background: linear-gradient(
    120deg,
    rgba(7, 18, 29, 0.98),
    rgba(4, 12, 21, 0.98)
  );

  border: 1px solid rgba(0, 164, 255, 0.35);
  border-radius: 14px;

  box-shadow: 0 0 10px rgba(0, 153, 255, 0.16), 0 0 35px rgba(0, 120, 255, 0.08),
    inset 0 0 30px rgba(0, 150, 255, 0.025);

  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.tech-card:hover {
  transform: translateY(-3px);

  box-shadow: 0 0 14px rgba(0, 170, 255, 0.25),
    0 15px 45px rgba(0, 100, 255, 0.12), inset 0 0 35px rgba(0, 150, 255, 0.04);
}

/* =========================================================
   VISUAL
========================================================= */

.tech-visual {
  position: relative;
  min-height: 360px;
  overflow: hidden;

  border-right: 1px solid rgba(0, 170, 255, 0.16);
}

.tech-image {
  position: absolute;
  inset: 0;

  width: 100%;
  height: 100%;

  transition: transform 0.8s ease;
}

.tech-card:hover .tech-image {
  transform: scale(1.035);
}

/* =========================================================
   IMAGE OVERLAY
========================================================= */

.image-overlay {
  position: absolute;
  inset: 0;

  background: linear-gradient(
      90deg,
      rgba(2, 8, 15, 0.08) 0%,
      rgba(2, 8, 15, 0.05) 45%,
      rgba(2, 8, 15, 0.55) 100%
    ),
    linear-gradient(0deg, rgba(2, 8, 15, 0.92) 0%, transparent 38%);
}

/* =========================================================
   SCAN LINE
========================================================= */

.scan-line {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 1px;

  background: linear-gradient(
    90deg,
    transparent,
    rgba(0, 200, 255, 0.9),
    transparent
  );

  box-shadow: 0 0 12px rgba(0, 200, 255, 0.6);

  opacity: 0.7;
}

/* =========================================================
   TECH LABEL
========================================================= */

.tech-label {
  position: absolute;
  left: 20px;
  bottom: 20px;

  display: flex;
  align-items: center;

  padding: 8px 13px;

  font-size: 10px;
  font-weight: 600;
  letter-spacing: 1.6px;

  color: #d9f5ff;

  background: rgba(3, 14, 26, 0.78);

  border-left: 2px solid #00b7ff;

  backdrop-filter: blur(8px);

  box-shadow: 0 0 15px rgba(0, 160, 255, 0.15);
}

.label-dot {
  width: 6px;
  height: 6px;

  margin-right: 8px;

  border-radius: 50%;

  background: #00d0ff;

  box-shadow: 0 0 7px #00d0ff, 0 0 14px rgba(0, 200, 255, 0.5);
}

/* =========================================================
   IMAGE NUMBER
========================================================= */

.image-number {
  position: absolute;
  right: 20px;
  bottom: 21px;

  font-size: 12px;
  letter-spacing: 3px;

  color: rgba(215, 240, 255, 0.75);
}

.image-number span {
  margin: 0 4px;

  color: rgba(0, 180, 255, 0.5);
}

/* =========================================================
   CORNER DECORATION
========================================================= */

.corner {
  position: absolute;

  width: 18px;
  height: 18px;

  pointer-events: none;
}

.corner-tl {
  top: 14px;
  left: 14px;

  border-top: 1px solid rgba(0, 200, 255, 0.75);
  border-left: 1px solid rgba(0, 200, 255, 0.75);
}

.corner-br {
  right: 14px;
  bottom: 14px;

  border-right: 1px solid rgba(0, 200, 255, 0.45);
  border-bottom: 1px solid rgba(0, 200, 255, 0.45);
}

/* =========================================================
   CONTENT
========================================================= */

.tech-content {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 34px 38px 30px;
}

/* =========================================================
   CONTENT INDEX
========================================================= */

.content-index {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 14px;

  font-size: 9px;
  font-weight: 600;

  letter-spacing: 2px;

  color: rgba(160, 210, 235, 0.5);
}

.content-index span {
  font-size: 12px;
  color: #00baff;
}

.content-index i {
  width: 28px;
  height: 1px;

  background: rgba(0, 180, 255, 0.45);
}

/* =========================================================
   CATEGORY
========================================================= */

.tech-category {
  margin-bottom: 5px;

  font-size: 11px;
  font-weight: 600;

  letter-spacing: 3px;

  color: #00adff;
}

/* =========================================================
   TITLE
========================================================= */

.tech-title {
  font-size: clamp(22px, 2.2vw, 29px);
  font-weight: 700;

  line-height: 1.3;
  letter-spacing: 0.5px;

  color: #f2f9ff;

  text-shadow: 0 0 16px rgba(0, 170, 255, 0.16);
}

/* =========================================================
   DIVIDER
========================================================= */

.tech-line {
  width: 48px;
  height: 2px;

  margin: 13px 0 12px;

  background: #00b8ff;

  box-shadow: 0 0 10px rgba(0, 190, 255, 0.75);
}

/* =========================================================
   HIGHLIGHT
========================================================= */

.tech-highlight {
  margin-bottom: 8px;

  font-size: 12px;
  font-weight: 600;

  letter-spacing: 1.8px;

  color: #b9edff;
}

/* =========================================================
   DESCRIPTION
========================================================= */

.tech-description {
  max-width: 430px;

  font-size: 13px;
  line-height: 1.75;

  color: rgba(220, 235, 245, 0.68);
}

/* =========================================================
   KEYWORDS
========================================================= */

.tech-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;

  margin-top: 18px;
}

.tech-keywords span {
  padding: 5px 9px;

  font-size: 8px;
  font-weight: 600;

  letter-spacing: 1.3px;

  color: #82ddff;

  background: rgba(0, 140, 255, 0.055);

  border: 1px solid rgba(0, 175, 255, 0.22);

  border-radius: 3px;

  transition: background 0.25s ease, border-color 0.25s ease;
}

.tech-keywords span:hover {
  background: rgba(0, 160, 255, 0.12);

  border-color: rgba(0, 190, 255, 0.55);
}

/* =========================================================
   NAVIGATION
========================================================= */

.tech-carousel :deep(.q-carousel__navigation) {
  bottom: 9px;

  gap: 3px;
}

.tech-carousel :deep(.q-carousel__navigation-icon) {
  font-size: 7px;

  opacity: 0.35;

  transition: opacity 0.25s ease, transform 0.25s ease;
}

.tech-carousel :deep(.q-carousel__navigation-icon--active) {
  opacity: 1;

  filter: drop-shadow(0 0 5px #00baff);

  transform: scale(1.25);
}

/* =========================================================
   MOBILE
========================================================= */

@media (max-width: 800px) {
  .tech-carousel {
    height: auto !important;
  }

  .tech-slide {
    padding: 14px 14px 42px;
  }

  .tech-card {
    grid-template-columns: 1fr;

    width: 100%;
    min-height: auto;
  }

  .tech-visual {
    min-height: 220px;

    border-right: none;
    border-bottom: 1px solid rgba(0, 170, 255, 0.15);
  }

  .tech-content {
    padding: 22px 20px 24px;
  }

  .tech-title {
    font-size: 21px;
  }

  .tech-description {
    max-width: none;

    font-size: 12px;
    line-height: 1.7;
  }

  .tech-label {
    left: 14px;
    bottom: 14px;

    max-width: calc(100% - 85px);

    font-size: 8px;
    letter-spacing: 1.2px;
  }

  .image-number {
    right: 14px;
    bottom: 16px;

    font-size: 10px;
  }
}

/* =========================================================
   SMALL MOBILE
========================================================= */

@media (max-width: 480px) {
  .tech-slide {
    padding: 10px 10px 38px;
  }

  .tech-visual {
    min-height: 175px;
  }

  .tech-content {
    padding: 18px 16px 20px;
  }

  .content-index {
    font-size: 8px;
    letter-spacing: 1.4px;
  }

  .tech-category {
    font-size: 9px;
    letter-spacing: 2.2px;
  }

  .tech-title {
    font-size: 19px;
  }

  .tech-highlight {
    font-size: 10px;
  }

  .tech-description {
    font-size: 11px;
    line-height: 1.65;
  }

  .tech-keywords {
    margin-top: 14px;
  }

  .tech-keywords span {
    padding: 4px 7px;
    font-size: 7px;
  }

  .tech-label {
    padding: 6px 9px;

    font-size: 7px;
  }
}
</style>
```
