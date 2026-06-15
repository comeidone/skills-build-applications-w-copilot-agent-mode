import { Schema, model, Document } from 'mongoose'

export interface IUser extends Document {
  username: string
  email: string
  password: string
  profile: {
    firstName: string
    lastName: string
    bio: string
  }
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: {
      firstName: String,
      lastName: String,
      bio: String
    }
  },
  { timestamps: true }
)

export const User = model<IUser>('User', userSchema)
