import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/database'
import { config } from './config/config'
import usersRouter from './routes/users'
import teamsRouter from './routes/teams'
import activitiesRouter from './routes/activities'
import workoutsRouter from './routes/workouts'
import leaderboardRouter from './routes/leaderboard'

dotenv.config()

async function main() {
  await connectDB()

  const app = express()
  app.use(express.json())

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ 
      status: 'ok', 
      backendPort: config.port, 
      apiUrl: config.apiBaseUrl,
      codespaceName: config.codespaceName || 'local'
    })
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

  app.listen(config.port, () => {
    console.log(`OctoFit backend listening on ${config.apiBaseUrl}`)
    if (config.codespaceName) {
      console.log(`Codespace detected: ${config.codespaceName}`)
    } else {
      console.log('Running in localhost mode')
    }
  })
}

main()
