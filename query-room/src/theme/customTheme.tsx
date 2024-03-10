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
      '.header': {
        backgroundColor: 'customPurple.900',
      },
      '.menu__button': {
        backgroundColor: 'customPurple.900',
        _hover: {
          color: 'customPurple.900',
          backgroundColor: 'white',
          transition: 'all 0.5s',
        },
      },
    },
  },
})
