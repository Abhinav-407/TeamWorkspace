const Board = require("./board.model")

const create = async (data) => {
    return await Board.create(data)
}

const findByWorkspace = async (workspaceId) => {
    return await Board.find({ workspace: workspaceId })
}

const findById = async (id) => {
    return await Board.findById(id)
}

const update = async (id, data) => {
    return await Board.findByIdAndUpdate(id, data, { new: true })
}

module.exports = { create, findByWorkspace, findById, update }