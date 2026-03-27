const analyticsRepo = require('./analytics.repository')

const getWorkspaceStats = async (workspaceId) => {
    return await analyticsRepo.getStats(workspaceId)
}

const getWorkload = async (workspaceId) => {
    return await analyticsRepo.getWorkload(workspaceId)
}

const getTimeline = async (workspaceId) => {
    return await analyticsRepo.getTimeline(workspaceId)
}

module.exports = { getWorkspaceStats, getWorkload, getTimeline }