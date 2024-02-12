import React from 'react'
import { Box } from '@chakra-ui/react'
import { SignOutButton } from '../../atom/SignOutButton'
import { HeaderUserInfo } from '../../molecules/HeaderUserInfo'

export const Header = () => {
  return (
    <>
      <Box p={5} height="100vh" width="288px" bg="customPurple.900">
        <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>QueryRoom</h1>
        <HeaderUserInfo />
        <SignOutButton />
      </Box>
    </>
  )
}
