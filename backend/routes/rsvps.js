const express = require('express');
const router = express.Router();
const RSVP = require('../models/rsvp');

// Submit RSVP
router.post('/', async (req, res) => {
    try {
        const { eventId, name, email } = req.body;
        const rsvp = new RSVP({ eventId, name, email });
        await rsvp.save();
        res.status(201).json(rsvp);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get RSVPs for a specific event
router.get('/:eventId', async (req, res) => {
    try {
        const rsvps = await RSVP.find({ eventId: req.params.eventId });
        res.json(rsvps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
