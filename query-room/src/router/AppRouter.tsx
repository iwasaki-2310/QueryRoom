import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from '../components/pages/LoginPage'
import { HomePage } from '../components/pages/HomePage'
import PrivateRoute from './PrivateRoute'
import { BaseLayoutTemplate } from '../components/templates/BaseLayoutTemplate'
import { RoomPage } from '../components/pages/RoomPage'

export const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route
          path="/home"
          element={
            <BaseLayoutTemplate>
              <HomePage />
            </BaseLayoutTemplate>
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <BaseLayoutTemplate>
              <RoomPage />
            </BaseLayoutTemplate>
          }
        />
      </Route>
    </Routes>
  )
}

export default AppRouter
