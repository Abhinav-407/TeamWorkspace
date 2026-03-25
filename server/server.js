require("dotenv").config()

const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const authRoutes = require('./modules/auth/auth.routes');
const workspaceRoutes = require('./modules/workspace/workspace.routes')
const boardRoutes = require('./modules/board/board.routes')

const app = express()

app.use(cors())
app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes)
app.use('/api/boards', boardRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})