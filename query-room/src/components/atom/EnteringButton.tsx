import React, { FC } from 'react'
import { PrimaryButton } from './PrimaryButton'

type ButtonProps = {
  bgColor: string
  color: string
}

export const EnteringButton: FC<ButtonProps> = (props) => {
  const { bgColor, color } = props
  return <PrimaryButton bgColor={bgColor} color={color} children="入室"></PrimaryButton>
}
