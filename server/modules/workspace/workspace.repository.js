const Workspace = require("./workspace.model")

const create = async (data) => {
    return await Workspace.create(data)
}

const findById = async (id) => {
    return await Workspace.findById(id)
}

const addMember = async (workspaceId, memberObj) => {
    return await Workspace.findByIdAndUpdate(
        workspaceId,
        { $push: { members: memberObj } },
        { new: true }
    )
}

module.exports = { create, findById, addMember }