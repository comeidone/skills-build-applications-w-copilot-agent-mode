import { Router } from 'express'
import { User } from '../models/User'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to create user' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password')
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: 'Failed to update user' })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' })
  }
})

export default router
