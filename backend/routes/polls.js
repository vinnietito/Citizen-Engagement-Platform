// backend/routes/polls.js
const express = require('express');
const Poll = require('../models/Poll');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Create Poll
router.post('/', authenticateToken, (req, res) => {
    const { question, options } = req.body;
    const userId = req.user.id;

    Poll.create({ question, options, user_id: userId }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating poll.' });
        res.json({ message: 'Poll created successfully!' });
    });
});

// Get All Polls
router.get('/', (req, res) => {
    Poll.getAll((err, polls) => {
        if (err) return res.status(500).json({ message: 'Error fetching polls.' });
        res.json(polls);
    });
});

module.exports = router;
