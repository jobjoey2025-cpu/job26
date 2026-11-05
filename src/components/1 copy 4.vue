<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="q-mx-auto" style="max-width: 700px">
      <!-- Header -->
      <div class="row items-center justify-between q-mb-md">
        <div>
          <div class="text-h5 text-weight-bold">洗衣蒐集 Checklist</div>
          <div class="text-caption text-grey-7">
            Firebase Realtime Database：{{ FIREBASE_PATH }}
          </div>
        </div>
        <q-icon name="local_laundry_service" size="36px" color="primary" />
      </div>

      <!-- Progress -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section>
          <div class="row justify-between items-center">
            <div class="text-subtitle1 text-weight-bold">完成進度</div>
            <div class="text-h6 text-primary">
              {{ completedCount }} / {{ items.length }}
            </div>
          </div>
          <q-linear-progress
            :value="progress"
            color="positive"
            size="12px"
            rounded
            class="q-mt-sm"
          />
          <div class="row justify-between items-center q-mt-sm">
            <div class="text-caption text-grey">
              {{ Math.round(progress * 100) }}% Completed
            </div>
            <q-badge
              :color="connected ? 'positive' : loading ? 'warning' : 'negative'"
            >
              {{
                loading ? "讀取中" : connected ? "Firebase 已連線" : "尚未連線"
              }}
            </q-badge>
          </div>
        </q-card-section>
      </q-card>

      <!-- Actions -->
      <div class="row q-gutter-sm q-mb-md">
        <q-btn
          label="全部勾選"
          icon="done_all"
          color="positive"
          outline
          size="sm"
          :disable="loading || saving || !items.length"
          @click="setAll(true)"
        />
        <q-btn
          label="全部清除"
          icon="refresh"
          color="grey-8"
          outline
          size="sm"
          :disable="loading || saving || !items.length"
          @click="setAll(false)"
        />
        <q-space />
        <q-btn
          label="重新讀取"
          icon="sync"
          color="primary"
          flat
          size="sm"
          :loading="loading"
          @click="loadItems"
        />
      </div>

      <q-banner
        v-if="!loading && !items.length"
        rounded
        class="bg-blue-1 text-blue-10 q-mb-md"
      >
        Firebase 目前沒有清單資料，正在初始化預設 14 項物品。
      </q-banner>

      <!-- Laundry Collection -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section class="bg-blue-1">
          <div class="row items-center justify-between">
            <div class="text-subtitle1 text-weight-bold">
              <q-icon name="local_laundry_service" class="q-mr-sm" />
              洗衣蒐集
            </div>
            <q-badge color="primary">
              {{ laundryItems.filter((x) => x.done).length }} /
              {{ laundryItems.length }}
            </q-badge>
          </div>
        </q-card-section>
        <q-separator />
        <q-list separator>
          <q-item
            v-for="item in laundryItems"
            :key="item.id"
            clickable
            v-ripple
            :disable="saving"
            @click="toggleItem(item)"
          >
            <q-item-section avatar>
              <q-checkbox
                :model-value="item.done"
                color="positive"
                @click.stop
                @update:model-value="toggleItem(item)"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="{ 'text-grey text-strike': item.done }">
                {{ item.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section side v-if="item.done">
              <q-icon name="check_circle" color="positive" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <!-- Other Items -->
      <q-card flat bordered class="q-mb-md">
        <q-card-section class="bg-grey-3">
          <div class="row items-center justify-between">
            <div class="text-subtitle1 text-weight-bold">
              <q-icon name="inventory_2" class="q-mr-sm" />
              其他物品
            </div>
            <q-badge color="grey-8">
              {{ otherItems.filter((x) => x.done).length }} /
              {{ otherItems.length }}
            </q-badge>
          </div>
        </q-card-section>
        <q-separator />
        <q-list separator>
          <q-item
            v-for="item in otherItems"
            :key="item.id"
            clickable
            v-ripple
            :disable="saving"
            @click="toggleItem(item)"
          >
            <q-item-section avatar>
              <q-checkbox
                :model-value="item.done"
                color="positive"
                @click.stop
                @update:model-value="toggleItem(item)"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label :class="{ 'text-grey text-strike': item.done }">
                {{ item.name }}
              </q-item-label>
            </q-item-section>
            <q-item-section side v-if="item.done">
              <q-icon name="check_circle" color="positive" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card>

      <q-banner
        v-if="completedCount === items.length && items.length"
        rounded
        class="bg-green-1 text-positive"
      >
        <template #avatar><q-icon name="task_alt" size="30px" /></template>
        全部物品蒐集完成！
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { db } from "boot/firebase_android";
import { ref as dbRef, onValue, set, update } from "firebase/database";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Firebase Realtime Database 路徑
const FIREBASE_PATH = "pc-software-config/laundry_list";

const defaultItems = [
  { id: "laundry-001", name: "陽台擦手巾", category: "洗衣蒐集", done: false },
  {
    id: "laundry-002",
    name: "太陽眼鏡 \\ 腿包 \\\\",
    category: "",
    done: false,
  },
  { id: "laundry-003", name: "擦腳巾", category: "洗衣蒐集", done: false },
  { id: "laundry-004", name: "帽子 生活 speed", category: "", done: false },
  {
    id: "laundry-005",
    name: "正穿內衣內褲",
    category: "洗衣蒐集",
    done: false,
  },
  { id: "laundry-006", name: "內褲 襪子 櫃", category: "", done: false },
  {
    id: "laundry-007",
    name: "門口 2個 吊掛 (冬天大型)",
    category: "",
    done: false,
  },
  { id: "laundry-008", name: "厚 薄 毛巾", category: "洗衣蒐集", done: false },
  { id: "laundry-009", name: "seiko 緊急正式衣服", category: "", done: false },
  { id: "laundry-010", name: "K600 書箱 & 床上", category: "", done: false },
  {
    id: "laundry-011",
    name: "枕頭套，背單，晚上帽子",
    category: "洗衣蒐集",
    done: false,
  },
  {
    id: "laundry-012",
    name: "椅套 2個，護膝，",
    category: "洗衣蒐集",
    done: false,
  },
  {
    id: "laundry-013",
    name: "用過的襪子。",
    category: "洗衣蒐集",
    done: false,
  },
  {
    id: "laundry-014",
    name: "身上的衣服。",
    category: "洗衣蒐集",
    done: false,
  },
];

const items = ref([]);
const loading = ref(false);
const saving = ref(false);
const connected = ref(false);

const laundryItems = computed(() =>
  items.value.filter((item) => item.category === "洗衣蒐集")
);
const otherItems = computed(() =>
  items.value.filter((item) => item.category !== "洗衣蒐集")
);
const completedCount = computed(
  () => items.value.filter((item) => item.done).length
);
const progress = computed(() =>
  items.value.length ? completedCount.value / items.value.length : 0
);

let unsubscribeItems = null;

function normalizeItem(raw, key) {
  return {
    id: String(raw?.id || key),
    name: String(raw?.name || ""),
    category: String(raw?.category || ""),
    done: Boolean(raw?.done),
  };
}

async function initializeDefaultItems() {
  const payload = {};
  defaultItems.forEach((item) => {
    payload[item.id] = item;
  });
  await set(dbRef(db, FIREBASE_PATH), payload);
}

function loadItems() {
  loading.value = true;
  connected.value = false;

  if (unsubscribeItems) {
    unsubscribeItems();
    unsubscribeItems = null;
  }

  unsubscribeItems = onValue(
    dbRef(db, FIREBASE_PATH),
    async (snapshot) => {
      try {
        const data = snapshot.val();

        // 第一次使用且 Firebase 路徑為空時，寫入預設 14 項
        if (!data) {
          await initializeDefaultItems();
          return;
        }

        items.value = Object.entries(data)
          .map(([key, value]) => normalizeItem(value, key))
          .sort((a, b) => a.id.localeCompare(b.id));

        connected.value = true;
        loading.value = false;
      } catch (error) {
        console.error(error);
        loading.value = false;
        $q.notify({
          type: "negative",
          message: `初始化 Firebase 失敗：${error.message}`,
        });
      }
    },
    (error) => {
      console.error(error);
      loading.value = false;
      connected.value = false;
      $q.notify({
        type: "negative",
        message: `讀取 Firebase 失敗：${error.message}`,
      });
    }
  );
}

async function toggleItem(item) {
  if (saving.value) return;

  const nextDone = !item.done;
  saving.value = true;

  try {
    await update(dbRef(db, `${FIREBASE_PATH}/${item.id}`), {
      done: nextDone,
    });
    // onValue 會同步更新本機 items
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: `更新「${item.name}」失敗：${error.message}`,
    });
  } finally {
    saving.value = false;
  }
}

async function setAll(done) {
  if (saving.value || !items.value.length) return;

  saving.value = true;
  const changes = {};

  items.value.forEach((item) => {
    changes[`${item.id}/done`] = done;
  });

  try {
    await update(dbRef(db, FIREBASE_PATH), changes);
    $q.notify({
      type: "positive",
      message: done
        ? "已全部勾選並同步 Firebase。"
        : "已全部清除並同步 Firebase。",
    });
  } catch (error) {
    console.error(error);
    $q.notify({
      type: "negative",
      message: `更新清單失敗：${error.message}`,
    });
  } finally {
    saving.value = false;
  }
}

onMounted(loadItems);

onUnmounted(() => {
  if (unsubscribeItems) unsubscribeItems();
});
</script>
