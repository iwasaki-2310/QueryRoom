import { useNavigate } from "react-router-dom"
import { auth } from "../providers/GoogleLoginUserProvider"

// サインアウトボタン
export const SignOutButton = () => {
  const navigate = useNavigate()
  const signOutWithGoogle = async () => {
    try {
      auth.signOut()
      navigate("/login")
    } catch(error) {
      console.error('ログインに失敗しました', error)
    }
  }
  return <button onClick={signOutWithGoogle}>サインアウト</button>
}
