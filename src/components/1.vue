<template>
  <!-- 目前 資料會存到 areas \ 希望改成 存到 area_joey1: -->
  <!-- 總共需要修改 4 個地方（讀取、新增、更新、刪除）。
// 讀取
const areasRef = dbRef(db, "area_joey1");
// 更新
await update(dbRef(db, "area_joey1/" + editingId.value), payload);
// 新增
const createdRef = await push(dbRef(db, "area_joey1"), payload);
// 刪除
await remove(dbRef(db, "area_joey1/" + id)); -->
  <q-page class="q-pa-md">
    <!-- YT --- YT short 也拒絕連線 \ 要有 embed 才可以 -->
    <div class="q-pa-md">
      <div class="q-video">
        <iframe
          src="https://www.youtube.com/embed/k3_tw44QsZQ?rel=0"
          frameborder="0"
          allowfullscreen
        />
      </div>
    </div>
    <!-- YT --- -->

    <div class="editor-shell">
      <div class="text-center q-mb-md">
        <div class="text-h5 text-weight-medium">Firebase Image Map Editor</div>
        <div class="text-caption text-grey-7 q-mt-xs">
          點選熱區可查看資料與照片，也可新增、編輯或刪除熱區。
        </div>
      </div>

      <div class="row justify-center q-mb-md">
        <q-btn
          :color="waitingCapture ? 'negative' : 'primary'"
          :icon="waitingCapture ? 'close' : 'add_location_alt'"
          :label="waitingCapture ? '取消擷取' : '新增熱區'"
          @click="toggleCapture"
        />
      </div>

      <q-banner
        v-if="waitingCapture"
        dense
        rounded
        class="bg-blue-1 text-primary q-mb-md"
      >
        請在圖片上點選新熱區的中心位置。
      </q-banner>

      <q-linear-progress v-if="loadingAreas" indeterminate color="primary" />

      <div class="map-wrapper q-mt-sm">
        <div
          class="image-container"
          :class="{ 'capture-cursor': waitingCapture }"
        >
          <img
            ref="imageRef"
            :src="imageUrl"
            class="map-image"
            alt="熱區編輯底圖"
            draggable="false"
            @load="onImageLoad"
            @error="onImageError"
            @click="onImageClick"
          />

          <button
            v-for="area in mapData"
            :key="area.id"
            type="button"
            class="hotspot"
            :class="{ selected: area.id === selectedAreaId }"
            :style="hotspotStyle(area)"
            :aria-label="'選取熱區 ' + area.alt"
            @click.stop="selectArea(area)"
          >
            <q-tooltip>
              <div class="text-weight-bold">{{ area.alt }}</div>
              <div v-if="area.message">{{ area.message }}</div>
              <div>
                座標：{{ area.coords.x }}, {{ area.coords.y }}；半徑：{{
                  area.coords.radius
                }}
              </div>
            </q-tooltip>
          </button>

          <div
            v-if="draftVisible"
            class="hotspot draft-hotspot"
            :style="hotspotStyle(editorArea)"
            aria-hidden="true"
          />
        </div>
      </div>

      <q-banner
        v-if="!loadingAreas && !mapData.length"
        rounded
        class="bg-grey-2 text-grey-8 q-mt-md"
      >
        Firebase 中尚無熱區資料，請按「新增熱區」開始建立。
      </q-banner>

      <q-card v-if="selectedArea" bordered flat class="detail-card q-mt-lg">
        <q-card-section>
          <div class="row items-start no-wrap">
            <div class="col">
              <div class="text-h6">{{ selectedArea.alt }}</div>
              <div v-if="selectedArea.message" class="text-body2 text-grey-7">
                {{ selectedArea.message }}
              </div>
              <div class="text-caption text-grey-7 q-mt-xs">
                座標：{{ selectedArea.coords.x }}, {{ selectedArea.coords.y }}；
                半徑：{{ selectedArea.coords.radius }}
              </div>
            </div>
            <q-btn
              flat
              round
              icon="edit"
              aria-label="編輯熱區"
              @click="openEditDialog(selectedArea)"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-subtitle2 q-mb-sm">照片</div>
          <div v-if="selectedArea.photos.length" class="photo-grid">
            <q-img
              v-for="(photo, index) in selectedArea.photos"
              :key="[selectedArea.id, index, photo].join('-')"
              :src="photo"
              :ratio="4 / 3"
              class="photo-thumb"
              loading="lazy"
              @click="openGallery(selectedArea, index)"
            >
              <template #error>
                <div
                  class="absolute-full flex flex-center bg-grey-3 text-grey-7"
                >
                  圖片載入失敗
                </div>
              </template>
            </q-img>
          </div>
          <div v-else class="text-caption text-grey-6">
            此熱區尚未加入照片。
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            color="negative"
            icon="delete"
            label="刪除"
            @click="requestDelete(selectedArea)"
          />
          <q-btn
            flat
            color="primary"
            icon="edit"
            label="編輯"
            @click="openEditDialog(selectedArea)"
          />
        </q-card-actions>
      </q-card>
    </div>

    <q-dialog v-model="showEditor" @hide="resetEditor">
      <q-card class="editor-dialog">
        <q-form @submit.prevent="saveArea">
          <q-card-section>
            <div class="text-h6">{{ editorTitle }}</div>
          </q-card-section>

          <q-card-section class="q-gutter-md">
            <q-input
              v-model="editorArea.alt"
              outlined
              autofocus
              label="名稱 *"
              maxlength="80"
              :rules="[
                (value) => Boolean(String(value || '').trim()) || '請輸入名稱',
              ]"
            />
            <!-- <q-input
              v-model="editorArea.message"
              outlined
              autogrow
              label="訊息"
              maxlength="500"
            /> -->
            <q-input
              v-model="editorArea.message"
              outlined
              type="textarea"
              autogrow
              label="訊息 - autogrow 文字越多時輸入框自動變大。"
              maxlength="500"
              counter
              :input-style="{
                minHeight: '200px',
                lineHeight: '1.6',
              }"
            />
            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="editorArea.coords.x"
                  outlined
                  type="number"
                  label="X"
                  min="0"
                  :max="imageSize.width"
                />
              </div>
              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="editorArea.coords.y"
                  outlined
                  type="number"
                  label="Y"
                  min="0"
                  :max="imageSize.height"
                />
              </div>
              <div class="col-12 col-sm-4">
                <q-input
                  v-model.number="editorArea.coords.radius"
                  outlined
                  type="number"
                  label="半徑"
                  min="1"
                />
              </div>
            </div>

            <div>
              <div class="row items-start q-col-gutter-sm">
                <div class="col">
                  <q-input
                    v-model="newPhoto"
                    outlined
                    label="照片 URL"
                    hint="僅接受 http:// 或 https:// 網址"
                    @keyup.enter.prevent="addPhoto"
                  />
                </div>
                <div class="col-auto">
                  <q-btn
                    outline
                    color="primary"
                    icon="add_photo_alternate"
                    label="加入"
                    class="photo-add-button"
                    @click="addPhoto"
                  />
                </div>
              </div>

              <q-list
                v-if="editorArea.photos.length"
                bordered
                separator
                class="rounded-borders q-mt-md"
              >
                <q-item
                  v-for="(photo, index) in editorArea.photos"
                  :key="[index, photo].join('-')"
                >
                  <q-item-section avatar>
                    <q-img
                      :src="photo"
                      width="48px"
                      height="36px"
                      fit="cover"
                    />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label lines="2">{{ photo }}</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn
                      flat
                      round
                      dense
                      color="negative"
                      icon="delete"
                      aria-label="移除照片"
                      @click="removePhoto(index)"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card-section>

          <q-card-actions align="right" class="q-pa-md">
            <q-btn flat label="取消" :disable="savingArea" v-close-popup />
            <q-btn
              v-if="editorMode === 'edit'"
              flat
              color="negative"
              label="刪除"
              :disable="savingArea"
              @click="requestEditorDelete"
            />
            <q-btn
              color="primary"
              type="submit"
              label="儲存"
              :loading="savingArea"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showDeleteConfirm" persistent @hide="clearDeleteRequest">
      <q-card style="width: 420px; max-width: 92vw">
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <div class="col q-ml-md">
            <div class="text-h6">確認刪除</div>
            <div class="text-body2">
              確定要刪除「{{ pendingDeleteName }}」嗎？此動作無法復原。
            </div>
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" :disable="deletingArea" v-close-popup />
          <q-btn
            color="negative"
            label="刪除"
            :loading="deletingArea"
            @click="confirmDelete"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="showGallery" maximized>
      <q-card class="column">
        <q-card-section class="row items-center">
          <div class="text-h6">{{ galleryTitle }}</div>
          <q-space />
          <q-btn
            icon="close"
            flat
            round
            dense
            aria-label="關閉相簿"
            v-close-popup
          />
        </q-card-section>
        <q-separator />
        <q-card-section class="col q-pa-none">
          <q-carousel
            v-model="currentSlide"
            animated
            arrows
            navigation
            swipeable
            infinite
            class="full-height bg-black"
          >
            <q-carousel-slide
              v-for="(photo, index) in galleryPhotos"
              :key="[index, photo].join('-')"
              :name="index"
              class="flex flex-center q-pa-lg"
            >
              <img :src="photo" class="gallery-image" alt="熱區照片" />
            </q-carousel-slide>
          </q-carousel>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import { onValue, push, ref as dbRef, remove, update } from "firebase/database";
