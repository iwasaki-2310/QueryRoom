import { useNavigate } from 'react-router-dom'
import { roomData } from '../../../types/roomData'
import { PrimaryButton } from '../../atom/PrimaryButton'
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

export const ChatHeader: React.FC<roomData> = ({ roomName }) => {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/home')
  }
  return (
    <div className="chatroom__header">
      {roomName ? <h2 className="chatroom__header__name">{roomName}</h2> : null}
      <div className="chatroom__header__btns">
        <div className="u_pc">
          <PrimaryButton onClick={navigateToHome} bgColor="#00796B" color="#fff">
            TOPページに戻る
          </PrimaryButton>
        </div>
        <IconButton
          aria-label="前のページに戻る"
          icon={<ArrowBackIcon w={6} h={6} />}
          bg={'#ECEFF1'}
          color={`#191970`}
          onClick={navigateToHome}
          display={{ base: 'inline-flex', md: 'none' }}
          size="sm"
        />
      </div>
    </div>
  )
}
