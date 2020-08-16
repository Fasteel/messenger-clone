import React, { useEffect } from 'react'
import { useMachine } from 'react-robot'
import './app.css'
import machine from './app.machine'
import Header from './../header/header'
import Chat from '../chat/chat'
import Edit from '../edit/edit'
import UsernameDialog from '../username-dialog/username-dialog'

function App () {
  const [current, send] = useMachine(machine)

  useEffect(() => {
    send('load')
  }, [send])

  useEffect(() => {
    if (current.name !== 'dataLoaded') return

    if (!current.context.username) {
      send('editUsername')
    } else {
      send('finish')
    }
  }, [current.name, current.context.username, send])

  useEffect(() => {
    if (current.context.socket == null) return

    current.context.socket.on('update', messages => {
      send({ type: 'updateMessages', value: messages })
    })
  }, [current.context.socket, send])

  return (
    <div className='app'>
      <Header send={send} />
      <Chat messages={current.context.messages} />
      <Edit message={current.context.message} send={send} />
      <UsernameDialog current={current} send={send} />
    </div>
  )
}

export default App
