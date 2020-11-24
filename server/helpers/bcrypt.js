const bcrypt = require('bcryptjs')

function enPassword(password){
    return bcrypt.hashSync(password, +process.env.SALT)
}
function comparePassword(password,hashed){
    return bcrypt.compareSync(password,hashed)
}

module.exports = {
    enPassword,comparePassword
}