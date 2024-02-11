import React from 'react'
import './App.css'
import Home from './components/page/Home'
import { AuthProvider } from './components/providers/GoogleLoginUserProvider'

function App() {
  return (
    <AuthProvider>
      <h1>QueryRoom</h1>
      <Home />
    </AuthProvider>
  )
}

export default App
