"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const activities = await Activity_1.Activity.find().populate('user', 'username email');
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
    }
});
router.post('/', async (req, res) => {
    try {
        const activity = new Activity_1.Activity(req.body);
        await activity.save();
        res.status(201).json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create activity' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findById(req.params.id).populate('user');
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json(activity);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.json(activity);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update activity' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const activity = await Activity_1.Activity.findByIdAndDelete(req.params.id);
        if (!activity)
            return res.status(404).json({ error: 'Activity not found' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete activity' });
    }
});
exports.default = router;
