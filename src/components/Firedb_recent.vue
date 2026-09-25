<template>
  <q-page class="document-page">
    <!-- ================================================= -->
    <!-- MOBILE : Library Header -->
    <!-- ================================================= -->
    <div v-if="isMobile && !current" class="mobile-header q-pa-md">
      <div class="row items-center">
        <div>
          <div class="text-h6">Document Library</div>
          <div class="text-caption text-grey">
            {{ filteredDocuments.length }} documents
          </div>
        </div>
        <q-space />
        <q-btn round color="primary" icon="add" @click="addDocument">
          <q-tooltip>New Document</q-tooltip>
        </q-btn>
      </div>
    </div>
    <!-- ================================================= -->
    <!-- MAIN LAYOUT -->
    <!-- ================================================= -->
    <div class="document-layout">
      <!-- ================================================= -->
      <!-- LEFT : DOCUMENT LIBRARY -->
      <!-- Desktop : 4/12 -->
      <!-- Mobile : full screen -->
      <!-- ================================================= -->
      <div v-if="!isMobile || !current" class="document-sidebar">
        <q-card flat bordered class="document-card">
          <!-- Header -->
          <q-card-section>
            <div class="row items-center">
              <div>
                <div class="text-h6">Document Library</div>
                <div class="text-caption text-grey">
                  {{ filteredDocuments.length }} documents
                </div>
              </div>
              <q-space />
              <!-- Mobile Add -->
              <q-btn
                v-if="isMobile"
                round
                flat
                color="primary"
                icon="add"
                @click="addDocument"
              />
            </div>
            <!-- Search -->
            <q-input
              v-model="search"
              dense
              outlined
              placeholder="Search documents..."
              class="q-mt-md"
              clearable
            >
              <template #prepend> <q-icon name="search" /> </template>
            </q-input>
            <!-- Desktop New -->
            <q-btn
              v-if="!isMobile"
              color="primary"
              icon="add"
              label="New Document"
              class="full-width q-mt-md"
              @click="addDocument"
            />
          </q-card-section>
          <q-separator />
          <!-- Document List -->
          <q-list separator>
            <q-item
              v-for="doc in filteredDocuments"
              :key="doc.key"
              clickable
              :active="current?.key === doc.key"
              active-class="bg-blue-1"
              class="document-item"
              @click="select(doc)"
            >
              <q-item-section avatar>
                <q-icon
                  :name="getDocumentIcon(doc.Type)"
                  color="primary"
                  size="26px"
                />
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-weight-medium">
                  {{ doc.Name || "Untitled" }}
                </q-item-label>
                <q-item-label caption> {{ doc.Type }} </q-item-label>
                <q-item-label
                  v-if="doc.Tags"
                  caption
                  class="text-grey-6 ellipsis"
                >
                  {{ doc.Tags }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="chevron_right" color="grey-5" />
              </q-item-section>
            </q-item>
            <!-- Empty -->
            <q-item v-if="filteredDocuments.length === 0">
              <q-item-section class="text-center text-grey q-pa-lg">
                <q-icon name="search_off" size="40px" />
                <div class="q-mt-sm">No documents found</div>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
      <!-- ================================================= -->
      <!-- RIGHT : DOCUMENT EDITOR -->
      <!-- Desktop : 8/12 -->
      <!-- Mobile : full screen -->
      <!-- ================================================= -->
      <div v-if="current" class="document-editor">
        <q-card flat bordered class="document-card">
          <!-- Editor Header -->
          <q-card-section>
            <div class="row items-center">
              <!-- Mobile Back -->
              <q-btn
                v-if="isMobile"
                flat
                round
                icon="arrow_back"
                class="q-mr-sm"
                @click="current = null"
              >
                <q-tooltip>Documents</q-tooltip>
              </q-btn>
              <div class="col">
                <div class="text-h6 ellipsis">
                  {{ current.Name || "Document" }}
                </div>
                <div class="text-caption text-grey">{{ current.Type }}</div>
              </div>
              <!-- Delete -->
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
          <!-- ================================================= -->
          <!-- BASIC INFORMATION -->
          <!-- ================================================= -->
          <q-card-section>
            <div class="text-subtitle1 q-mb-md">Document Information</div>
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
          <!-- ================================================= -->
          <!-- CONTENT -->
          <!-- ================================================= -->
          <q-card-section>
            <div class="row items-center q-mb-sm">
              <div class="text-subtitle1">Content</div>
              <q-space />
              <div class="text-caption text-grey">
                {{ current.Content?.length || 0 }} chars
              </div>
            </div>
            <q-input
              v-model="current.Content"
              type="textarea"
              outlined
              autogrow
              :input-style="{
                minHeight: isMobile ? '300px' : '400px',
                fontFamily: 'monospace',
                lineHeight: '1.5',
              }"
              @update:model-value="save"
            />
          </q-card-section>
          <q-separator />
          <!-- ================================================= -->
          <!-- META -->
          <!-- ================================================= -->
          <q-card-section class="text-caption text-grey">
            <div>
              <q-icon name="schedule" class="q-mr-xs" /> Created:
              {{ formatDate(current.CreatedAt) }}
            </div>
            <div class="q-mt-xs">
              <q-icon name="update" class="q-mr-xs" /> Updated:
              {{ formatDate(current.UpdatedAt) }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- ================================================= -->
      <!-- NO DOCUMENT -->
      <!-- ================================================= -->
      <div v-if="!current && !isMobile" class="document-empty">
        <div class="text-grey text-center">
          <q-icon name="description" size="64px" />
          <div class="text-h6 q-mt-md">No Document Selected</div>
          <div class="text-caption q-mt-sm">
            Select a document from the library
          </div>
          <q-btn
            color="primary"
            label="Create Document"
            icon="add"
            class="q-mt-md"
            @click="addDocument"
          />
        </div>
      </div>
    </div>
    <!-- ================================================= -->
    <!-- JSON FILE INPUT -->
    <!-- ================================================= -->
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
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

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

const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768;
};
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", checkMobile);
});

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
<style scoped>
.document-page {
  min-height: 100vh;
  background: #f5f6f8;
} /* ================================================= */ /* Main Layout */ /* ================================================= */
.document-layout {
  display: grid;
  grid-template-columns: minmax(280px, 4fr) minmax(0, 8fr);
  gap: 16px;
  padding: 16px;
  height: calc(100vh - 32px);
} /* ================================================= */ /* Sidebar */ /* ================================================= */
.document-sidebar {
  min-width: 0;
  overflow: hidden;
}
.document-sidebar .document-card {
  height: 100%;
  overflow-y: auto;
} /* ================================================= */ /* Editor */ /* ================================================= */
.document-editor {
  min-width: 0;
  overflow-y: auto;
}
.document-editor .document-card {
  min-height: 100%;
} /* ================================================= */ /* Empty */ /* ================================================= */
.document-empty {
  display: flex;
  align-items: center;
  justify-content: center;
} /* ================================================= */ /* Document Item */ /* ================================================= */
.document-item {
  min-height: 64px;
} /* ================================================= */ /* Mobile */ /* ================================================= */
@media (max-width: 767px) {
  .document-page {
    background: #fff;
  }
  .document-layout {
    display: block;
    padding: 0;
    height: auto;
  }
  .document-sidebar {
    width: 100%;
    height: auto;
  }
  .document-sidebar .document-card {
    border: none;
    border-radius: 0;
  }
  .document-editor {
    width: 100%;
    overflow: visible;
  }
  .document-editor .document-card {
    border: none;
    border-radius: 0;
  }
  .document-item {
    min-height: 68px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .mobile-header {
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
} /* ================================================= */ /* Small Phone */ /* ================================================= */
@media (max-width: 400px) {
  .document-item {
    min-height: 64px;
  }
  .document-item .q-item__section--avatar {
    min-width: 44px;
  }
}
</style>
