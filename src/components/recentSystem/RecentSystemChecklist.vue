<template>
  <!-- 現場快速檢查 -->
  <section
    id="checklist"
    class="timeline-section checklist-section q-mt-xl"
    data-section="checklist"
  >
    <div class="row items-center justify-between q-col-gutter-md q-mb-md">
      <div class="col">
        <div class="text-overline text-primary text-weight-bold">
          One Page Check
        </div>
        <h2 class="section-title q-my-xs">現場快速檢查</h2>
        <p class="text-body2 text-grey-7 q-my-none">
          用一頁維持現況、工作、學習與 ROI 的可見度。
        </p>
      </div>
      <div class="col-auto">
        <q-btn
          flat
          round
          icon="refresh"
          aria-label="重設全部檢查項目"
          @click="$emit('reset')"
        >
          <q-tooltip>重設全部</q-tooltip>
        </q-btn>
      </div>
    </div>

    <q-card flat bordered class="q-mb-md">
      <q-card-section>
        <div class="row items-center justify-between">
          <div>
            <div class="text-subtitle1 text-weight-bold">Check Progress</div>
            <div class="text-caption text-grey-7">
              {{ completedCount }} / {{ totalCount }} completed
            </div>
          </div>
          <div class="text-h6">{{ progress }}%</div>
        </div>
        <q-linear-progress
          :value="progress / 100"
          color="positive"
          track-color="grey-3"
          rounded
          size="10px"
          class="q-mt-sm"
        />
      </q-card-section>
    </q-card>

    <div class="row q-col-gutter-md">
      <div
        v-for="section in checklistSections"
        :key="section.id"
        class="col-12 col-sm-6 col-md-4"
      >
        <q-card
          flat
          bordered
          class="check-card full-height"
          :class="{ 'check-card-done': isSectionComplete(section) }"
        >
          <q-card-section class="row items-center no-wrap">
            <q-avatar
              size="40px"
              class="q-mr-sm"
              :color="section.color"
              text-color="white"
            >
              <q-icon :name="section.icon" />
            </q-avatar>
            <div class="col">
              <div class="text-subtitle1 text-weight-bold">
                {{ section.title }}
              </div>
              <div class="text-caption text-grey-7">
                {{ sectionCompleted(section) }} / {{ section.items.length }}
              </div>
            </div>
            <q-icon
              v-if="isSectionComplete(section)"
              name="check_circle"
              color="positive"
              size="24px"
            />
          </q-card-section>

          <q-separator />

          <q-list separator>
            <q-item
              v-for="checkItem in section.items"
              :key="checkItem.id"
              clickable
              @click="$emit('toggle-item', section.id, checkItem.id)"
            >
              <q-item-section avatar>
                <q-checkbox
                  :model-value="checkItem.checked"
                  @click.stop
                  @update:model-value="
                    $emit('toggle-item', section.id, checkItem.id)
                  "
                />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  :class="{ 'text-strike text-grey-6': checkItem.checked }"
                >
                  {{ checkItem.text }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  checklistSections: {
    type: Array,
    required: true,
  },
  completedCount: {
    type: Number,
    required: true,
  },
  isSectionComplete: {
    type: Function,
    required: true,
  },
  progress: {
    type: Number,
    required: true,
  },
  sectionCompleted: {
    type: Function,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

defineEmits(["reset", "toggle-item"]);
</script>

<style scoped>
.checklist-section {
  scroll-margin-top: 24px;
}

.section-title {
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  line-height: 1.2;
}

.check-card {
  overflow: hidden;
  border-radius: 14px;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.check-card-done {
  border-color: var(--q-positive);
  box-shadow: 0 0 0 1px var(--q-positive);
}
</style>
