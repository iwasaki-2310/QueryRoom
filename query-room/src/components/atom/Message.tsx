import Linkify from 'linkify-react'
import React from 'react'

type messageProps = {
  message: string
}

export const Message: React.FC<messageProps> = ({ message }) => {
  return (
    <>
      <div className="message__word">
        <Linkify options={{ className: 'custom-link' }}>
          {message.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Linkify>
      </div>
    </>
  )
}
