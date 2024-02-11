import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../components/providers/GoogleLoginUserProvider'
import { useAuthState } from 'react-firebase-hooks/auth'

export const PrivateRoute: React.FC = () => {
  const { auth } = useAuth()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (user) {
      navigate('/home')
    } else {
      navigate('/login')
    }
  }, [user, navigate])
  return user ? <Outlet /> : null
}

export default PrivateRoute
