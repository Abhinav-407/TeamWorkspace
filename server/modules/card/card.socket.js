const cardService = require("./card.service")

module.exports = (io, socket) => {
    socket.on('board:join', ({boardId}) => {
        socket.join(boardId)
        console.log(`user joined board room: ${boardId}`)
    })
    socket.on('card:create', async ({ boardId, columnId, title, position }) => {
    const result = await cardService.createCard({ boardId, columnId, title, position }) 
    io.to(boardId).emit('card:created', result)
    })

    socket.on('card:move', async ({ cardId, fromColumnId, toColumnId, newPosition, boardId }) => {
    const result = await cardService.moveCard({ cardId, fromColumnId, toColumnId, newPosition, boardId }) 
    io.to(boardId).emit('card:moved', result)
    })

    socket.on('card:delete', async ({ cardId, columnId, boardId }) => {
    const result = await cardService.deleteCard({ cardId, columnId, boardId }) 
    io.to(boardId).emit('card:deleted', result)
    })
}
