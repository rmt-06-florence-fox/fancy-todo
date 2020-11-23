const bcrypt = require('bcryptjs')

function encrypt(password) {
   return bcrypt.hashSync(password,10)
}

function decrypt(input,password) {
   return bcrypt.compareSync(input,password)
}

module.exports = {encrypt,decrypt}