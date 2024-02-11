import React from 'react'
import './App.css'
import { AuthProvider } from './components/providers/GoogleLoginUserProvider'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './router/AppRouter'
import { ChakraProvider } from '@chakra-ui/react'
import { customTheme } from './theme/customTheme'

function App() {
  return (
    <ChakraProvider theme={customTheme}>
      <AuthProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default App
