const nodemailer = require('nodemailer');

class EmailSender {
  static async sendOrderEmail(userEmail, emailContent) {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASSWORD,
        }
      });

    const mailOptions = {
        from: process.env.NODEMAILER_USER, // Replace with your email address
        to: userEmail,
        subject: 'Order Confirmation',
        html: emailContent,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}

module.exports = EmailSender;
