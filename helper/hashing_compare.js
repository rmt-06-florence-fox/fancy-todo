const bcrypt = require("bcryptjs")

function hashing (plainPassword) {
    const salt = bcrypt.genSaltSync(process.env.SALT)
    const hash = bcrypt.hashSync(plainPassword, salt)
    return hash
}

function comparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword);
}

module.exports = {
    hashing,
    comparePassword
}