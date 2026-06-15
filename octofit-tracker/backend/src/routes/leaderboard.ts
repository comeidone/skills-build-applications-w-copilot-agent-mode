import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get leaderboard' })
})

router.get('/global', (req, res) => {
  res.json({ message: 'Get global leaderboard' })
})

router.get('/team/:teamId', (req, res) => {
  res.json({ message: `Get leaderboard for team ${req.params.teamId}` })
})

export default router
