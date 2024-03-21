import { Box } from '@chakra-ui/react'
import { doc, getFirestore, onSnapshot, DocumentData, collection, query, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChatHeader } from '../organisms/chat/ChatHeader'
import { ChatMessage } from '../molecules/ChatMessage'
import { InputMessage } from '../organisms/chat/InputMessage'
import { auth } from '../providers/GoogleLoginUserProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { useRoomAccessCheck } from '../../hooks/useRoomAccessCheck'

export const RoomPage = () => {
  const { roomId } = useParams()
  const [roomData, setRoomData] = useState<DocumentData | null>(null)
  const db = getFirestore()

  const [messages, setMessages] = useState<
    { message: string; time: string; profilePicture: string; displayName: string; senderId: string }[]
  >([])

  // ======================================================
  // 関数名: エフェクトフック
  // 概要: ルーム情報の初期化、常時監視
  // ======================================================
  useEffect(() => {
    // console.log(userAvatar)
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
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
                displayName: doc.data().displayName,
                profilePicture: doc.data().profilePicture,
                time: doc
                  .data()
                  .createdAd.toDate()
                  .toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
                senderId: doc.data().senderId,
              }))
              setMessages(messagesList)
              // console.log(messagesList)
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
      }
    })
  }, [roomId, db])

  useEffect(() => {
    setTimeout(() => {
      const messageArea = document.querySelector('.message__area')
      if (messageArea) {
        if (messages.length === 1) {
          window.scrollTo(0, 0)
        } else {
          messageArea.scrollTop = messageArea.scrollHeight
        }
      }
    }, 100)
  }, [messages])

  // ======================================================
  // 関数名: useRoomAccessCheck（カスタムフック）
  // 概要: ユーザー情報が存在するかを入室時にチェック。ユーザー情報が存在しなければHomeにリダイレクト
  // ======================================================
  useRoomAccessCheck()

  return (
    <>
      {roomData ? (
        <>
          <Box className="chatArea">
            {/* チャットヘッダー */}
            <ChatHeader roomName={roomData.roomName} />

            <div className="chatArea__body">
              {/* メッセージ */}
              <ChatMessage messages={messages} />

              {/* 入力エリア */}
              <InputMessage roomId={roomId} />
            </div>
          </Box>
        </>
      ) : null}
    </>
  )
}
