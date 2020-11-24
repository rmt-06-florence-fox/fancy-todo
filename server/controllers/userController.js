const { User } = require('../models')
const { comparePwd } = require('../helpers/password')
const { generateToken } = require('../helpers/jwt')


class UserController {
    static register( req, res, next) {
        let { email, password } = req.body
        let user = { email, password }
        User.create(user)
        .then(data => {
            res.status(201).json({email: data.email, password: data.password})
        })
        .catch(error => {
            next(error)
        })
    }
    
    static login(req, res, next) {
        User.findOne({ where: {email: req.body.email}})
        .then(data => {
            if (!data) {
                throw {
                    status: 401,
                    message: `Invalid account`
                }
            } else if (comparePwd(req.body.password, data.password)) {
                const acces_token = generateToken({id: data.id, email: data.email})
                res.status(200).json({acces_token})
            } else {
                throw {
                    status: 401,
                    message: `Invalid email/password`
                }
            }            
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = UserController