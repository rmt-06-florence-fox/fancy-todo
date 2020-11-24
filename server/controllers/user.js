const { User } = require('../models')
const Token = require('../helpers/jsonwebtoken')
const Password = require('../helpers/hash-password')

class UserController {

    // ? POST '/register'
    static async register(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(payload);
        
        try {
            const user = await User.create(payload)
            res.status(201).json({id: user.id, email: user.email})
        } catch (error) {
            next(error)
        }
    }

    // ? POST '/login'
    static async login(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const user = await User.findOne({where : {
                email: payload.email
            }})
            if (!user) {
                throw {
                    status: 400,
                    message: 'wrong email / password'
                }
            } else {
                if (Password.comparePassword(payload.password, user.password)) {
                    const access_token = Token.getToken({id:user.id, email:user.email})
                    res.status(200).json({access_token})
                } else {
                    throw {
                        status: 400,
                        message: 'wrong email / password'
                    }
                }
            }
        } catch (error) {
            next(error)
        }

    }
}

module.exports = UserController