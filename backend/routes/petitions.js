// backend/routes/petitions.js
const express = require('express');
const Petition = require('../models/Petition');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

// Create Petition
router.post('/', authenticateToken, (req, res) => {
    const { title, description } = req.body;
    const userId = req.user.id;

    Petition.create({ title, description, user_id: userId }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating petition.' });
        res.json({ message: 'Petition created successfully!' });
    });
});

// Get All Petitions
router.get('/', (req, res) => {
    Petition.getAll((err, petitions) => {
        if (err) return res.status(500).json({ message: 'Error fetching petitions.' });
        res.json(petitions);
    });
});

module.exports = router;
