const bcrypt = require('bcryptjs')

function comparePw(pw, hashPw){
    return bcrypt.compareSync(pw, hashPw)
}

module.exports = comparePw