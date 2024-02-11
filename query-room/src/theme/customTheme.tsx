import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  colors: {
    customPurple: {
      900: '#430B53',
    },
  },
  styles: {
    global: {
      body: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CCBBCC',
      },
    },
  },
})
