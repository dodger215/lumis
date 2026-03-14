const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const bookingSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    ref: { type: String, unique: true, required: true },
    service: { type: String, required: true },
    package_name: { type: String },
    package_price: { type: String },
    amount_cents: { type: Number },
    booking_date: { type: String },
    booking_time: { type: String },
    client_name: { type: String },
    client_email: { type: String },
    client_phone: { type: String },
    project_brief: { type: String },
    referral_source: { type: String },
    stripe_payment_id: { type: String },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'confirmed', 'rejected', 'completed']
    },
}, {
    id: false
});

module.exports = mongoose.model('Booking', bookingSchema);
