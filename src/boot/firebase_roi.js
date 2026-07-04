import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDdFI9Fs2MnN-ApsglAS74GqKltroUdmxI",
  authDomain: "roi-project-defb3.firebaseapp.com",
  databaseURL: "https://roi-project-defb3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "roi-project-defb3",
  storageBucket: "roi-project-defb3.firebasestorage.app",
  messagingSenderId: "341268035888",
  appId: "1:341268035888:web:45451ea36a15d415c3f0f5",
  measurementId: "G-C06GV8TFB2"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(() => { })