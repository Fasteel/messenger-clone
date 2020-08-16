const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
let messages = []

let interval = null

io.on('connection', socket => {
  if (interval == null) {
    interval = setInterval(() => {
      messages = []
      socket.emit('update', messages)
    }, 600000)
  }

  socket.emit('update', messages)
  socket.on('message', ({ text, username }) => {
    messages.push({
      text,
      username
    })
    io.emit('update', messages)
  })
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./../app/build'))
}

server.listen(process.env.PORT || 5000)
