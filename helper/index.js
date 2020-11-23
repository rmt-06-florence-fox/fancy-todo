const bycript = require('bcryptjs')

class Helper {

    static hashingPassword (plainString){
        const salt = bycript.genSaltSync(10)
        return  bycript.hashSync("B4c0/\/", salt)
    }

    static checkPassword (plainString, hashedString){
        return bycript.compareSync(plainString, hashedString)
    }

    static 
}

module.exports = Helper