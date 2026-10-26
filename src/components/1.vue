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
    <!-- <q-input
      v-model="text"
      label="語音辨識結果"
      type="textarea"
      outlined
      class="q-mb-md"
      input-style="font-size: 28px;"
    /> -->
    <div>
      <q-input
        v-model="text"
        type="textarea"
        outlined
        class="q-mb-none"
        input-style="font-size: 28px;"
      />

      <div class="text-right text-grey-7 text-caption q-mt-xs">
        語音辨識結果
      </div>
    </div>
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
      label="Alert 參考指令"
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
import { Notify } from "quasar";

const text = ref("");
const status = ref("準備就緒");

const alert = ref(false);
const alertTitle = ref("語音參考");
// ------ joey modify
const alertMessage = ref(`開啟谷歌，複製部落格，打開gpt，
谷歌指令，最近排程`);

const alertMessage2 = ref(`谷歌指令參考，今天天氣，明天天氣，現在幾點，
台股指數，道瓊指數`);

const alertMessage3 = ref("衣服整理，垃圾整理，Eating on time，");

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

// function runCommand() {
async function runCommand() {
  const command = text.value.trim().toLowerCase();

  if (!command) {
    status.value = "請先輸入語音指令";
    return;
  }
  // 開啟 GPT / ChatGPT   ---- ---- ---- ----
  if (
    command.includes("打開 gpt") ||
    command.includes("開啟 gpt") ||
    command.includes("打開gpt") ||
    command.includes("開啟gpt") ||
    command.includes("打開 chatgpt") ||
    command.includes("開啟 chatgpt") ||
    command.includes("開啟聊天機器人")
  ) {
    status.value = "正在開啟 ChatGPT...";
    window.open("https://chatgpt.com/", "_blank");
    status.value = "已送出開啟 ChatGPT 的要求";

    // 開啟 Google    ----------
  } else if (
    command.includes("開啟google") ||
    command.includes("開啟谷歌") ||
    // command.includes("唸出Google指令") ||
    command.includes("打開google")
  ) {
    status.value = "正在開啟 Google...";
    window.open("https://www.google.com", "_blank");
    status.value = "已送出開啟 Google 的要求";

    // 複製部落格網址
  } else if (
    command.includes("複製部落格網址") ||
    command.includes("複製部落格")
  ) {
    const blogUrl =
      "https://joey20090710.blogspot.com/2026/10/diary-repair-shop-future.html";

    try {
      await navigator.clipboard.writeText(blogUrl);

      status.value = "部落格網址已複製！";

      Notify.create({
        type: "positive",
        message: "部落格網址已複製！",
        position: "top",
      });
    } catch (error) {
      status.value = "複製失敗，請檢查瀏覽器權限";

      Notify.create({
        type: "negative",
        message: "複製失敗，請確認網站使用 HTTPS",
        position: "top",
      });
    }

    // ---- ---- ---- ---- -------- ---- ---- ---

    // 唸出 Google 指令 ----------
  } else if (
    command.includes("唸出指令") ||
    command.includes("Google指令") ||
    command.includes("谷歌指令")
  ) {
    if (!("speechSynthesis" in window)) {
      status.value = "此瀏覽器不支援語音合成";
      return;
    }

    // 要唸出的文字
    const content = `${alertTitle.value}，${alertMessage2.value}`;

    if (!content.trim()) {
      status.value = "沒有可唸出的文字";
      return;
    }

    // 停止先前的語音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "zh-TW";
    utterance.rate = 1;

    utterance.onstart = () => {
      status.value = "正在唸出 Google 指令...";
    };

    utterance.onend = () => {
      status.value = "Google 指令唸出完成";
    };

    utterance.onerror = (event) => {
      status.value = `語音合成錯誤：${event.error}`;
    };

    window.speechSynthesis.speak(utterance);

    // -------

    // 唸出 排程 ----------
  } else if (command.includes("唸出排程") || command.includes("最近排程")) {
    if (!("speechSynthesis" in window)) {
      status.value = "此瀏覽器不支援語音合成";
      return;
    }

    // 要唸出的文字
    const content = `${alertTitle.value}，${alertMessage3.value}`;

    if (!content.trim()) {
      status.value = "沒有可唸出的文字";
      return;
    }

    // 停止先前的語音
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(content);
    utterance.lang = "zh-TW";
    utterance.rate = 1;

    utterance.onstart = () => {
      status.value = "正在唸出 Google 指令...";
    };

    utterance.onend = () => {
      status.value = "Google 指令唸出完成";
    };

    utterance.onerror = (event) => {
      status.value = `語音合成錯誤：${event.error}`;
    };

    window.speechSynthesis.speak(utterance);

    // 開啟巡檢
  } else if (command.includes("打開巡檢")) {
    status.value = "執行：開啟巡檢頁面";

    // router.push('/inspection')

    // 停止指令
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
