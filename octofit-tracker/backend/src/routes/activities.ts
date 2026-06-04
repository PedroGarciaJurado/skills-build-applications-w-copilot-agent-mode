import { Router, Request, Response } from 'express'
import { Activity } from '../models/Activity'

const router = Router()

// GET all activities
router.get('/', async (_req: Request, res: Response) => {
  try {
    const activities = await Activity.find()
    res.json(activities)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activities' })
  }
})

// POST create activity
router.post('/', async (req: Request, res: Response) => {
  try {
    const activity = new Activity(req.body)
    await activity.save()
    res.status(201).json(activity)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create activity' })
  }
})

// GET activity by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const activity = await Activity.findById(req.params.id)
    if (!activity) return res.status(404).json({ error: 'Activity not found' })
    res.json(activity)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch activity' })
  }
})

export default router
