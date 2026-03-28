const repo = require("./workspace.repository")

const createWorkspace = async (data) => {
    const workspace = await repo.create({
        name: data.name,
        owner: data.userId
    })
    const updatedWorkspace = await repo.addMember(workspace._id, {
        userId: data.userId,
        role: "Admin"
    })
    return updatedWorkspace
}

const getWorkspace = async (workspaceId) => {
    const workspace = await repo.findById(workspaceId)
    if (!workspace) {
        throw new Error("Workspace not found")
    }
    return workspace
}

const getWorkspaces = async (userId) => {
    return await repo.findByUser(userId)
}

const deleteWorkspace = async (workspaceId, userId) => {
    const workspace = await repo.findById(workspaceId)
    if (!workspace) {
        throw new Error("Workspace not found")
    }
    if (workspace.owner.toString() !== userId) {
        throw new Error("Only the owner can delete this workspace")
    }
    return await repo.deleteById(workspaceId)
}

module.exports = { createWorkspace, getWorkspace, getWorkspaces, deleteWorkspace }