const bcrypt = require('bcryptjs')

function hashPwd (password) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt)
  return hash
}
  
function comparePwd (password, hashPassword) {
  return bcrypt.compareSync(password, hashPassword)
}

module.exports = { hashPwd, comparePwd }