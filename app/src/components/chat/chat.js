import React, { useEffect } from 'react'
import './chat.css'
import Message from '../message/message'

const Chat = ({ messages }) => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, [messages])

  return (
    <div className='chat'>
      {messages.map((message, index) => (
        <Message
          key={index}
          prevMessage={messages[index - 1]}
          nextMessage={messages[index + 1]}
          {...message}
        />
      ))}
    </div>
  )
}

export default Chat
