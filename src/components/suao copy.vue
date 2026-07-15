<template>
  <q-page class="q-pa-md">
    <!-- Category Buttons -->
    <div class="row q-col-gutter-sm q-mb-lg">
      <div v-for="category in categories" :key="category.name">
        <q-btn
          rounded
          outline
          :color="selectedCategory === category.name ? 'primary' : 'grey-7'"
          :icon="category.icon"
          :label="category.name"
          @click="selectedCategory = category.name"
        />
      </div>
    </div>

    <!-- Card Grid -->
    <div class="row q-col-gutter-md">
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card class="full-height">
          <q-img :src="item.image" height="80px" />

          <q-card-section>
            <div class="text-h6">
              {{ item.title }}
            </div>

            <div class="text-caption text-grey-7">
              {{ item.location }}
            </div>
          </q-card-section>

          <q-card-section>
            <q-chip
              dense
              color="primary"
              text-color="white"
              :label="item.tag"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn
              flat
              icon="open_in_new"
              label="Open"
              :href="item.url"
              target="_blank"
            />

            <q-btn flat round icon="more_vert">
              <q-menu>
                <q-list dense style="min-width: 150px">
                  <q-item clickable>
                    <q-item-section>Edit</q-item-section>
                  </q-item>

                  <q-item clickable>
                    <q-item-section>Delete</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Floating Button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab color="primary" icon="add" direction="up">
        <q-fab-action color="primary" icon="link" label="New Link" />

        <q-fab-action color="secondary" icon="photo" label="Photo" />

        <q-fab-action color="orange" icon="place" label="Place" />
      </q-fab>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";

const selectedCategory = ref("All");

const categories = [
  { name: "All", icon: "apps" },
  { name: "Japan", icon: "flight" },
  { name: "Taiwan", icon: "public" },
  { name: "Food", icon: "restaurant" },
  { name: "Hotel", icon: "hotel" },
];

const items = [
  {
    id: 1,
    title: "Senso-ji",
    location: "Tokyo",
    tag: "Japan",
    image: "https://picsum.photos/400/250?1",
    url: "https://google.com",
  },
  {
    id: 2,
    title: "Ichiran Ramen",
    location: "Tokyo",
    tag: "Food",
    image: "https://picsum.photos/400/250?2",
    url: "https://google.com",
  },
  {
    id: 3,
    title: "Taipei 101",
    location: "Taipei",
    tag: "Taiwan",
    image: "https://picsum.photos/400/250?3",
    url: "https://google.com",
  },
  {
    id: 4,
    title: "Hotel Gracery",
    location: "Shinjuku",
    tag: "Hotel",
    image: "https://picsum.photos/400/250?4",
    url: "https://google.com",
  },
];

const filteredItems = computed(() => {
  if (selectedCategory.value === "All") {
    return items;
  }

  return items.filter((item) => item.tag === selectedCategory.value);
});
</script>

<style scoped>
.q-card {
  transition: 0.25s;
}

.q-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}
</style>
