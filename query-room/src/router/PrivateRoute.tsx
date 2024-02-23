import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

export const PrivateRoute: React.FC = () => {
  const { auth } = useAuth()
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/login')
      } else {
        if (!location.pathname.startsWith('/room/')) {
          navigate('/home')
        }
      }
    }
  }, [user, loading, navigate, location.pathname])
  return user ? <Outlet /> : null
}

export default PrivateRoute
