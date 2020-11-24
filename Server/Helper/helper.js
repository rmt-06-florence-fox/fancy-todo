const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

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
}

module.exports = Helper