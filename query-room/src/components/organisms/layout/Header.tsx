import React from 'react'
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { SignOutButton } from '../../atom/SignOutButton'
import { HeaderUserInfo } from '../../molecules/HeaderUserInfo'
import { HamburgerIcon } from '@chakra-ui/icons'
import { auth } from '../../providers/GoogleLoginUserProvider'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
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
    <>
      <Box className="header">
        <div className="header__inner">
          <h1 className="header__logo">QueryRoom</h1>
          <div className="header__contents">
            <HeaderUserInfo />
            <SignOutButton />
          </div>
          <Box display={{ base: 'block', md: 'none' }}>
            <Menu>
              <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
              <MenuList border="1px solid #CBD5E0">
                <MenuItem>
                  <HeaderUserInfo />
                </MenuItem>
                <MenuItem onClick={signOutWithGoogle} className="signout-button">
                  サインアウト
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </div>
      </Box>
    </>
  )
}
