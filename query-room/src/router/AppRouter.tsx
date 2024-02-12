import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/page/LoginPage'
import { HomePage } from '../components/page/HomePage'
import PrivateRoute from './PrivateRoute'
import { BaseLayoutTemplate } from '../components/templates/BaseLayoutTemplate'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/home" element={<BaseLayoutTemplate><HomePage/></BaseLayoutTemplate>} />
      </Route>
    </Routes>
  )
}

export default AppRouter
