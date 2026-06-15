import { Schema, model, Document, Types } from 'mongoose'

export interface ITeam extends Document {
  name: string
  description: string
  members: Types.ObjectId[]
  leader: Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    description: String,
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    leader: { type: Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
)

export const Team = model<ITeam>('Team', teamSchema)
