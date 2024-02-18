import { provider } from '../providers/GoogleLoginUserProvider'
import { SignInButton } from '../atom/SignInButton'
import { Box, Flex } from '@chakra-ui/react'

export const LoginPage: React.FC = () => {
  return (
    <>
      <Box display="flex" flexDirection="column"  mt="200px" alignItems="center">
        <Flex flexDirection="column">
          <h1 style={{ color: 'white', fontSize: '90px' }}>QueryRoom</h1>
          <SignInButton provider={provider} />
        </Flex>
      </Box>
    </>
  )
}
