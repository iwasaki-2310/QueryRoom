import { Flex } from '@chakra-ui/react'
import { roomData } from '../../types/roomData'
import { Message } from '../atom/Message'
import { UserName } from '../atom/UserName'
import { MessageUserIcon } from '../atom/MessageUserIcon'
import { auth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState, useRef } from 'react'

export const ChatMessage: React.FC<roomData> = ({ messages }) => {
  const [currentUser] = useAuthState(auth)
  const [inputMessageElementHeight, setInputMessageElementHeight] = useState<string>('0')
  const messageAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const inputMessageElement = document.querySelector('.input-message')

    // ResizeObserverを作成し、要素のサイズ変更を監視
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        // 高さを取得し、ステートを更新
        setInputMessageElementHeight(`${entry.target.clientHeight}`)
      }
    })

    if (inputMessageElement) {
      resizeObserver.observe(inputMessageElement)
    }

    // クリーンアップ関数
    return () => {
      if (inputMessageElement) {
        resizeObserver.unobserve(inputMessageElement)
      }
    }
  }, [])

  useEffect(() => {
    if (messageAreaRef.current) {
      // 遅延を設定して、画像などのメディアがロードされるのを待つ
      const timeout = setTimeout(() => {
        if (messageAreaRef.current) {
          messageAreaRef.current.scrollTop = messageAreaRef.current.scrollHeight
        }
      }, 10) // 500ミリ秒の遅延を設定してみる

      return () => clearTimeout(timeout)
    }
  }, [messages]) // 依存配列に messages を追加

  return (
    <div
      ref={messageAreaRef}
      className="message__area"
      style={{
        height:
          window.innerWidth <= 767
            ? `calc(100vh - 107px - ${inputMessageElementHeight}px)`
            : `calc(100vh - 61px - ${inputMessageElementHeight}px)`,
      }}
    >
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
                  <UserName purpose="forMessage" displayName={displayName} />
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
