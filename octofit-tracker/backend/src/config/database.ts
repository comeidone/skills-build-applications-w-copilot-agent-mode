import mongoose from 'mongoose'

/**
 * Database configuration for OctoFit Tracker
 * Connects to MongoDB with octofit_db database
 */

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

export const connectDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('✅ Connected to MongoDB database: octofit_db')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error)
    throw error
  }
}

export const disconnectDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect()
    console.log('✅ Disconnected from MongoDB')
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error)
    throw error
  }
}

export default mongoose
