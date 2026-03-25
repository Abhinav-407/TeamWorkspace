const cardService = require("./card.service")

const createCard = async(req, res) => {
    try {
        const card = await cardService.createCard({
            title: req.body.title,
            boardId: req.body.boardId,
            columnId: req.body.columnId,
            position: req.body.position,
            userId: req.user.id,
            workspaceId: req.body.workspaceId
        })
        res.status(201).json({success: true, card})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getCardById = async(req, res) => {
    try {
        const card = await cardService.getCardById(req.params.id)
        res.status(200).json({success: true, card})
    } catch (error) {
        const status = error.message === "Card not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

const updateCard = async (req, res) => {
    try {
        const card = await cardService.updateCard(req.params.id, req.body)
        res.status(200).json({success: true, card})
    } catch (error) {
        const status = error.message === "Card not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

const deleteCard = async (req, res) => {
    try {
        const card = await cardService.deleteCard(req.params.id)
        res.status(200).json({success: true, card})
    } catch (error) {
        const status = error.message === "Card not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

const moveCard = async (req, res) => {
    try {
        const card = await cardService.moveCard({
            cardId: req.params.id,
            boardId: req.body.boardId,
            toColumnId: req.body.toColumnId,
            fromColumnId: req.body.fromColumnId,
            newPosition: req.body.newPosition
        })
        res.status(200).json({ success: true, card })
    } catch (error) {
        const status = error.message === "Card not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

module.exports = {createCard, moveCard, getCardById, updateCard, deleteCard}