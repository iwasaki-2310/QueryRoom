import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

type ButtonProps = {
  bgColor: string
  color: string
  children: React.ReactNode
}

export const PrimaryButton: FC<ButtonProps> = (props) => {
  const { bgColor, color, children } = props
  return (
    <Button
      backgroundColor={bgColor}
      color={color}
      transition="all 0.5s"
      _hover={{ backgroundColor: color, color: bgColor, transition: 'all 0.5s' }}
    >
      {children}
    </Button>
  )
}
