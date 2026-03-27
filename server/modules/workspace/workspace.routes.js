const router = require("express").Router()
const {protect} = require("./../../middleware/authMiddleware")
const {createWorkspace, getWorkspace} = require("./workspace.contoller")

router.post('/',protect, createWorkspace)
router.get('/:id', protect, getWorkspace)

module.exports = router

