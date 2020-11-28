const nodemailer = require('nodemailer')

class Mailer {
  static welcomeMail(userEmail) {

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASS
      }
    })


    let mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: userEmail,
      subject: 'Welcome',
      text: 'Welcome to fancy todo, enjoy'
    }

    transporter.sendMail(mailOptions, (err, data) => {
      if (err) {
        return false
      } else {
        return true
      }
    })
  }

}

module.exports = Mailer

