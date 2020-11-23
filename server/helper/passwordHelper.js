const bycript = require('bcryptjs')
require('dotenv').config()

class PassHelper{

  static passConverter(plain){
    const salt = bycript.genSaltSync(8)
    const hash = bycript.hashSync(plain,salt)
    return hash
  }

  static compare(plain, hash){
    return bycript.compareSync(plain,hash)
  }
}

module.exports = PassHelper;