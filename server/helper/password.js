const bcrypt = require('bcryptjs')

function comparePw(pw, hashPw){
    return bcrypt.compare(pw, hashPw)
}

module.exports = {comparePw}