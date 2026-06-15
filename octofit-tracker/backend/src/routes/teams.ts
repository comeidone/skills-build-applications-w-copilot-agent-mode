import { Router } from 'express'
import { Team } from '../models/Team'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('leader', 'username email').populate('members', 'username email')
    res.json(teams)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

router.post('/', async (req, res) => {
  try {
    const team = new Team(req.body)
    await team.save()
    res.status(201).json(team)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create team' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('leader').populate('members')
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json(team)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json(team)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update team' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id)
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete team' })
  }
})

export default router
