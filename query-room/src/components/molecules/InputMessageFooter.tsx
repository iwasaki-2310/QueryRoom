import { InputMessageProps } from '../../types/inputMessage'
import { ChangeModeButton } from '../atom/ChangeModeButton'
import { InputButtonsRight } from './InputButtonsRight'

export const InputMessageFooter: React.FC<InputMessageProps> = (props) => {
  const { setInputMessage, inputMessage, onChangeMode, isQuestionMode } = props
  return (
    <div className="input-message__footer">
      {/* モード切り替え */}
      <ChangeModeButton onChangeMode={onChangeMode} isQuestionMode={isQuestionMode} />

      {/* 送信ボタン、ディレイボタン */}
      <InputButtonsRight
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        isQuestionMode={isQuestionMode}
      />
    </div>
  )
}
