import { Router, Request, Response } from 'express'
import { Workout } from '../models/Workout'

const router = Router()

// GET all workouts
router.get('/', async (_req: Request, res: Response) => {
  try {
    const workouts = await Workout.find()
    res.json(workouts)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workouts' })
  }
})

// POST create workout
router.post('/', async (req: Request, res: Response) => {
  try {
    const workout = new Workout(req.body)
    await workout.save()
    res.status(201).json(workout)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create workout' })
  }
})

// GET workout by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const workout = await Workout.findById(req.params.id)
    if (!workout) return res.status(404).json({ error: 'Workout not found' })
    res.json(workout)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch workout' })
  }
})

export default router
