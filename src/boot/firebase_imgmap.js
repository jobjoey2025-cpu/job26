import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGqxXg3C_-Imuek1hzznncS97Al9EGQKY",
  authDomain: "img-map-a673d.firebaseapp.com",
  databaseURL: "https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "img-map-a673d",
  storageBucket: "img-map-a673d.firebasestorage.app",
  messagingSenderId: "319372504023",
  appId: "1:319372504023:web:5b4c5d6f7ef8c58749b992",
  measurementId: "G-0RX9HTGL12"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(() => { })

// https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app


