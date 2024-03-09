import { PrimaryButton } from './PrimaryButton'
import { InputMessageProps } from '../../types/inputMessage'

export const ChangeModeButton: React.FC<InputMessageProps> = (props) => {
  const { onChangeMode, isQuestionMode } = props
  return (
    <>
      <PrimaryButton buttonType={'changeMode'} onChangeMode={onChangeMode} bgColor={'31A321'} color={'#fff'}>
        {isQuestionMode ? '回答者モードに切り替える' : '質問者モードに切り替える'}
      </PrimaryButton>
    </>
  )
}
