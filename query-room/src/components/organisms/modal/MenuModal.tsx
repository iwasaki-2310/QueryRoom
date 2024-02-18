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
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} motionPreset="slideInBottom" size="3xl">
      <ModalOverlay>
        <ModalContent margin="210px 0px 0 270px" pb={3}>
          <ModalHeader>{isNew ? '新規ルーム作成' : 'ルームを選択'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl>
                <FormLabel>ルーム名</FormLabel>
                <Input value={roomName} onChange={(e) => setRoomName(e.target.value)} />
              </FormControl>
              <FormControl>
                <FormLabel>パスワード</FormLabel>
                <Input value={roomPass} onChange={(e) => setRoomPass(e.target.value)} />
              </FormControl>
            </Stack>
          <Flex mt={5} justifyContent="space-between">
            <PrimaryButton onClose={onClose} bgColor="#30A320" color="#fff">
              戻る
            </PrimaryButton>
            <PrimaryButton
              buttonType={'makeNewRoom'}
              roomName={roomName}
              roomPassword={roomPass}
              bgColor="#430B53"
              color="#fff"
            >
              新規作成
            </PrimaryButton>
          </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  )
})
