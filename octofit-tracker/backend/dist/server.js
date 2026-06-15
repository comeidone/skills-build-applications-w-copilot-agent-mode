"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.createServer = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
/**
 * Build API base URL with CODESPACE_NAME for GitHub Codespaces support
 * Falls back to localhost when CODESPACE_NAME is not available
 */
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    // Health check endpoint
    app.get('/health', (req, res) => {
        res.json({
            status: 'ok',
            apiUrl: getApiUrl(),
            timestamp: new Date().toISOString()
        });
    });
    // API routes
    app.use('/api/users', users_1.default);
    app.use('/api/teams', teams_1.default);
    app.use('/api/activities', activities_1.default);
    app.use('/api/leaderboard', leaderboard_1.default);
    app.use('/api/workouts', workouts_1.default);
    // Root endpoint with API information
    app.get('/', (req, res) => {
        res.json({
            message: 'OctoFit Tracker API',
            apiUrl: getApiUrl(),
            endpoints: {
                users: '/api/users',
                teams: '/api/teams',
                activities: '/api/activities',
                leaderboard: '/api/leaderboard',
                workouts: '/api/workouts',
                health: '/health'
            }
        });
    });
    return app;
};
exports.createServer = createServer;
const startServer = async () => {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log(`Connected to MongoDB at ${MONGO_URL}`);
        const app = (0, exports.createServer)();
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
            console.log(`API URL: ${getApiUrl()}`);
            console.log(`CODESPACE_NAME: ${process.env.CODESPACE_NAME || 'not set (using localhost)'}`);
        });
    }
    catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};
exports.startServer = startServer;
