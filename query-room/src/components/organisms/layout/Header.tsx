import React from 'react'
import { Box } from '@chakra-ui/react'
import { SignOutButton } from '../../atom/SignOutButton'
import { HeaderUserInfo } from '../../molecules/HeaderUserInfo'

export const Header = () => {
  return (
    <>
      <Box className="header">
        <h1 style={{ color: 'white', fontSize: '30px', textAlign: 'center' }}>QueryRoom</h1>
        <HeaderUserInfo />
        <SignOutButton />
      </Box>
    </>
  )
}
