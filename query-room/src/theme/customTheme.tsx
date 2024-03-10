import { extendTheme } from '@chakra-ui/react'

export const customTheme = extendTheme({
  colors: {
    customPurple: {
      900: '#430B53',
    },
  },
  styles: {
    global: {
      '.custom-link': {
        color: '#0080ff',
      },
    },
  },
})
