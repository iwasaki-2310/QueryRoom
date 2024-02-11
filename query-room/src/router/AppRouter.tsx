import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/page/LoginPage'
import { HomePage } from '../components/page/HomePage'
import PrivateRoute from './PrivateRoute'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<HomePage />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
