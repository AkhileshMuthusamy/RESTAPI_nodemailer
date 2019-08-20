const app = require('express')();
const mailer = require('./_modules/mailer');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/forgotPassword', (req, res) => {
  const emailTemplateData = { changePasswordLink: 'www.google.co.in' };
  const toAddress = 'akhilesh.g2t@gmail.com';
  const subject = 'Test HTML Template';
  const emailTemplate = './email/templates/forgotEmail.template.ejs';

  mailer
    .sendEmail(toAddress, subject, emailTemplate, emailTemplateData)
    .then(info => {
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ result: 'Email sent successfully', message: info.messageId });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: 'Internal error. Unable to proccess your request' });
    });
});

app.listen(process.env.PORT, () => {
  console.log(`Lisening on port ${process.env.PORT}`);
});
