const bcrypt = require('bcryptjs');

function hashPassword(planPassword) {
    const salt = bcrypt.genSaltSync(8);
    const hash = bcrypt.hashSync(planPassword, salt);

    return hash;
}

function comparePassword(password, hashPassword){
    return bcrypt.compareSync(password, hashPassword);
}

module.exports = {
    hashPassword,
    comparePassword
};