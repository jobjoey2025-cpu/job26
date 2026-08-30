<template>
  <q-card bordered class="area-card full-height">
    <q-card-section>
      <div class="row items-center no-wrap q-gutter-sm">
        <q-avatar color="grey-3" size="56px">
          <q-icon :name="area.icon || 'place'" size="30px" />
        </q-avatar>

        <div class="col">
          <div class="text-h6">{{ area.name }}</div>
          <q-chip
            dense
            :color="statusColor(area.status)"
            text-color="white"
          >
            {{ area.status || "未設定" }}
          </q-chip>
        </div>

        <q-btn
          flat
          round
          icon="edit"
          color="primary"
          aria-label="編輯 Area"
          @click="$emit('edit', area)"
        />
      </div>
    </q-card-section>

    <q-separator />

    <q-card-section>
      <div class="text-subtitle2 q-mb-sm">📷 Photo</div>
      <div class="row q-gutter-sm">
        <q-img
          v-for="(image, index) in photos"
          :key="`${image}-${index}`"
          :src="image"
          class="area-photo"
          fit="cover"
          @click="$emit('photo', image)"
        />

        <q-btn
          outline
          icon="add_a_photo"
          label="新增"
          @click="$emit('upload', area)"
        />
      </div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle2">🐞 Issue - {{ area.tag || "未分類" }}</div>

      <q-list v-if="issues.length" separator>
        <q-item v-for="(issue, index) in issues" :key="`${issue}-${index}`">
          <q-item-section>{{ issue }}</q-item-section>
          <q-item-section side>
            <q-icon color="negative" name="warning" />
          </q-item-section>
        </q-item>
      </q-list>
      <div v-else class="text-caption text-grey-6 q-mt-sm">目前沒有 Issue</div>
    </q-card-section>

    <q-card-section>
      <div class="text-subtitle2">🔧 Todo</div>

      <div v-if="todos.length" class="column">
        <q-checkbox
          v-for="(todo, index) in todos"
          :key="`${todo.name}-${index}`"
          :model-value="Boolean(todo.done)"
          :label="todo.name"
          @update:model-value="
            $emit('todo', area.id, index, $event)
          "
        />
      </div>
      <div v-else class="text-caption text-grey-6 q-mt-sm">目前沒有 Todo</div>
    </q-card-section>

    <q-card-section>
      <q-banner rounded class="bg-green-1">
        💰 預估成本 <strong>{{ area.cost ?? 0 }} 元</strong>
      </q-banner>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  area: {
    type: Object,
    required: true,
  },
});

defineEmits(["edit", "photo", "upload", "todo"]);

const photos = computed(() =>
  Array.isArray(props.area.photos) ? props.area.photos.filter(Boolean) : [],
);
const issues = computed(() =>
  Array.isArray(props.area.issues) ? props.area.issues : [],
);
const todos = computed(() =>
  Array.isArray(props.area.todo) ? props.area.todo : [],
);

function statusColor(status) {
  return {
    整理中: "orange",
    施工中: "blue",
    測試中: "green",
    待施工: "grey",
  }[status] || "grey";
}
</script>

<style scoped>
.area-card {
  border-radius: 16px;
  transition: transform 0.25s, box-shadow 0.25s;
}

.area-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.15);
}

.area-photo {
  width: 90px;
  height: 70px;
  border-radius: 8px;
  cursor: pointer;
}
</style>

