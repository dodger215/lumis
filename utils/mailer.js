const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD,
    },
});

const sendBookingConfirmation = async (booking) => {
    const mailOptions = {
        from: `"Lumis" <${process.env.GOOGLE_EMAIL}>`,
        to: booking.client_email,
        subject: 'Thank you for your booking!',
        text: `Hi ${booking.client_name},\n\nThank you for booking our ${booking.service} service. We have received your request and will get back to you shortly.\n\nBooking Reference: ${booking.ref}\n\nBest regards,\nLumis Team`,
        html: `<p>Hi <b>${booking.client_name}</b>,</p><p>Thank you for booking our <b>${booking.service}</b> service. We have received your request and will get back to you shortly.</p><p><b>Booking Reference:</b> ${booking.ref}</p><br><p>Best regards,<br>Lumis Team</p>`,
    };

    return transporter.sendMail(mailOptions);
};

const sendStatusNotification = async (booking, status) => {
    let subject = '';
    let message = '';

    if (status === 'confirmed') {
        subject = 'Your booking has been accepted!';
        message = `Congratulations! Your booking for ${booking.service} has been accepted. We look forward to working with you.`;
    } else if (status === 'rejected') {
        subject = 'Update on your booking request';
        message = `We regret to inform you that your booking for ${booking.service} has been declined at this time. Please contact us for more details.`;
    }

    const mailOptions = {
        from: `"Lumis" <${process.env.GOOGLE_EMAIL}>`,
        to: booking.client_email,
        subject: subject,
        text: `Hi ${booking.client_name},\n\n${message}\n\nBooking Reference: ${booking.ref}\n\nBest regards,\nLumis Team`,
        html: `<p>Hi <b>${booking.client_name}</b>,</p><p>${message}</p><p><b>Booking Reference:</b> ${booking.ref}</p><br><p>Best regards,<br>Lumis Team</p>`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = {
    sendBookingConfirmation,
    sendStatusNotification,
};
