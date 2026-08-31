import { computed, ref } from "vue";
import { createChecklistSections } from "../../data/recentSystem/checklist.js";

export function useChecklist() {
  const checklistSections = ref(createChecklistSections());

  const totalCount = computed(() =>
    checklistSections.value.reduce(
      (total, section) => total + section.items.length,
      0
    )
  );

  const completedCount = computed(() =>
    checklistSections.value.reduce(
      (total, section) =>
        total + section.items.filter((item) => item.checked).length,
      0
    )
  );

  const progress = computed(() =>
    totalCount.value === 0
      ? 0
      : Math.round((completedCount.value / totalCount.value) * 100)
  );

  function sectionCompleted(section) {
    return section.items.filter((item) => item.checked).length;
  }

  function isSectionComplete(section) {
    return (
      section.items.length > 0 &&
      sectionCompleted(section) === section.items.length
    );
  }

  function toggleChecklistItem(sectionId, itemId) {
    const section = checklistSections.value.find(
      (candidate) => candidate.id === sectionId
    );
    const item = section?.items.find((candidate) => candidate.id === itemId);

    if (item) {
      item.checked = !item.checked;
    }
  }

  function resetChecklist() {
    checklistSections.value.forEach((section) => {
      section.items.forEach((item) => {
        item.checked = false;
      });
    });
  }

  return {
    checklistSections,
    completedCount,
    isSectionComplete,
    progress,
    resetChecklist,
    sectionCompleted,
    toggleChecklistItem,
    totalCount,
  };
}
