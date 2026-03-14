const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        const adminExists = await Admin.findOne({ email: 'admin@lumis.studio' });
        if (adminExists) {
            console.log('Admin user already exists.');
        } else {
            const admin = new Admin({
                email: 'admin@lumis.studio',
                password: 'admin123',
                name: 'Super Admin'
            });
            await admin.save();
            console.log('Admin user seeded successfully. (Email: admin@lumis.studio, Pass: admin123)');
        }

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
