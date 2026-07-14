<template>
  <!-- <div class="q-pa-xs"> -->
  <q-page>
    <q-banner dense inline-actions class="text-white bg-primary">
      <template #avatar>
        <q-icon name="signal_wifi_off" color="white" />
      </template>

      ⇩⇩⇩ 樓板 分解 整理 ⇩⇩⇩

      <template #action>
        <q-btn flat color="white" label="Link color region" />
      </template>
    </q-banner>
    <!-- ------- -->
    <div class="q-pa-md" style="text-align: center">
      <div style="max-width: 600px">
        <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
          <q-tab class="text-purple" name="mails" label="Mails" />
          <q-tab class="text-orange" name="alarms" label="Alarms" />
          <q-tab class="text-teal" name="notion" label="Notion" />
        </q-tabs>

        <div class="q-gutter-y-sm">
          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="fade"
            transition-next="fade"
            class="bg-orange text-white text-center"
          >
            <q-tab-panel name="mails">
              <div class="text-h6">Mails</div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.1
            </q-tab-panel>
            ▸ …
          </q-tab-panels>

          <q-tab-panels
            v-model="tab"
            animated
            transition-prev="jump-up"
            transition-next="jump-down"
            class="bg-teal text-white text-center"
          >
            ▸ …
            <q-tab-panel name="alarms">
              <div class="text-h6">Alarms</div>
              Ad molestiae non facere animi nobis, similique nemo.
            </q-tab-panel>

            <q-tab-panel name="notion">
              <div class="text-h6">Notion</div>
              <a
                href="https://app.notion.com/p/34e020032b2980d68a09f2320ca5fac6?source=copy_link"
                >空間箱 檢查照片</a
              >
               -- 包含 龜山蘇澳
            </q-tab-panel>
          </q-tab-panels>
        </div>
      </div>
    </div>

    <!-- ------- -->
    <a3F_color class="q-mb-xs" />
    <a3F_color_desk />
    <a3F_color2 />
    <a3F_structure />
    <!-- </div> -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const tab = ref("mails");

// import { ref } from 'vue'
// import draggable from "components/draggable.vue";
import a3F_color from "components/a3F_color.vue";
import a3F_color2 from "components/a3F_color2.vue";
import a3F_structure from "components/a3F_structure.vue";
import a3F_color_desk from "components/a3F_color_desk.vue";
</script>

<style scoped>
.q-page {
  min-height: auto !important;
}
</style>
