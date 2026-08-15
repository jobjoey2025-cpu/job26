// https://img-map-a673d-default-rtdb.asia-southeast1.firebasedatabase.app

import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app'
import {
  getDatabase,
  ref,
  get
} from 'firebase/database'

const firebaseConfig = {
  apiKey: "AIzaSyBd4dGhLqnLvawImVhy1GE6ItiyK5EXSPo",
  authDomain: "to-do-list-952c8.firebaseapp.com",
  databaseURL: "https://to-do-list-952c8-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "to-do-list-952c8",
  storageBucket: "to-do-list-952c8.firebasestorage.app",
  messagingSenderId: "32108605617",
  appId: "1:32108605617:web:ae6e33ac66dada4874b290"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export { app, db }

export default boot(async () => {
  try {
    const snapshot = await get(ref(db, '/'))

    console.log(
      'Firebase connected successfully:',
      snapshot.val()
    )

  } catch (error) {
    console.error('Firebase connection error:', error)
    console.error('Error code:', error.code)
    console.error('Error message:', error.message)
  }
})
