import { roomData } from '../../../types/roomData'
import { PrimaryButton } from '../../atom/PrimaryButton'

export const ChatHeader: React.FC<roomData> = ({ roomName }) => {
  return (
    <div className="chatroom__header">
      {roomName ? <h2 className="chatroom__header__name">{roomName}</h2> : null}
      <div className="chatroom__header__btns">
        <PrimaryButton bgColor="#30A320" color="#fff">
          TOPページに戻る
        </PrimaryButton>
      </div>
    </div>
  )
}
