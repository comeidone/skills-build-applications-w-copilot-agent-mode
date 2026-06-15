import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all teams' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Team created' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get team ${req.params.id}` })
})

router.put('/:id', (req, res) => {
  res.json({ message: `Team ${req.params.id} updated` })
})

router.delete('/:id', (req, res) => {
  res.status(204).send()
})

export default router
