import { useNavigate } from 'react-router-dom'
import { auth } from '../providers/GoogleLoginUserProvider'
import { Button } from '@chakra-ui/react'

// サインアウトボタン
export const SignOutButton = () => {
  const navigate = useNavigate()
  const signOutWithGoogle = async () => {
    try {
      auth.signOut()
      navigate('/login')
    } catch (error) {
      console.error('ログインに失敗しました', error)
    }
  }
  return (
    <Button
      onClick={signOutWithGoogle}
      bg="customPurple.900"
      color={'white'}
      padding={7}
      transition="all 0.5s"
      _hover={{ color: 'customPurple.900', bg: 'white', transition: 'all 0.5s' }}
    >
      サインアウト
    </Button>
  )
}
