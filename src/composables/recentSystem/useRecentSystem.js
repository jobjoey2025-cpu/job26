import { computed, ref } from "vue";
import { quickNotes } from "../../data/recentSystem/quickNotes.js";
import {
  testActions,
  timelineSections,
} from "../../data/recentSystem/timeline.js";
import { energyLevels } from "../../data/recentSystem/visibility.js";
import { useChecklist } from "./useChecklist.js";
import { useRecentSystemNavigation } from "./useRecentSystemNavigation.js";
import { useVisibility } from "./useVisibility.js";

export function useRecentSystem() {
  const dialogOpen = ref(false);
  const navigation = useRecentSystemNavigation();
  const checklist = useChecklist();
  const visibility = useVisibility();

  const outlineItems = computed(() => [
    ...timelineSections,
    {
      id: "checklist",
      title: "現場快速檢查 (不同 json)",
      icon: "checklist",
      color: "positive",
    },
  ]);

  function resetAll() {
    checklist.resetChecklist();
    visibility.resetVisibility();
  }

  return {
    activeSection: navigation.activeSection,
    checklistSections: checklist.checklistSections,
    completedCount: checklist.completedCount,
    dialogOpen,
    energyLevels,
    isSectionComplete: checklist.isSectionComplete,
    outlineItems,
    progress: checklist.progress,
    quickNotes,
    resetAll,
    scrollToSection: navigation.scrollToSection,
    sectionCompleted: checklist.sectionCompleted,
    setVisibilityItem: visibility.setVisibilityItem,
    testActions,
    timelineSections,
    toggleChecklistItem: checklist.toggleChecklistItem,
    totalCount: checklist.totalCount,
    visibilityItems: visibility.visibilityItems,
  };
}
