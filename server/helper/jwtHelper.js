const jwt = require('jsonwebtoken')

class JwtHelper{

  static generateToken(object) {
    return jwt.sign(object,'apajaboleh')
  }

  static decodeToken(token){
    return jwt.verify(token,'apajaboleh')
  }
}

module.exports = JwtHelper