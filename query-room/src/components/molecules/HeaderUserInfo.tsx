import React from 'react'
import { UserName } from '../atom/UserName'
import { UserIcon } from '../atom/UserIcon'
import { Flex } from '@chakra-ui/react'

export const HeaderUserInfo = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt="35px">
      <UserIcon />
      <UserName mt={'16px'} ml={'15px'} fontSize={'14px'} fontWeight={'bold'} color={'white'} />
    </Flex>
  )
}
