import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import React from 'react'

export const UserIcon: React.FC = () => {
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  if (!user) {
    return null
  } else {
    return (
      <>
        <img className="user-icon__header" src={user.photoURL || undefined} alt={user.displayName || undefined} />
      </>
    )
  }
}
