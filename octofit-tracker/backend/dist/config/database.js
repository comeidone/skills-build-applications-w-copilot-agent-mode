"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnectDatabase = exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Database configuration for OctoFit Tracker
 * Connects to MongoDB with octofit_db database
 */
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const connectDatabase = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('✅ Connected to MongoDB database: octofit_db');
    }
    catch (error) {
        console.error('❌ MongoDB connection error:', error);
        throw error;
    }
};
exports.connectDatabase = connectDatabase;
const disconnectDatabase = async () => {
    try {
        await mongoose_1.default.disconnect();
        console.log('✅ Disconnected from MongoDB');
    }
    catch (error) {
        console.error('❌ MongoDB disconnection error:', error);
        throw error;
    }
};
exports.disconnectDatabase = disconnectDatabase;
exports.default = mongoose_1.default;
