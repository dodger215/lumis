const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const pricingSchema = new mongoose.Schema({
    id: { type: String, default: uuidv4, unique: true },
    service: { type: String, required: true },
    package_name: { type: String, required: true },
    price: { type: Number, required: true },
    updated_at: { type: Date, default: Date.now }
});

// Unique index for service and package_name
pricingSchema.index({ service: 1, package_name: 1 }, { unique: true });

module.exports = mongoose.model('Pricing', pricingSchema);
