import { Router } from 'express'
import { Leaderboard } from '../models/Leaderboard'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const period = req.query.period as string || 'weekly'
    const leaderboard = await Leaderboard.find({ period })
      .sort({ rank: 1 })
      .populate('user', 'username email profile')
      .populate('team', 'name')
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

router.get('/global', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ team: null, period: 'weekly' })
      .sort({ rank: 1 })
      .populate('user', 'username email')
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch global leaderboard' })
  }
})

router.get('/team/:teamId', async (req, res) => {
  try {
    const leaderboard = await Leaderboard.find({ team: req.params.teamId, period: 'weekly' })
      .sort({ rank: 1 })
      .populate('user', 'username email')
    res.json(leaderboard)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team leaderboard' })
  }
})

export default router
