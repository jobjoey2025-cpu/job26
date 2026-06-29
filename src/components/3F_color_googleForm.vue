<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px">
      <q-card-section>
        <div class="text-h6">Google Form 測試</div>
      </q-card-section>

      <q-card-section>
        <q-btn
          color="primary"
          label="送出到 Google Form"
          @click="sendToGoogleForm"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
// const FORM_URL = "https://docs.google.com/forms/d/e/你的FormID/formResponse";
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSf6ZvAV_156eeHf-pbHUumVYDTUno7OGDFZAmm8rkqW-y8prg/formResponse";

// 1FAIpQLSf6ZvAV_156eeHf-pbHUumVYDTUno7OGDFZAmm8rkqW-y8prg
// 1T6GR230ft61ktk8aAB0PStiPV9bqd1NSp75yDkKXYMc
// 改成你的 entry
// const ENTRY_ID = "entry.123456789";
const ENTRY_ID = "entry.1483699422";


async function sendToGoogleForm() {
  const formData = new FormData();

  formData.append(ENTRY_ID, "這是Q寫的");

  try {
    await fetch(FORM_URL, {
      method: "POST",
      mode: "no-cors",
      body: formData,
    });

    console.log("送出成功");
  } catch (err) {
    console.error(err);
  }
}
</script>
