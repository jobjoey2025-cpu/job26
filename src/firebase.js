import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  // 你的設定
}

const app = initializeApp(firebaseConfig)

export const db = getDatabase(app)