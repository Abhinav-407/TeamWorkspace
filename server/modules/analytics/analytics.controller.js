const mongoose = require('mongoose')
const analyticsService = require('./analytics.service')

const getStats = async (req, res) => {
    try {
        const workspaceId = new mongoose.Types.ObjectId(req.query.workspaceId)
        const data = await analyticsService.getWorkspaceStats(workspaceId)
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getWorkload = async (req, res) => {
    try {
        const workspaceId = new mongoose.Types.ObjectId(req.query.workspaceId)
        const data = await analyticsService.getWorkload(workspaceId)
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getTimeline = async (req, res) => {
    try {
        const workspaceId = new mongoose.Types.ObjectId(req.query.workspaceId)
        const data = await analyticsService.getTimeline(workspaceId)
        res.status(200).json({ success: true, data })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { getStats, getWorkload, getTimeline }