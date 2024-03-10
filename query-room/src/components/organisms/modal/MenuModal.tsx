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
import { FC, memo, useState } from 'react'
import { PrimaryButton } from '../../atom/PrimaryButton'
import { addDoc, collection, doc, getDoc, getFirestore } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

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

  // ======================================================
  // 関数名: HandleCreateRoom
  // 概要: ルーム新規作成
  // ======================================================
  const HandleCreateRoom = async (roomName: string, roomPassword: string) => {
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
  // 関数名: HandleSelectRoom
  // 概要: ルームを選択して入室
  // ======================================================
  const HandleSelectRoom = async (roomUrl: string, roomPass: string) => {
    try {
      const roomId = roomUrl.split('/').pop()
      const roomRef = roomId ? doc(db, 'rooms', roomId) : null
      const roomSnap = roomRef ? await getDoc(roomRef) : null

      if (roomSnap && roomSnap.exists() && roomSnap.data().roomPassword === roomPass) {
        navigate(`../room/${roomId}`)
        setIsMissing(true)
      } else {
        console.error('ルームが存在しないか、パスワードが間違っています。')
        setIsMissing(false)
      }
    } catch (error) {
      console.error('ルームの選択に失敗しました: ', error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom" size="3xl">
      <ModalOverlay>
        <ModalContent margin="210px 0px 0 270px" pb={3}>
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
