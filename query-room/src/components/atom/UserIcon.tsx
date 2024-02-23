import { Image } from '@chakra-ui/react'
import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

export const UserIcon = () => {
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  if (!user) {
    return null
  } else {
    return (
      <>
        <Image
          borderRadius="full"
          boxSize="58px"
          src={user.photoURL || undefined}
          alt={user.displayName || undefined}
        />
      </>
    )
  }
}
