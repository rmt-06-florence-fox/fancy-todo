const bycript = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Helper {

    static hashingPassword (plainString){
        const salt = bycript.genSaltSync(10)
        return  bycript.hashSync(plainString, salt)
    }

    static checkPassword (plainString, hashedString){
        return bycript.compareSync(plainString, hashedString)
    }

    static getToday(){
        let date = new Date().toDateString()
        //return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        //console.log(date)
        return date
    }

    static generateToken(payload){
        return jwt.sign(payload, process.env.SECRET_WORDS)
    }

    static verifyToken(token){
        return jwt.verify(token, process.env.SECRET_WORDS)
    }

    static customErr(status, message){
        throw {status, message}
    }
}

module.exports = Helper