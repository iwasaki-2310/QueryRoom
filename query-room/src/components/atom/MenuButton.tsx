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
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginLeft={leftMargin}
        w="23.79vw"
        maxW="325px"
        padding="50px 0"
        height="fit-content"
        bg="customPurple.900"
        color="white"
        fontWeight="bold"
        transition="all 0.5s"
        _hover={{ color: 'customPurple.900', bg: 'white', transition: 'all 0.5s' }}
      >
        <Text fontSize={'xl'} whiteSpace="wrap">{menuTitle}</Text>
        <Text mt="60px" fontSize={'md'} whiteSpace="wrap">
          {menuDescription}
        </Text>
      </Button>
      {isOpen && <MenuModal isOpen={isOpen} onClose={onClose} isNew={menuTitle === '新規ルーム作成' ? true : false} />}
    </>
  )
}
