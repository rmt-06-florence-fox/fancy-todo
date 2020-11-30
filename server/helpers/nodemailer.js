const nodemailer = require('nodemailer')

function sendEmail(username, email) {
  const output = `
    <p>Register succeed!</p>
    <h3>Account details:</h3>
    <ul>
      <li>Username: ${username}</li>
      <li>Email: ${email}</li>
    </ul>
    <h3>Thanks for using this web app!</h3>
  `
  
  let transporter = nodemailer.createTransport({
    service: process.env.MAILER_PROVIDER,
    host: `${process.env.MAILER_PROVIDER}.com`,
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_EMAIL, // generated ethereal user
      pass: process.env.MAILER_PASS // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  })

  const mailOptions = {
    from: `"Reyhan Partiraes" <${process.env.MAILER_PROVIDER}>`, // sender address
    to: `${email}`, // list of receivers
    subject: "Your To-Do Account Details", // Subject line
    html: output // html body
  }

  return transporter.sendMail(mailOptions)
}

module.exports = sendEmail