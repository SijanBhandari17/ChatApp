const nodemailer = require('nodemailer');

const sendOTP = async (otpGenerated, recipientEmail) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: false,
    auth: {
      user: process.env.NODEMAILER_ACCOUNT,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_ACCOUNT,
    to: recipientEmail,
    subject: 'Welcome to ChatApp',
    html: `<p>Hello,</p>
    <p>Your One-Time Password (OTP) for verification is: <strong>${otpGenerated}</strong></p>
    <p>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</p>
    <p>If you did not request this code, please ignore this email.</p>
    <p>Thank you,<br>
    ChatApp Team</p>`,
  };
  try {
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    return false;
  }
};

module.exports = sendOTP;
