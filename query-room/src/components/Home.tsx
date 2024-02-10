import React from 'react'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../firebase'

const Home = () => {
  return (
    <div>
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
