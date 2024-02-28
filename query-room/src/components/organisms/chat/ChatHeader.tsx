import { roomData } from '../../../types/roomData'

export const ChatHeader: React.FC<roomData> = ({ roomName }) => {
  return roomName ? <h2>{roomName}</h2> : null
}
