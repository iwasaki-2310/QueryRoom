import { Text } from '@chakra-ui/react'
import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

type UserNameCSS = {
  mt?: string
  ml?: string
  fontSize?: string
  fontWeight?: string
  color?: string
}

export const UserName: React.FC<UserNameCSS> = (props) => {
  const { mt, ml, fontSize, fontWeight, color } = props
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  if (!user) {
    return null
  } else {
    return (
      <Text mt={mt} ml={ml} fontSize={fontSize} color={color} fontWeight={fontWeight}>
        {user.displayName || undefined}
      </Text>
    )
  }
}
