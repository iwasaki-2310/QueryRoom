import { Flex } from '@chakra-ui/react'
import { roomData } from '../../types/roomData'
import { Message } from '../atom/Message'
import { UserName } from '../atom/UserName'
import { MessageUserIcon } from '../atom/MessageUserIcon'
import { auth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

export const ChatMessage: React.FC<roomData> = ({ messages }) => {
  const [currentUser] = useAuthState(auth)

  return (
    <div className="message__area">
      {messages &&
        messages.map(({ message, time, profilePicture, displayName, senderId }, index) => {
          // 現在のユーザーがメッセージ送信者かどうかチェック
          const isCurrentUserMessage = currentUser?.uid === senderId
          return (
            <div
              key={index}
              className={`message__part ${
                isCurrentUserMessage ? 'message__part__current-user' : 'message__part__other-user'
              }`}
            >
              <Flex className="message__header">
                <MessageUserIcon boxSize="43px" userAvatar={profilePicture} />
                <Flex className="message__head">
                  <UserName mt={'-10px'} fontSize="16px" fontWeight="bold" displayName={displayName} />
                  <span className="message__time">{time}</span>
                </Flex>
              </Flex>
              <Message message={message} />
            </div>
          )
        })}
    </div>
  )
}
