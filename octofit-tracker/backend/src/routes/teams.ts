import { Router, Request, Response } from 'express'
import { Team } from '../models/Team'

const router = Router()

// GET all teams
router.get('/', async (_req: Request, res: Response) => {
  try {
    const teams = await Team.find()
    res.json(teams)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch teams' })
  }
})

// POST create team
router.post('/', async (req: Request, res: Response) => {
  try {
    const team = new Team(req.body)
    await team.save()
    res.status(201).json(team)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create team' })
  }
})

// GET team by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const team = await Team.findById(req.params.id)
    if (!team) return res.status(404).json({ error: 'Team not found' })
    res.json(team)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team' })
  }
})

export default router
