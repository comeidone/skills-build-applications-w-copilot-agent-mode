"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
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
}, { timestamps: true });
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
