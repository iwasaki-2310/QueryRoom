import { useNavigate } from 'react-router-dom'
import { provider, useAuth } from '../providers/GoogleLoginUserProvider'
import { Button } from '@chakra-ui/react'

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
