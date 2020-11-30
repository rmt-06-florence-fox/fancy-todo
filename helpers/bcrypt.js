const bcrypt = require('bcryptjs')


class PassHelper{

  static convert(plain){
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plain,salt)
    return hash
  }

  static compare(plain, hash){
    return bcrypt.compareSync(plain,hash)
  }
}

module.exports = PassHelper