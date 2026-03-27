const router = require("express").Router()
const {protect} = require("./../../middleware/authMiddleware")
const {getMessages} = require("./chat.controller")

router.get('/channels/:id/messages', protect, getMessages)

module.exports = router