import { Button } from '@chakra-ui/react'
import React, { FC } from 'react'

type ButtonProps = {
  roomName?: string
  roomPassword?: string
  bgColor: string
  color: string
  buttonType?: string
  children: React.ReactNode
  inputMessage?: string
  onClose?: () => void
  onClick?: () => void
  setInputMessage?: (inputMessage: string) => void
  onChangeMode?: () => void
  setDelayTime?: () => void
  resetDelayTime?: () => void
  onSendClick?: () => void
  delayTime?: number
}

export const PrimaryButton: FC<ButtonProps> = (props) => {
  const { bgColor, color, buttonType, children, onChangeMode, onClick } = props

  return (
    <Button
      onClick={() => {
        if (buttonType === 'sendMessage' && onClick) {
          onClick()
        } else if (buttonType === 'changeMode' && onChangeMode) {
          onChangeMode()
        } else if (onClick) {
          onClick()
        }
      }}
      backgroundColor={bgColor}
      color={color}
      transition="all 0.5s"
      _hover={{ backgroundColor: color, color: bgColor, transition: 'all 0.5s' }}
    >
      {children}
    </Button>
  )
}
