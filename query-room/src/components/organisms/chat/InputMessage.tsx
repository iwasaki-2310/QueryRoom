import { Button } from '@chakra-ui/react'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useState } from 'react'
import { roomData } from '../../../types/roomData'
import { useParams } from 'react-router-dom'

export const InputMessage: React.FC<roomData> = () => {
  const db = getFirestore()
  const { roomId } = useParams()
  const [inputMessage, setInputMessage] = useState('')

  // ======================================================
  // 関数名: onChangeMessage
  // 概要: テキストエリアに入力されたらテキストエリアにその値をセットする
  // ======================================================
  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

  // ======================================================
  // 関数名: sendMessage
  // 概要: 送信ボタンがクリックされたら、入力したメッセージをDBのmessagesに格納して、テキストエリアを初期化
  // ======================================================
  const sendMessage = async () => {
    if (roomId && inputMessage.trim() !== '') {
      try {
        await addDoc(collection(db, 'rooms', roomId, 'messages'), {
          message: inputMessage,
          createdAd: new Date(),
        })
        setInputMessage('')
      } catch (e) {
        console.log('メッセージの送信に失敗しました。', e)
      }
    }
  }

  return (
    <>
      <div className="input-message">
        <input
          type="textarea"
          onChange={onChangeMessage}
          value={inputMessage}
          placeholder="ここにメッセージを入力してください"
          className="input__message__word"
        />

        {/* 送信ボタン */}
        <Button onClick={sendMessage}>送信</Button>
      </div>
    </>
  )
}
