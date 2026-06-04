import { Router, Request, Response } from 'express'
import { Activity } from '../models/Activity'

const router = Router()

// GET leaderboard - users ranked by total activity duration
router.get('/', async (_req: Request, res: Response) => {
  try {
    const leaderboard = await Activity.aggregate([
      {
        $group: {
          _id: '$userId',
          totalDuration: { $sum: '$duration' },
          totalActivities: { $sum: 1 }
        }
      },
      {
        $sort: { totalDuration: -1 }
      },
      {
        $limit: 100
      }
    ])
    res.json(leaderboard)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' })
  }
})

export default router
