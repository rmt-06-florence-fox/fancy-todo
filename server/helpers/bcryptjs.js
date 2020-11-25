const bcrypt = require('bcryptjs')

class Bcrypt {
    static hashSync(data){
        let salt = bcrypt.genSaltSync(8)
        data = bcrypt.hashSync(data,salt)
        return data
    }

    static compareSync(data, password){a
        return bcrypt.compareSync(data, password)
    }
}
module.exports = Bcrypt