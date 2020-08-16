import { createMachine, reduce, state, transition, invoke, guard } from 'robot3'
import io from 'socket.io-client'

// __ CRUD FUNCTIONS __ \\
const loadUsername = async () => {
  // eslint-disable-next-line no-undef
  return localStorage.getItem('username')
}

const sendMessage = async ctx => {
  ctx.socket.emit('message', { text: ctx.message, username: ctx.username })
}

const initSocket = async () => {
  return io('https://fasteel-messenger-clone.herokuapp.com/')
}

const load = () => {
  const loadUsernamePromise = loadUsername()
  const initSocketPromise = initSocket()
  return Promise.all([loadUsernamePromise, initSocketPromise])
}

// __ GUARD FUNCTIONS __ \\
const canSendMessage = ctx => !!ctx.message
const canSubmitUsername = ctx => !!ctx.editedUsername
const canCancelUsernameModal = ctx => !!ctx.username

const context = () => ({
  username: '',
  editedUsername: '',
  message: '',
  messageToSend: '',
  messages: []
})

const updateMessages = (nextState) => transition('updateMessages', nextState,
  reduce((ctx, ev) => ({
    ...ctx,
    messages: ev.value
  })))

const machine = createMachine({
  idle: state(
    transition('load', 'loadingData'),
    transition('sendMessage', 'sendingMessage', guard(canSendMessage)),
    transition('editMessage', 'idle',
      reduce((ctx, ev) => ({ ...ctx, message: ev.value }))
    ),
    transition('editUsername', 'editingUsername', reduce((ctx, ev) => ({
      ...ctx,
      editedUsername: ctx.username
    }))),
    updateMessages('idle')
  ),
  loadingData: invoke(load,
    transition('done', 'dataLoaded',
      reduce((ctx, ev) => ({
        ...ctx,
        username: ev.data[0] || '',
        socket: ev.data[1]
      }))
    )
  ),
  dataLoaded: state(
    transition('editUsername', 'editingUsername'),
    transition('finish', 'idle'),
    updateMessages('dataLoaded')
  ),
  editingUsername: state(
    transition('editUsername', 'editingUsername',
      reduce((ctx, ev) => ({ ...ctx, editedUsername: ev.value }))
    ),
    transition('cancel', 'idle', guard(canCancelUsernameModal)),
    transition('submitUsername', 'idle',
      guard(canSubmitUsername),
      reduce(ctx => {
        // eslint-disable-next-line no-undef
        localStorage.setItem('username', ctx.editedUsername)
        return { ...ctx, username: ctx.editedUsername, editedUsername: '' }
      })
    ),
    updateMessages('editingUsername')
  ),
  sendingMessage: invoke(sendMessage,
    transition('done', 'idle',
      reduce((ctx, ev) => ({
        ...ctx,
        message: ''
      }))
    )
  )
}, context)

export default machine