import { useQuasar } from "quasar";
import { db } from "boot/firebase_imgmap";

const $q = useQuasar();

// const imageUrl = "https://picsum.photos/seed/firebase-image-map/500/300";
const imageUrl =
  "https://lh3.googleusercontent.com/d/17cxxAbiTyphwIYXIVdbHbHe7i-mrqAyP=w1200";
// joey modify ---
const imageRef = ref(null);
const imageSize = ref({ width: 500, height: 300 });

const mapData = ref([]);
const selectedAreaId = ref(null);
const loadingAreas = ref(true);
const waitingCapture = ref(false);

const showEditor = ref(false);
const editorMode = ref("create");
const editingId = ref(null);
const editorArea = ref(createEmptyArea());
const draftVisible = ref(false);
const newPhoto = ref("");
const savingArea = ref(false);

const showDeleteConfirm = ref(false);
const pendingDeleteId = ref(null);
const pendingDeleteName = ref("");
const deletingArea = ref(false);

const showGallery = ref(false);
const galleryPhotos = ref([]);
const galleryTitle = ref("");
const currentSlide = ref(0);

let stopAreasListener = null;

const selectedArea = computed(() =>
  mapData.value.find((area) => area.id === selectedAreaId.value)
);

const editorTitle = computed(() =>
  editorMode.value === "edit" ? "編輯熱區" : "新增熱區"
);

