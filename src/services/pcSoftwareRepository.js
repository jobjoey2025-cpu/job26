import { applyCommand, freshSeed, normalizeData, toDatabase } from "../models/pcSoftware.js";

// Transport injection keeps transaction/migration behavior testable without a live database.
export function createPcSoftwareRepository({ dataRef, connectionRef, onValue, runTransaction, createId }) {
  return {
    createId,
    async initialize() {
      await runTransaction(dataRef, current => {
        if (current === null) return toDatabase(freshSeed());
        const data = normalizeData(current, { firebase: true });
        // Existing v2 data needs no write. Never reseed an intentionally empty collection.
        if (current.version === 2) return undefined;
        return toDatabase(data);
      }, { applyLocally: false });
    },
    subscribe(onData, onError) {
      return onValue(dataRef, snapshot => {
        try {
          if (!snapshot.exists()) throw new Error("Firebase 資料已移除，請重新載入頁面");
          onData(normalizeData(snapshot.val(), { firebase: true }));
        } catch (error) { onError(error); }
      }, onError);
    },
    subscribeConnection(onConnected, onError) {
      return onValue(connectionRef, snapshot => onConnected(snapshot.val() === true), onError);
    },
    async execute(command) {
      const result = await runTransaction(dataRef, current => {
        if (current === null) throw new Error("Firebase 資料已移除，請重新載入頁面");
        return toDatabase(applyCommand(normalizeData(current, { firebase: true }), command));
      }, { applyLocally: false });
      if (!result.committed) throw new Error("Firebase 未完成儲存，請重試");
    },
  };
}
