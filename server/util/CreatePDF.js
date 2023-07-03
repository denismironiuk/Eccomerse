const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');
const fs = require('fs');

class PDFHelper {
  constructor() {
    this.doc = new PDFDocument();
  }

  addHeader(title) {
    this.doc.fontSize(20).text(title, { align: 'center' });
    this.doc.moveDown();
  }

  addSection(title, content) {
    this.doc.fontSize(14).text(title);
    this.doc.moveDown();
    this.doc.fontSize(12).text(content);
    this.doc.moveDown();
  }

  async sendEmailWithAttachment(to, subject,filePath) {
    try {
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
console.log(filePath);
      const mailOptions = {
        from: process.env.NODEMAILER_USER,
        to: to,
        subject: subject,
        text: 'Thank you for your order. Please find the attached PDF for order details.',
        attachments: [
          {
            filename: 'order.pdf',
            path: filePath
          }
        ]
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  saveToFile(filePath) {
    this.doc.pipe(fs.createWriteStream(filePath));
    this.doc.end();
  }
}

module.exports = PDFHelper;
