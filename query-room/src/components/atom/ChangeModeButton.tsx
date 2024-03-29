import { PrimaryButton } from './PrimaryButton'
import { InputMessageProps } from '../../types/inputMessage'

export const ChangeModeButton: React.FC<InputMessageProps> = (props) => {
  const { onChangeMode, isQuestionMode } = props
  return (
    <>
      <div className="change-mode__button">
        <PrimaryButton buttonType={'changeMode'} onChangeMode={onChangeMode} bgColor={'#00796B'} color={'#fff'}>
          {isQuestionMode ? '回答者モードに切り替える' : '質問者モードに切り替える'}
        </PrimaryButton>
      </div>
    </>
  )
}
