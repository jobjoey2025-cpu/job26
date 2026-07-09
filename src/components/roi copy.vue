<template>
  <q-page class="row">
    <!-- Left -->
    <div class="col-3 q-pa-sm">
      <q-card flat bordered class="fit column">
        <q-toolbar>
          <q-toolbar-title> Projects </q-toolbar-title>

          <q-btn flat round icon="add" @click="addProject" />
        </q-toolbar>

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
          <div class="text-h6 q-mb-md">PARA Classification</div>

          <q-option-group
            v-model="current.Overview.PARA"
            :options="paraTypes"
            option-value="value"
            option-label="label"
            color="primary"
            @update:model-value="save"
          />

          <q-banner v-if="current.Overview.PARA" class="bg-grey-2 q-mt-md">
            {{
              paraTypes.find((p) => p.value === current.Overview.PARA)
                ?.description
            }}
          </q-banner>
        </q-card-section>
      </q-card>

      <q-card flat bordered class="q-mt-md">
        <q-card-section>
          <div class="text-h6 q-mb-md">Evaluation</div>

          <div v-for="score in scores" :key="score" class="q-mb-lg">
            <div class="row justify-between">
              <div>
                <div class="text-subtitle2">
                  {{ item.title }}
                </div>

                <div class="text-caption text-grey">
                  {{ item.description }}
                </div>
              </div>
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

      <div v-for="item in evaluations" :key="item.key" class="q-mb-lg">
        <div class="row items-center justify-between">
          <div>
            <div class="text-subtitle2">
              {{ item.title }}
            </div>

            <div class="text-caption text-grey">
              {{ item.description }}
            </div>
          </div>

          <div class="text-weight-bold">
            {{ current.Evaluation[item.key] }}/5
          </div>
        </div>

        <q-slider
          v-model="current.Evaluation[item.key]"
          :min="0"
          :max="5"
          :step="1"
          label
          markers
          color="primary"
          @update:model-value="save"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ref as dbRef, onValue, push, set, update } from "firebase/database";

import { db } from "boot/firebase_roi";

const projects = ref([]);
const current = ref(null);

const scores = [
  // const evaluations = [
  {
    key: "ROI",
    title: "ROI",
    description: "投入時間後可獲得的回報",
  },
  {
    key: "Scalability",
    title: "Scalability",
    description: "是否容易擴充成系列專案",
  },
  {
    key: "Interest",
    title: "Interest",
    description: "自己是否願意長期投入",
  },
  {
    key: "Automation",
    title: "Automation",
    description: "是否能交給 AI 或程式自動化",
  },
];

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
      "Market Demand": 0,
      "AI Fit": 0,
      Automation: 0,
      Scalability: 0,
      Interest: 0,
    },
  });
}
</script>
