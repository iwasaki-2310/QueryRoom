import { useAuth } from '../providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

type UserNameProps = {
  purpose: string
  displayName?: string
}

export const UserName: React.FC<UserNameProps> = ({ purpose, displayName }) => {
  const { auth } = useAuth()
  const [user] = useAuthState(auth)

  if (!user) {
    return null
  } else {
    return (
      <p className={purpose === 'forHeader' ? 'user-name__header' : 'user-name__message-area'}>
        {displayName || undefined}
      </p>
    )
  }
}
