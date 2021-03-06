const app = require('express')();
const mailer = require('./_modules/mailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
var upload = multer({
  limits: { fieldSize: 25 * 1024 * 1024 }
});

// const upload = multer({ storage: multer.memoryStorage() });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array('allfile', 12));

app.post('/api/forgotPassword', (req, res) => {
  const emailTemplateData = { changePasswordLink: 'www.google.co.in' };
  const toAddress = 'akhilesh.g2t@gmail.com';
  const subject = 'Test HTML Template';
  const emailTemplate = './email/templates/forgotEmail.template.ejs';

  mailer
    .sendHtmlEmail(toAddress, subject, emailTemplate, emailTemplateData)
    .then(info => {
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ result: 'Email sent successfully', message: info.messageId });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: 'Internal error. Unable to proccess your request' });
    });
});

app.post('/api/emailAttachment', (req, res) => {
  const toAddress = 'akhilesh.g2t@gmail.com';
  const subject = 'Test attachment';

  // console.log(req.body.pdfFile);
  console.dir(req.files);

  mailer
    .sendEmailwithAttachment(toAddress, subject, 'Body of the message', req.body.pdfFile)
    .then(info => {
      console.log('Message sent: %s', info.messageId);
      res.status(200).json({ result: 'Email sent successfully', message: info.messageId });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ Error: 'Internal error. Unable to proccess your request' });
    });
});

app.post('/api/emailAttachments', (req, res) => {
  const toAddress = 'akhilesh.g2t@gmail.com';
  const subject = 'Test attachments';

  // console.log(req.body.pdfFile);
  console.dir(req.files);

  mailer
    .sendEmailwithAttachments(toAddress, subject, 'Body of the message', req.files)
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
