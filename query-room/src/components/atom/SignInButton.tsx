import { useNavigate } from 'react-router-dom'
import { provider, useAuth } from '../providers/GoogleLoginUserProvider'

// Googleサインインボタン
export const SignInButton: React.FC<{ provider: typeof provider }> = ({ provider }) => {
  const { handleSignIn } = useAuth()
  const navigate = useNavigate()

  const signInWithGoogle = async () => {
    try {
      await handleSignIn()
      navigate('/home')
    } catch (error) {
      console.error('ログインに失敗しました', error)
    }
  }
  return (
    <button onClick={signInWithGoogle} className="login__button">
      Googleアカウントでログイン
    </button>
  )
}
