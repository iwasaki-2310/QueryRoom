import { useNavigate } from 'react-router-dom'
import { provider, useAuth } from '../providers/GoogleLoginUserProvider'
import { signInWithPopup } from 'firebase/auth'
import { Button } from '@chakra-ui/react'

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
  return (
    <Button
      onClick={signInWithGoogle}
      mt={8}
      bg="customPurple.900"
      color={'white'}
      fontSize={"lg"}
      padding={7}
      transition="all 0.5s"
      _hover={{ color: 'customPurple.900', bg: 'white', transition: 'all 0.5s' }}
    >
      Googleアカウントでログイン
    </Button>
  )
}
