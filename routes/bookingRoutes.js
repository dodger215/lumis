const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { sendBookingConfirmation } = require('../utils/mailer');
const { v4: uuidv4 } = require('uuid');

// Submit a new booking
router.post('/submit', async (req, res) => {
    try {
        const bookingData = {
            ...req.body,
            id: uuidv4(),
            ref: `LMS-${Math.floor(100000 + Math.random() * 900000)}`,
            status: 'pending',
            created_at: new Date()
        };

        const booking = new Booking(bookingData);
        await booking.save();

        // Send confirmation email
        await sendBookingConfirmation(booking);

        res.status(201).json({ success: true, ref: booking.ref });
    } catch (error) {
        console.error('Booking submission error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
