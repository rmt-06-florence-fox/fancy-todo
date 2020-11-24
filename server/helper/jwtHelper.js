const jwt = require('jsonwebtoken')

class JwtHelper{

  static generateToken(object) {
    return jwt.sign(object, process.env.SECRET)
  }

  static decodeToken(token){
    return jwt.verify(token,process.env.SECRET)
  }
}

module.exports = JwtHelper