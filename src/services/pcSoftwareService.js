import { getApps, initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref, runTransaction } from "firebase/database";
import config from "../config/firebase-pc-software.json";
import { createPcSoftwareRepository } from "./pcSoftwareRepository.js";

// This page uses a different project from the app's other Firebase modules.
const appName = "pc-software";
const { dataPath, ...firebaseConfig } = config;
const app = getApps().find(item => item.name === appName) ?? initializeApp(firebaseConfig, appName);
const database = getDatabase(app);
const dataRef = ref(database, dataPath);

export const pcSoftwareService = createPcSoftwareRepository({
  dataRef,
  connectionRef: ref(database, ".info/connected"),
  onValue,
  runTransaction,
  createId: () => push(dataRef).key,
});
