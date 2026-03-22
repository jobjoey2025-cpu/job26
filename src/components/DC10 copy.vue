<template>
  <q-page class="q-pa-lg">

    <!-- Hero Section -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">DC10 Drift Car Engineering Portfolio</div>
      <div class="text-subtitle1">Mechanical Design | Gear System | Vehicle Dynamics</div>
    </div>

    <!-- KPI Section -->
    <div class="row q-col-gutter-md q-mb-xl">
      <div class="col-4">
        <q-card class="text-center q-pa-md">
          <div class="text-h5">xx - 7+</div>
          <div>Design Iterations</div>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="text-center q-pa-md">
          <div class="text-h5">xx - Gear Mesh</div>
          <div>Optimized</div>
        </q-card>
      </div>
      <div class="col-4">
        <q-card class="text-center q-pa-md">
          <div class="text-h5">xx -Cross-region</div>
          <div>Engineering</div>
        </q-card>
      </div>
    </div>

    <!-- Animation -->
    <!-- <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Gear Mesh Simulation</div>
        <canvas ref="canvas" width="500" height="300" style="border:1px solid #ccc"></canvas>
      </q-card-section>
    </q-card> -->

    <!-- Project Section -->
    <!-- <Drift /> -->

    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Project Overview</div>
        <p>
          Designed and optimized drivetrain system for DC10 RC drift platform.
          Focused on gear mesh, tolerance control, and efficiency.
        </p>
      </q-card-section>
    </q-card>

    <!-- Engineering Process -->
    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Engineering Iteration</div>

        <q-timeline>
          <q-timeline-entry title="Problem" subtitle="Mesh too tight">
            Energy loss and overheating observed
          </q-timeline-entry>

          <q-timeline-entry title="Hypothesis">
            Tolerance stack-up & material expansion
          </q-timeline-entry>

          <q-timeline-entry title="Action">
            Adjusted pin position and backlash
          </q-timeline-entry>

          <q-timeline-entry title="Result">
            Smooth gear engagement achieved
          </q-timeline-entry>
        </q-timeline>

      </q-card-section>
    </q-card>

    <!-- Skills -->
    <q-card>
      <q-card-section>
        <div class="text-h6">Engineering Skills</div>
        <q-chip color="primary" text-color="white">Gear Design</q-chip>
        <q-chip color="primary" text-color="white">Tolerance Analysis</q-chip>
        <q-chip color="primary" text-color="white">DFM</q-chip>
        <q-chip color="primary" text-color="white">Vehicle Dynamics</q-chip>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
// import Drift from "components/Drift.vue";
import { ref, onMounted } from 'vue'


const canvas = ref(null)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')
  let angle = 0

  const drawGear = (x, y, r, teeth, rotation) => {
    ctx.save()
    ctx.translate(x, y)
    ctx.rotate(rotation)

    ctx.beginPath()
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2
      const r1 = r
      const r2 = r * 1.15

      ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1)
      ctx.lineTo(Math.cos(a + 0.03) * r2, Math.sin(a + 0.03) * r2)
    }
    ctx.closePath()
    ctx.stroke()

    ctx.restore()
  }

  const animate = () => {
    ctx.clearRect(0, 0, 500, 300)

    drawGear(200, 150, 60, 24, angle)
    drawGear(320, 150, 60, 24, -angle)

    angle += 0.02
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<style>
body {
  background: #f5f5f5;
}
</style>
