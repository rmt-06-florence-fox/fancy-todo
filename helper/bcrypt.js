const bcrypt = require('bcrypt')
class Bcrypt{
    static hash(pwInput){
        const saltRounds = 10
        return bcrypt.hashSync(pwInput, saltRounds)
    }
    static compare(pw, hash){
        return bcrypt.compareSync(pw, hash)
    }
}
module.exports = Bcrypt