// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth'
import { ReactNode, createContext, useContext, useState } from 'react'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBXTpEtEFQzXNXRS9s_vy1sABAhTRTuwvA',
  authDomain: 'queryroom-9178b.firebaseapp.com',
  projectId: 'queryroom-9178b',
  storageBucket: 'queryroom-9178b.appspot.com',
  messagingSenderId: '127495684578',
  appId: '1:127495684578:web:679fd1816c40d17b6139bb',
  measurementId: 'G-99CR8818KH',
}

// FireBaseの初期化
const app = initializeApp(firebaseConfig)

// Firestoreのインスタンスを初期化
const db = getFirestore(app)

// authオブジェクトとプロバイダーの作成
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Contextの型定義
interface AuthContextType {
  db: any
  auth: Auth
  provider: GoogleAuthProvider
  signInResult: any
  setSignInResult: (result: any) => void
}

// AuthContextの作成
const AuthContext = createContext<AuthContextType>({
  db,
  auth,
  provider,
  signInResult: null,
  setSignInResult: () => {},
})

// AuthProviderコンポーネントのProps型定義
interface AuthProviderProps {
  children: ReactNode
}

// AuthProviderコンポーネント作成
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [signInResult, setSignInResult] = useState<any>(null)
  return (
    <AuthContext.Provider value={{ db, auth, provider, signInResult, setSignInResult }}>
      {children}
    </AuthContext.Provider>
  )
}

// カスタムフック
export const useAuth = (): AuthContextType => useContext(AuthContext)

export { db, auth, provider }
