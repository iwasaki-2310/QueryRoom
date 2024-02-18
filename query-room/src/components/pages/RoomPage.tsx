import { doc, getFirestore, onSnapshot, DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const RoomPage = () => {
  const { roomId } = useParams()
  const [roomData, setRoomData] = useState<DocumentData | null>(null)
  const db = getFirestore()

  useEffect(() => {
    if (roomId) {
      const roomRef = doc(db, 'rooms', roomId)
      const unsubscribe = onSnapshot(roomRef, (doc) => {
        if (doc.exists()) {
          setRoomData(doc.data())
        } else {
          console.log('ルームの接続に失敗しました')
        }
      })
      return () => unsubscribe()
    }
  }, [roomId, db])

  return (
    <>
      {roomData && <h2>{roomData.roomName}の部屋です。</h2>}
    </>
  )

  // ルームIDを使って該当のルームを表示する処理を記述する
}
