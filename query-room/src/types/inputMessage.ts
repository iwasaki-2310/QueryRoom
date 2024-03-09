export type InputMessageProps = {
  setInputMessage?: (inputMessage: string) => void
  inputMessage?: string
  onChangeMode?: () => void
  isQuestionMode?: boolean
  setDelayTime?: (delay: number) => void
  delayTime?: number
  startCountDown?: boolean
  isSent?: boolean
  setIsSent?: (isSent: boolean) => void
  isCancel?: boolean
  setIsCancel?: (isCancel: boolean) => void
  onSendClick?: () => void
  // senderName?: string
  // senderIcon?: string
}