onMounted(() => {
  listenAreas();
});

onUnmounted(() => {
  stopAreasListener?.();
});

function createEmptyArea(x = 0, y = 0) {
  return {
    shape: "circle",
    alt: "",
    message: "",
    photos: [],
    coords: { x, y, radius: 20 },
  };
}

function cloneArea(area) {
  return {
    shape: "circle",
    alt: area.alt,
    message: area.message,
    photos: [...area.photos],
    coords: { ...area.coords },
  };
}

function normalizeArea(id, value) {
  const source = value && typeof value === "object" ? value : {};
  const coords =
    source.coords && typeof source.coords === "object" ? source.coords : {};
  const rawPhotos = Array.isArray(source.photos)
    ? source.photos
    : source.photos && typeof source.photos === "object"
    ? Object.values(source.photos)
    : [];

  return {
    id,
    shape: "circle",
    alt:
      typeof source.alt === "string" && source.alt.trim()
        ? source.alt
        : "未命名熱區",
    message: typeof source.message === "string" ? source.message : "",
    photos: rawPhotos.filter(
      (photo) => typeof photo === "string" && photo.trim()
    ),
    coords: {
      x: finiteNumber(coords.x, 0),
      y: finiteNumber(coords.y, 0),
      radius: Math.max(1, finiteNumber(coords.radius, 20)),
    },
  };
}

function finiteNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function listenAreas() {
  // const areasRef = dbRef(db, "areas");
  const areasRef = dbRef(db, "area_kyoto");

  stopAreasListener = onValue(
    areasRef,
    (snapshot) => {
      const data = snapshot.val();
      const nextAreas =
        data && typeof data === "object"
          ? Object.entries(data).map(([id, value]) => normalizeArea(id, value))
          : [];

      mapData.value = nextAreas;
      loadingAreas.value = false;

      const selectionStillExists = nextAreas.some(
        (area) => area.id === selectedAreaId.value
      );

      if (!selectionStillExists) {
        selectedAreaId.value = nextAreas[0]?.id ?? null;
      }
    },
    (error) => {
      loadingAreas.value = false;
      notifyError(error, "無法載入 Firebase 熱區資料");
    }
  );
}

