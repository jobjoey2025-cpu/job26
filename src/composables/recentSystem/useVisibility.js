import { ref } from "vue";
import { createVisibilityItems } from "../../data/recentSystem/visibility.js";

export function useVisibility() {
  const visibilityItems = ref(createVisibilityItems());

  function setVisibilityItem(itemId, done) {
    const item = visibilityItems.value.find(
      (candidate) => candidate.id === itemId
    );

    if (item) {
      item.done = done;
    }
  }

  function resetVisibility() {
    visibilityItems.value.forEach((item) => {
      item.done = false;
    });
  }

  return {
    resetVisibility,
    setVisibilityItem,
    visibilityItems,
  };
}
