import { Image } from '@chakra-ui/react'
import React from 'react'

type UserIconProps = {
  boxSize: string
  userName?: string
  userAvatar?: string
}

export const MessageUserIcon: React.FC<UserIconProps> = ({ boxSize, userName, userAvatar }) => {
  if (!userAvatar) {
    return null
  }
  return <Image borderRadius="full" boxSize={boxSize} src={userAvatar} alt={userName} />
}
