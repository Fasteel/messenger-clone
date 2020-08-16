import React from 'react'
import './message.css'
import { messageFromMe } from '../../helpers'

const Message = ({ text, username, prevMessage, nextMessage }) => {
  const isCurrentMessageFromMe = messageFromMe(username)
  const sameOwnerNextMessage = nextMessage?.username === username
  const sameOwnerPreviousMessage = prevMessage?.username === username

  return (
    <div className={`message ${sameOwnerPreviousMessage ? 'no-padding-top' : ''} ${sameOwnerNextMessage ? 'no-padding-bottom' : ''}`}>
      <span className={`message__username ${(sameOwnerPreviousMessage || isCurrentMessageFromMe) ? 'hide' : ''}`}>{username}</span>
      <div className={`message__text_container ${isCurrentMessageFromMe ? 'row-reverse' : ''}`}>
        <span className={`message__text ${isCurrentMessageFromMe ? 'bg-blue' : ''}`}>{text}</span>
      </div>
    </div>
  )
}

export default Message