function onImageLoad() {
  const width = imageRef.value?.naturalWidth;
  const height = imageRef.value?.naturalHeight;

  if (width && height) {
    imageSize.value = { width, height };
  }
}

function onImageError() {
  $q.notify({
    type: "negative",
    message: "底圖載入失敗，請檢查網路或更換圖片網址。",
  });
}

function hotspotStyle(area) {
  const width = imageSize.value.width || 500;
  const height = imageSize.value.height || 300;
  const x = finiteNumber(area?.coords?.x, 0);
  const y = finiteNumber(area?.coords?.y, 0);
  const radius = Math.max(1, finiteNumber(area?.coords?.radius, 20));

  return {
    left: clamp((x / width) * 100, 0, 100) + "%",
    top: clamp((y / height) * 100, 0, 100) + "%",
    width: clamp(((radius * 2) / width) * 100, 1, 100) + "%",
  };
}

function clamp(value, minimum, maximum) {
  return Math.min(Math.max(value, minimum), maximum);
}

function toggleCapture() {
  waitingCapture.value = !waitingCapture.value;

  $q.notify({
    type: waitingCapture.value ? "info" : "warning",
    message: waitingCapture.value
      ? "請點選圖片上的熱區中心。"
      : "已取消擷取座標。",
  });
}

function onImageClick(event) {
  if (!waitingCapture.value || !imageRef.value) return;

  const rect = imageRef.value.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const x = Math.round(
    ((event.clientX - rect.left) / rect.width) * imageSize.value.width
  );
  const y = Math.round(
    ((event.clientY - rect.top) / rect.height) * imageSize.value.height
  );

  waitingCapture.value = false;
  editorMode.value = "create";
  editingId.value = null;
  editorArea.value = createEmptyArea(
    clamp(x, 0, imageSize.value.width),
    clamp(y, 0, imageSize.value.height)
  );
  newPhoto.value = "";
  draftVisible.value = true;
  showEditor.value = true;
}

function selectArea(area) {
  selectedAreaId.value = area.id;
}

function openEditDialog(area) {
  waitingCapture.value = false;
  selectedAreaId.value = area.id;
  editorMode.value = "edit";
  editingId.value = area.id;
  editorArea.value = cloneArea(area);
  newPhoto.value = "";
  draftVisible.value = true;
  showEditor.value = true;
}

function resetEditor() {
  editorMode.value = "create";
  editingId.value = null;
  editorArea.value = createEmptyArea();
  newPhoto.value = "";
  draftVisible.value = false;
  savingArea.value = false;
}

function addPhoto() {
  const url = newPhoto.value.trim();
  if (!url) return;

  if (!isHttpUrl(url)) {
    $q.notify({
      type: "warning",
      message: "請輸入有效的 http:// 或 https:// 照片網址。",
    });
    return;
  }

  if (editorArea.value.photos.includes(url)) {
    $q.notify({ type: "warning", message: "此照片網址已經加入。" });
    return;
  }

  editorArea.value.photos.push(url);
  newPhoto.value = "";
}

function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function removePhoto(index) {
  editorArea.value.photos.splice(index, 1);
}

function buildPayload() {
  const alt = editorArea.value.alt.trim();
  const message = editorArea.value.message.trim();
  const x = Number(editorArea.value.coords.x);
  const y = Number(editorArea.value.coords.y);
  const radius = Number(editorArea.value.coords.radius);

  if (!alt) {
    $q.notify({ type: "warning", message: "請輸入熱區名稱。" });
    return null;
  }

  if (
    !Number.isFinite(x) ||
    !Number.isFinite(y) ||
    x < 0 ||
    y < 0 ||
    x > imageSize.value.width ||
    y > imageSize.value.height
  ) {
    $q.notify({ type: "warning", message: "X、Y 座標超出圖片範圍。" });
    return null;
  }

  if (!Number.isFinite(radius) || radius <= 0) {
    $q.notify({ type: "warning", message: "半徑必須大於 0。" });
    return null;
  }

  return {
    shape: "circle",
    alt,
    message,
    photos: [...editorArea.value.photos],
    coords: {
      x: Math.round(x),
      y: Math.round(y),
      radius: Math.round(radius),
    },
  };
}

