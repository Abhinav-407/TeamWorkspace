const boardService = require("./board.service")

const createBoard = async(req, res)=>{
    try {
        const board = await boardService.createBoard({
            title: req.body.title,
            workspaceId: req.body.workspaceId,
            userId: req.user.id
        })
        res.status(201).json({success: true, board})
    } catch (error) {
         res.status(500).json({ message: error.message })
    }
}

const getBoards = async(req, res) => {
    try {
        if (!req.query.workspaceId) {
            return res.status(400).json({ message: "workspaceId is required" })
        }
        const boards = await boardService.getBoards(req.query.workspaceId)
        res.status(200).json({success: true, boards})
    } catch (error) {
        const status = error.message === "No boards found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

const getBoardById = async(req, res) => {
    try {
        const board = await boardService.getBoardById(req.params.id)
        res.status(200).json({success: true, board})
    } catch (error) {
        const status = error.message === "Board not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

module.exports = {createBoard, getBoards, getBoardById}