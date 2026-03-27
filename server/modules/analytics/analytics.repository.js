const Card = require('../card/card.model')

const getStats = async (workspaceId) => {
    const stats = await Card.aggregate([
        // stage 1 - filter cards for this workspace
        { $match: { workspace: workspaceId } },
        
        // stage 2 - count total, completed, overdue
        { $group: {
            _id: null,
            total: { $sum: 1 },
            completed: {
                $sum: {
                    $cond: [{ $eq: ['$status', 'done'] }, 1, 0]
                }
            },
            overdue: {
                $sum: {
                    $cond: [{ $and: [
                        { $lt: ['$dueDate', new Date()] },
                        { $ne: ['$status', 'done'] }
                    ]}, 1, 0]
                }
            }
        }}
    ])

    return stats[0] || { total: 0, completed: 0, overdue: 0 }
}

const getWorkload = async (workspaceId) => {
    const workload = await Card.aggregate([
        // stage 1 - filter cards for this workspace
        { $match: { workspace: workspaceId } },

        // stage 2 - flatten assignees array
        { $unwind: '$assignees' },

        // stage 3 - group by assignee and count cards
        { $group: {
            _id: '$assignees',
            cardCount: { $sum: 1 }
        }},

        // stage 4 - populate assignee details
        { $lookup: {
            from: 'users',
            localField: '_id',
            foreignField: '_id',
            as: 'user'
        }},

        // stage 5 - flatten user array (lookup returns array)
        { $unwind: '$user' },

        // stage 6 - shape the final output
        { $project: {
            _id: 0,
            userId: '$_id',
            name: '$user.name',
            email: '$user.email',
            cardCount: 1
        }}
    ])

    return workload
}
const getTimeline = async (workspaceId) => {
    const timeline = await Card.aggregate([
        // stage 1 - filter completed cards for this workspace
        { $match: { 
            workspace: workspaceId,
            status: 'done',
            completedAt: { $exists: true }
        }},

        // stage 2 - group by week
        { $group: {
            _id: {
                $dateToString: { format: '%Y-%V', date: '$completedAt' }
            },
            count: { $sum: 1 }
        }},

        // stage 3 - sort by week ascending
        { $sort: { _id: 1 } },

        // stage 4 - shape the output
        { $project: {
            _id: 0,
            week: '$_id',
            count: 1
        }}
    ])

    return timeline
}

module.exports = { getStats, getWorkload, getTimeline }