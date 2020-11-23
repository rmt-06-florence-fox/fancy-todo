const bycript = require('bcryptjs')

class Helper {

    static hashingPassword (plainString){
        const salt = bycript.genSaltSync(10)
        return  bycript.hashSync(plainString, salt)
    }

    static checkPassword (plainString, hashedString){
        return bycript.compareSync(plainString, hashedString)
    }

    static getToday(){
        let date = new Date()
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
    }
}

module.exports = Helper