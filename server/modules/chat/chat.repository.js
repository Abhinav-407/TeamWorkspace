const { Message } = require('./chat.model')

const MESSAGES_PER_PAGE = 50

const saveMessage = async (data) => {
    const message = await Message.create(data)
    return message
}

const getMessages = async (channelId, page = 1) => {
    const skip = (page - 1) * MESSAGES_PER_PAGE

    const messages = await Message.find({ channel: channelId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(MESSAGES_PER_PAGE)
        .populate('sender', 'name email avatar')

    return messages
}

module.exports = { saveMessage, getMessages }