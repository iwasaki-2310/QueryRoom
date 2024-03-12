import { useCallback, useEffect, useState } from 'react'
import { InputMessageProps } from '../../types/inputMessage'
import { PrimaryButton } from './PrimaryButton'
import { useToast } from '@chakra-ui/toast'
import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { auth, useAuth } from '../providers/GoogleLoginUserProvider'
import { onAuthStateChanged } from 'firebase/auth'
import { useBreakpointValue } from '@chakra-ui/react'

export const SendMessageButton: React.FC<InputMessageProps> = (props) => {
  const { userAvatar, setUserAvatar } = useAuth()

  const { setInputMessage, inputMessage, delayTime, setDelayTime, startCountDown, setIsSent, isSent } = props
  const toast = useToast()
  const [timeLeft, setTimeLeft] = useState(delayTime ? delayTime * 60 : 0) // 秒単位で時間を設定
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null) // タイマーIDを保持する状態変数

  const db = getFirestore()
  const { roomId } = useParams()
  const toastWidth = useBreakpointValue({ base: '30%', md: 'auto' })

  useEffect(() => {
    if (!isSent && timerId) {
      toast.closeAll()
      clearTimeout(timerId)
      setTimerId(null)
    }
    setTimeLeft(delayTime ? delayTime * 60 : 0)
  }, [delayTime, isSent, timerId, toast])

  const resetDelayTime = useCallback(() => {
    if (setDelayTime) {
      setDelayTime(0)
    }
  }, [setDelayTime])

  // ======================================================
  // 関数名: sendMessage
  // 概要: 送信ボタンがクリックされたら、トーストを表示。そして、入力したメッセージをDBのmessagesに格納して、テキストエリアを初期化
  // ======================================================
  const sendMessage = useCallback(async () => {
    setIsSent && setIsSent(true)
    console.log(`送信モード：${isSent}`)

    if (startCountDown && delayTime && delayTime > 0) {
      const toastId = 'countdown' // トーストのID
      // console.log(isCancel)

      // トーストの生成
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: 'カウントダウン開始',
          description: 'トーストが開始されました。',
          status: 'info',
          duration: null,
          isClosable: true,
          position: 'bottom-left',
          containerStyle: {
            width: toastWidth,
          },
        })
      }

      // 時間をフォーマットして、トーストを更新
      const showToast = (time: number) => {
        // time を分と秒に変換
        const minutes = Math.floor(time / 60)
        const seconds = time % 60

        // 分と秒を文字列としてフォーマット（例: "01:09"）
        const formattedTimeLeft = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`

        // トーストアップデート
        toast.update(toastId, {
          title: 'カウントダウン',
          description: `残り時間: ${formattedTimeLeft}`,
          status: 'info',
          isClosable: true,
          duration: null,
        })
      }

      // カウントダウンの初期表示
      showToast(timeLeft)

      if (timerId) {
        clearInterval(timerId)
        setTimerId(null)
      }
      const newTimerId = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1
          if (newTime >= 0) {
            showToast(newTime)
            return newTime
          } else {
            clearInterval(newTimerId)
            toast.close(toastId)
            return 0
          }
        })
      }, 1000)
      setTimerId(newTimerId)
    }

    onAuthStateChanged(auth, (user) => {
      if (roomId && inputMessage && inputMessage.trim() !== '') {
        const id = setTimeout(async () => {
          try {
            setUserAvatar(userAvatar)
            console.log(userAvatar)
            await addDoc(collection(db, 'rooms', roomId, 'messages'), {
              message: inputMessage,
              senderId: user?.uid,
              displayName: user?.displayName,
              profilePicture: user?.photoURL,
              createdAd: new Date(),
            })
            if (setInputMessage) {
              setInputMessage('')
            }
            if (resetDelayTime) {
              resetDelayTime() // delayTime をリセット
            }
          } catch (e) {
            console.log('メッセージの送信に失敗しました。', e)
          }
        }, delayTime && delayTime * 60000)
        setTimerId(id)
      }
    })
  }, [
    isSent,
    delayTime,
    toast,
    startCountDown,
    setIsSent,
    db,
    inputMessage,
    resetDelayTime,
    roomId,
    setInputMessage,
    setUserAvatar,
    timeLeft,
    timerId,
    userAvatar,
    toastWidth,
  ])

  // ======================================================
  // 関数名: useEffectフック
  // 概要: シフトキーとエンターキーが同時に押された時に、送信ボタンが押されるように
  // ======================================================
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === 'Enter') {
        sendMessage()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [sendMessage]) // sendMessage 関数が変更された場合に再購読

  return (
    <div className="send-message__button">
      <PrimaryButton
        buttonType={'sendMessage'}
        setInputMessage={setInputMessage}
        inputMessage={inputMessage}
        bgColor={'#1976D2'}
        color={'#fff'}
        delayTime={delayTime || 0}
        resetDelayTime={resetDelayTime}
        onClick={sendMessage}
      >
        送信
      </PrimaryButton>
    </div>
  )
}
