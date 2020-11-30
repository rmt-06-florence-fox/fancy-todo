const bcrypt = require('bcryptjs');

function generatePassword(raw){
    const salt = bcrypt.genSaltSync(8);
    const hashed = bcrypt.hashSync(raw, salt);
    return hashed
}

function checkPassword(raw, hash){
    return bcrypt.compareSync(raw, hash);
}

module.exports = {
    generatePassword,
    checkPassword
}