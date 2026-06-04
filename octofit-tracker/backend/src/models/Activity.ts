import mongoose, { Schema, Document } from 'mongoose'

export interface IActivity extends Document {
  userId: string
  type: string
  duration: number
  distance?: number
  calories?: number
  date: Date
}

const ActivitySchema = new Schema<IActivity>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  distance: { type: Number },
  calories: { type: Number },
  date: { type: Date, default: Date.now }
})

export const Activity = mongoose.model<IActivity>('Activity', ActivitySchema)
