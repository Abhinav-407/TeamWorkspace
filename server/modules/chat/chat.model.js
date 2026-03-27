const mongoose = require('mongoose')

const channelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace', required: true },
}, { timestamps: true })

const messageSchema = new mongoose.Schema({
    text: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel', required: true },
}, { timestamps: true })

const Channel = mongoose.model('Channel', channelSchema)
const Message = mongoose.model('Message', messageSchema)

module.exports = { Channel, Message }