const router = require("express").Router()
const {protect} = require("./../../middleware/authMiddleware")
const {createCard, moveCard, getCardById, updateCard, deleteCard} = require("./card.controller")

router.post('/', protect, createCard)
router.get('/:id', protect, getCardById)
router.patch('/:id', protect, updateCard)
router.delete('/:id', protect, deleteCard)
router.patch('/:id/move', protect, moveCard)


module.exports = router