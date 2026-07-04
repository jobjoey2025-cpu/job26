<template>
  <q-page class="row">
    <!-- Left -->

    <div class="col-3">
      <q-card flat bordered class="fit">
        <q-toolbar>
          <q-toolbar-title> Projects </q-toolbar-title>

          <q-btn flat round icon="add" @click="addProject" />
        </q-toolbar>

        <q-list>
          <q-item
            clickable
            v-for="item in projects"
            :key="item.key"
            @click="select(item)"
            :active="current?.key == item.key"
          >
            <q-item-section>
              {{ item.Overview.Name }}
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />
        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">Project Score Summary</div>

          <q-list dense>
            <q-item v-for="item in projectSummary" :key="item.key">
              <q-item-section>
                {{ item.name }}
              </q-item-section>

              <q-item-section side>
                <q-badge color="primary" :label="item.total + ' / 30'" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>

    <!-- Right -->

    <div class="col q-pa-md" v-if="current">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Overview</div>

          <q-input
            v-model="current.Overview.Name"
            label="Project Name"
            @update:model-value="save"
          />

          <q-input
            v-model="current.Overview.Description"
            label="Description"
            type="textarea"
            @update:model-value="save"
          />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <div class="text-h6">Evaluation</div>

          <div v-for="score in scores" :key="score">
            {{ score }}

            <q-slider
              :min="0"
              :max="5"
              label
              v-model="current.Evaluation[score]"
              @update:model-value="save"
            />
          </div>
        </q-card-section>
        <!-- ------ -->

        <!-- ------- -->
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
// import { ref, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";
import { db } from "boot/firebase_roi";

import { ref, onMounted, computed } from "vue";

const projects = ref([]);

const current = ref(null);

const scores = [
  "ROI",

  "Market Demand",

  "AI Fit",

  "Automation",

  "Scalability",

  "Interest",
];

// const projectSummary = computed(() => {
//   return projects.value
//     .map((project) => {
//       const total = scores.reduce((sum, item) => {
//         return sum + (project.Evaluation?.[item] || 0);
//       }, 0);

//       return {
//         key: project.key,
//         name: project.Overview?.Name || "Untitled",
//         total,
//       };
//     })
//     .sort((a, b) => b.total - a.total); // 高分排前面
// });
const projectSummary = computed(() =>
  projects.value
    .map((project) => ({
      key: project.key,
      name: project.Overview?.Name ?? "Untitled",
      total: scores.reduce(
        (sum, score) => sum + Number(project.Evaluation?.[score] ?? 0),
        0
      ),
    }))
    .sort((a, b) => b.total - a.total)
);

onMounted(() => {
  // onValue(
  //   dbRef(db, "projects"),

  //   (snap) => {
  //     const obj = snap.val() || {};

  //     projects.value = Object.keys(obj).map((key) => ({
  //       key,

  //       ...obj[key],
  //     }));
  //   }
  // );
  onValue(dbRef(db, "projects"), (snap) => {
    const obj = snap.val() || {};

    console.log(obj);

    projects.value = Object.keys(obj).map((key) => ({
      key,
      ...obj[key],
    }));

    console.log(projectSummary.value);
  });
});

function select(item) {
  current.value = item;
}

function save() {
  if (!current.value) return;

  update(
    dbRef(db, "projects/" + current.value.key),

    current.value
  );
}

async function addProject() {
  const key = push(dbRef(db, "projects")).key;

  await set(
    dbRef(db, "projects/" + key),

    {
      Overview: {
        Name: "New Project",

        Description: "",
      },

      Evaluation: {
        ROI: 0,

        "Market Demand": 0,

        "AI Fit": 0,

        Automation: 0,

        Scalability: 0,

        Interest: 0,
      },
    }
  );
}
</script>
