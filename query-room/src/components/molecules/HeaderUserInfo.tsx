import React from 'react'
import { UserName } from '../atom/UserName'
import { UserIcon } from '../atom/UserIcon'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../providers/GoogleLoginUserProvider'

export const HeaderUserInfo = () => {
  const [currentUser] = useAuthState(auth)
  return (
    <div className="user-info__wrapper__header">
      <UserIcon />
      <UserName purpose="forHeader" />
    </div>
  )
}
