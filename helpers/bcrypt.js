const bcrypt = require('bcryptjs')

function encodePassword(password) {
    const salt = bcrypt.genSaltSync(8)
    encodedPassword = bcrypt.hashSync(password, salt)
    return encodedPassword
}

function comparePassword(password, encodedPassword) {
    return bcrypt.compareSync(password, encodedPassword)
}

module.exports = {
    encodePassword,
    comparePassword
}