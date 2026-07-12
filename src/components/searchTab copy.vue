<template>
  <p>test</p>
  <q-tab-panel name="search">
    <q-input
      filled
      v-model="searchText"
      label="Search..."
      clearable
      debounce="300"
      prepend-inner-icon="search"
    />

    <q-list bordered separator class="q-mt-md">
      <q-item
        v-for="item in searchResult"
        :key="item.key"
        clickable
        @click="openProject(item)"
      >
        <q-item-section>
          <div class="text-weight-bold">
            {{ item.Overview?.Name }}
          </div>

          <div class="text-caption text-grey">
            {{ item.match }}
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </q-tab-panel>
</template>
<script setup>
const searchText = ref("");

const searchResult = computed(() => {
  if (!searchText.value) return [];

  const keyword = searchText.value.toLowerCase();

  return projects.value
    .map((project) => {
      const text = JSON.stringify(project);

      return {
        ...project,
        text,
        match: text.substring(
          Math.max(0, text.toLowerCase().indexOf(keyword) - 40),
          Math.min(text.length, text.toLowerCase().indexOf(keyword) + 120)
        ),
      };
    })
    .filter((project) => project.text.toLowerCase().includes(keyword));
});
</script>
