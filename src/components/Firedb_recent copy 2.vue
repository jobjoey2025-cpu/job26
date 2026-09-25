<template>
  <q-page class="row">
    <!-- Left : Document List -->
    <div class="col-3 q-pa-md">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Document Library</div>

          <q-input
            v-model="search"
            dense
            outlined
            placeholder="Search..."
            class="q-mt-md"
            clearable
          />

          <q-btn
            color="primary"
            icon="add"
            label="New Document"
            class="full-width q-mt-md"
            @click="addDocument"
          />
        </q-card-section>

        <q-separator />

        <q-list separator>
          <q-item
            v-for="doc in filteredDocuments"
            :key="doc.key"
            clickable
            :active="current?.key === doc.key"
            active-class="bg-blue-1"
            @click="select(doc)"
          >
            <q-item-section avatar>
              <q-icon :name="getDocumentIcon(doc.Type)" color="primary" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                {{ doc.Name || "Untitled" }}
              </q-item-label>

              <q-item-label caption>
                {{ doc.Type }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>
    </div>

    <!-- Right : Document Editor -->
    <div class="col q-pa-md" v-if="current">
      <q-card flat bordered>
        <q-card-section>
          <div class="row items-center">
            <div class="text-h6">Document</div>

            <q-space />

            <q-btn
              flat
              round
              color="negative"
              icon="delete"
              @click="deleteDocument"
            >
              <q-tooltip> Delete </q-tooltip>
            </q-btn>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <!-- Name -->
          <q-input
            v-model="current.Name"
            label="Document Name"
            outlined
            @update:model-value="save"
          />

          <!-- Type -->
          <q-select
            v-model="current.Type"
            :options="paraTypes"
            emit-value
            map-options
            label="Type"
            outlined
            class="q-mt-md"
            @update:model-value="save"
          />

          <!-- Tags -->
          <q-input
            v-model="current.Tags"
            label="Tags"
            hint="例如：firebase, vue, project"
            outlined
            class="q-mt-md"
            @update:model-value="save"
          />

          <!-- Description -->
          <q-input
            v-model="current.Description"
            type="textarea"
            label="Description"
            outlined
            autogrow
            class="q-mt-md"
            @update:model-value="save"
          />
        </q-card-section>

        <q-separator />

        <!-- Content -->
        <q-card-section>
          <div class="text-subtitle1 q-mb-sm">Content</div>

          <q-input
            v-model="current.Content"
            type="textarea"
            outlined
            autogrow
            :input-style="{
              minHeight: '400px',
              fontFamily: 'monospace',
            }"
            @update:model-value="save"
          />
        </q-card-section>

        <q-separator />

        <q-card-section class="text-caption text-grey">
          Created:
          {{ formatDate(current.CreatedAt) }}

          <br />

          Updated:
          {{ formatDate(current.UpdatedAt) }}
        </q-card-section>
      </q-card>
    </div>

    <!-- No document -->
    <div v-else class="col flex flex-center">
      <div class="text-grey text-center">
        <q-icon name="description" size="64px" />

        <div class="text-h6 q-mt-md">No Document Selected</div>

        <q-btn
          color="primary"
          label="Create Document"
          class="q-mt-md"
          @click="addDocument"
        />
      </div>
    </div>

    <!-- JSON File Input -->
    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="onFileSelected"
    />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

import {
  ref as dbRef,
  onValue,
  push,
  set,
  update,
  remove,
} from "firebase/database";

import { db } from "boot/firebase_suaoUnit";

/* --------------------------------
   State
-------------------------------- */

const fileInput = ref(null);

const documents = ref([]);

const current = ref(null);

const search = ref("");

/* --------------------------------
   Document Types
-------------------------------- */

const paraTypes = [
  {
    value: "Project",
    label: "Project",
    description: "具有明確截止日期",
  },
  {
    value: "Area",
    label: "Area",
    description: "持續維護的領域",
  },
  {
    value: "Resource",
    label: "Resource",
    description: "知識、研究資料",
  },
  {
    value: "Archive",
    label: "Archive",
    description: "封存資料",
  },
];

/* --------------------------------
   Firebase
-------------------------------- */

