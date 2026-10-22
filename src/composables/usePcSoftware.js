import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { pcSoftwareService } from "../services/pcSoftwareService.js";

export function usePcSoftware() {
  const data = ref({ pcs: [], roles: [], software: [], installedByPc: {}, options: {
    osOptions: [], categoryChoices: [], priorityOptions: [],
  } });
  const loaded = ref(false);
  const connected = ref(false);
  const saving = ref(false);
  const error = ref("");
  let disposed = false;
  let unsubscribeData;
  let unsubscribeConnection;
  const ready = computed(() => loaded.value && connected.value);
  const status = computed(() => {
    if (error.value) return `Firebase：${error.value}`;
    if (saving.value) return connected.value ? "正在儲存至 Firebase…" : "連線中斷，等待 Firebase 確認儲存…";
    if (!connected.value) return "Firebase 尚未連線，暫停編輯";
    return loaded.value ? "Firebase 已連線，資料即時同步" : "正在讀取 Firebase…";
  });
  function readError(cause) {
    if (disposed) return;
    loaded.value = false;
    error.value = cause.message || "讀取失敗，請檢查資料庫規則與網路";
  }
  onMounted(async () => {
    try {
      unsubscribeConnection = pcSoftwareService.subscribeConnection(value => { connected.value = value; }, readError);
      await pcSoftwareService.initialize();
      if (disposed) return;
      unsubscribeData = pcSoftwareService.subscribe(value => {
        data.value = value;
        loaded.value = true;
        error.value = "";
      }, readError);
    } catch (cause) { readError(cause); }
  });
  onBeforeUnmount(() => {
    disposed = true;
    unsubscribeData?.();
    unsubscribeConnection?.();
  });
  async function execute(command) {
    if (!ready.value) throw new Error("請等待 Firebase 連線並完成資料載入");
    if (saving.value) throw new Error("上一筆資料尚在儲存，請稍候");
    saving.value = true;
    error.value = "";
    try {
      await pcSoftwareService.execute(command);
    } catch (cause) {
      error.value = cause.message || "儲存失敗";
      throw cause;
    } finally { saving.value = false; }
  }
  return {
    data, ready, status, saving, error, loaded,
    canEdit: computed(() => ready.value && !saving.value),
    createId: pcSoftwareService.createId,
    execute,
  };
}
