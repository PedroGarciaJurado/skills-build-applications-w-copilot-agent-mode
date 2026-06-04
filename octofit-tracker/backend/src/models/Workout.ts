import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkout extends Document {
  userId: string
  name: string
  exercises: string[]
  date: Date
}

const WorkoutSchema = new Schema<IWorkout>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  exercises: [{ type: String }],
  date: { type: Date, default: Date.now }
})

export const Workout = mongoose.model<IWorkout>('Workout', WorkoutSchema)
