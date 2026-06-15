"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const users = await User_1.User.find().select('-password');
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});
router.post('/', async (req, res) => {
    try {
        const user = new User_1.User(req.body);
        await user.save();
        res.status(201).json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to create user' });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findById(req.params.id).select('-password');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error: 'Failed to update user' });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const user = await User_1.User.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
});
exports.default = router;
