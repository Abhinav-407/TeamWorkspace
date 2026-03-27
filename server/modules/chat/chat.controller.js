const chatService = require("./chat.service")

const getMessages = async(req, res) => {
    try {
        const messages = await chatService.getHistory(req.params.id, req.query.page)
        res.status(200).json({success: true, messages})
    } catch (error) {
        const status = error.message === "Message not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}
module.exports = {getMessages}