import { Box, Button, Text } from '@chakra-ui/react'
import { doc, getFirestore, onSnapshot, DocumentData, addDoc, collection, query, orderBy } from 'firebase/firestore'
import Linkify from 'linkify-react'
import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const RoomPage = () => {
  const { roomId } = useParams()
  const [roomData, setRoomData] = useState<DocumentData | null>(null)
  const db = getFirestore()

  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<{ message: string; time: string }[]>([])

  // URLを検出する正規表現
  // const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi

  // ======================================================
  // 関数名: エフェクトフック
  // 概要: ルーム情報の初期化、常時監視
  // ======================================================
  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        // ルーム情報を取得
        const roomRef = doc(db, 'rooms', roomId)
        // メッセージ情報を取得
        const messagesRef = query(collection(db, 'rooms', roomId, 'messages'), orderBy('createdAd', 'asc'))

        // ルーム情報を常時監視。
        // ドキュメントが存在する場合はドキュメントデータをセットする。
        const unsubscribeRoom = onSnapshot(roomRef, (doc) => {
          doc.exists() ? setRoomData(doc.data()) : console.log('ルームの接続に失敗しました')
        })

        // メッセージ情報を常時監視。
        // メッセージに関して何かしらのアクションがあった場合は、メッセージリストに各種情報を保存して格納する。
        const unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
          const messagesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            message: doc.data().message,
            time: doc.data().createdAd.toDate().toLocaleString('ja-JP'),
          }))
          setMessages(messagesList)
        })

        // ルーム情報常時監視関数、メッセージ常時監視関数の実行
        return () => {
          unsubscribeRoom()
          unsubscribeMessages()
        }
      }
    }

    // 常時監視する諸々の関数を実行
    fetchRoomData()
  }, [roomId, db])

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
      {roomData ? (
        <>
          <Box>
            <h2>{roomData.roomName}</h2>
            {messages.map(({ message, time }, index) => (
              <div key={index}>
                <Linkify as="p" options={{ className: 'custom-link' }}>
                  {message}
                </Linkify>
                <span>{time}</span>
              </div>
            ))}
            <input
              style={{ height: '30px', width: '80%' }}
              type="textarea"
              onChange={onChangeMessage}
              value={inputMessage}
            />
            <Button onClick={sendMessage}>送信</Button>
          </Box>
        </>
      ) : null}
    </>
  )
}
