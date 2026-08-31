<template>
  <q-list separator>
    <q-item>
      <q-item-section avatar>
        <q-icon name="battery_charging_full" />
      </q-item-section>
      <q-item-section>Energy Level 當下 (6 Level)</q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon name="list_alt" />
      </q-item-section>
      <q-item-section>
        Fn Prj Task List (具體程度 must Table List)
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon name="storage" />
      </q-item-section>
      <q-item-section>PARA 有想到的 db（img map）</q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon name="phone_iphone" />
      </q-item-section>
      <q-item-section>📱 Mobile Vue（list） 有時間 Quasar ?</q-item-section>
    </q-item>
  </q-list>

  <q-card flat bordered class="q-mt-md">
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold q-mb-sm">
        Energy Level（6 Levels）
      </div>
      <q-list separator>
        <q-item v-for="level in energyLevels" :key="level.level">
          <q-item-section avatar>
            <q-avatar :color="level.color" text-color="white" size="32px">
              {{ level.level }}
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ level.title }}</q-item-label>
            <q-item-label caption>{{ level.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>

  <q-card flat bordered class="q-mt-md">
    <q-card-section>
      <div class="text-subtitle2 text-weight-bold q-mb-sm">行動層級可視化</div>
      <q-list separator>
        <q-item
          v-for="item in visibilityItems"
          :key="item.id"
          tag="label"
        >
          <q-item-section avatar>
            <q-checkbox
              :model-value="item.done"
              @update:model-value="$emit('update-item', item.id, $event)"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
            <q-item-label caption>{{ item.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  energyLevels: {
    type: Array,
    required: true,
  },
  visibilityItems: {
    type: Array,
    required: true,
  },
});

defineEmits(["update-item"]);
</script>
