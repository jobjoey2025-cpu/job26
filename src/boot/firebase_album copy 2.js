import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNDT-1sI7itI5Qb9ZUuhaAEi3XJNZ-kdk",
  authDomain: "area-album.firebaseapp.com",
  databaseURL: "https://area-album-default-rtdb.asia-southeast1.firebasedatabase.app/",
  // databaseURL: "https://area-album-default-rtdb.firebaseio.com/",
  // https://area-album-default-rtdb.asia-southeast1.firebasedatabase.app/
  projectId: "area-album",
  storageBucket: "area-album.firebasestorage.app",
  messagingSenderId: "1031419437893",
  appId: "1:1031419437893:web:870cf1ced0b1aa8573942c",
  measurementId: "G-J1LYNMV6BB"
};

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export const storage = getStorage(app);
export { app, db }

export default boot(() => { })