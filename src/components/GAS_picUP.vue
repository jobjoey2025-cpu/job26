```vue
<template>
  <q-page class="bg-grey-2 q-pa-md">
    <q-card flat bordered class="q-mx-auto" style="max-width: 600px">
      <!-- Header -->
      <q-card-section class="bg-primary text-white">
        <div class="text-h5">📷 上傳照片</div>

        <div class="text-caption">Upload Photo</div>
      </q-card-section>

      <!-- Content -->
      <q-card-section class="text-center q-pa-xl">
        <q-icon name="cloud_upload" size="80px" color="primary" />

        <div class="text-h6 q-mt-md">照片上傳</div>

        <div class="text-body2 text-grey-7 q-mt-sm">
          點擊下方按鈕開啟照片上傳功能
        </div>

        <q-btn
          color="primary"
          icon="add_a_photo"
          label="開啟照片上傳"
          size="lg"
          class="q-mt-lg"
          @click="openUpload"
        />
      </q-card-section>

      <!-- Back -->
      <q-card-actions align="center">
        <q-btn flat icon="arrow_back" label="返回" @click="goBack" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const GAS_URL =
  "https://script.google.com/macros/s/AKfycbzJ_d-j6Z_kxKvp7RNu_93yuueqZwiFoNfzm0FI_GR0SM9Av9bwwLRz0p3ZHkEYOE-j/exec";

function openUpload() {
  window.open(GAS_URL, "_blank", "width=520,height=620");
}

function goBack() {
  router.back();
}
</script>
```
