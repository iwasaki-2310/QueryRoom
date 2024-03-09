import { Button } from '@chakra-ui/react'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'

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
  const {
    bgColor,
    color,
    buttonType,
    onClose,
    roomName = '',
    roomPassword = '',
    children,
    onChangeMode,
    onClick,
  } = props
  const navigate = useNavigate()

  // ======================================================
  // 関数名: HandleCreateRoom
  // 概要: ルーム新規作成時の関数
  // ======================================================
  const HandleCreateRoom = async (roomName: string, roomPassword: string) => {
    const db = getFirestore()
    try {
      const docRef = await addDoc(collection(db, 'rooms'), {
        roomName: roomName,
        roomPassword: roomPassword,
        roomCreatedAt: new Date(),
      })
      console.log('ルーム作成に成功しました。ドキュメントID: ', docRef.id)
      navigate('../room/' + docRef.id)
    } catch (e) {
      console.log(roomName)
      console.error('ルーム作成に失敗しました: ', e)
    }
  }

  return (
    <Button
      onClick={() => {
        if (buttonType === 'makeNewRoom') {
          HandleCreateRoom(roomName, roomPassword)
        } else if (buttonType === 'makeNewRoom' && onClose) {
          onClose()
        } else if (buttonType === 'sendMessage' && onClick) {
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
