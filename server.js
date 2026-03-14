const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/bookings', require('./routes/bookingRoutes'));
app.use('/api/admin', require('./utils/authMiddleware'), require('./routes/adminRoutes'));

// Views
app.get('/', (req, res) => {
    res.render('index', { title: 'Booking Site' });
});

app.get('/admin', (req, res) => {
    res.render('admin', { title: 'Admin Dashboard' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
