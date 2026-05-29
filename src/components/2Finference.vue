<template>
  <q-page class="q-pa-md">
    <div class="text-h5 q-mb-md">2樓老屋翻修工程清單</div>
    <!-- icon="construction" -->
    <q-expansion-item
      v-for="section in sections"
      :key="section.title"
      :label="section.title"
      :icon="section.icon"
      class="q-mb-sm"
      expand-separator
    >
      <q-card>
        <q-card-section>
          <q-list bordered separator>
            <q-item v-for="item in section.items" :key="item">
              <q-item-section>
                {{ item }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-expansion-item>
  </q-page>
  <h4 style="text-align: center">圖卡</h4>
  <div class="row q-col-gutter-md">
    <div class="col-12 col-md-3">
      <!-- ----- -->
      <!-- <div class="q-pa-md row items-start q-gutter-md"> -->
      <q-card class="my-card" flat bordered>
        <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
        <!-- <q-img src="./statics/rc10.jpg" /> -->
        <q-img src="./statics/2F_CAD.png" />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat color="primary" label="Share" />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
    <!-- ------ -->
    <div class="col-12 col-md-3">
      <q-card class="my-card" flat bordered>
        <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
        <!-- <q-img src="./statics/rc10.jpg" /> -->
        <q-img src="./statics/Front.png" />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            color="primary"
            label="Notion"
            href="https://www.notion.so/2F-CAD-36d020032b29804d8c26ddeda99198e0?source=copy_link"
            target="_blank"
          />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>

    <!-- ------ -->
    <div class="col-12 col-md-3">
      <q-card class="my-card" flat bordered>
        <!-- <q-img src="https://cdn.quasar.dev/img/parallax2.jpg" /> -->
        <!-- <q-img src="./statics/rc10.jpg" /> -->
        <q-img src="./statics/side.png" />

        <q-card-section>
          <div class="text-overline text-orange-9">Overline</div>
          <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
          <div class="text-caption text-grey">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </div>
        </q-card-section>

        <q-card-actions>
          <q-btn
            flat
            color="primary"
            label="Notion"
            href="https://www.notion.so/2F-CAD-36d020032b29804d8c26ddeda99198e0?source=copy_link"
            target="_blank"
          />
          <q-btn flat color="secondary" label="Book" />

          <q-space />

          <q-btn
            color="grey"
            round
            flat
            dense
            :icon="expanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
            @click="expanded = !expanded"
          />
        </q-card-actions>

        <q-slide-transition>
          <div v-show="expanded">
            <q-separator />
            <q-card-section class="text-subtitle2">
              {{ lorem }}
            </q-card-section>
          </div>
        </q-slide-transition>
      </q-card>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup>
import { ref } from "vue";

const expanded = ref(false);

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
const sections = [
  {
    title: "一、基礎檢查",
    icon: "close",
    items: [
      "結構安全（樑柱裂縫、樓板下陷）",
      "漏水 / 壁癌檢查",
      "水電老化評估",
    ],
  },
  {
    title: "二、拆除工程",
    icon: "next_week",
    items: [
      "* 拆舊裝潢（天花板、櫃體）",
      "打除舊地板 / 磁磚",
      "拆除舊管線",
      "隔間牆拆除（非承重牆）",
    ],
  },
  {
    title: "四、水電工程",
    icon: "tools_power_drill",
    items: [
      "* 單線圖位置",
      "全室重拉電線",
      "配電箱更新",
      "插座重新配置",
      "冷氣專用迴路",
      "冷熱水管重拉",
      "排水系統調整",
    ],
  },
  {
    title: "三、泥作工程",
    icon: "close",
    items: ["補牆 / 重砌牆", "地面找平", "浴室防水", "磁磚鋪設"],
  },

  {
    title: "五、防水工程",
    icon: "close",
    items: ["浴室防水", "外牆防水", "屋頂防水（如適用）"],
  },
  {
    title: "六、木作 / 隔間",
    icon: "festival",
    items: ["* 用春帳代替輕隔間", "天花板施工", "輕隔間", "收納櫃體"],
  },
  {
    title: "七、門窗工程",
    icon: "window",
    items: ["* 氣密窗更換 (這個很後面了)", "房門 / 浴室門", "陽台門"],
  },
  {
    title: "八、地板工程",
    icon: "engineering",
    items: ["* 磁磚(DIY 慢慢推進)", "SPC 地板", "木地板"],
  },
  {
    title: "九、油漆工程",
    icon: "close",
    items: ["用速貼牆代替", "批土", "防霉漆", "全室粉刷"],
  },
  {
    title: "十、設備安裝",
    icon: "front_loader",
    items: ["燈具", "冷氣", "熱水器", "廚具"],
  },
  {
    title: "十一、其他注意事項",
    icon: "warning",
    items: ["xx 裝修許可申請", "xx 施工時間限制", "* 垃圾清運", "xx 鄰居影響"],
  },
  {
    title: "阿媽的庭院 - 低維護的方法",
    icon: "castle",
    items: ["* 要$300w的閒錢", "?? 租出去", "垃圾清運", "* 鄰居影響 wait time"],
  },
];
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
