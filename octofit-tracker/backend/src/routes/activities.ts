import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
  res.json({ message: 'Get all activities' })
})

router.post('/', (req, res) => {
  res.status(201).json({ message: 'Activity created' })
})

router.get('/:id', (req, res) => {
  res.json({ message: `Get activity ${req.params.id}` })
})

router.put('/:id', (req, res) => {
  res.json({ message: `Activity ${req.params.id} updated` })
})

router.delete('/:id', (req, res) => {
  res.status(204).send()
})

export default router
