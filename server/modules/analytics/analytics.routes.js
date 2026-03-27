const router = require('express').Router()
const { protect } = require('../../middleware/authMiddleware')
const { getStats, getWorkload, getTimeline } = require('./analytics.controller')

router.get('/stats', protect, getStats)
router.get('/workload', protect, getWorkload)
router.get('/timeline', protect, getTimeline)

module.exports = router