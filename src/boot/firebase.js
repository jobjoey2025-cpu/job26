import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyDRBTr-Dvf_Z7ZgzKnPzCfWtN5EY5L_-mY",
  authDomain: "id-manager-8aa1e.firebaseapp.com",
  databaseURL: "https://id-manager-8aa1e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "id-manager-8aa1e",
  storageBucket: "id-manager-8aa1e.firebasestorage.app",
  messagingSenderId: "1020217182424",
  appId: "1:1020217182424:web:b62cc6222c52d93e376fad",
  measurementId: "G-ZR41C89015"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(() => { })