const mongoose = require("mongoose")

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Board",
        required: true
    },
    columnId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    position: {
        type: Number,
        default: 0
    },
    assignees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    dueDate: {
        type: Date,
        default: null
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Card", cardSchema)