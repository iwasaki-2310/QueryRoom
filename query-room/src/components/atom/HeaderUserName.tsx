import { Text } from '@chakra-ui/react'
import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

export const HeaderUserName = () => {
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  if (!user) {
    return null
  } else {
    return (
      <Text mt="16px" ml="15px" fontSize="14px" color="white" fontWeight="bold">
        {user.displayName || undefined}さん
      </Text>
    )
  }
}
