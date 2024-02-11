import { provider, useAuth } from '../providers/GoogleLoginUserProvider'
import { signInWithPopup } from 'firebase/auth'

// Googleサインインボタン
export const SignInButton: React.FC<{ provider: typeof provider }> = ({ provider }) => {
  const { auth } = useAuth()

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).catch((error) => console.error(error))
  }
  return <button onClick={signInWithGoogle}>Googleでサインイン</button>
}
