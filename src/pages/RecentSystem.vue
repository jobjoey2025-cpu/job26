<template>
  <q-page class="q-pa-md page-shell">
    <main class="page-container">
      <RecentSystemHeader @open-notes="dialogOpen = true" />

      <RecentSystemOutline
        :items="outlineItems"
        :active-section="activeSection"
        @select="scrollToSection"
      />

      <RecentSystemTimeline
        :sections="timelineSections"
        :test-actions="testActions"
        :energy-levels="energyLevels"
        :visibility-items="visibilityItems"
        @update-visibility="setVisibilityItem"
      />

      <RecentSystemChecklist
        :checklist-sections="checklistSections"
        :completed-count="completedCount"
        :total-count="totalCount"
        :progress="progress"
        :section-completed="sectionCompleted"
        :is-section-complete="isSectionComplete"
        @toggle-item="toggleChecklistItem"
        @reset="resetAll"
      />
    </main>

    <RecentSystemNoteDialog v-model="dialogOpen" :notes="quickNotes" />
  </q-page>
</template>

<script setup>
import RecentSystemChecklist from "../components/recentSystem/RecentSystemChecklist.vue";
import RecentSystemHeader from "../components/recentSystem/RecentSystemHeader.vue";
import RecentSystemNoteDialog from "../components/recentSystem/RecentSystemNoteDialog.vue";
import RecentSystemOutline from "../components/recentSystem/RecentSystemOutline.vue";
import RecentSystemTimeline from "../components/recentSystem/RecentSystemTimeline.vue";
import { useRecentSystem } from "../composables/recentSystem/useRecentSystem.js";

const {
  activeSection,
  checklistSections,
  completedCount,
  dialogOpen,
  energyLevels,
  isSectionComplete,
  outlineItems,
  progress,
  quickNotes,
  resetAll,
  scrollToSection,
  sectionCompleted,
  setVisibilityItem,
  testActions,
  timelineSections,
  toggleChecklistItem,
  totalCount,
  visibilityItems,
} = useRecentSystem();
</script>

<style scoped>
.page-shell {
  background: radial-gradient(
      circle at top right,
      rgba(25, 118, 210, 0.08),
      transparent 34rem
    ),
    #fafafa;
}

.page-container {
  width: min(100%, 960px);
  margin: 0 auto;
}
</style>
