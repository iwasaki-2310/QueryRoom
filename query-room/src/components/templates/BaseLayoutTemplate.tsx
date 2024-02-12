import React, { FC, ReactNode, memo } from 'react'
import { Header } from '../organisms/layout/Header'
import { Flex } from '@chakra-ui/react'

type Props = {
  children: ReactNode
}

export const BaseLayoutTemplate: FC<Props> = memo((props) => {
  const { children } = props
  return (
    <>
      <Flex>
        <Header />
        {children}
      </Flex>
    </>
  )
})
