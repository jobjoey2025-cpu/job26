<template>
  <div class="q-pa-md">
    <q-carousel
      v-model="slide"
      animated
      swipeable
      infinite
      navigation
      autoplay="6000"
      height="430px"
      class="tech-carousel"
    >
      <!-- ========================= VTOL UAV Payload ========================= -->
      <q-carousel-slide name="tv" class="tech-slide">
        <div class="tech-card">
          <!-- Image -->
          <q-img src="./statics/droneFish.png" class="tech-image">
            <!-- Gradient Overlay -->
            <div class="image-overlay"></div>
            <!-- Technical Label -->
            <div class="tech-label">
              <span class="label-dot"></span> VTOL / PAYLOAD
            </div>
            <!-- Image Number -->
            <div class="image-number">01 / 03</div>
          </q-img>
          <!-- Content -->
          <div class="tech-content">
            <div class="tech-category">UAV SYSTEM DESIGN</div>
            <div class="tech-title">VTOL UAV Payload 設計</div>
            <div class="tech-line"></div>
            <div class="tech-description">
              VTOL UAV 的 Payload（酬載）設計是整個系統設計的核心之一，
              會直接影響重量、續航、重心、推力配置與機體尺寸。
            </div>
            <div class="tech-keywords">
              <span>PAYLOAD</span> <span>WEIGHT</span> <span>CG</span>
              <span>THRUST</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <!-- ========================= Vacuum Forming ========================= -->
      <q-carousel-slide name="layers" class="tech-slide">
        <div class="tech-card">
          <q-img src="./statics/rc10.jpg" class="tech-image">
            <div class="image-overlay"></div>
            <div class="tech-label">
              <span class="label-dot"></span> RC / VACUUM FORMING
            </div>
            <div class="image-number">02 / 03</div>
          </q-img>
          <div class="tech-content">
            <div class="tech-category">MANUFACTURING PROCESS</div>
            <div class="tech-title">RC 車架懸吊與泡殼真空成型</div>
            <div class="tech-line"></div>
            <div class="tech-description">
              RC 模型常見的透明泡殼通常採用真空成型製作，
              應用於飛機座艙罩、車殼及 UAV 外罩。
            </div>
            <div class="tech-keywords">
              <span>BLISTER</span> <span>VACUUM</span> <span>MOLD</span>
              <span>ABS</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>
      <!-- ========================= Electrical ========================= -->
      <q-carousel-slide name="map" class="tech-slide">
        <div class="tech-card">
          <q-img src="./statics/controlBOX2.jpg" class="tech-image">
            <div class="image-overlay"></div>
            <div class="tech-label">
              <span class="label-dot"></span> ELECTRICAL / CONTROL
            </div>
            <div class="image-number">03 / 03</div>
          </q-img>
          <div class="tech-content">
            <div class="tech-category">ELECTRICAL SYSTEM</div>
            <div class="tech-title">電氣控制與配線</div>
            <div class="tech-line"></div>
            <div class="tech-description">
              電氣系統涵蓋設備配線、馬達控制、控制電路、
              漏電檢測、絕緣測試及接地系統。
            </div>
            <div class="tech-keywords">
              <span>CONTROL</span> <span>WIRING</span> <span>MOTOR</span>
              <span>SAFETY</span>
            </div>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
// 如果你使用 Vue Options API
export default {
  data() {
    return { slide: "tv" };
  },
};

// import { ref } from "vue";

// export default {
//   setup() {
//     return {
//       slide: ref("style"),
//       lorem:
//         "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.",
//     };
//   },
// };
</script>

