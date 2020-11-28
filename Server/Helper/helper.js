const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const nodemailer = require('nodemailer')
class Helper{
  static hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }
  static comparePassword(plainPassword, hashPassword){
    return bcrypt.compareSync(plainPassword, hashPassword)
  }
  static generateToken(payload){
    return jwt.sign(payload. process.env.SECRET)
  }
  static verifyToken(token){
    return jwt.verify(token, process.env.SECRET)
  }
  static sendingEmail(payload){
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    })
    let mailOptions = {
      from: 'h8fancytodo@gmail.com',
      to: payload.email,
      subject: payload.subject,
      html: payload.text
    }
    transporter.sendMail(mailOptions, (err, data)=>{
      if(err) return false
      else return true
    })
  }
}

module.exports = Helper