import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all users' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get user ${req.params.id}` })
})

router.put('/:id', (req, res) => {
  res.json({ message: `User ${req.params.id} updated` })
})

router.delete('/:id', (req, res) => {
  res.status(204).send()
})

export default router
