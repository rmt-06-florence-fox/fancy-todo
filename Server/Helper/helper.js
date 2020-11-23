const bcrypt = require('bcryptjs')

class Helper{
  static hashPassword(password){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
  }
  static comparePassword(plainPassword, hashPassword){
    return bcrypt.compareSync(plainPassword, hashPassword)
  }
}

module.exports = Helper