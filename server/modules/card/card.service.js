const repo = require("./card.repository")
const Board = require("./../board/board.model")

const createCard = async(data)=>{
    const card = await repo.create({
        title: data.title,
        board: data.boardId,
        columnId: data.columnId,
        position: data.position || 0,
        createdBy: data.userId,
        workspace: data.workspaceId
    })
    await Board.findByIdAndUpdate(
        data.boardId,
        { $push: { "columns.$[col].cards": card._id } },
        { arrayFilters: [{ "col._id": data.columnId }] }
    )
    return card
}

const moveCard = async(data) => {
    await Board.findByIdAndUpdate(
    data.boardId,
    { $pull: { "columns.$[col].cards": data.cardId } },
    { arrayFilters: [{ "col._id": data.fromColumnId }] }
    )

    await Board.findByIdAndUpdate(
    data.boardId,
    { $push: { "columns.$[col].cards": data.cardId } },
    { arrayFilters: [{ "col._id": data.toColumnId }] }
    )

    const card = await repo.move(data.cardId, data.toColumnId, data.newPosition)

    return card
}

const getCardById = async (id) => {
    const card = await repo.findById(id)
    if (!card) throw new Error("Card not found")
    return card
}

const updateCard = async (id, data) => {
    const card = await repo.update(id, data)
    if (!card) throw new Error("Card not found")
    return card
}

const deleteCard = async (id) => {
    const card = await repo.deleteCard(id)
    if (!card) throw new Error("Card not found")
    return card
}

module.exports = {createCard, moveCard, getCardById, updateCard, deleteCard}