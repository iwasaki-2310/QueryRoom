import { useNavigate } from 'react-router-dom'
import { provider, useAuth } from '../providers/GoogleLoginUserProvider'
import { signInWithPopup } from 'firebase/auth'
import { Button } from '@chakra-ui/react'
import { useAuthState } from 'react-firebase-hooks/auth'

// Googleサインインボタン
export const SignInButton: React.FC<{ provider: typeof provider }> = ({ provider }) => {
  const { auth, setSignInResult, userName, setUserName, userAvatar, setUserAvatar, handleSignIn } = useAuth()
  const [user] = useAuthState(auth)
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
    <Button
      onClick={signInWithGoogle}
      mt={8}
      bg="customPurple.900"
      color={'white'}
      fontSize={'lg'}
      padding={7}
      transition="all 0.5s"
      _hover={{ color: 'customPurple.900', bg: 'white', transition: 'all 0.5s' }}
    >
      Googleアカウントでログイン
    </Button>
  )
}
