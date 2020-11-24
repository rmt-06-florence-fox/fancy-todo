const bcrypt = require('bcryptjs')
const {generateToken} = require('./jwt')

class Bcrypt {
    static hashSync(data){
        let salt = bcrypt.genSaltSync(8)
        data = bcrypt.hashSync(data,salt)
        return data
    }

    static compareSync(data, password){
        if(bcrypt.compareSync(data, password)){
            const accesstoken = generateToken({id : password.id, email : password.email})
            return accesstoken
        }
    }
}
module.exports = Bcrypt