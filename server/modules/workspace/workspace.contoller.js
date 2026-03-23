const workspaceService = require("./workspace.service")

const createWorkspace = async(req, res) => {
    try {
        const workspace = await workspaceService.createWorkspace({
            name: req.body.name, 
            userId: req.user.id})
        res.status(201).json({success: true, workspace})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const getWorkspace = async(req, res) => {
    try {
        const workspace = await workspaceService.getWorkspace(req.params.id)

        res.status(200).json({success: true, workspace})
    } catch (error) {
    const status = error.message === "Workspace not found" ? 404 : 500
    res.status(status).json({ message: error.message }) // ✅
    }
}
module.exports = { createWorkspace, getWorkspace }