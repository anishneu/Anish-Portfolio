const nodemailer = require('nodemailer');

async function sendEmail(email, subject, text) {
  try {
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: "cyberzerox27@gmail.com",
          pass: "ppxz bfaq rcns avbn",
        },
      });

    const mailOptions = {
      from: 'cyberzerox27@gmail.com',
      to: email,
      subject: subject,
      text: text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

module.exports = { sendEmail };