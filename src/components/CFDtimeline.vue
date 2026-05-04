<template>
  <q-page class="q-pa-md">
    <!-- --------- -->
    <div class="q-pa-md">
      <q-carousel
        arrows
        animated
        v-model="slide"
        height="300px"
        navigation
        infinite
        navigation-position="top"
        control-color="orange"
      >
        <q-carousel-slide
          name="first"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEjg-7-6ej16ZJE0ah-ztfUZpSKK7bUeWnYotrpmoeBUvspAuSq0BfIVDa32dKYxYln3fag8AdEK5EmPEN-B0H01ZMKbEVBwC5VHefkOsXz08uRz2XK7qzi_YMW-DJUjc71toeRxSUpGcb_DhanOjwTuL1QAicOEL7KI_6LiBJpM_JR6zMIoHHgexKKEgxwG"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">streamline</div>
            <div class="text-subtitle1">Trailing Edge</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="second"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEgAIVJQ9-1sRnilu0MvxCL7e2fujHRIl8rHaWmdf25ooaK23dgo2l_uQOzl6IkOgTNpk97sWwsmAWKh7rw-n7NTDHPx3pXHq1WRaI6dAgDME2L0pS0ZVvzI5ZzK3JTk2vomAXwB572AHYDTokHVm-C4PwLArw2neNOSHiLFgOy3rVSt8l2No6uL4iCyJxxS"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">shape</div>
            <div class="text-subtitle1">Trailing Edge</div>
          </div>
        </q-carousel-slide>
        <q-carousel-slide
          name="third"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEg1I2OfgZHvHQmFeEaX8JvhqmRjsQqvm3k_Rq4bDf_y6kLJ-Yhr9UEAernm8X6TRK_jC32Z3lKCYxmwpfe1hidkRGa7jna95SCkra5tgO12RFuAePJ10905-gdgMp8Bg-pyj2b5S_RPs8ADdtT_N4c8TwGBHba5HdfIVzLi0oWSNXO7ZmUrtorFQRy4LkVF"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">mesh</div>
            <div class="text-subtitle1">Trailing Edge</div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="four"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEi255-9xKigaZ_bRLX-AO8id0jTI5TYhtjSfWpAIaxW7FS6yKndJFbFQncHFrrDH8v8ec8YPmTnCgcbFa_JbQyQyC9vuVtn9YKrcP0jaZnr9fPQhoF9s5hvVILe1GrLQY6iKYRuwa7Ft_7iV5s5eXNd16Yeftv8CThj4ICHACJsepbba7AaBYM7kKm204lt"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">mesh</div>
            <div class="text-subtitle1">Cylinder</div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="six"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEjUEz7Nd8EgUTfGk2qCsOaV3iUOrO_FtHbOv8Z6ZUa9W7YYryYCfq6Boo11shnxd7O7k7y2DUTfPXyFODL2ZIhbmPmacVlC8ppP-RPzjkweUPNPsEmSStuue-YwLC0o4k18UAP-PxTZ0VlgSDvZSYwr3rX9NEOhnW8-ciWgIMo_7BA57a6lbWjV_CilBbNo"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">streamline</div>
            <div class="text-subtitle1">Cylinder</div>
          </div>
        </q-carousel-slide>

        <q-carousel-slide
          name="seven"
          img-src="https://blogger.googleusercontent.com/img/a/AVvXsEh5ukHBGb4dBNIu7s79KAsnQewHMu0Err3otDm4Yvsk0Q36TKvhFavEBehRT6XR8wUHr2xHvuuIzJGnjw9dNAR-e9ml4YT9RUGwhflNqKs23L3XDw13tpoS2LhFAs8CxyfiQG-7PkAK4drVchCstl4v7e4B0bZa1sHIw9SGzqtazA4Dy5dQR-HH1UITWvCT"
        >
          <div class="absolute-bottom custom-caption">
            <div class="text-h2">pressure contour</div>
            <div class="text-subtitle1">Cylinder</div>
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <!-- ------- -->
    <div class="text-h4 q-mb-lg">🚀 CFD 決策流程</div>
    <q-timeline color="primary">
      <!-- Step 1 -->
      <q-timeline-entry
        title="Step 1｜粗篩（最重要）"
        subtitle="10 ~ 20 個設計"
        icon="filter_alt"
        color="green"
      >
        <div class="q-mb-sm">低解析 CFD（~50k grid）</div>

        <ul>
          <li>渦流位置（vortex）</li>
          <li>分離點（separation）</li>
          <li>流線是否順暢</li>
        </ul>

        <div class="text-bold text-green q-mt-sm">
          👉 目標：淘汰 80% 不良設計
        </div>
      </q-timeline-entry>

      <!-- Step 2 -->
      <q-timeline-entry
        title="Step 2｜中階比較"
        subtitle="剩 3 ~ 5 個設計"
        icon="analytics"
        color="orange"
      >
        <div class="q-mb-sm">中解析 CFD（100k ~ 300k grid）</div>

        <ul>
          <li>Drag trend（阻力趨勢）</li>
          <li>Wake 穩定性（尾流）</li>
        </ul>

        <div class="text-bold text-orange q-mt-sm">
          👉 目標：找出最有潛力設計
        </div>
      </q-timeline-entry>

      <!-- Step 3 -->
      <q-timeline-entry
        title="Step 3｜精算（最後才做）"
        subtitle="前 1 ~ 2 個設計"
        icon="science"
        color="red"
      >
        <div class="q-mb-sm">高解析 CFD（~1M grid）</div>

        <ul>
          <li>Cd / Cl（氣動係數）</li>
          <li>壓力分佈（Pressure）</li>
        </ul>

        <div class="text-bold text-red q-mt-sm">
          👉 目標：最終驗證 + 報告級數據
        </div>
      </q-timeline-entry>
    </q-timeline>

    <!-- 程式碼 -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6 q-mb-sm">💻 Code</div>

        <q-scroll-area style="height: 400px">
          <pre class="code-block">
# =========================
# ✈ NACA0012 Grid Simulation
# =========================
from phi.flow import *

NX_AIR, NY_AIR = 200, 100
DOMAIN_AIR = dict(x=NX_AIR, y=NY_AIR, bounds=Box(x=4, y=2))

# 1. Define Airfoil Geometry
airfoil_geom = Box(x=(0.5, 1.5), y=(0.95, 1.05))
airfoil_obstacle = Obstacle(airfoil_geom, velocity=[0, 0])

# 2. Initialize Velocity
v_airfoil = StaggeredGrid((1.0, 0.0), extrapolation.BOUNDARY, **DOMAIN_AIR)

# 3. Simulation Loop
DT_AIR = 0.02

for i in range(50):
    v_airfoil = advect.semi_lagrangian(v_airfoil, v_airfoil, dt=DT_AIR)
    v_airfoil = diffuse.explicit(v_airfoil, 0.001, dt=DT_AIR)
    v_airfoil, _ = fluid.make_incompressible(
        v_airfoil,
        [airfoil_obstacle],
        Solve('CG', rel_tol=1e-4, abs_tol=1e-4, max_iterations=500)
    )

# 4. Visualization
vel_mag = math.sqrt(
    v_airfoil.at_centers().vector[0]**2 +
    v_airfoil.at_centers().vector[1]**2
)
plot(vel_mag, title="Velocity Magnitude")
print("✅ Simulation finished successfully.")
          </pre>
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref("first"),
    };
  },
};
</script>

<style lang="sass" scoped>
.custom-caption
  text-align: center
  padding: 12px
  color: white
  background-color: rgba(0, 0, 0, .3)
</style>
