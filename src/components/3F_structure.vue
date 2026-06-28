<template>
  <q-page class="q-pa-lg">
    <div class="text-h4 q-mb-lg">🏠 Housing Function Architecture</div>

    <q-card flat bordered>
      <q-card-section>
        <q-input outlined dense v-model="filter" label="Search" clearable />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-tree
          :nodes="treeData"
          node-key="id"
          label-key="label"
          children-key="children"
          :filter="filter"
          default-expand-all
          selected-color="primary"
          v-model:selected="selected"
          v-model:expanded="expanded"
        >
          <template v-slot:default-header="prop">
            <div class="row items-center">
              <q-icon name="folder" class="q-mr-sm" color="primary" />

              <div>
                <div class="text-weight-medium">
                  {{ prop.node.label }}
                </div>

                <div
                  v-if="prop.node.description"
                  class="text-grey text-caption"
                >
                  {{ prop.node.description }}
                </div>
              </div>
            </div>
          </template>
        </q-tree>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

import treeData from "../data/housing-function.js";

const filter = ref("");

const selected = ref(null);

const expanded = ref([]);
</script>
