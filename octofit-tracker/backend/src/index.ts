import express from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

// Codespaces-aware API URL
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

const app = express()
app.use(express.json())

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    apiUrl: getApiUrl(),
    timestamp: new Date().toISOString()
  })
})

// API routes
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

// Root endpoint with API information
app.get('/', (req, res) => {
  res.json({
    message: 'OctoFit Tracker API',
    apiUrl: getApiUrl(),
    endpoints: {
      users: '/api/users',
      teams: '/api/teams',
      activities: '/api/activities',
      leaderboard: '/api/leaderboard',
      workouts: '/api/workouts',
      health: '/health'
    }
  })
})

mongoose.connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`API URL: ${getApiUrl()}`)
      console.log(`Connected to MongoDB at ${MONGO_URL}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
