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
</template>

<script setup>
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

<style scoped></style>
