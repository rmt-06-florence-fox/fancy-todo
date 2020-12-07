const bcrypt = require('bcryptjs')

function hashPwd (pwd) {
 const salt = bcrypt.genSaltSync(8)
 const hashedPwd = bcrypt.hashSync(pwd, salt);
 return hashedPwd
}

function comparePwd (input, hash) {
    return bcrypt.compareSync(input, hash)
}

module.exports = {
    hashPwd, comparePwd
}