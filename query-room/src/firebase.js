// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBXTpEtEFQzXNXRS9s_vy1sABAhTRTuwvA',
  authDomain: 'queryroom-9178b.firebaseapp.com',
  projectId: 'queryroom-9178b',
  storageBucket: 'queryroom-9178b.appspot.com',
  messagingSenderId: '127495684578',
  appId: '1:127495684578:web:679fd1816c40d17b6139bb',
  measurementId: 'G-99CR8818KH',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
