import { Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../providers/GoogleLoginUserProvider'

export const HeaderUserName = () => {
  const { signInResult } = useAuth()
  return (
    <Text mt="16px" ml="15px" fontSize="14px" color="white" fontWeight="bold">
      {signInResult.user.displayName}さん
    </Text>
  )
}
