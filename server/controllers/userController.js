const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')


class UserController {
    static async register(req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const newuser = await User.create(payload)

            res.status(201).json({
                id: newuser.id,
                email: newuser.email
            })
        }catch (error){
            next(error)
        }
    }

    static async login (req, res, next) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }
            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })
            if(!user) {
                throw {
                    status: 401,
                    error: 'wrong password/email'
                }
            } else if (!comparePassword(payload.password, user.password)) {
                throw {
                    status: 401,
                    error: 'wrong password/email'
                }
            }else {
                console.log('sampe')
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })
                res.status(200).json({
                    access_token
                })
            }
        }catch(error){
            next(error)
        }
    }
}

module.exports = UserController