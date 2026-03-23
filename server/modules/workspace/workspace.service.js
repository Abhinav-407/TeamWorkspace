const repo = require("./workspace.repository")

const createWorkspace = async(data) => {
    const workspace = await repo.create({
        name: data.name,
        owner: data.userId
    })
    const updatedWorkspace = await repo.addMember(workspace._id, {
        userId: data.userId,
        role: "Admin" })
    return updatedWorkspace
}
const getWorkspace = async(workspaceId) => {
    const workspace = await repo.findById(workspaceId)
    if (!workspace) {
        throw new Error("Workspace not found")
    }

    return workspace
}
module.exports = {createWorkspace, getWorkspace}