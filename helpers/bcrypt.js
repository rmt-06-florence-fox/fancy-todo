const bycript = require('bcryptjs')


class PassHelper{

  static convert(plain){
    const salt = bycript.genSaltSync(10)
    const hash = bycript.hashSync(plain,salt)
    return hash
  }

  static compare(plain, hash){
    return bycript.compareSync(plain,hash)
  }
}

module.exports = PassHelper