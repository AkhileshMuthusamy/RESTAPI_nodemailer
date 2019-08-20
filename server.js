const app = require('express')();
const email = require('./_modules/email');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/api/forgotPassword', (req, res) => {
  const emailTemplateData = { changePasswordLink: 'www.google.co.in' };
  const toAddress = 'akhilesh.g2t@gmail.com';
  const subject = 'Test HTML Template';
  const emailTemplate = './email/templates/forgotEmail.template.ejs';

  email.sendEmail(toAddress, subject, emailTemplate, emailTemplateData, req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Lisening on port ${process.env.PORT}`);
});
