import express, { Express } from 'express'
import mongoose from 'mongoose'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import workoutsRouter from './routes/workouts'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000

/**
 * Build API base URL with CODESPACE_NAME for GitHub Codespaces support
 * Falls back to localhost when CODESPACE_NAME is not available
 */
const getApiUrl = (): string => {
  if (process.env.CODESPACE_NAME) {
    return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  }
  return `http://localhost:${PORT}`
}

export const createServer = (): Express => {
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

  return app
}

export const startServer = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log(`Connected to MongoDB at ${MONGO_URL}`)

    const app = createServer()

    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`)
      console.log(`API URL: ${getApiUrl()}`)
      console.log(`CODESPACE_NAME: ${process.env.CODESPACE_NAME || 'not set (using localhost)'}`)
    })
  } catch (err) {
    console.error('Failed to start server:', err)
    process.exit(1)
  }
}
