<template>
  <q-page class="row">
    <!-- Left -->
    <div class="col-3 q-pa-sm">
      <q-card flat bordered class="fit column">
        <q-toolbar>
          <q-toolbar-title> Projects </q-toolbar-title>
          <!-- <q-btn flat round icon="add" @click="addProject" /> -->
        </q-toolbar>

        <q-card>
          <!-- Project List -->
          <q-list separator>
            <q-item
              v-for="item in topProjects"
              :key="item.key"
              clickable
              :active="current?.key === item.key"
              active-class="bg-primary text-white"
              @click="select(projects.find((p) => p.key === item.key))"
            >
              <q-item-section>
                {{ item.name }}
              </q-item-section>

              <q-item-section side>
                {{ item.total }}
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
        <q-separator />
        <q-separator />
        <q-card>
          <!-- Summary -->
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">Score Summary</div>

            <!-- <q-item v-for="item in projectSummary" :key="item.key"> -->

            <!-- v-for="item in projectSummary.slice(0, 5)" -->
            <q-list dense>
              <q-item
                v-for="item in projectSummary.slice(0, 5)"
                :key="item.key"
              >
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
        <q-separator />
        <q-separator />
        <!-- ------ -->
        <q-card>
          <q-list separator>
            <q-item
              v-for="item in projects.slice().reverse()"
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
        </q-card>

        <!-- ------- -->
      </q-card>
    </div>

    <!-- ---------- -->
    <!-- Right -->

    <div class="col q-pa-md" v-if="current">
      <a
        target="”_blank”"
        href="https://console.firebase.google.com/project/roi-project-defb3/database/roi-project-defb3-default-rtdb/data"
        >Firebase roi-project realtime
      </a>
      <p>
        Evalu T5 用GPT 評分 \ 不另外用問卷<br />
        使用 修改文字 整理版面 \ 不是用 code 規劃 \ 比較快 & 靈活
      </p>

      <q-tabs v-model="tab" dense align="left" indicator-color="primary">
        <q-tab name="projects" label="prj T5" />
        <q-tab name="overview" label="view T5" />
        <q-tab name="para" label="para T5" />
        <q-tab name="evaluation" label="Evalu T5" />

        <q-tab name="search" icon="search" label="Search" />
        <q-tab name="jsonIO" icon="download" label="json_IO" />
      </q-tabs>

      <q-separator />
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="projects">
          <projectsTab :project="current" @save="save" />
        </q-tab-panel>
        <q-tab-panel name="overview">
          <OverviewTab :project="current" @save="save" />
        </q-tab-panel>
        <q-tab-panel name="para">
          <ParaTab :project="current" :paraTypes="paraTypes" @save="save" />
        </q-tab-panel>
        <q-tab-panel name="evaluation">
          <EvaluationTab :project="current" :scores="scores" @save="save" />
        </q-tab-panel>

        <q-tab-panel name="search">
          <searchTab :project="current" :scores="scores" @save="save" />
        </q-tab-panel>

        <q-tab-panel name="jsonIO">
          <import_exportTab :project="current" :scores="scores" @save="save" />
        </q-tab-panel>
      </q-tab-panels>

      <p>
        Coding 來不及 \ 先用 標籤紀錄 \ mobile show 很強 <br>
        ** 整理 資料夾好比整理方間，有用到才 順便處理。實際運做的天性。 <br>
        PDM 是強制 提前做準備\ 限制範籌的方法 (teamwork use，個人不可能買 PDM)。<br>
        個人短期 gitK 更好用 \ 只靠人工重新命名。(流水號 \ 日期 + 檔名特徵) \ 靠 email 做 設計履歷 \ 送樣保存紀錄 \<br>
        小時候 燒垃圾不用錢 \ 所以老一輩人喜歡囤東西 \
      </p>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";
import { db } from "boot/firebase_roi";

import projectsTab from "src/components/projectsTab.vue";
import OverviewTab from "src/components/OverviewTab.vue";
import ParaTab from "src/components/ParaTab.vue";
import EvaluationTab from "src/components/EvaluationTab.vue";
import searchTab from "src/components/searchTab.vue";
import import_exportTab from "src/components/import_exportTab.vue";

// const fileInput = ref(null); // joey ???
const tab = ref("projects");

const topProjects = computed(() => {
  return projectSummary.value.slice(0, 5);
});

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

// ----------
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
// ----------
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

// async function addProject() {
//   const key = push(dbRef(db, "projects")).key;

//   await set(dbRef(db, "projects/" + key), {
//     Overview: {
//       Name: "New Project",
//       Description: "",
//     },

//     Evaluation: {
//       ROI: 0,
//       // "Market Demand": 0,
//       // "AI Fit": 0,
//       Automation: 0,
//       Scalability: 0,
//       Interest: 0,
//     },
//   });
// }
</script>
