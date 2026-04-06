<template>
  <q-step :name="5" title="配置總覽" icon="check_circle">
    <q-card flat bordered class="q-pa-md" id="exportArea">
      <div class="text-h6 text-primary q-mb-sm">你的電動車配置：</div>

      <q-list dense bordered>
        <!-- <q-item v-for="(v, k) in config" :key="k" v-if="v">
          <q-item-section>{{ labelMap[k] }}</q-item-section>
          <q-item-section side>{{ v }}</q-item-section>
        </q-item> -->

        <q-item v-for="(v, k) in config" :key="k">
          <q-item-section>{{ labelMap[k] }}</q-item-section>
          <q-item-section side>{{ v || "未設定" }}</q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <div class="q-mt-md flex justify-between">
      <q-btn color="primary" label="📄 匯出 PDF" @click="exportPDF" />
      <q-btn color="secondary" label="💾 匯出 JSON" @click="exportJSON" />
      <q-btn color="accent" label="📤 匯入 JSON" @click="triggerImport" />
      <input
        ref="fileInput"
        type="file"
        accept="application/json"
        style="display: none"
        @change="importJSON"
      />
    </div>

    <br />
    <br />

    <div class="flex justify-center">
      <q-btn label="模擬跑圈" color="primary" @click="simulate" />

      <div v-if="result" class="flex flex-center" style="height: 200px;">
      <!-- <div v-if="result" class="q-mt-md"> -->
        <div>加速: {{ result.acceleration }} 秒 \\ </div>
        <div>圈速: {{ result.lapTime }} 秒 \\ </div>
        <div>操控: {{ result.handling }} \\ </div>
      </div>
    </div>
    <br>
    <div style="text-align: center;"><img src="/img/circle.jpg" alt="race" style="width: 80%; border-radius: 10px;"></img></div>

  </q-step>
</template>

<script setup>
import { ref } from "vue";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const props = defineProps({ config: Object });
const fileInput = ref(null);

const labelMap = {
  brand: "品牌",
  model: "車型",
  motor: "馬達",
  drive: "驅動",
  battery: "電池",
  range: "續航",
  color: "顏色",
  wheels: "輪圈",
};

// 🧾 匯出 PDF
const exportPDF = async () => {
  const element = document.getElementById("exportArea");

  // 先用 html2canvas 抓整個畫面
  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  // 取得日期
  const date = new Date().toLocaleString("zh-TW", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });

  // 產生 PDF
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // 🔹 標題 + 日期
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("eCAR Report", 105, 20, { align: "center" });

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
  pdf.text(`export Date : ${date}`, 105, 28, { align: "center" });
  pdf.text("eTool : Quasar + html2canvas + jsPDF", 105, 35, {
    align: "center",
  });

  // 🔹 匯入畫面截圖
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth() - 20; // 邊距
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  pdf.addImage(imgData, "PNG", 10, 45, pdfWidth, pdfHeight);

  // 儲存 PDF
  pdf.save(`EV_Config_Report_${date.replace(/\//g, "-")}.pdf`);
};

// 💾 匯出 JSON
const exportJSON = () => {
  const jsonStr = JSON.stringify(props.config, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "EV_Config.json";
  link.click();
};

// 📤 匯入 JSON
const triggerImport = () => fileInput.value.click();

const importJSON = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const imported = JSON.parse(e.target.result);
      Object.assign(props.config, imported); // 套用新設定
      alert("✅ 已成功匯入設定！");
    } catch (err) {
      alert("❌ 匯入失敗，請確認檔案格式正確。");
    }
  };
  reader.readAsText(file);
};

const result = ref(null);

const simulate = () => {
  result.value = {
    acceleration: (Math.random() * 3 + 2).toFixed(2),
    lapTime: (Math.random() * 10 + 30).toFixed(2),
    handling: Math.random() > 0.5 ? "轉向不足" : "轉向過度",
  };
};
</script>

<style scoped>
#exportArea {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
