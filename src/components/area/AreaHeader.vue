<template>
  <q-card flat bordered class="q-mb-md">
    <q-card-section
      class="bg-primary text-white row items-center justify-between"
    >
      <div>
        <div class="text-h5">🏠 2F +3F 空間 Area 管理</div>
        <div class="text-caption">收納 over view / Living Lab / Construction MVP</div>
      </div>
      <!-- toggle-color="white" -->
      <q-btn-toggle
        :model-value="viewMode"
        toggle-color="blue"
        color="primary"
        text-color="white"
        :options="viewOptions"
        @update:model-value="$emit('update:viewMode', $event)"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  viewMode: {
    type: String,
    default: "card",
    validator: (value) => ["card", "list"].includes(value),
  },
});

defineEmits(["update:viewMode"]);

const viewOptions = [
  { label: "Card", value: "card", icon: "grid_view" },
  { label: "List", value: "list", icon: "view_list" },
];
</script>

