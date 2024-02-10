import React from 'react'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Home = () => {
  const [user] = useAuthState(auth)
  return (
    <div>
      {user ? (
        <>
          <UserInfo />
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
      <SignInButton />
    </div>
  )
}

export default Home

// Googleでサインインするボタン
const SignInButton = () => {
  const signInWithGoogle = () => {
    // firebaseを使用してログイン
    signInWithPopup(auth, provider)
  }
  return <button onClick={signInWithGoogle}>Googleでサインイン</button>
}

// サインアウトするボタン
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>サインアウト</button>
}

const UserInfo = () => {
  return <>ユーザー情報</>
}
