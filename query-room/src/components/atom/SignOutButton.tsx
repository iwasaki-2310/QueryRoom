import { auth } from "../providers/GoogleLoginUserProvider"

// サインアウトボタン
export const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>サインアウト</button>
}
