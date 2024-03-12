import React, { FC, ReactNode, memo } from 'react'
import { Header } from '../organisms/layout/Header'

type Props = {
  children: ReactNode
}

export const BaseLayoutTemplate: FC<Props> = memo((props) => {
  const { children } = props
  return (
    <>
      <div className="template__base">
        <Header />
        {children}
      </div>
    </>
  )
})
