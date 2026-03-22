<template>
  <q-page class="q-pa-lg">

    <!-- Hero -->
    <div class="text-center q-mb-xl">
      <div class="text-h3 text-bold">DC10 Drift Engineering Portfolio</div>
      <div class="text-subtitle1">Yaw Dynamics & Slip Angle Simulation</div>
    </div>

    <!-- Controls -->
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Drift Control Panel</div>

        <div class="q-mt-md">Yaw Rate</div>
        <q-slider v-model="yawRate" :min="0" :max="0.1" :step="0.005" />

        <div class="q-mt-md">Slip Angle</div>
        <q-slider v-model="slip" :min="0" :max="1" :step="0.05" />
      </q-card-section>
    </q-card>

    <!-- Canvas -->
    <q-card class="q-mb-xl">
      <q-card-section>
        <div class="text-h6">Drift Simulation (Yaw + Slip)</div>
        <canvas ref="canvas" width="600" height="400" style="border:1px solid #ccc"></canvas>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const canvas = ref(null)

const yawRate = ref(0.02)
const slip = ref(0.3)

onMounted(() => {
  const ctx = canvas.value.getContext('2d')

  let x = 300
  let y = 200
  let angle = 0

  const drawCar = (x, y, heading, slipAngle) => {
    ctx.save()
    ctx.translate(x, y)

    // 車身方向（yaw）
    ctx.rotate(heading)

    // 車身
    ctx.fillRect(-20, -10, 40, 20)

    // 行進方向（slip）
    ctx.strokeStyle = 'red'
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(50 * Math.cos(slipAngle), 50 * Math.sin(slipAngle))
    ctx.stroke()

    ctx.restore()
  }

  const animate = () => {
    ctx.clearRect(0, 0, 600, 400)

    angle += yawRate.value

    // 模擬前進方向（含 slip）
    x += Math.cos(angle + slip.value) * 2
    y += Math.sin(angle + slip.value) * 2

    drawCar(x, y, angle, slip.value)

    // 邊界重置
    if (x < 0 || x > 600 || y < 0 || y > 400) {
      x = 300
      y = 200
    }

    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<style>
body {
  background: #111;
  color: white;
}
</style>
