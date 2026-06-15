"use strict";
/**
 * Seed script: Seed the octofit_db database with test data
 *
 * This script creates sample data for users, teams, activities, workouts,
 * and leaderboard entries to test the OctoFit Tracker application.
 *
 * Usage: ts-node-dev src/scripts/seed.ts
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("../models/User");
const Team_1 = require("../models/Team");
const Activity_1 = require("../models/Activity");
const Workout_1 = require("../models/Workout");
const Leaderboard_1 = require("../models/Leaderboard");
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
async function seed() {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('Connected to MongoDB');
        // Clear existing data
        await User_1.User.deleteMany({});
        await Team_1.Team.deleteMany({});
        await Activity_1.Activity.deleteMany({});
        await Workout_1.Workout.deleteMany({});
        await Leaderboard_1.Leaderboard.deleteMany({});
        console.log('Cleared existing data');
        // Create users
        const users = await User_1.User.insertMany([
            {
                username: 'alice_fit',
                email: 'alice@example.com',
                password: 'hashed_password_1',
                profile: { firstName: 'Alice', lastName: 'Runner', bio: 'Marathon enthusiast' }
            },
            {
                username: 'bob_cyclist',
                email: 'bob@example.com',
                password: 'hashed_password_2',
                profile: { firstName: 'Bob', lastName: 'Pedal', bio: 'Road cyclist' }
            },
            {
                username: 'charlie_swimmer',
                email: 'charlie@example.com',
                password: 'hashed_password_3',
                profile: { firstName: 'Charlie', lastName: 'Waves', bio: 'Swimming coach' }
            },
            {
                username: 'diana_trainer',
                email: 'diana@example.com',
                password: 'hashed_password_4',
                profile: { firstName: 'Diana', lastName: 'Strong', bio: 'Personal trainer' }
            }
        ]);
        console.log(`Created ${users.length} users`);
        // Create teams
        const teams = await Team_1.Team.insertMany([
            {
                name: 'Team Alpha',
                description: 'High-performance fitness team',
                leader: users[0]._id,
                members: [users[0]._id, users[1]._id]
            },
            {
                name: 'Team Beta',
                description: 'Community wellness team',
                leader: users[2]._id,
                members: [users[2]._id, users[3]._id]
            }
        ]);
        console.log(`Created ${teams.length} teams`);
        // Create activities
        const activities = await Activity_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'running',
                duration: 45,
                distance: 8.5,
                calories: 650,
                date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
                description: 'Morning jog in the park'
            },
            {
                user: users[1]._id,
                type: 'cycling',
                duration: 60,
                distance: 25,
                calories: 500,
                date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
                description: 'Road cycling session'
            },
            {
                user: users[2]._id,
                type: 'swimming',
                duration: 30,
                distance: 1.5,
                calories: 350,
                date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                description: 'Lap swimming'
            },
            {
                user: users[3]._id,
                type: 'workout',
                duration: 50,
                distance: 0,
                calories: 400,
                date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
                description: 'Full body strength training'
            }
        ]);
        console.log(`Created ${activities.length} activities`);
        // Create workouts
        const workouts = await Workout_1.Workout.insertMany([
            {
                user: users[0]._id,
                name: 'HIIT Running',
                description: 'High-intensity interval training for runners',
                difficulty: 'advanced',
                duration: 30,
                exercises: [
                    { name: 'Sprint', sets: 8, reps: 30, duration: 0 },
                    { name: 'Recovery jog', sets: 8, reps: 1, duration: 60 }
                ]
            },
            {
                user: users[3]._id,
                name: 'Full Body Strength',
                description: 'Complete strength training routine',
                difficulty: 'intermediate',
                duration: 60,
                exercises: [
                    { name: 'Squats', sets: 4, reps: 10, duration: 0 },
                    { name: 'Bench press', sets: 4, reps: 8, duration: 0 },
                    { name: 'Deadlifts', sets: 3, reps: 5, duration: 0 }
                ]
            },
            {
                user: users[2]._id,
                name: 'Beginner Swimming',
                description: 'Intro to swimming for fitness',
                difficulty: 'beginner',
                duration: 30,
                exercises: [
                    { name: 'Freestyle laps', sets: 1, reps: 10, duration: 0 },
                    { name: 'Backstroke', sets: 1, reps: 5, duration: 0 }
                ]
            }
        ]);
        console.log(`Created ${workouts.length} workouts`);
        // Create leaderboard entries
        const leaderboardEntries = await Leaderboard_1.Leaderboard.insertMany([
            {
                user: users[0]._id,
                team: teams[0]._id,
                score: 950,
                rank: 1,
                activitiesCount: 8,
                totalDistance: 45.5,
                totalCalories: 3500,
                period: 'weekly'
            },
            {
                user: users[1]._id,
                team: teams[0]._id,
                score: 850,
                rank: 2,
                activitiesCount: 6,
                totalDistance: 75,
                totalCalories: 2800,
                period: 'weekly'
            },
            {
                user: users[2]._id,
                team: teams[1]._id,
                score: 800,
                rank: 3,
                activitiesCount: 7,
                totalDistance: 12,
                totalCalories: 2500,
                period: 'weekly'
            },
            {
                user: users[3]._id,
                team: teams[1]._id,
                score: 700,
                rank: 4,
                activitiesCount: 5,
                totalDistance: 0,
                totalCalories: 2000,
                period: 'weekly'
            }
        ]);
        console.log(`Created ${leaderboardEntries.length} leaderboard entries`);
        console.log('\n✅ Database seeding completed successfully!');
        console.log(`
Summary:
- Users: ${users.length}
- Teams: ${teams.length}
- Activities: ${activities.length}
- Workouts: ${workouts.length}
- Leaderboard entries: ${leaderboardEntries.length}
    `);
        await mongoose_1.default.connection.close();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seed();
