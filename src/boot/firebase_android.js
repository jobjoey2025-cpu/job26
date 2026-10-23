import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: "AIzaSyBGqxXg3C_-Imuek1hzznncS97Al9EGQKY",
  apiKey: "AIzaSyAnpxk6RnFaI9wOwbwqCzGMWR-ZDfKxWyY",
  // authDomain: "img-map-a673d.firebaseapp.com",
  authDomain: "android-c820f.firebaseapp.com",
  // databaseURL: "https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app",
  databaseURL: "https://android-c820f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "android-c820f",


  // storageBucket: "img-map-a673d.firebasestorage.app",
  // messagingSenderId: "319372504023",
  // appId: "1:319372504023:web:5b4c5d6f7ef8c58749b992",
  // measurementId: "G-0RX9HTGL12",

  storageBucket: "android-c820f.firebasestorage.app",
  messagingSenderId: "305904956854",
  appId: "1:305904956854:web:1da846f614b73c05b3bd17"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(() => { })

// https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app


