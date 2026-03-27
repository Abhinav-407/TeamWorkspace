const chatService = require("./chat.service")


module.exports = (io, socket) => {
    socket.on('chat:join',({channelId})=>{
        socket.join(channelId)
        console.log(`user joined channel room: ${channelId}`)
    })
    socket.on('chat:message', async({text, senderId, channelId})=>{
        const result = await chatService.sendMessage({text, senderId, channelId})
        io.to(channelId).emit('chat:newMessage', result)
    })
    socket.on('chat:typing', ({ channelId, userId, isTyping })=> {
        io.to(channelId).emit('chat:typing',{ userId, isTyping })
    } )
}