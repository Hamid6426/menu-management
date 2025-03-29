// utils/emailTemplates.js

// passwordReset controller
module.exports = {
  passwordReset: (name, resetUrl) => ({
    subject: 'Password Reset Request - Menu Management System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2d3748;">Hello ${name},</h2>
        <p>We received a request to reset your password for the Menu Management System account.</p>
        <p>Click the button below to reset your password:</p>
        <a href="${resetUrl}" 
          style="display: inline-block; padding: 10px 20px; 
                 background-color: #4299e1; color: white; 
                 text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
        <p style="margin-top: 20px; color: #718096;">
          This link will expire in 10 minutes. If you didn't request this password reset, 
          you can safely ignore this email.
        </p>
      </div>
    `
  })
};