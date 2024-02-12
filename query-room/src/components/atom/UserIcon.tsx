import { Image } from '@chakra-ui/react'
import { useAuth } from '../providers/GoogleLoginUserProvider'

export const UserIcon = () => {
  const { signInResult } = useAuth()
  return (
    <Image borderRadius="full" boxSize="58px" src={signInResult.user.photoURL} alt={signInResult.user.displayName} />
  )
}
