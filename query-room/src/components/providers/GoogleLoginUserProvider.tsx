// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, Auth, GoogleAuthProvider } from 'firebase/auth'
import { ReactNode, createContext, useContext } from 'react'

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

// authオブジェクトとプロバイダーの作成
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

// Contextの型定義
interface AuthContextType {
  auth: Auth
  provider: GoogleAuthProvider
}

// AuthContextの作成
const AuthContext = createContext<AuthContextType>({ auth, provider })

// AuthProviderコンポーネントのProps型定義
interface AuthProviderProps {
  children: ReactNode
}

// AuthProviderコンポーネント作成
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <AuthContext.Provider value={{ auth, provider }}>{children}</AuthContext.Provider>
}

// カスタムフック
export const useAuth = (): AuthContextType => useContext(AuthContext)

export { auth, provider }
