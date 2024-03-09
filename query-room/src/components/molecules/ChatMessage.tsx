import { Flex } from '@chakra-ui/react'
import { roomData } from '../../types/roomData'
import { Message } from '../atom/Message'
import { UserName } from '../atom/UserName'
import { MessageUserIcon } from '../atom/MessageUserIcon'

export const ChatMessage: React.FC<roomData> = ({ messages }) => {
  // console.log(messages)
  return (
    <>
      <div className="message__area">
        {messages
          ? messages.map(({ message, time, profilePicture }, index) => (
              <div key={index} className="message__part">
                <Flex className="message__header">
                  <MessageUserIcon boxSize="43px" userAvatar={profilePicture} />
                  <Flex className="message__head">
                    <UserName mt={'-10px'} fontSize="16px" fontWeight="bold" />
                    <span className="message__time">{time}</span>
                  </Flex>
                </Flex>
                <Message message={message} />
              </div>
            ))
          : null}
      </div>
    </>
  )
}
