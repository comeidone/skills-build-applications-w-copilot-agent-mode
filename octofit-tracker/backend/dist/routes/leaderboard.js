"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const period = req.query.period || 'weekly';
        const leaderboard = await Leaderboard_1.Leaderboard.find({ period })
            .sort({ rank: 1 })
            .populate('user', 'username email profile')
            .populate('team', 'name');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch leaderboard' });
    }
});
router.get('/global', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ team: null, period: 'weekly' })
            .sort({ rank: 1 })
            .populate('user', 'username email');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch global leaderboard' });
    }
});
router.get('/team/:teamId', async (req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find({ team: req.params.teamId, period: 'weekly' })
            .sort({ rank: 1 })
            .populate('user', 'username email');
        res.json(leaderboard);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch team leaderboard' });
    }
});
exports.default = router;
