<template>
  <q-list bordered separator class="bg-white rounded-borders">
    <q-item v-for="area in areas" :key="area.id">
      <q-item-section avatar>
        <q-img
          v-if="area.photos?.length"
          :src="area.photos[0]"
          class="area-thumbnail"
          fit="cover"
          @click="$emit('photo', area.photos[0])"
        />
        <q-avatar v-else color="grey-3">
          <q-icon :name="area.icon || 'place'" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-weight-bold">{{ area.name }}</q-item-label>
        <q-item-label caption>
          {{ area.photos?.length || 0 }} 張照片
        </q-item-label>
      </q-item-section>

      <q-item-section side>
        <q-btn
          flat
          round
          icon="add_a_photo"
          aria-label="新增照片"
          @click="$emit('upload', area)"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  areas: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["photo", "upload"]);
</script>

<style scoped>
.area-thumbnail {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  cursor: pointer;
}
</style>

