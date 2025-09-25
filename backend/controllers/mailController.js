const nodemailer = require('nodemailer');

const generateTransporter = () => {
  return {
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_ACCOUNT,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  };
};

const sendOTP = async (otpGenerated, recipientEmail) => {
  const transporter = nodemailer.createTransport(generateTransporter());
  const mailOptions = {
    from: process.env.NODEMAILER_ACCOUNT,
    to: recipientEmail,
    subject: 'Welcome to ConnectNow',
    html: `<p>Hello,</p>
    <p>Your One-Time Password (OTP) for verification is: <strong>${otpGenerated}</strong></p>
    <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
    <p>If you did not request this code, please ignore this email.</p>
    <p>Thank you,<br>
    ConnectNow Team</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

const sendResetLink = async (recipientEmail, resetLink) => {
  console.log(recipientEmail);
  const transporter = nodemailer.createTransport(generateTransporter());
  const mailOptions = {
    from: process.env.NODEMAILER_ACCOUNT,
    to: recipientEmail,
    subject: 'Password Reset Link',
    html: `
      <p>Hello,</p>
      <p>We received a request to reset your password. Click the link below to reset it:</p>
      <p><a href="${resetLink}" target="_blank">${resetLink}</a></p>
      <p>This link is valid for the next 1 hour. Please do not share it with anyone.</p>
      <p>If you did not request a password reset, you can safely ignore this email.</p>
      <p>Thank you,<br>
      ConnectNow Team</p>
`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = { sendOTP, sendResetLink };
