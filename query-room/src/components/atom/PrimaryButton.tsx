import { Button } from '@chakra-ui/react'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import React, { FC } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

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
}

export const PrimaryButton: FC<ButtonProps> = (props) => {
  const {
    bgColor,
    color,
    buttonType,
    onClose,
    roomName = '',
    roomPassword = '',
    setInputMessage,
    inputMessage,
    children,
  } = props
  const db = getFirestore()
  const { roomId } = useParams()
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

  // ======================================================
  // 関数名: sendMessage
  // 概要: 送信ボタンがクリックされたら、入力したメッセージをDBのmessagesに格納して、テキストエリアを初期化
  // ======================================================
  const sendMessage = async () => {
    if (roomId && inputMessage && inputMessage.trim() !== '') {
      try {
        await addDoc(collection(db, 'rooms', roomId, 'messages'), {
          message: inputMessage,
          createdAd: new Date(),
        })
        if (setInputMessage) {
          setInputMessage('')
        }
      } catch (e) {
        console.log('メッセージの送信に失敗しました。', e)
      }
    }
  }

  return (
    <Button
      onClick={() => {
        if (buttonType === 'makeNewRoom') {
          HandleCreateRoom(roomName, roomPassword)
        } else if (buttonType === 'makeNewRoom' && onClose) {
          onClose()
        } else if (buttonType === 'sendMessage') {
          console.log('aaaaaaa')
          sendMessage()
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
