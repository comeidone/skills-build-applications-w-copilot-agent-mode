"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Workout_1 = require("../models/Workout");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().populate('user', 'username email');
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workouts' });
    }
});
router.post('/', async (req, res) => {
    try {
        const workout = new Workout_1.Workout(req.body);
        await workout.save();
        res.status(201).json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create workout' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findById(req.params.id).populate('user');
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.json(workout);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch workout' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.json(workout);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update workout' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const workout = await Workout_1.Workout.findByIdAndDelete(req.params.id);
        if (!workout)
            return res.status(404).json({ error: 'Workout not found' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete workout' });
    }
});
exports.default = router;
