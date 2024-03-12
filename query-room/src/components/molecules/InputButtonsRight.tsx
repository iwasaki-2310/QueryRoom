import { useEffect, useState } from 'react'
import { InputMessageProps } from '../../types/inputMessage'
import { DelayInput } from '../atom/DelayInput'
import { SendMessageButton } from '../atom/SendMessageButton'

export const InputButtonsRight: React.FC<InputMessageProps> = (props) => {
  const { setInputMessage, inputMessage, isQuestionMode } = props
  const [delayTime, setDelayTime] = useState<number>(0)
  const [isSent, setIsSent] = useState<boolean>(false)
  const [isCancel, setIsCancel] = useState<boolean>(false)

  // DelayInputから送信時間を受け取って変数に格納
  const handleSetDelayTime = (delay: number) => {
    setDelayTime(delay)
  }

  useEffect(() => {
    // console.log(`キャンセルモード：${isCancel}`)
    isSent ? setIsCancel(true) : setIsCancel(false)
  }, [isSent])

  const handleCancel = () => {
    setIsCancel(true)
    setIsSent(false)
    setDelayTime(0)
  }

  return (
    <div className="Input-buttons__right" style={isQuestionMode && window.innerWidth < 768 ? { width: '100%' } : {}}>
      {/* 時間を指定して送信 */}
      {isQuestionMode && <DelayInput setDelayTime={handleSetDelayTime} delayTime={delayTime} />}

      {/* 送信ボタン */}
      <SendMessageButton
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        setDelayTime={setDelayTime}
        delayTime={delayTime}
        startCountDown={true}
        setIsSent={setIsSent}
        isSent={isSent}
        isCancel={isCancel}
      />
      {/* キャンセルボタン */}
      {isQuestionMode && isSent && isCancel && (
        <button className="Input-buttons__right__cancel-text" onClick={handleCancel}>
          (キャンセル)
        </button>
      )}
    </div>
  )
}
