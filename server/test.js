const { io } = require('socket.io-client')

const socket = io('http://localhost:5000')

socket.on('connect', () => {
    console.log('connected! id:', socket.id)
    setTimeout(() => {
        socket.emit('board:join', { boardId: 'testBoard123' })
    }, 500)
})


