import { Box, Button, Text } from '@chakra-ui/react'
import { doc, getFirestore, onSnapshot, DocumentData, addDoc, collection, query, orderBy } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export const RoomPage = () => {
  const { roomId } = useParams()
  const [roomData, setRoomData] = useState<DocumentData | null>(null)
  const db = getFirestore()

  const [inputMessage, setInputMessage] = useState('')
  const [messages, setMessages] = useState<{ message: string; time: string }[]>([])

  useEffect(() => {
    const fetchRoomData = async () => {
      if (roomId) {
        const roomRef = doc(db, 'rooms', roomId)
        const messagesRef = query(collection(db, 'rooms', roomId, 'messages'), orderBy('createdAd', 'asc'))

        const unsubscribeRoom = onSnapshot(roomRef, (doc) => {
          doc.exists() ? setRoomData(doc.data()) : console.log('ルームの接続に失敗しました')
        })

        const unsubscribeMessages = onSnapshot(messagesRef, (snapshot) => {
          const messagesList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            message: doc.data().message,
            time: doc.data().createdAd.toDate().toLocaleString('ja-JP'),
          }))
          setMessages(messagesList)
        })

        return () => {
          unsubscribeRoom()
          unsubscribeMessages()
        }
      }
    }

    fetchRoomData()
  }, [roomId, db])

  const onChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value)
  }

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
        <Box>
          <h2>{roomData.roomName}</h2>
          <input style={{ height: '30px' }} type="text" onChange={onChangeMessage} value={inputMessage} />
          <Button onClick={sendMessage}>送信</Button>
          {messages.map(({ message, time }) => (
            <div key={message}>
              <Text>{message}</Text>
              <Text>{time}</Text>
            </div>
          ))}
        </Box>
      ) : null}
    </>
  )
}
