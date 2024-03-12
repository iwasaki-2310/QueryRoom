import React, { useEffect } from 'react'
import { MakeRoomButton } from '../atom/MakeRoomButton'
import { SelectRoomButton } from '../atom/SelectRoomButton'
import { useAuth } from '../providers/GoogleLoginUserProvider'

export const HomePage: React.FC = () => {
  const { userAvatar } = useAuth()
  useEffect(() => {}, [userAvatar])

  return (
    <>
      <div className="home__buttons">
        <MakeRoomButton />
        <SelectRoomButton />
      </div>
    </>
  )
}
