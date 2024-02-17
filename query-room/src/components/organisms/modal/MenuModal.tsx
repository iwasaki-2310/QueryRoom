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
import { EnteringButton } from '../../atom/EnteringButton'

type Props = {
  isOpen: boolean
  onClose: () => void
  isNew: boolean
}

export const MenuModal: FC<Props> = memo((props) => {
  const { isOpen, onClose, isNew } = props
  const [roomName, setRoomName] = useState('')
  const [roomPass, setRoomPass] = useState('')

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom">
      <ModalOverlay>
        <ModalContent pb={6}>
          <ModalHeader>{isNew ? '新規ルーム作成' : 'ルームを選択'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <Flex>
                  <FormLabel>ルーム名</FormLabel>
                  <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
                </Flex>
              </FormControl>
              <FormControl>
                <Flex>
                  <FormLabel>パスワード</FormLabel>
                  <Input value={roomPass} onChange={(e) => setRoomPass(e.target.value)} />
                </Flex>
              </FormControl>
            </Stack>
          </ModalBody>
          <Flex justifyContent="space-between">
            <PrimaryButton bgColor="#30A320" color="#fff">
              戻る
            </PrimaryButton>
            <EnteringButton bgColor="#430B53" color="#fff" />
          </Flex>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
})
