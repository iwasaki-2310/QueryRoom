import { Flex } from '@chakra-ui/react'
import { roomData } from '../../types/roomData'
import { UserIcon } from '../atom/UserIcon'
import { Message } from '../atom/Message'
import { UserName } from '../atom/UserName'

export const ChatMessage: React.FC<roomData> = ({ messages }) => {
  return (
    <>
      <div className="message__area">
        {messages
          ? messages.map(({ message, time }, index) => (
              <div key={index} className="message__part">
                <Flex>
                  <UserIcon />
                  <Flex className="message__head">
                    <UserName mt={'-10px'} fontSize="18px" fontWeight="bold" />
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
