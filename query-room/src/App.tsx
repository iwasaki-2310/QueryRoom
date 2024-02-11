import React from 'react'
import './App.css'
import { AuthProvider } from './components/providers/GoogleLoginUserProvider'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
