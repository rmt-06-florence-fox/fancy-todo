const bcrypt = require('bcryptjs')


function generatePassword(pass){
    const salt = bcrypt.genSaltSync(10)
    let hashed = bcrypt.hashSync(pass, salt)
    return hashed
}

function comparePassword(pass, pass2){
    return bcrypt.compareSync(pass, pass2)
}



module.exports = {
    generatePassword,
    comparePassword
}

