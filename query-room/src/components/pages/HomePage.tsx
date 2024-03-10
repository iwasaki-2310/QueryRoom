import { Flex } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { MakeRoomButton } from '../atom/MakeRoomButton'
import { SelectRoomButton } from '../atom/SelectRoomButton'
import { useAuth } from '../providers/GoogleLoginUserProvider'

export const HomePage: React.FC = () => {
  const { userAvatar } = useAuth()
  useEffect(() => {}, [userAvatar])

  return (
    <>
      <Flex justifyContent="center" width="100%" mt="240px">
        <MakeRoomButton />
        <SelectRoomButton />
      </Flex>
    </>
  )
}
