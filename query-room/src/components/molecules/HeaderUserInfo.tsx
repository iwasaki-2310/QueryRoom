import React from 'react';
import { HeaderUserName } from '../atom/HeaderUserName';
import { UserIcon } from '../atom/UserIcon';
import { Flex } from '@chakra-ui/react';

export const HeaderUserInfo = () => {
  return (
    <Flex justifyContent="center" alignItems="center" mt="35px">
      <UserIcon/>
      <HeaderUserName/>
    </Flex>
  );
};
