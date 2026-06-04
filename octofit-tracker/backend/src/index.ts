import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'

dotenv.config()

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/octofit'
const CODESPACE_NAME = process.env.CODESPACE_NAME
const API_URL = CODESPACE_NAME 
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`

async function main() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }

  const app = express()
  app.use(express.json())

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', backendPort: PORT, apiUrl: API_URL })
  })

  // Route handlers
  app.use('/api/users', usersRouter)
  app.use('/api/teams', teamsRouter)
  app.use('/api/activities', activitiesRouter)
  app.use('/api/workouts', workoutsRouter)
  app.use('/api/leaderboard', leaderboardRouter)

  // Error handling middleware
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error(err.stack)
    res.status(500).json({ error: 'Internal server error' })
  })

  app.listen(PORT, () => {
    console.log(`OctoFit backend listening on ${API_URL}`)
  })
}

main()
