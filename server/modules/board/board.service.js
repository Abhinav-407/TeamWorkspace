const repo = require("./board.repository")
const workspaceRepo = require("./../workspace/workspace.repository")

const createBoard = async(data) => {
    const workspace = await workspaceRepo.findById(data.workspaceId)

    if (!workspace) {
    throw new Error("Workspace not found")
    }

    const isMember = workspace.members.some(
    member => member.userId.toString() === data.userId.toString()
    )

    if (!isMember) throw new Error("Not a member of this workspace")

    const board = await repo.create({
    title: data.title,
    workspace: data.workspaceId,
    createdBy: data.userId,
    columns: [
        { title: "To Do", position: 0 },
        { title: "In Progress", position: 1 },
        { title: "Done", position: 2 }
    ]
})
    return board
}

const getBoards = async(workspaceId) => {
    const boards = await repo.findByWorkspace(workspaceId)
    if (!boards || boards.length === 0) throw new Error("No boards found")

    return boards
}

const getBoardById = async(id) => {
    const board = await repo.findById(id)
    if (!board) {
        throw new Error("Board not found")
    }

    return board
}
module.exports = {createBoard, getBoards, getBoardById}