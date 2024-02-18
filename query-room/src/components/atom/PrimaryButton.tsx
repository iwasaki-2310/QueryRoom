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
  onClose?: () => void
}

export const PrimaryButton: FC<ButtonProps> = (props) => {
  const { bgColor, color, buttonType, onClose, roomName = '', roomPassword = '', children } = props
  const navigate = useNavigate()

  // 新規作成時の関数
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
        } else if (onClose) {
          onClose()
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
