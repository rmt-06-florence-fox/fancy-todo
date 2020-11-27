const bcrypt = require("bcryptjs")

function hashPassword(plainPassword) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(plainPassword, salt)
    return hash
}

function comparePass(plainPassword, hashPass) {
    return bcrypt.compareSync(plainPassword, hashPass)
}

module.exports = {
    hashPassword,
    comparePass
}