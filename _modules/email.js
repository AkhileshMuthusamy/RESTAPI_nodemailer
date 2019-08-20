const nodemailer = require('nodemailer');
const htmlEmail = require('./htmlRenderer');

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.NOTIFY_EMAIL,
    pass: process.env.NOTIFY_EMAIL_PASSWORD
  }
});

module.exports.sendEmail = function(toAddress, subject, bodyTemplate, bodyTemplateData, cb) {
  htmlEmail
    .render(bodyTemplate, bodyTemplateData)
    .then(html => {
      transporter.sendMail(
        {
          from: process.env.NOTIFY_EMAIL, // sender address
          to: toAddress, // list of receivers
          subject: subject, // Subject line
          html: html // html body
        },
        cb
      );
    })
    .catch(error => {
      console.log(`Email Render: ${error}`);
    });
};
