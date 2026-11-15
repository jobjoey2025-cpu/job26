import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBGqxXg3C_-Imuek1hzznncS97Al9EGQKY",
  apiKey: "AIzaSyBhXoV_fAfIr0MEULWDXyI5OsBYUhk3dQc",
  // authDomain: "img-map-a673d.firebaseapp.com",
  authDomain: "job2026-ba137.firebaseapp.com",
  // databaseURL: "https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL: "https://job2026-ba137-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "job2026-ba137",


  // storageBucket: "img-map-a673d.firebasestorage.app",
  // messagingSenderId: "319372504023",
  // appId: "1:319372504023:web:5b4c5d6f7ef8c58749b992",
  // measurementId: "G-0RX9HTGL12",

  storageBucket: "job2026-ba137.firebasestorage.app",
  messagingSenderId: "452384740309",
  appId: "1:452384740309:web:c3d05cd4dd07d50d21235c"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(() => { })

// https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app


