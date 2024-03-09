import { useState } from 'react'
import { roomData } from '../../../types/roomData'
import { InputMessageWord } from '../../atom/InputMessageWord'
import { InputMessageFooter } from '../../molecules/InputMessageFooter'

export const InputMessage: React.FC<roomData> = () => {
  const [inputMessage, setInputMessage] = useState('')
  const [isQuestionMode, setIsQuestionMode] = useState(false)

  // ======================================================
  // 関数名: handleModeChange
  // 概要: 質問者モードの切り替え
  // ======================================================
  const handleModeChange = () => {
    setIsQuestionMode(!isQuestionMode)
    return {
      isQuestionMode,
    }
  }

  return (
    <>
      <div className="input-message">
        <div className="input-message__body">
          {/* 入力ボックス */}
          <InputMessageWord
            setInputMessage={setInputMessage}
            inputMessage={inputMessage}
            isQuestionMode={isQuestionMode}
          />

          {/* ボタン */}
          <InputMessageFooter
            setInputMessage={setInputMessage}
            inputMessage={inputMessage}
            onChangeMode={handleModeChange}
            isQuestionMode={isQuestionMode}
          />
        </div>
      </div>
    </>
  )
}
