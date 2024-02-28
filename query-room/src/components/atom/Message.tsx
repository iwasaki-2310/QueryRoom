import Linkify from 'linkify-react'

type messageProps = {
  message: string
}

export const Message: React.FC<messageProps> = ({ message }) => {
  return (
    <>
      <p className="message__word">
        <Linkify as="p" options={{ className: 'custom-link' }}>
          {message}
        </Linkify>
      </p>
    </>
  )
}
