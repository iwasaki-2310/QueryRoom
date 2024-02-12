import { Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { useAuth } from '../../providers/GoogleLoginUserProvider'
import { SignOutButton } from '../../atom/SignOutButton'

export const Header = () => {
  const { signInResult } = useAuth()

  return (
    <>
      <Box p={5} height="100vh" width="288px" bg="customPurple.900">
        <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>QueryRoom</h1>
        <Flex justifyContent="center" alignItems="center" mt="35px">
          <Image
            borderRadius="full"
            boxSize="58px"
            src={signInResult.user.photoURL}
            alt={signInResult.user.displayName}
          />
          <Text mt="16px" ml="15px" fontSize="14px" color="white" fontWeight="bold">
            {signInResult.user.displayName}さん
          </Text>
        </Flex>
        <SignOutButton />
      </Box>
    </>
  )
}
