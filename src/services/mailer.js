const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.send = async (to, userName, productName) => {
    const info = await transporter.sendMail({
        from: 'Back-in-Stock <noreply@example.com>',
        to,
        subject: `Back in Stock: ${productName}`,
        html: `<p>Hi ${userName} ,</p><p>The product <strong>${productName}</strong> ' is now back in stock. Order it before it runs out again!</p>`
    });
    console.log('Email sent to:', to);
    console.log('Email sent:', info.messageId);
};