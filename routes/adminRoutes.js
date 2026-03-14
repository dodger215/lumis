const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Pricing = require('../models/Pricing');
const { sendStatusNotification } = require('../utils/mailer');

// Get all bookings (with optional status filter)
router.get('/bookings', async (req, res) => {
    try {
        const { status } = req.query;
        const query = status && status !== 'all' ? { status } : {};
        const bookings = await Booking.find(query).sort({ created_at: -1 });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update booking status
router.post('/bookings/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const booking = await Booking.findOneAndUpdate({ ref: req.params.id }, { status }, { new: true });

        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }

        // Send notification email for confirmed/rejected
        if (['confirmed', 'rejected'].includes(status)) {
            await sendStatusNotification(booking, status);
        }

        res.json({ success: true, booking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get/Update pricing (simplified for this demo)
router.get('/pricing', async (req, res) => {
    try {
        const pricing = await Pricing.find({});
        res.json(pricing);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/pricing/upsert', async (req, res) => {
    try {
        const { updates } = req.body;
        for (const item of updates) {
            await Pricing.findOneAndUpdate(
                { service: item.service, package_name: item.package_name },
                { price: item.price, updated_at: new Date() },
                { upsert: true }
            );
        }
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
