const bcrypt = require("bcryptjs")

function hashPass(pass) {
    const salt = bcrypt.genSaltSync(8)
    return bcrypt.hashSync(pass, salt)
}

function comparePass(pass, hash) {
    return bcrypt.compareSync(pass, hash)
}

module.exports = {
    hashPass,
    comparePass
}