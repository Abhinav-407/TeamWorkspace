const workspaceService = require("./workspace.service")

const createWorkspace = async (req, res) => {
    try {
        const workspace = await workspaceService.createWorkspace({
            name: req.body.name,
            userId: req.user.id
        })
        res.status(201).json({ success: true, data: workspace })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getWorkspace = async (req, res) => {
    try {
        const workspace = await workspaceService.getWorkspace(req.params.id)
        res.status(200).json({ success: true, data: workspace })
    } catch (error) {
        const status = error.message === "Workspace not found" ? 404 : 500
        res.status(status).json({ message: error.message })
    }
}

const getWorkspaces = async (req, res) => {
    try {
        const workspaces = await workspaceService.getWorkspaces(req.user.id)
        res.status(200).json({ success: true, data: workspaces })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const deleteWorkspace = async (req, res) => {
    try {
        await workspaceService.deleteWorkspace(req.params.id, req.user.id)
        res.status(200).json({ success: true, message: "Workspace deleted" })
    } catch (error) {
        const status = error.message.includes("not found") ? 404
            : error.message.includes("owner") ? 403
            : 500
        res.status(status).json({ message: error.message })
    }
}

module.exports = { createWorkspace, getWorkspace, getWorkspaces, deleteWorkspace }