const bcrypt = require('bcryptjs');

function hashPassword(actualPassword) {
    const salt = bcrypt.genSaltSync(8);
    return bcrypt.hashSync(actualPassword, salt)
}

function comparePassword(actualPassword, hashedPassword) {
    return bcrypt.compareSync(actualPassword, hashedPassword);
}

module.exports = { hashPassword , comparePassword }