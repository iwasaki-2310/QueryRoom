import { useNavigate } from 'react-router-dom'
import { roomData } from '../../../types/roomData'
import { PrimaryButton } from '../../atom/PrimaryButton'

export const ChatHeader: React.FC<roomData> = ({ roomName }) => {
  const navigate = useNavigate()
  const navigateToHome = () => {
    navigate('/home')
  }
  return (
    <div className="chatroom__header">
      {roomName ? <h2 className="chatroom__header__name">{roomName}</h2> : null}
      <div className="chatroom__header__btns">
        <PrimaryButton onClick={navigateToHome} bgColor="#00796B" color="#fff">
          TOPページに戻る
        </PrimaryButton>
      </div>
    </div>
  )
}
