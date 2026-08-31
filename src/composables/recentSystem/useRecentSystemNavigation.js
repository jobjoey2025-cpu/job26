import { nextTick, onBeforeUnmount, onMounted, ref } from "vue";

export function useRecentSystemNavigation() {
  const activeSection = ref("problem");

  let observer = null;

  function scrollToSection(id) {
    const element = document.getElementById(id);

    if (!element) {
      return;
    }

    activeSection.value = id;

    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  onMounted(async () => {
    await nextTick();

    if (!("IntersectionObserver" in window)) {
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top)
          );

        const id = visible[0]?.target.dataset.section;

        if (id) {
          activeSection.value = id;
        }
      },
      {
        rootMargin: "-100px 0px -55% 0px",
        threshold: [0, 0.1, 0.5],
      }
    );

    document
      .querySelectorAll(".timeline-section")
      .forEach((element) => {
        observer.observe(element);
      });
  });

  onBeforeUnmount(() => {
    observer?.disconnect();
  });

  return {
    activeSection,
    scrollToSection,
  };
}
