const router = require("express").Router()
const { protect } = require("./../../middleware/authMiddleware")
const { createWorkspace, getWorkspace, getWorkspaces, deleteWorkspace } = require("./workspace.contoller")

router.post('/', protect, createWorkspace)
router.get('/', protect, getWorkspaces)
router.get('/:id', protect, getWorkspace)
router.delete('/:id', protect, deleteWorkspace)

module.exports = router