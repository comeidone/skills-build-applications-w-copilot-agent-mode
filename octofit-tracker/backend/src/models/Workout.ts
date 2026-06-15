import { Schema, model, Document, Types } from 'mongoose'

export interface IWorkout extends Document {
  user: Types.ObjectId
  name: string
  description: string
  exercises: Array<{
    name: string
    sets: number
    reps: number
    duration: number
  }>
  difficulty: string
  duration: number
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<IWorkout>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    description: String,
    exercises: [
      {
        name: String,
        sets: Number,
        reps: Number,
        duration: Number
      }
    ],
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'intermediate' },
    duration: { type: Number, required: true } // minutes
  },
  { timestamps: true }
)

export const Workout = model<IWorkout>('Workout', workoutSchema)
