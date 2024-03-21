import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../components/providers/GoogleLoginUserProvider'

export const useRoomAccessCheck = () => {
  const navigate = useNavigate()
  const { roomId } = useParams()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user && roomId) {
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)
        const roomRef = doc(db, 'rooms', roomId)
        const roomSnap = await getDoc(roomRef)
        if (!roomSnap.exists() || !userSnap.data()?.rooms?.includes(roomId)) {
          navigate('../../home')
        }
      }
    })
  }, [navigate, roomId])
}
