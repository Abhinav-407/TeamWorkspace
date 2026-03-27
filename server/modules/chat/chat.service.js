const chatRepo = require("./chat.repository")

const sendMessage = async (data) => {
    const message = await chatRepo.saveMessage({
        text: data.text,
        sender: data.senderId,
        channel: data.channelId
    })
    await message.populate('sender', 'name email avatar')

    return message
}
const getHistory = async(channelId, page )=> {
    const messages = await chatRepo.getMessages(channelId,page)
    return messages
}

module.exports = {sendMessage, getHistory}