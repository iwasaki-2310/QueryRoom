import { useState } from 'react'
import { roomData } from '../../../types/roomData'
import { PrimaryButton } from '../../atom/PrimaryButton'

export const InputMessage: React.FC<roomData> = () => {
  const [inputMessage, setInputMessage] = useState('')

  // ======================================================
  // 関数名: onChangeMessage
  // 概要: テキストエリアに入力されたらテキストエリアにその値をセットする
  // ======================================================
  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value)
  }

  return (
    <>
      <div className="input-message">
        <div className="input-message__body">
          <textarea
            onChange={onChangeMessage}
            value={inputMessage}
            placeholder="ここにメッセージを入力してください"
            className="input__message__word"
          />

          {/* 送信ボタン */}
          <div className="send-message__button">
            <PrimaryButton
              buttonType={'sendMessage'}
              setInputMessage={setInputMessage}
              inputMessage={inputMessage}
              bgColor={'#430B53'}
              color={'#fff'}
            >
              送信
            </PrimaryButton>
          </div>
        </div>
      </div>
    </>
  )
}
