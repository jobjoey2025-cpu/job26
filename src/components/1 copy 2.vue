<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Quasar 語音控制</div>

    <!-- 開始語音輸入 -->
    <q-btn
      size="48px"
      color="primary"
      icon="mic"
      label="開始語音輸入"
      @click="startVoice"
      class="q-mb-md"
    />

    <!-- 語音辨識結果 -->
    <q-input
      v-model="text"
      label="語音辨識結果"
      type="textarea"
      outlined
      class="q-mb-md"
    />

    <!-- 語音合成 -->
    <q-btn
      size="48px"
      color="secondary"
      icon="volume_up"
      label="唸出文字🐷"
      @click="speak"
      class="q-mr-sm"
    />
    <hr />
    <!-- 執行指令 -->
    <q-btn
      size="48px"
      color="positive"
      icon="play_arrow"
      label="執行指令🐷"
      @click="runCommand"
      class="q-mr-sm"
    />

    <!-- 執行狀態 -->
    <div class="q-mt-md text-body1">
      <q-icon name="info" class="q-mr-sm" />
      {{ status }}
    </div>

    <br />
    <q-btn
      size="48px"
      label="Alert 唸出參考"
      color="primary"
      @click="alert = true"
      class="q-mr-sm"
    />
    <hr />

    <!-- 語音合成 -->
    <q-btn
      size="48px"
      color="secondary"
      icon="volume_up"
      label="唸出參考指令"
      @click="speak2"
      class="q-mr-sm"
    />

    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Alert</div>
        </q-card-section>

        <q-card-section class="q-pt-none"> {{ alertMessage }}</q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const text = ref("");
const status = ref("準備就緒");

const alert = ref(false);
const alertTitle = ref("語音指令參考");
const alertMessage = ref("開啟谷歌，開啟部落格，");

let recognition = null;

// 開始語音辨識
function startVoice() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    status.value = "此瀏覽器不支援語音辨識";
    return;
  }

  // 避免重複啟動辨識
  if (recognition) {
    recognition.abort();
    recognition = null;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "zh-TW";
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.onstart = () => {
    status.value = "正在聆聽...";
  };

  recognition.onresult = (event) => {
    const result = event.results?.[0]?.[0]?.transcript;

    if (result) {
      text.value = result;
      status.value = "辨識完成";
    } else {
      status.value = "沒有辨識到語音內容";
    }
  };

  // 修正：使用反引號包住模板字串
  recognition.onerror = (event) => {
    status.value = `語音錯誤：${event.error}`;
  };

  recognition.onend = () => {
    if (status.value === "正在聆聽...") {
      status.value = "聆聽結束";
    }
  };

  try {
    recognition.start();
  } catch (error) {
    status.value = `無法啟動語音辨識：${error.message}`;
  }
}

// 將文字轉換成語音
function speak() {
  if (!("speechSynthesis" in window)) {
    status.value = "此環境不支援語音合成";
    return;
  }

  const content = text.value.trim();

  if (!content) {
    status.value = "請先輸入或辨識文字";
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(content);

  utterance.lang = "zh-TW";

  utterance.onstart = () => {
    status.value = "正在唸出文字...";
  };

  utterance.onend = () => {
    status.value = "語音播放完成";
  };

  utterance.onerror = () => {
    status.value = "語音播放發生錯誤";
  };

  window.speechSynthesis.speak(utterance);
}

// 將文字轉換成語音
function speak2() {
  if (!("speechSynthesis" in window)) {
    return;
  }

  // 讀取 Alert Dialog 的標題與內容
  const content = `${alertTitle.value}，${alertMessage.value}`;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = "zh-TW";
  utterance.rate = 1;

  window.speechSynthesis.speak(utterance);
}

function runCommand() {
  const command = text.value.trim().toLowerCase();

  if (!command) {
    status.value = "請先輸入語音指令";
    return;
  }

  // 開啟 Google
  if (
    command.includes("開啟 google") ||
    command.includes("打開google") ||
    command.includes("開啟谷歌") ||
    command.includes("打開谷歌")
  ) {
    status.value = "正在開啟 Google...";

    window.open("https://www.google.com", "_blank");
    status.value = "已送出開啟 Google 的要求";
  } else if (command.includes("打開巡檢")) {
    status.value = "執行：開啟巡檢頁面";

    // router.push('/inspection')
  } else if (command.includes("停止")) {
    status.value = "收到停止指令";
  } else {
    status.value = `尚未定義此指令：${text.value.trim()}`;
  }
}

// 元件卸載時停止語音功能
onBeforeUnmount(() => {
  if (recognition) {
    recognition.onresult = null;
    recognition.onerror = null;
    recognition.onend = null;
    recognition.abort();
    recognition = null;
  }

  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
});
</script>