onMounted(() => {
  const documentsRef = dbRef(db, "documents");

  onValue(documentsRef, (snap) => {
    const obj = snap.val() || {};

    documents.value = Object.keys(obj).map((key) => ({
      key,
      ...obj[key],
    }));

    /*
     * 如果目前沒有選擇文件，
     * 自動選第一份
     */
    if (!current.value && documents.value.length > 0) {
      current.value = documents.value[0];
    }

    /*
     * 如果目前選擇的文件已被刪除
     */
    if (
      current.value &&
      !documents.value.find((doc) => doc.key === current.value.key)
    ) {
      current.value = documents.value.length > 0 ? documents.value[0] : null;
    }
  });
});

/* --------------------------------
   Search
-------------------------------- */

const filteredDocuments = computed(() => {
  const keyword = search.value?.trim().toLowerCase();

  if (!keyword) {
    return documents.value;
  }

  return documents.value.filter((doc) => {
    return (
      doc.Name?.toLowerCase().includes(keyword) ||
      doc.Description?.toLowerCase().includes(keyword) ||
      doc.Tags?.toLowerCase().includes(keyword) ||
      doc.Content?.toLowerCase().includes(keyword)
    );
  });
});

/* --------------------------------
   Select
-------------------------------- */

function select(doc) {
  current.value = doc;
}

/* --------------------------------
   Create
-------------------------------- */

async function addDocument() {
  const key = push(dbRef(db, "documents")).key;

  const now = Date.now();

  const document = {
    Name: "New Document",

    Type: "Resource",

    Tags: "",

    Description: "",

    Content: "",

    CreatedAt: now,

    UpdatedAt: now,
  };

  await set(dbRef(db, "documents/" + key), document);

  /*
   * 立即選取新文件
   */
  current.value = {
    key,
    ...document,
  };
}

/* --------------------------------
   Save
-------------------------------- */

async function save() {
  if (!current.value) return;

  const key = current.value.key;

  await update(dbRef(db, "documents/" + key), {
    Name: current.value.Name || "",
    Type: current.value.Type || "Resource",
    Tags: current.value.Tags || "",
    Description: current.value.Description || "",
    Content: current.value.Content || "",
    UpdatedAt: Date.now(),
  });
}

/* --------------------------------
   Delete
-------------------------------- */

async function deleteDocument() {
  if (!current.value) return;

  const name = current.value.Name || "Untitled";

  if (!confirm(`Delete "${name}" ?`)) {
    return;
  }

  const key = current.value.key;

  await remove(dbRef(db, "documents/" + key));

  current.value = null;
}

/* --------------------------------
   Document Icon
-------------------------------- */

function getDocumentIcon(type) {
  switch (type) {
    case "Project":
      return "folder";

    case "Area":
      return "workspaces";

    case "Resource":
      return "library_books";

    case "Archive":
      return "inventory_2";

    default:
      return "description";
  }
}

/* --------------------------------
   Date
-------------------------------- */

function formatDate(timestamp) {
  if (!timestamp) {
    return "-";
  }

  return new Date(timestamp).toLocaleString();
}

/* --------------------------------
   Export JSON
-------------------------------- */

function exportJson() {
  const data = documents.value.map(({ key, ...rest }) => ({
    key,
    ...rest,
  }));

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");

  a.href = url;

  a.download = "documents.json";

  a.click();

  URL.revokeObjectURL(url);
}

/* --------------------------------
   Import JSON
-------------------------------- */

function importJson() {
  fileInput.value.click();
}

/* --------------------------------
   Import File
-------------------------------- */

async function onFileSelected(evt) {
  const file = evt.target.files[0];

  if (!file) {
    return;
  }

  try {
    const text = await file.text();

    const data = JSON.parse(text);

    if (!Array.isArray(data)) {
      throw new Error("JSON 必須是 Array");
    }

    for (const item of data) {
      const document = {
        ...item,
      };

      let key = document.key;

      delete document.key;

      /*
       * 沒有 key 就建立新的
       */
      if (!key) {
        key = push(dbRef(db, "documents")).key;
      }

      /*
       * 如果是舊資料沒有時間，
       * 自動補上
       */
      if (!document.CreatedAt) {
        document.CreatedAt = Date.now();
      }

      document.UpdatedAt = Date.now();

      await set(dbRef(db, "documents/" + key), document);
    }

    evt.target.value = "";
  } catch (err) {
    console.error(err);

    alert("JSON 格式錯誤");
  }
}
</script>
