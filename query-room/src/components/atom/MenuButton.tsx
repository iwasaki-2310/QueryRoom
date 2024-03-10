import { useDisclosure } from '@chakra-ui/react'
import { FC } from 'react'
import { MenuModal } from '../organisms/modal/MenuModal'

type MenuButtonProps = {
  menuTitle: string
  menuDescription: string
  isNew: boolean
}

export const MenuButton: FC<MenuButtonProps> = (props) => {
  const { menuTitle, menuDescription, isNew } = props
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <button className="menu__button" onClick={onOpen}>
        <p className="menu__button__title">{menuTitle}</p>
        <p className="menu__button__description">{menuDescription}</p>
      </button>
      {isOpen && <MenuModal isOpen={isOpen} onClose={onClose} isNew={isNew ? true : false} />}
    </>
  )
}
