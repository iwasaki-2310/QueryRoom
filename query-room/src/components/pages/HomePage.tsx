import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { MakeRoomButton } from '../atom/MakeRoomButton'
import { SelectRoomButton } from '../atom/SelectRoomButton'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useAuth } from '../providers/GoogleLoginUserProvider'

export const HomePage: React.FC = () => {
  const { auth, setSignInResult, userName, setUserName, userAvatar, setUserAvatar, ...userInfo } = useAuth()
  const [user] = useAuthState(auth)
  useEffect(() => {
    console.log(userAvatar)
  }, [userAvatar])

  return (
    <>
      <Flex justifyContent="center" width="100%" mt="240px">
        <MakeRoomButton />
        <SelectRoomButton />
      </Flex>
    </>
  )
}
