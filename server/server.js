require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const http = require("http")
const { Server } = require('socket.io')

const authRoutes = require('./modules/auth/auth.routes');
const workspaceRoutes = require('./modules/workspace/workspace.routes')
const boardRoutes = require('./modules/board/board.routes')
const cardRoutes = require('./modules/card/card.routes')
const chatRoutes = require('./modules/chat/chat.routes')

const app = express()

app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
    }
})

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/boards', boardRoutes)
app.use('/api/cards', cardRoutes)
app.use('/api/chats', chatRoutes)


io.on('connection', (socket) => {
    console.log(`user connected: ${socket.id}`) 

    const cardSocket = require("./modules/card/card.socket")
    cardSocket(io, socket)
    
    const chatSocket = require('./modules/chat/chat.socket')
    chatSocket(io, socket)

    socket.on('disconnect', () => {              
        console.log(`user disconnected: ${socket.id}`)
    })
})

const PORT = process.env.PORT || 5000
server.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})