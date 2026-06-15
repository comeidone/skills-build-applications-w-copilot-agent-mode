"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routes/users"));
const teams_1 = __importDefault(require("./routes/teams"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit';
const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;
// Codespaces-aware API URL
const getApiUrl = () => {
    if (process.env.CODESPACE_NAME) {
        return `https://${process.env.CODESPACE_NAME}-${PORT}.app.github.dev`;
    }
    return `http://localhost:${PORT}`;
};
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
mongoose_1.default.connect(MONGO_URL)
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
        console.log(`API URL: ${getApiUrl()}`);
        console.log(`Connected to MongoDB at ${MONGO_URL}`);
    });
})
    .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});
