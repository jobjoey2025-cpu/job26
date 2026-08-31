<template>
  <div>
    <!-- 頁面大綱 -->
    <q-card flat bordered class="outline-card q-mb-xl">
      <q-card-section>
        <div class="text-subtitle1 text-weight-bold q-mb-sm">頁面大綱</div>
        <q-list dense class="outline-list">
          <q-item
            v-for="item in items"
            :key="item.id"
            clickable
            :active="activeSection === item.id"
            active-class="outline-active"
            @click="$emit('select', item.id)"
          >
            <q-item-section avatar>
              <q-icon
                :name="item.icon"
                :color="activeSection === item.id ? item.color : 'grey-6'"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label
                :class="{ 'text-weight-bold': activeSection === item.id }"
              >
                {{ item.navTitle ?? item.title }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
defineProps({
  activeSection: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
});

defineEmits(["select"]);
</script>

<style scoped>
.outline-card {
  border-radius: 14px;
}

.outline-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 4px;
}

.outline-active {
  color: var(--q-primary);
  background: rgba(25, 118, 210, 0.08);
  border-left: 3px solid var(--q-primary);
}

@media (max-width: 599px) {
  .outline-list {
    grid-template-columns: 1fr;
  }
}
</style>
