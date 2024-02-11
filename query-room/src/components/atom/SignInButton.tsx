import { useNavigate } from 'react-router-dom'
import { provider, useAuth } from '../providers/GoogleLoginUserProvider'
import { signInWithPopup } from 'firebase/auth'

// Googleサインインボタン
export const SignInButton: React.FC<{ provider: typeof provider }> = ({ provider }) => {
  const { auth } = useAuth()
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider)
      navigate('/home')
    } catch (error) {
      console.error('ログインに失敗しました', error)
    }
  }
  return <button onClick={signInWithGoogle}>Googleでサインイン</button>
}
