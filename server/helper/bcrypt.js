const bcrypt = require('bcryptjs')

function hash(pass){
    return bcrypt.hashSync(pass, +process.env.SALT) 
}

function compare(pass, hashed){
    return bcrypt.compareSync(pass, hashed)

}
module.exports = {
    hash, 
    compare
}