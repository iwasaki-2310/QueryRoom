import React, { useState } from 'react'
import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'
import { SignInButton } from '../atom/SignInButton'
import { SignOutButton } from '../atom/SignOutButton'

const Home: React.FC = () => {
  const { auth, provider } = useAuth()
  const [user] = useAuthState(auth)

  return (
    <div>
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <SignInButton provider={provider} />
      )}
    </div>
  )
}

export default Home

const UserInfo = () => {
  return <>ユーザー情報</>
}