async function saveArea() {
  if (savingArea.value) return;

  const payload = buildPayload();
  if (!payload) return;

  savingArea.value = true;

  try {
    if (editorMode.value === "edit") {
      if (!editingId.value) throw new Error("找不到要更新的熱區 ID。");

      // await update(dbRef(db, "areas/" + editingId.value), payload);
      await update(dbRef(db, "area_kyoto/" + editingId.value), payload);

      selectedAreaId.value = editingId.value;
      $q.notify({ type: "positive", message: "熱區已更新。" });
    } else {
      // const createdRef = await push(dbRef(db, "areas"), payload);
      const createdRef = await push(dbRef(db, "area_kyoto"), payload);

      selectedAreaId.value = createdRef.key;
      $q.notify({ type: "positive", message: "熱區已新增。" });
    }

    showEditor.value = false;
  } catch (error) {
    notifyError(error, "無法儲存熱區");
  } finally {
    savingArea.value = false;
  }
}

function requestEditorDelete() {
  if (!editingId.value) return;

  requestDelete({
    id: editingId.value,
    alt: editorArea.value.alt || "未命名熱區",
  });
}

function requestDelete(area) {
  if (!area?.id) return;

  pendingDeleteId.value = area.id;
  pendingDeleteName.value = area.alt || "未命名熱區";
  showDeleteConfirm.value = true;
}

function clearDeleteRequest() {
  if (deletingArea.value) return;

  pendingDeleteId.value = null;
  pendingDeleteName.value = "";
}

async function confirmDelete() {
  const id = pendingDeleteId.value;
  if (!id || deletingArea.value) return;

  deletingArea.value = true;
  const wasSelected = selectedAreaId.value === id;
  if (wasSelected) selectedAreaId.value = null;

  try {
    // await remove(dbRef(db, "areas/" + id));
    await remove(dbRef(db, "area_kyoto/" + id));

    if (editingId.value === id) {
      showEditor.value = false;
    }

    showDeleteConfirm.value = false;
    $q.notify({ type: "positive", message: "熱區已刪除。" });
  } catch (error) {
    if (wasSelected) selectedAreaId.value = id;
    notifyError(error, "無法刪除熱區");
  } finally {
    deletingArea.value = false;
  }
}

function openGallery(area, startIndex = 0) {
  if (!area.photos.length) {
    $q.notify({ type: "warning", message: "此熱區沒有照片。" });
    return;
  }

  galleryPhotos.value = [...area.photos];
  galleryTitle.value = area.alt;
  currentSlide.value = clamp(startIndex, 0, area.photos.length - 1);
  showGallery.value = true;
}

function notifyError(error, fallbackMessage) {
  console.error(error);
  $q.notify({
    type: "negative",
    message: error?.message || fallbackMessage,
  });
}
</script>

<style scoped>
.editor-shell {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
}

.map-wrapper {
  text-align: center;
}

.image-container {
  position: relative;
  display: inline-block;
  width: 500px;
  max-width: 100%;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 3px 14px rgb(0 0 0 / 18%);
  line-height: 0;
}

.map-image {
  display: block;
  width: 100%;
  height: auto;
  user-select: none;
}

.capture-cursor,
.capture-cursor .map-image {
  cursor: crosshair;
}

.hotspot {
  position: absolute;
  z-index: 2;
  min-width: 14px;
  min-height: 14px;
  padding: 0;
  aspect-ratio: 1;
  transform: translate(-50%, -50%);
  border: 2px solid white;
  border-radius: 50%;
  background: rgb(220 38 38 / 50%);
  box-shadow: 0 0 0 2px rgb(220 38 38 / 85%);
  cursor: pointer;
  transition: transform 0.15s ease, background-color 0.15s ease;
}

.hotspot:hover,
.hotspot:focus-visible,
.hotspot.selected {
  z-index: 3;
  transform: translate(-50%, -50%) scale(1.12);
  background: rgb(220 38 38 / 75%);
  outline: none;
}

.hotspot.selected {
  box-shadow: 0 0 0 3px white, 0 0 0 5px rgb(25 118 210 / 90%);
}

.draft-hotspot {
  z-index: 4;
  border-style: dashed;
  background: rgb(25 118 210 / 35%);
  box-shadow: 0 0 0 2px rgb(25 118 210 / 90%);
  pointer-events: none;
}

.detail-card {
  width: 100%;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 10px;
}

.photo-thumb {
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
}

.editor-dialog {
  width: 560px;
  max-width: 94vw;
}

.photo-add-button {
  margin-top: 8px;
}

.gallery-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
