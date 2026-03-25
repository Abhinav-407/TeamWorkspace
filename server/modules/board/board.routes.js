const router = require("express").Router()
const {protect} = require("./../../middleware/authMiddleware")
const {createBoard, getBoards, getBoardById} = require("./board.controller")

router.post('/', protect, createBoard)
router.get('/', protect, getBoards)
router.get('/:id', protect, getBoardById)


module.exports = router