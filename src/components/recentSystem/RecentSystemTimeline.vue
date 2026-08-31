<template>
  <q-timeline color="primary">
    <section
      v-for="item in sections"
      :id="item.id"
      :key="item.id"
      class="timeline-section"
      :data-section="item.id"
    >
      <q-timeline-entry
        :title="item.title"
        :subtitle="item.subtitle"
        :icon="item.icon"
        :color="item.color"
      >
        <div v-html="item.summary"></div>

        <q-list
          v-if="item.details.length"
          dense
          bordered
          separator
          class="rounded-list"
        >
          <q-item
            v-for="(detail, detailIndex) in item.details"
            :key="`${item.id}-${detailIndex}`"
          >
            <q-item-section avatar>
              <q-icon name="arrow_right" :color="item.color" />
            </q-item-section>
            <q-item-section><span v-html="detail"></span></q-item-section>
          </q-item>
        </q-list>

        <RecentSystemTest
          v-if="item.id === 'test'"
          :actions="testActions"
        />

        <RecentSystemVisibility
          v-if="item.id === 'visibility'"
          :energy-levels="energyLevels"
          :visibility-items="visibilityItems"
          @update-item="(itemId, done) => $emit('update-visibility', itemId, done)"
        />

        <q-banner
          v-if="item.id === 'space'"
          rounded
          class="bg-grey-9 text-white q-mt-md"
        >
          <template #avatar>
            <q-icon name="self_improvement" />
          </template>
          留白不是浪費。它讓系統重新顯示全貌，避免只處理眼前噪音。
        </q-banner>
      </q-timeline-entry>
    </section>
  </q-timeline>
</template>

<script setup>
import RecentSystemTest from "./RecentSystemTest.vue";
import RecentSystemVisibility from "./RecentSystemVisibility.vue";

defineProps({
  energyLevels: {
    type: Array,
    required: true,
  },
  sections: {
    type: Array,
    required: true,
  },
  testActions: {
    type: Array,
    required: true,
  },
  visibilityItems: {
    type: Array,
    required: true,
  },
});

defineEmits(["update-visibility"]);
</script>

<style scoped>
.timeline-section {
  scroll-margin-top: 24px;
}

.rounded-list {
  border-radius: 14px;
}
</style>
