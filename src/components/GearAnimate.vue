<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 text-bold q-mb-md">齒頂圓D計算 (卡尺容易量到的數值)</div>

    <div class="row q-col-gutter-md">
      <!-- Canvas 動畫區 -->
      <q-card class="q-mb-md">
        <q-card-section>
          <div class="text-h6">齒輪嚙合動態（Gear Mesh Animation）</div>
          <canvas
            ref="canvas"
            width="400"
            height="300"
            style="border: 1px solid #ccc"
          ></canvas>
        </q-card-section>
      </q-card>

      <q-card class="col-6 q-mx-md shadow-2">
        <q-card-section>
          <div class="text-h6">齒輪設計計算</div>
          <div>齒數 Z = 52</div>
          <div>節徑 d = 27.517 mm</div>
          <div>模數 m = d/z =0.52917</div>
          <div>齒頂圓 = (Z+2) * m = 54 * 0.52917 = 28.575</div>
          <br>
          <q-img
          src="./statics/Diameter-of-Gears.jpeg"
          style="width: 200px; height: 155px"
          fit="cover"
        />
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";

const canvas = ref(null);

onMounted(() => {
  const ctx = canvas.value.getContext("2d");

  let angle = 0;

  const drawGear = (x, y, r, teeth, rotation) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    ctx.beginPath();
    for (let i = 0; i < teeth; i++) {
      const a = (i / teeth) * Math.PI * 2;
      const r1 = r;
      const r2 = r * 1.1;

      ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
      ctx.lineTo(Math.cos(a + 0.02) * r2, Math.sin(a + 0.02) * r2);
    }
    ctx.closePath();
    ctx.stroke();

    ctx.restore();
  };

  const animate = () => {
    ctx.clearRect(0, 0, 400, 300);

    // 主動齒輪
    drawGear(150, 150, 50, 20, angle);

    // 從動齒輪（反向轉）
    drawGear(250, 150, 50, 20, -angle);

    angle += 0.02;
    requestAnimationFrame(animate);
  };

  animate();
});
</script>

<style></style>
