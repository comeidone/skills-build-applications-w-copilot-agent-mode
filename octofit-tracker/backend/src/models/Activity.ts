import { Schema, model, Document, Types } from 'mongoose'

export interface IActivity extends Document {
  user: Types.ObjectId
  type: string
  duration: number
  distance: number
  calories: number
  date: Date
  description: string
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'cycling', 'swimming', 'workout'], required: true },
    duration: { type: Number, required: true }, // minutes
    distance: { type: Number, default: 0 }, // km
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    description: String
  },
  { timestamps: true }
)

export const Activity = model<IActivity>('Activity', activitySchema)
