import { Schema, model, Document, Types } from 'mongoose'

export interface ILeaderboard extends Document {
  user: Types.ObjectId
  team: Types.ObjectId
  score: number
  rank: number
  activitiesCount: number
  totalDistance: number
  totalCalories: number
  period: string
  updatedAt: Date
}

const leaderboardSchema = new Schema<ILeaderboard>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
    score: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    activitiesCount: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    period: { type: String, enum: ['weekly', 'monthly', 'all-time'], default: 'weekly' }
  },
  { timestamps: true }
)

export const Leaderboard = model<ILeaderboard>('Leaderboard', leaderboardSchema)
