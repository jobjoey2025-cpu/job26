<template>
  <!-- ✅ 有 children → 展開 -->
  <q-expansion-item
    v-if="props.children"
    :icon="props.icon"
    :label="props.title"
    :caption="props.caption"
    expand-separator
    dense
    default-opened
    :to="props.to"
  >
    <!-- 子項目 -->
    <EssentialLink
      v-for="child in props.children"
      :key="child.title"
      v-bind="child"
    />
  </q-expansion-item>

  <!-- ✅ 沒 children → 原本 item -->
  <q-item v-else clickable v-ripple v-bind="linkProps">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
import { computed } from 'vue'

import EssentialLink from './EssentialLink.vue' // 🔥 遞迴


const props = defineProps({
  title: { type: String, required: true },
  caption: { type: String, default: '' },
  icon: { type: String, default: '' },
  to: { type: [String, Object], default: null }, // 內部路由
  href: { type: String, default: null }, // 外部網址
  target: { type: String, default: '_blank' },
  // 🔥 新增
  children: { type: Array, default: null },

})

const linkProps = computed(() => {
  if (props.to) {
    return { to: props.to } // Vue Router
  }
  if (props.href) {
    return { tag: 'a', href: props.href, target: props.target }
  }
  return {}
})
</script>
