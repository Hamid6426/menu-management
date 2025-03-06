const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, htmlContent) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Use your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not your real password)
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to: ${to}`);
  } catch (error) {
    console.error('Email sending error:', error);
  }
};

module.exports = sendEmail;