<style>
/* ========================================= TECH CAROUSEL ========================================= */
.tech-carousel {
  background: radial-gradient(
      circle at 50% 0%,
      rgba(0, 140, 255, 0.12),
      transparent 55%
    ),
    #050a12;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: inset 0 0 40px rgba(0, 120, 255, 0.05),
    0 10px 40px rgba(0, 0, 0, 0.5);
} /* ========================================= SLIDE ========================================= */
.tech-slide {
  padding: 18px 50px 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(8, 18, 32, 0.98),
    rgba(2, 8, 16, 0.98)
  );
} /* ========================================= MAIN CARD ========================================= */
.tech-card {
  position: relative;
  width: min(900px, 94vw);
  border-radius: 14px;
  overflow: hidden;
  background: #07101c;
  border: 1px solid rgba(0, 153, 255, 0.55);
  box-shadow: 0 0 8px rgba(0, 153, 255, 0.25), 0 0 30px rgba(0, 120, 255, 0.12),
    inset 0 0 25px rgba(0, 140, 255, 0.04);
  transition: all 0.35s ease;
} /* Blue glowing edge */
.tech-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 14px;
  pointer-events: none;
  box-shadow: inset 0 0 18px rgba(0, 170, 255, 0.12);
  z-index: 5;
} /* ========================================= IMAGE ========================================= */
.tech-image {
  width: 100%;
  height: 210px;
  position: relative;
  object-fit: cover;
} /* ========================================= IMAGE GRADIENT ========================================= */
.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05) 0%,
    rgba(0, 0, 0, 0.15) 30%,
    rgba(3, 9, 18, 0.65) 70%,
    rgba(3, 9, 18, 0.98) 100%
  );
  pointer-events: none;
} /* ========================================= TECH LABEL ========================================= */
.tech-label {
  position: absolute;
  left: 20px;
  bottom: 18px;
  padding: 7px 13px;
  font-size: 11px;
  letter-spacing: 1.8px;
  font-weight: 600;
  color: #d9f3ff;
  background: rgba(3, 15, 28, 0.82);
  border-left: 2px solid #00aaff;
  backdrop-filter: blur(6px);
  box-shadow: 0 0 12px rgba(0, 160, 255, 0.18);
} /* Label dot */
.label-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 7px;
  border-radius: 50%;
  background: #00c8ff;
  box-shadow: 0 0 8px #00c8ff;
} /* ========================================= IMAGE NUMBER ========================================= */
.image-number {
  position: absolute;
  right: 20px;
  bottom: 18px;
  font-size: 11px;
  letter-spacing: 2px;
  color: rgba(190, 220, 240, 0.65);
} /* ========================================= CONTENT ========================================= */
.tech-content {
  padding: 18px 24px 20px;
} /* Category */
.tech-category {
  font-size: 10px;
  letter-spacing: 2.5px;
  color: #00aaff;
  font-weight: 600;
} /* Title */
.tech-title {
  margin-top: 5px;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #f0f8ff;
  text-shadow: 0 0 12px rgba(0, 170, 255, 0.18);
} /* ========================================= BLUE DIVIDER ========================================= */
.tech-line {
  width: 55px;
  height: 2px;
  margin-top: 10px;
  background: #00aaff;
  box-shadow: 0 0 10px rgba(0, 170, 255, 0.8);
} /* ========================================= DESCRIPTION ========================================= */
.tech-description {
  max-width: 760px;
  margin-top: 10px;
  font-size: 13px;
  line-height: 1.7;
  color: rgba(220, 235, 245, 0.75);
} /* ========================================= KEYWORDS ========================================= */
.tech-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 13px;
}
.tech-keywords span {
  padding: 4px 9px;
  font-size: 9px;
  letter-spacing: 1.2px;
  color: #82d9ff;
  border: 1px solid rgba(0, 170, 255, 0.25);
  background: rgba(0, 120, 255, 0.06);
  border-radius: 3px;
} /* ========================================= CAROUSEL NAVIGATION ========================================= */
.tech-carousel :deep(.q-carousel__navigation) {
  bottom: 8px;
}
.tech-carousel :deep(.q-carousel__navigation-icon) {
  font-size: 8px;
  opacity: 0.5;
}
.tech-carousel :deep(.q-carousel__navigation-icon--active) {
  opacity: 1;
  filter: drop-shadow(0 0 5px #00aaff);
} /* ========================================= MOBILE ========================================= */
@media (max-width: 600px) {
  .tech-slide {
    padding: 12px 12px 38px;
  }
  .tech-image {
    height: 155px;
  }
  .tech-content {
    padding: 14px 16px 16px;
  }
  .tech-title {
    font-size: 19px;
  }
  .tech-description {
    font-size: 12px;
    line-height: 1.65;
  }
  .tech-label {
    left: 12px;
    bottom: 12px;
    font-size: 9px;
  }
  .image-number {
    right: 12px;
    bottom: 12px;
  }
}
</style>
