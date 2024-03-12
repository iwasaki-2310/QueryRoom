import {
  Stack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  Input,
  Flex,
} from '@chakra-ui/react'
import { FC, memo, useState, useEffect, useCallback } from 'react'
import { PrimaryButton } from '../../atom/PrimaryButton'
import { addDoc, collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'

type Props = {
  isOpen: boolean
  onClose: () => void
  isNew: boolean
}

export const MenuModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, isNew } = props
  const [roomName, setRoomName] = useState('')
  const [roomPass, setRoomPass] = useState('')
  const [roomUrl, setRoomUrl] = useState('')
  const [isMissing, setIsMissing] = useState<boolean>(true)
  const navigate = useNavigate()
  const db = getFirestore()
  const auth = getAuth()
  const userId: string | undefined = auth.currentUser?.uid

  // ======================================================
  // 関数名: addRoomIdToUser
  // 概要: ルーム入室時にユーザー情報（Userコレクション）にルームIDを追加
  // ======================================================
  const addRoomIdToUser = useCallback(
    async (userId: string, roomId: string) => {
      const userRef = doc(db, 'users', userId) //特定ユーザーのドキュメントへの参照
      const userSnap = await getDoc(userRef) //リアルタイムでそのユーザーの情報を監視

      if (userSnap.exists()) {
        //もしユーザー情報があるならば
        const userData = userSnap.data() //ユーザー情報を変数に格納
        const rooms = userData.rooms ? [...userData.rooms, roomId] : [roomId]
        await updateDoc(userRef, { rooms: rooms })
      }
    },
    [db]
  )

  // ======================================================
  // 関数名: HandleCreateRoom
  // 概要: ルーム新規作成
  // ======================================================
  const HandleCreateRoom = useCallback(
    async (roomName: string, roomPassword: string) => {
      try {
        const docRef = await addDoc(collection(db, 'rooms'), {
          roomName: roomName,
          roomPassword: roomPassword,
          roomCreatedAt: new Date(),
        })
        console.log('ルーム作成に成功しました。ドキュメントID: ', docRef.id)
        userId && (await addRoomIdToUser(userId, docRef.id)) ////docRef.id === ルームID
        navigate('../room/' + docRef.id)
      } catch (e) {
        console.log(roomName)
        console.error('ルーム作成に失敗しました: ', e)
      }
    },
    [db, navigate, userId, addRoomIdToUser]
  )

  // ======================================================
  // 関数名: HandleSelectRoom
  // 概要: ルームを選択して入室
  // ======================================================
  const HandleSelectRoom = useCallback(
    async (roomUrl: string, roomPass: string) => {
      try {
        const roomId = roomUrl.split('/').pop() //roomId === docRef.id
        const roomRef = roomId ? doc(db, 'rooms', roomId) : null
        const roomSnap = roomRef ? await getDoc(roomRef) : null

        if (roomSnap && roomSnap.exists() && roomSnap.data().roomPassword === roomPass) {
          setIsMissing(true)
          userId && roomId && (await addRoomIdToUser(userId, roomId))
          navigate(`../room/${roomId}`)
        } else {
          console.error('ルームが存在しないか、パスワードが間違っています。')
          setIsMissing(false)
        }
      } catch (error) {
        console.error('ルームの選択に失敗しました: ', error)
      }
    },
    [db, navigate, userId, addRoomIdToUser]
  )

  // ======================================================
  // 関数名: useEffectフック
  // 概要: エンターキーが押された時に、作成または入室ボタンが押されるように
  // ======================================================
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        isNew ? HandleCreateRoom(roomName, roomPass) : HandleSelectRoom(roomUrl, roomPass)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isNew, roomName, roomPass, roomUrl, HandleCreateRoom, HandleSelectRoom])

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom" size="3xl">
      <ModalOverlay>
        <ModalContent margin={{ base: '45% auto 0', md: '210px 0px 0 270px' }} pb={3}>
          <ModalHeader>{isNew ? '新規ルーム作成' : 'ルームを選択'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl>
                <FormLabel>{isNew ? 'ルーム名' : 'ルームのURL'}</FormLabel>
                {isNew ? (
                  <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                ) : (
                  <Input value={roomUrl} onChange={(e) => setRoomUrl(e.target.value)} />
                )}
              </FormControl>
              <FormControl>
                <FormLabel>パスワード</FormLabel>
                <Input value={roomPass} onChange={(e) => setRoomPass(e.target.value)} />
              </FormControl>
              {!isMissing ? (
                <p className="missing-text">指定したURLが存在しないか、パスワードが誤っています。</p>
              ) : null}
            </Stack>
            <Flex mt={5} justifyContent="space-between">
              <PrimaryButton
                onClick={onClose}
                buttonType={'escapeModal'}
                onClose={onClose}
                bgColor="#00796B"
                color="#fff"
              >
                戻る
              </PrimaryButton>
              <PrimaryButton
                buttonType={'makeNewRoom'}
                roomName={roomName}
                roomPassword={roomPass}
                bgColor="#1976D2"
                color="#fff"
                onClick={() => (isNew ? HandleCreateRoom(roomName, roomPass) : HandleSelectRoom(roomUrl, roomPass))}
              >
                {isNew ? '作成' : '入室'}
              </PrimaryButton>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
})
