<template>
  <q-tabs
    v-model="tab"
    dense
    class="text-primary"
    active-color="primary"
    indicator-color="primary"
    align="left"
  >
    <q-tab name="projects" label="Projects" />
    <q-tab name="overview" label="Overview" :disable="!current" />
    <q-tab name="para" label="Para" :disable="!current" />
    <q-tab name="evaluation" label="Evaluation" :disable="!current" />
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <!-- Project List -->
    <q-tab-panel name="projects">
      <div class="row q-mb-md">
        <q-btn color="primary" label="Add Project" @click="addProject" />
      </div>

      <q-list separator bordered>
        <q-item
          v-for="item in projects"
          :key="item.key"
          clickable
          :active="current?.key === item.key"
          active-class="bg-primary text-white"
          @click="
            select(item);
            tab = 'overview';
          "
        >
          <q-item-section>
            {{ item.Overview.Name }}
          </q-item-section>

          <q-item-section side>
            {{ projectSummary.find((p) => p.key === item.key)?.total }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-tab-panel>

    <!-- Overview -->
    <q-tab-panel name="overview">
      <OverviewTab v-if="current" :project="current" />
    </q-tab-panel>

    <!-- Parameters -->
    <q-tab-panel name="para">
      <ParaTab v-if="current" :project="current" :para-types="paraTypes" />
    </q-tab-panel>

    <!-- Evaluation -->
    <q-tab-panel name="evaluation">
      <EvaluationTab v-if="current" :project="current" :scores="scores" />
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";

const fileInput = ref(null); // joey ???
import { db } from "boot/firebase_roi";

import projectsTab from "src/components/projectsTab.vue";
import OverviewTab from "src/components/OverviewTab.vue";
import ParaTab from "src/components/ParaTab.vue";
import EvaluationTab from "src/components/EvaluationTab.vue";
const tab = ref("projects");

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
