import { InputMessageProps } from '../../types/inputMessage'

export const InputMessageWord: React.FC<InputMessageProps> = (props) => {
  const { setInputMessage, inputMessage, isQuestionMode } = props
  // ======================================================
  // 関数名: onChangeMessage
  // 概要: テキストエリアに入力されたらテキストエリアにその値をセットする
  // ======================================================
  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (setInputMessage) setInputMessage(e.target.value)
  }
  return (
    <>
      {isQuestionMode && <p className="question-mode__desc">質問の内容を記入してください</p>}
      <textarea
        onChange={onChangeMessage}
        value={inputMessage}
        placeholder={isQuestionMode ? 'ここに質問を入力してください' : 'ここにメッセージを入力してください'}
        className={isQuestionMode ? 'input-message__word input-message__word__question' : 'input-message__word'}
      />
    </>
  )
}
