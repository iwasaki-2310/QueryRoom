import { provider } from '../providers/GoogleLoginUserProvider'
import { SignInButton } from '../atom/SignInButton'

export const LoginPage: React.FC = () => {
  return (
    <>
      <h1>QueryRoom</h1>
      <SignInButton provider={provider} />
    </>
  )
}
