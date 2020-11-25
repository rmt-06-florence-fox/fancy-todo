const bcrypt = require('bcryptjs')

function generatePw(pw){
    let salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(pw, salt)
}

function comparePw(pw, hashPw){
    return bcrypt.compareSync(pw, hashPw)
}

module.exports = {comparePw, generatePw}