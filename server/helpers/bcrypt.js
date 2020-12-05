const bcrypt = require('bcryptjs')

function encodePassword(password) {
    const SALT = bcrypt.genSaltSync(8)
    encodedPassword = bcrypt.hashSync(password, SALT)
    return encodedPassword
}

function comparePassword(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword)
}

module.exports = {
    encodePassword,
    comparePassword
} 