const bycript = require('bcryptjs')


class PassHelper {

  static passConverter(plain) {
    const salt = bycript.genSaltSync(+process.env.SALT)
    const hash = bycript.hashSync(plain, salt)
    return hash
  }

  static compare(plain, hash) {
    return bycript.compareSync(plain, hash)
  }
}

module.exports = PassHelper;