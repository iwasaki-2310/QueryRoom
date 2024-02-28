import { DocumentData } from 'firebase/firestore'

export type roomData = {
  roomData?: DocumentData | null
  roomId?: string
  roomName?: string
  messages?: { message: string; time: string }[]
}
