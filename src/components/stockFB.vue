<!-- 不是做人冊不好, 是這個技術太難了, 用到可以收入幾乎不可能(以現在的技術) -->
<!-- 等到 GPT LLM 才能事半功倍, just do it 是帝王宣傳, 也是 LLM 之前的不得不作法 -->

<!-- 不能直接「從 Quasar 啟動 Colab Runtime」。
因為：
Google Colab 沒有公開「啟動 notebook」API
Colab runtime 必須人工開啟
ngrok URL 每次重啟都會變

👉 Quasar 只能「呼叫已經啟動的 Colab API」 -->


<template>
  <q-btn
    flat
    color="primary"
    label="stockFB (FBstock_batch25-09.ipynb)"
    href="https://colab.research.google.com/drive/1oPQuE_9RipXL9J9oNh5VHUnIrwOxj1jj#scrollTo=pOkwaGOh_QJX
"
    target="_blank"
    icon="open_in_new"
  />

  <q-btn
    flat
    color="primary"
    label="股票新聞排名 (stk_ch06 個股分析機器人.ipynb)"
    href="https://colab.research.google.com/drive/1QdmwenYKVAqn0bosP2EgLQKflYcRv94z?hl=zh-tw#scrollTo=sphXI8C8a8LF
"
    target="_blank"
    icon="open_in_new"
  />
  <q-btn
    flat
    color="primary"
    label="閱讀 pdf 年報 這個降版 OK (ch7 年報問答機器人.ipynb)"
    href="https://colab.research.google.com/drive/1mt-KWDiuzORvwiRFkmegzKRx3ndP4VC6?hl=zh-tw#scrollTo=gF-P490HIwou
"
    target="_blank"
    icon="open_in_new"
  />
  <q-btn
    flat
    color="primary"
    label="cp8 NG 版本衝突 沒人修好"
    href="https://colab.research.google.com/drive/1avAdWoJ4zLH8imynxLl4EGS1le_IXqw5#scrollTo=v8Kpk7J_YY1q
"
    target="_blank"
    icon="open_in_new"
  />

  <hr />

  <q-page padding class="dashboard-page">
    <q-btn
      label="更新"
      color="primary"
      @click="fetchStocks"
      :loading="loading"
    />

    <div class="row q-col-gutter-md q-mt-md">
      <div v-for="stock in stocks" :key="stock.symbol" class="col-6 col-md-3">
        <q-card bordered>
          <q-card-section class="text-center">
            <div class="text-h6">
              {{ stock.symbol }}
            </div>

            <div class="text-h5 text-primary">$ {{ stock.price }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
  <hr />
  <div class="q-pa-md q-gutter-sm">
    <q-banner dense inline-actions class="text-white bg-primary">
      <template v-slot:avatar>
        <q-icon name="signal_wifi_off" color="white" />
      </template>
      <!-- You have lost connection to the internet. This app is offline. -->
      This app is offline.
      <template v-slot:action>
        <q-btn flat color="white" label="Link 104" />
      </template>
      <!-- <div>VTOL ==  https://github.com/jobjoey2021/VTOL</div> -->
    </q-banner>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const stocks = ref([]);
const loading = ref(false);

const fetchStocks = async () => {
  loading.value = true;

  try {
    const res = await fetch("https://xxxxx.ngrok-free.app/stocks");

    stocks.value = await res.json();
  } catch (err) {
    console.error(err);
  }

  loading.value = false;
};

onMounted(() => {
  fetchStocks();
});
</script>

<style>
/* 覆蓋 q-page 高度（最常用） */
.dashboard-page {
  min-height: auto !important;
}
</style>
