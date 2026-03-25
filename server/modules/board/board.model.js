const mongoose = require("mongoose")

const columnSchema  = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    position:{
        type: Number,
        default: 0
    }
})

const boardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    columns: [columnSchema],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps: true})

module.exports = mongoose.model("Board", boardSchema)