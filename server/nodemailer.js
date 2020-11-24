let nodemailer = require('nodemailer');

function sendEmail(recipient, subject, content, cb){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'hacktigo@gmail.com',
      pass: process.env.PASSWORD
    }
  });
  
  let mailOptions = {
    from: 'hacktigo@gmail.com',
    to: recipient,
    subject: subject,
    text: content
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      cb(err)
    } else {
      cb(null, info)
    }
  });
}

module.exports = sendEmail