import Linkify from 'linkify-react'

type messageProps = {
  message: string
}

export const Message: React.FC<messageProps> = ({ message }) => {
  return (
    <>
      <div className="message__word">
        <Linkify options={{ className: 'custom-link' }}>{message}</Linkify>
      </div>
    </>
  )
}
