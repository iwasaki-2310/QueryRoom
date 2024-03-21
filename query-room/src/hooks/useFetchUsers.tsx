import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../components/providers/GoogleLoginUserProvider'

export const useFetchUsers = () => {
  const { roomId } = useParams()
  const [userAvatars, setUserAvatars] = useState<{ id: string; avatar: string; displayName: string }[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const userRef = collection(db, 'users')

      const q = query(userRef, where('rooms', 'array-contains', roomId))
      // const querySnashot = await getDocs(q)
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const usersData: { id: string; avatar: string; displayName: string }[] = []
        querySnapshot.forEach((doc) => {
          usersData.push({ id: doc.id, avatar: doc.data().photoURL, displayName: doc.data().displayName })
        })
        setUserAvatars(usersData)
      })
      return () => unsubscribe()
    }
    fetchUsers()
  }, [roomId])
  return { userAvatars }
}
