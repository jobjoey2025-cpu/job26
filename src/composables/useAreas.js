import { ref } from "vue";
import {
  onValue,
  push,
  ref as dbRef,
  update,
} from "firebase/database";

import { db } from "boot/firebase_album";

export function useAreas() {
  const areas = ref([]);
  const loading = ref(false);
  const error = ref("");
  let unsubscribe = null;

  function loadAreas() {
    dispose();
    loading.value = true;
    error.value = "";

    unsubscribe = onValue(
      dbRef(db, "areas"),
      (snapshot) => {
        const data = snapshot.val();

        areas.value = data && typeof data === "object"
          ? Object.entries(data).map(([id, value]) => ({
              id,
              ...(value || {}),
            }))
          : [];

        loading.value = false;
      },
      (cause) => {
        areas.value = [];
        error.value = cause.message || "Area 資料載入失敗";
        loading.value = false;
      },
    );

    return unsubscribe;
  }

  function dispose() {
    if (!unsubscribe) return;
    unsubscribe();
    unsubscribe = null;
  }

  async function updateArea(id, data) {
    if (!id) throw new Error("缺少 Area ID");

    const payload = removeUndefined(data);
    if (Object.keys(payload).length === 0) return;

    await update(dbRef(db, `areas/${id}`), payload);
  }

  async function updateTodo(areaId, index, done) {
    const area = areas.value.find((item) => item.id === areaId);
    const todos = Array.isArray(area?.todo) ? area.todo : [];

    if (!area) throw new Error("找不到指定的 Area");
    if (!todos[index]) throw new Error("找不到指定的 Todo");

    const nextTodos = todos.map((todo, todoIndex) =>
      todoIndex === index ? { ...todo, done: Boolean(done) } : todo,
    );

    await updateArea(areaId, { todo: nextTodos });
  }

  async function createArea(data) {
    const name = data?.name?.trim();
    if (!name) throw new Error("請輸入 Area 名稱");

    await push(dbRef(db, "areas"), {
      name,
      tag: data.tag?.trim() || "",
      photos: data.photo?.trim() ? [data.photo.trim()] : [],
      status: "待施工",
      cost: 0,
      icon: "place",
      message: "",
      issues: [],
      todo: [],
      createdAt: Date.now(),
    });
  }

  function removeUndefined(data = {}) {
    return Object.fromEntries(
      Object.entries(data).filter(([, value]) => value !== undefined),
    );
  }

  return {
    areas,
    loading,
    error,
    loadAreas,
    dispose,
    updateArea,
    updateTodo,
    createArea,
  };
}
