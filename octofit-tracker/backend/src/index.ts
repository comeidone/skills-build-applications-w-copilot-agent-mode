import express from 'express'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

const app = express()
app.use(express.json())

app.get('/health', (req, res) => res.json({ status: 'ok' }))

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`Connected to MongoDB at ${MONGO_URL}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
