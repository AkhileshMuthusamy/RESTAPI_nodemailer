const email = require('./_modules/email');

const obj = { changePasswordLink: 'www.google.co.in' };

email.sendEmail('akhilesh.g2t@gmail.com', 'Test HTML Template', './email/templates/forgotEmail.template.ejs', obj);
