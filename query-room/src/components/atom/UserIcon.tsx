import { Image } from '@chakra-ui/react'
import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'

type userIconProps = {
  boxSize: string
}

export const UserIcon: React.FC<userIconProps> = (props) => {
  const { boxSize } = props
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  const { userName, setUserName, userAvatar, setUserAvatar } = useAuth()
  if (!user) {
    return null
  } else {
    return (
      <>
        <Image
          borderRadius="full"
          boxSize={boxSize}
          src={user.photoURL || undefined}
          alt={user.displayName || undefined}
        />
      </>
    )
  }
}
