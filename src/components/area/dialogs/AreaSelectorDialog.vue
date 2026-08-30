<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <q-card class="selector-card">
      <!-- ========================= -->
      <!-- Header -->
      <!-- ========================= -->

      <q-card-section class="row items-center">
        <div class="text-h6">選擇區域</div>

        <q-space />

        <q-btn
          flat
          round
          dense
          icon="close"
          aria-label="關閉"
          @click="emit('update:modelValue', false)"
        />
      </q-card-section>

      <q-separator />

      <!-- ========================= -->
      <!-- Categories -->
      <!-- ========================= -->

      <q-card-section class="row q-col-gutter-md">
        <div
          v-for="category in detectedCategories"
          :key="category.name"
          class="col-6 col-sm-4"
        >
          <q-btn
            class="full-width"
            stack
            unelevated
            :outline="selected !== category.name"
            :color="selected === category.name ? 'primary' : 'grey-7'"
            :icon="category.icon"
            :label="category.name"
            @click="emit('select', category.name)"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from "vue";

// =========================
// Props
// =========================

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  /*
   * Firebase Areas
   *
   * [
   *   {
   *     id: "...",
   *     name: "...",
   *     tag: "living"
   *   }
   * ]
   */
  areas: {
    type: Array,
    default: () => [],
  },

  selected: {
    type: String,
    default: "All",
  },
});

// =========================
// Events
// =========================

const emit = defineEmits(["update:modelValue", "select"]);

// =========================
// Tag → Icon
// =========================

function tagIcon(tag) {
  const icons = {
    living: "home",

    bath: "shower",

    tent: "holiday_village",

    car: "no_crash",

    doc: "document_scanner",

    kitchen: "kitchen",

    bedroom: "bed",

    storage: "inventory_2",

    garage: "garage",
  };

  return icons[tag] || "place";
}

// =========================
// Detect Firebase Tags
// =========================

const detectedCategories = computed(() => {
  const tagSet = new Set();

  props.areas.forEach((area) => {
    const tag = typeof area?.tag === "string" ? area.tag.trim() : "";

    if (tag) {
      tagSet.add(tag);
    }
  });

  // All 永遠存在
  const categories = [
    {
      name: "All",
      icon: "apps",
    },
  ];

  // Firebase 自動偵測
  Array.from(tagSet)
    .sort()
    .forEach((tag) => {
      categories.push({
        name: tag,
        icon: tagIcon(tag),
      });
    });

  return categories;
});
</script>

<style scoped>
.selector-card {
  width: min(560px, 92vw);

  max-width: 92vw;
}
</style>
