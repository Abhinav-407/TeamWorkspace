const Workspace = require("./workspace.model")

const create = async (data) => {
    return await Workspace.create(data)
}

const findById = async (id) => {
    return await Workspace.findById(id)
}

const findByUser = async (userId) => {
    return await Workspace.find({ "members.userId": userId })
}

const addMember = async (workspaceId, memberObj) => {
    return await Workspace.findByIdAndUpdate(
        workspaceId,
        { $push: { members: memberObj } },
        { new: true }
    )
}

const deleteById = async (id) => {
    return await Workspace.findByIdAndDelete(id)
}

module.exports = { create, findById, findByUser, addMember, deleteById }