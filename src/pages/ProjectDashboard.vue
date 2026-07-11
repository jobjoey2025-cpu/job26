<template>
  <q-page class="row">
    <!-- Left -->
    <div class="col-3 q-pa-sm">
      <!-- <q-card flat bordered class="fit column">
        <p style="text-align: center">just show</p>
        <ProjectToolbar
          @add="addProject"
          @export="exportJson"
          @import="importJson"
        />
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          style="display: none"
          @change="onFileSelected"
        />
        <ProjectList :projects="projects" :current="current" @select="select" />
        <q-separator />
        <ProjectSummary :summary="projectSummary" />
      </q-card> -->

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

    <!-- ---------- -->
    <!-- Right -->

    <div class="col q-pa-md" v-if="current">
      <q-tabs v-model="tab" dense align="left" indicator-color="primary">
        <q-tab name="overview" label="overview" />
        <q-tab name="para" label="para" />
        <q-tab name="evaluation" label="Evaluation" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="overview">
          <OverviewTab :project="current" @save="save" />
        </q-tab-panel>

        <q-tab-panel name="para">
          <ParaTab :project="current" :paraTypes="paraTypes" @save="save" />
        </q-tab-panel>

        <q-tab-panel name="evaluation">
          <EvaluationTab :project="current" :scores="scores" @save="save" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";

const fileInput = ref(null); // joey ???
import { db } from "boot/firebase_roi";

import OverviewTab from "src/components/OverviewTab.vue";
import ParaTab from "src/components/ParaTab.vue";
import EvaluationTab from "src/components/EvaluationTab.vue";
const tab = ref("overview");

const projects = ref([]);
const current = ref(null);

const scores = ["ROI", "Scalability", "Interest", "Automation"];

const paraTypes = [
  {
    value: "Project",
    label: "Project",
    description: "具有明確截止日期 (Deadline)",
  },
  {
    value: "Area",
    label: "Area",
    description: "持續維護的領域，沒有截止日",
  },
  {
    value: "Resource",
    label: "Resource",
    description: "備用知識、研究資料",
  },
  {
    value: "Archive",
    label: "Archive",
    description: "封存，未來可再參考",
  },
];

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
      // "Market Demand": 0,
      // "AI Fit": 0,
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
