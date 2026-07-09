<template>
  <q-page class="row">
    <!-- Left -->
    <div class="col-3 q-pa-sm">
      <q-card flat bordered class="fit column">
        <!-- <q-toolbar>
          <q-toolbar-title> Projects </q-toolbar-title>

          <q-btn flat round icon="add" @click="addProject" />
        </q-toolbar> -->
        <q-toolbar>
          <q-toolbar-title> Projects </q-toolbar-title>

          <q-btn flat round icon="upload" @click="exportJson">
            <q-tooltip>Export JSON</q-tooltip>
          </q-btn>

          <q-btn flat round icon="download" @click="importJson">
            <q-tooltip>Import JSON</q-tooltip>
          </q-btn>

          <q-btn flat round icon="add" @click="addProject" />
        </q-toolbar>

        <input
          ref="fileInput"
          type="file"
          accept=".json"
          style="display: none"
          @change="onFileSelected"
        />

        <!-- Project List -->
        <q-list separator>
          <q-item
            v-for="item in projects"
            :key="item.key"
            clickable
            :active="current?.key === item.key"
            active-class="bg-primary text-white"
            @click="select(item)"
          >
            <q-item-section>
              {{ item.Overview.Name }}
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <!-- Summary -->
        <q-card-section>
          <div class="text-subtitle1 q-mb-md">Project Score Summary</div>

          <q-list dense>
            <q-item v-for="item in projectSummary" :key="item.key">
              <q-item-section>
                <div class="row items-center">
                  <div class="col">
                    {{ item.name }}
                  </div>

                  <div class="col-auto text-weight-bold">
                    {{ item.total }}/30
                  </div>
                </div>

                <q-linear-progress
                  class="q-mt-xs"
                  rounded
                  size="8px"
                  color="positive"
                  :value="item.total / 30"
                />
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
          <div class="text-h6 q-mb-md">Overview</div>

          <q-input
            v-model="current.Overview.Name"
            label="Project Name"
            @update:model-value="save"
          />

          <q-input
            class="q-mt-md"
            v-model="current.Overview.Description"
            type="textarea"
            label="Description"
            @update:model-value="save"
          />
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">Evaluation</div>

          <div v-for="score in scores" :key="score" class="q-mb-lg">
            <div class="row justify-between">
              <div>
                {{ score }}
              </div>

              <div class="text-weight-bold">
                {{ current.Evaluation[score] }}
              </div>
            </div>

            <q-slider
              v-model="current.Evaluation[score]"
              :min="0"
              :max="5"
              label
              @update:model-value="save"
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
// import { ref, computed, onMounted } from "vue";
// import { ref as dbRef, onValue, push, set, update } from "firebase/database";
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";

const fileInput = ref(null); // joey ???

import { db } from "boot/firebase_roi";

const projects = ref([]);
const current = ref(null);

const scores = ["ROI", "Scalability", "Interest", "Automation"];

const projectSummary = computed(() => {
  return projects.value
    .map((project) => {
      const total = scores.reduce((sum, score) => {
        return sum + Number(project.Evaluation?.[score] ?? 0);
      }, 0);

      return {
        key: project.key,
        name: project.Overview?.Name ?? "Untitled",
        total,
      };
    })
    .sort((a, b) => b.total - a.total);
});

onMounted(() => {
  onValue(dbRef(db, "projects"), (snap) => {
    const obj = snap.val() || {};

    projects.value = Object.keys(obj).map((key) => ({
      key,
      ...obj[key],
    }));

    if (!current.value && projects.value.length > 0) {
      current.value = projects.value[0];
    }
  });
});

function select(item) {
  current.value = item;
}

function save() {
  if (!current.value) return;

  update(dbRef(db, "projects/" + current.value.key), current.value);
}

async function addProject() {
  const key = push(dbRef(db, "projects")).key;

  await set(dbRef(db, "projects/" + key), {
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
  });
}

function exportJson() {
  const data = projects.value.map(({ key, ...rest }) => ({
    key,
    ...rest,
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "projects.json";
  a.click();

  URL.revokeObjectURL(url);
}

function importJson() {
  fileInput.value.click();
}

async function onFileSelected(evt) {
  const file = evt.target.files[0];

  if (!file) return;

  try {
    const text = await file.text();
    const data = JSON.parse(text);

    for (const project of data) {
      let key = project.key;

      delete project.key;

      if (!key) {
        key = push(dbRef(db, "projects")).key;
      }

      await set(dbRef(db, "projects/" + key), project);
    }

    evt.target.value = "";
  } catch (err) {
    console.error(err);
    alert("JSON 格式錯誤");
  }
}
</script>
