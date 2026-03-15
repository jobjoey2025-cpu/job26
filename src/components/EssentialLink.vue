<template>
  <q-item clickable v-ripple v-bind="linkProps">
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

const props = defineProps({
  title: { type: String, required: true },
  caption: { type: String, default: '' },
  icon: { type: String, default: '' },
  to: { type: [String, Object], default: null }, // 內部路由
  href: { type: String, default: null }, // 外部網址
  target: { type: String, default: '_blank' },
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
