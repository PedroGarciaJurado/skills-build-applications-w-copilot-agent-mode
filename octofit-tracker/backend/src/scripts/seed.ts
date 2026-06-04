import mongoose from 'mongoose'
const dotenv = require('dotenv')

// Seed the octofit_db database with test data
const MONGO_URI = 'mongodb://localhost:27017/octofit_db'

dotenv.config()

interface IUser {
  name: string
  email: string
}

interface ITeam {
  name: string
  members: string[]
}

interface IActivity {
  userId: string
  type: string
  duration: number
  distance?: number
  calories?: number
  date: Date
}

interface IWorkout {
  userId: string
  name: string
  exercises: string[]
  date: Date
}

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
})

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
})

const ActivitySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: Date.now }
})

const WorkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  exercises: [{ type: String }],
  date: { type: Date, default: Date.now }
})

const User = mongoose.model<IUser>('User', UserSchema)
const Team = mongoose.model<ITeam>('Team', TeamSchema)
const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema)

async function seed() {
  try {
    await mongoose.connect(MONGO_URI)
    console.log('Connected to MongoDB (octofit_db)')

    // Clear existing data
    await User.deleteMany({})
    await Team.deleteMany({})
    await Activity.deleteMany({})
    await Workout.deleteMany({})
    console.log('Cleared existing collections')

    // Create sample users
    const users = await User.insertMany([
      { name: 'Alice Johnson', email: 'alice@example.com' },
      { name: 'Bob Smith', email: 'bob@example.com' },
      { name: 'Charlie Brown', email: 'charlie@example.com' },
      { name: 'Diana Prince', email: 'diana@example.com' },
      { name: 'Eve Wilson', email: 'eve@example.com' }
    ])
    console.log(`Created ${users.length} users`)

    // Create sample teams
    const teams = await Team.insertMany([
      { name: 'Fitness Fanatics', members: [users[0]._id.toString(), users[1]._id.toString()] },
      { name: 'Marathon Runners', members: [users[2]._id.toString(), users[3]._id.toString()] },
      { name: 'Gym Warriors', members: [users[4]._id.toString(), users[0]._id.toString()] }
    ])
    console.log(`Created ${teams.length} teams`)

    // Create sample activities
    const activities = await Activity.insertMany([
      { userId: users[0]._id.toString(), type: 'running', duration: 45, distance: 5, calories: 450, date: new Date() },
      { userId: users[0]._id.toString(), type: 'cycling', duration: 60, distance: 20, calories: 600, date: new Date(Date.now() - 86400000) },
      { userId: users[1]._id.toString(), type: 'swimming', duration: 30, distance: 2, calories: 300, date: new Date() },
      { userId: users[1]._id.toString(), type: 'running', duration: 50, distance: 8, calories: 500, date: new Date(Date.now() - 172800000) },
      { userId: users[2]._id.toString(), type: 'yoga', duration: 60, calories: 200, date: new Date() },
      { userId: users[2]._id.toString(), type: 'running', duration: 90, distance: 15, calories: 900, date: new Date(Date.now() - 259200000) },
      { userId: users[3]._id.toString(), type: 'weightlifting', duration: 75, calories: 400, date: new Date() },
      { userId: users[4]._id.toString(), type: 'cycling', duration: 120, distance: 40, calories: 1200, date: new Date() }
    ])
    console.log(`Created ${activities.length} activities`)

    // Create sample workouts
    const workouts = await Workout.insertMany([
      { userId: users[0]._id.toString(), name: 'Monday Upper Body', exercises: ['Bench Press', 'Rows', 'Pull-ups'] },
      { userId: users[0]._id.toString(), name: 'Wednesday Core', exercises: ['Planks', 'Crunches', 'Leg Raises'] },
      { userId: users[1]._id.toString(), name: 'Full Body HIIT', exercises: ['Burpees', 'Mountain Climbers', 'Jump Squats'] },
      { userId: users[2]._id.toString(), name: 'Flexibility Session', exercises: ['Stretching', 'Foam Rolling', 'Meditation'] },
      { userId: users[3]._id.toString(), name: 'Lower Body Day', exercises: ['Squats', 'Lunges', 'Leg Press'] },
      { userId: users[4]._id.toString(), name: 'Cardio Blast', exercises: ['Treadmill', 'Rowing', 'Jump Rope'] }
    ])
    console.log(`Created ${workouts.length} workouts`)

    console.log('\n✅ Database seeding completed successfully!')
    console.log(`Database: octofit_db`)
    console.log(`Collections populated: users, teams, activities, workouts`)

    await mongoose.disconnect()
  } catch (err) {
    console.error('Seeding error:', err)
    process.exit(1)
  }
}

seed()
