"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['running', 'cycling', 'swimming', 'workout'], required: true },
    duration: { type: Number, required: true }, // minutes
    distance: { type: Number, default: 0 }, // km
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
    description: String
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
