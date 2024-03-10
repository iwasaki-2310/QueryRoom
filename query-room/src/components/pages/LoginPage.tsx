import { provider } from '../providers/GoogleLoginUserProvider'
import { SignInButton } from '../atom/SignInButton'
import { Box, Flex } from '@chakra-ui/react'

export const LoginPage: React.FC = () => {
  return (
    <>
      <Box className="login-page__body">
        <Flex flexDirection="column">
          <h1 className="login-page__title">QueryRoom</h1>
          <SignInButton provider={provider} />
        </Flex>
      </Box>
    </>
  )
}
