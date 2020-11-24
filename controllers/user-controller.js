const { checkPassword } = require('../helpers/bcrypt')
const { User } = require('../models')

class UserController {
    static register(req, res, next) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(200).json({email: data.email, id: data.id})
        })
            res.status(500).json({})
    }

    static login(req, res, next) {
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if(!data){
                res.status(401).json({massage: 'invalid account'})
            } else {
                if(checkPassword(req.body.password, data.password)){
                    let obj = {
                        id: data.id,
                        email: data.email
                    }
                    res.status(200).json({token: createToken(obj)})
                } else {
                    res.status(401, {massage: {error: 'Invalid Username / Password'}})
                }
            }
        })
    }
}

module.exports=UserController