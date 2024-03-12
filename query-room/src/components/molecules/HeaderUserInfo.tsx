import React from 'react'
import { UserName } from '../atom/UserName'
import { UserIcon } from '../atom/UserIcon'

export const HeaderUserInfo = () => {
  return (
    <div className="user-info__wrapper__header">
      <UserIcon />
      <UserName purpose="forHeader" />
    </div>
  )
}
