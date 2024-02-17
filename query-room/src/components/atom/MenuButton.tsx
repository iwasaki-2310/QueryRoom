import { Button, Text, useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { MenuModal } from '../organisms/modal/MenuModal'

type MenuButtonProps = {
  menuTitle: string
  menuDescription: string
  leftMargin?: string //任意
}

export const MenuButton: FC<MenuButtonProps> = ({ menuTitle, menuDescription, leftMargin }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        onClick={onOpen}
        display="block"
        marginLeft={leftMargin}
        padding="105px 60px 15px"
        height="fit-content"
        bg="customPurple.900"
        color="white"
        fontWeight="bold"
        transition="all 0.5s"
        _hover={{ color: 'customPurple.900', bg: 'white', transition: 'all 0.5s' }}
      >
        <Text fontSize={'xl'}>{menuTitle}</Text>
        <Text mt="75px" fontSize={'md'}>
          {menuDescription}
        </Text>
      </Button>
      {isOpen && <MenuModal isOpen={isOpen} onClose={onClose} isNew={menuTitle === '新規ルーム作成' ? true : false} />}
    </>
  )
}
