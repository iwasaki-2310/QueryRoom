import { Flex } from '@chakra-ui/react'
import React from 'react'
import { MakeRoomButton } from '../atom/MakeRoomButton'
import { SelectRoomButton } from '../atom/SelectRoomButton'

export const HomePage: React.FC = () => {
  return (
    <>
      <Flex justifyContent="center" width="100%" mt="240px">
        <MakeRoomButton />
        <SelectRoomButton />
      </Flex>
    </>
  )
}
