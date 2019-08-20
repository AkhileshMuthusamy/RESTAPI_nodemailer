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

module.exports.sendEmail = async function(toAddress, subject, bodyTemplate, bodyTemplateData, request, response) {
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
        (err, info) => {
          if (err) {
            console.error(err);
            response.status(500).json({ Error: 'Unable to proccess your request' });
          } else {
            response.status(200).json({ result: 'Please check your inbox', message: info.messageId });
            console.log('Message sent: %s', info.messageId);
          }
        }
      );
    })
    .catch(error => {
      console.log(`Email Render: ${error}`);
      response.status(500).send(error);
    });
};
